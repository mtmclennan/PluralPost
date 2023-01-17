import React, { Fragment } from 'react';
import classes from '../form.module.scss';
import Modal from '../../../UI/Modal';
import LoadingSpinner from '../../../UI/LoadingSpinner';
import useHttp from '../../../hooks/use-http';
import useModal from '../../../hooks/use-modal';
import SmallTextBox from '../../inputs/SmallTextBox';
import useInput from '../../../hooks/use-input';
import { SetStateBoolean } from '../../../types/index.type';

type SettingsFormProps = {
  setEdit: SetStateBoolean;
};

const SettingFormPassword = ({ setEdit }: SettingsFormProps) => {
  const { isLoading, error, sendRequest } = useHttp();
  const { setModalMessage, showModal, modalMessage, hideModal } =
    useModal(error);
  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/users/updateMyPassword`;

  const passwordvalidate = (value: string) => {
    return value.trim() !== '';
  };

  const {
    value: currentPassword,
    isValid: currentPasswordIsValid,
    hasError: currentPasswordInputHasError,
    valueChangeHandler: currentPasswordChangeHandler,
    inputBlurHandler: currentPasswordBlurHandler,
    reset: resetCurrentPasswordInput,
  } = useInput(passwordvalidate);

  const {
    value: newPassword,
    isValid: newPasswordIsValid,
    hasError: newPasswordInputHasError,
    valueChangeHandler: newPasswordChangeHandler,
    inputBlurHandler: newPasswordBlurHandler,
    reset: resetNewPasswordInput,
  } = useInput(passwordvalidate);

  const {
    value: confirmPassword,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordInputHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPasswordInput,
  } = useInput(passwordvalidate);

  const responce = (res: { status: string }) => {
    if (res.status === 'success') {
      setModalMessage('Updated sucessfully!');
      setTimeout(() => {
        hideModal();
        setEdit(false);
        resetCurrentPasswordInput();
        resetNewPasswordInput();
        resetConfirmPasswordInput();
      }, 1000);
    } else {
      setTimeout(() => {
        hideModal();
      }, 3000);
      console.log(error);
      setModalMessage(error || 'Something went wrong!');
    }
  };

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setModalMessage('Passwords Do NOT Match!');

      return;
    }

    if (
      !newPasswordIsValid ||
      !currentPasswordIsValid ||
      !confirmPasswordIsValid
    ) {
      return;
    }

    sendRequest(
      {
        url: SERVER_URL,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          passwordCurrent: currentPassword,
          password: newPassword,
          passwordConfirm: confirmPassword,
        },
      },
      responce
    );
  };

  const showModalHandler = () => {
    hideModal();
  };

  const onCloseHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setEdit(false);
  };

  const currentPasswordInputClasses = currentPasswordInputHasError
    ? `${classes.input} ${classes.invalid}`
    : `${classes.input}`;

  const newPasswordInputClasses = newPasswordInputHasError
    ? `${classes.input} ${classes.invalid}`
    : `${classes.input}`;

  const confirmPasswordInputClasses = confirmPasswordInputHasError
    ? `${classes.input} ${classes.invalid}`
    : `${classes.input}`;

  return (
    <Fragment>
      {showModal && (
        <Modal onClose={showModalHandler}>
          <div className="modal">
            <h3>{modalMessage}</h3>
          </div>
        </Modal>
      )}

      {isLoading && <LoadingSpinner />}
      <form onSubmit={formSubmitHandler}>
        <SmallTextBox
          fieldName="Current Password"
          className={currentPasswordInputClasses}
          onBlur={currentPasswordBlurHandler}
          onChange={currentPasswordChangeHandler}
          value={currentPassword}
          type="password"
        />
        <SmallTextBox
          fieldName="New Password"
          className={newPasswordInputClasses}
          onBlur={newPasswordBlurHandler}
          onChange={newPasswordChangeHandler}
          value={newPassword}
          type="password"
        />
        <SmallTextBox
          fieldName="Confirm New Password"
          className={confirmPasswordInputClasses}
          onBlur={confirmPasswordBlurHandler}
          onChange={confirmPasswordChangeHandler}
          value={confirmPassword}
          type="password"
        />
        <div className={classes.btnContainer}>
          <button>Update</button>
          <button onClick={onCloseHandler}>Cancel</button>
        </div>
      </form>
    </Fragment>
  );
};

export default SettingFormPassword;
