import { Fragment } from 'react';
import classes from './PasswordChangeForm.module.css';
import Modal from '../../UI/Modal';
import LoadingSpinner from '../../UI/LoadingSpinner';
import useInput from '../../hooks/use-input';
import useHttp from '../../hooks/use-http';
import useModal from '../../hooks/use-modal';

const PasswordChangeForm = () => {
  const { isLoading, error, sendRequest } = useHttp();
  const { setModalMessage, showModal, modalMessage, hideModal } =
    useModal(error);
  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/users/updateMyPassword'`;

  const passwordvalidate = (value: string) => {
    return value.trim() !== '';
  };

  const {
    value: enteredCurrentPassword,
    isValid: enteredCurrentPasswordIsValid,
    hasError: currentPasswordInputHasError,
    valueChangeHandler: currentPasswordChangeHandler,
    inputBlurHandler: currentPasswordBlurHandler,
    reset: resetCurrentPasswordInput,
  } = useInput(passwordvalidate);

  const {
    value: enteredNewPassword,
    isValid: enteredNewPasswordIsValid,
    hasError: newPasswordInputHasError,
    valueChangeHandler: newPasswordChangeHandler,
    inputBlurHandler: newPasswordBlurHandler,
    reset: resetNewPasswordInput,
  } = useInput(passwordvalidate);

  const {
    value: enteredConfirmPassword,
    isValid: enteredConfirmPasswordIsValid,
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
      }, 1000);
    } else {
      setTimeout(() => {
        hideModal();
      }, 3000);
      console.log(error);
      setModalMessage(error || 'Something went wrong!');
    }
  };

  const changePasswordFormSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (enteredNewPassword !== enteredConfirmPassword) {
      setModalMessage('Passwords Do NOT Match!');

      return;
    }

    if (
      !enteredNewPasswordIsValid ||
      !enteredCurrentPasswordIsValid ||
      !enteredConfirmPasswordIsValid
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
          passwordCurrent: enteredCurrentPassword,
          password: enteredNewPassword,
          passwordConfirm: enteredConfirmPassword,
        },
      },
      responce
    );

    resetCurrentPasswordInput();
    resetNewPasswordInput();
    resetConfirmPasswordInput();
  };

  const showModalHandler = () => {
    hideModal();
  };

  const currentPasswordInputClasses = currentPasswordInputHasError
    ? `${classes['form__input']} ${classes.invalid}`
    : `${classes['form__input']}`;

  const newPasswordInputClasses = newPasswordInputHasError
    ? `${classes['form__input']} ${classes.invalid}`
    : `${classes['form__input']}`;

  const confirmPasswordInputClasses = confirmPasswordInputHasError
    ? `${classes['form__input']} ${classes.invalid}`
    : `${classes['form__input']}`;

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
      <div className={classes.formContainer}>
        <h3>Change Password</h3>
        <form onSubmit={changePasswordFormSubmitHandler}>
          <div className={classes['form__group']}>
            <label
              className={classes['form__label']}
              htmlFor="current-password"
            >
              Current Password
            </label>
            <input
              className={currentPasswordInputClasses}
              type="password"
              id="current-password"
              onChange={currentPasswordChangeHandler}
              onBlur={currentPasswordBlurHandler}
              value={enteredCurrentPassword}
            ></input>
          </div>
          <div className={classes['form__group']}>
            <label className={classes['form__label']} htmlFor="new-password">
              New Password
            </label>
            <input
              className={newPasswordInputClasses}
              type="password"
              id="new-password"
              onChange={newPasswordChangeHandler}
              onBlur={newPasswordBlurHandler}
              value={enteredNewPassword}
            ></input>
          </div>
          <div className={classes['form__group']}>
            <label
              className={classes['form__label']}
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              className={confirmPasswordInputClasses}
              type="password"
              id="confirm-password"
              onChange={confirmPasswordChangeHandler}
              onBlur={confirmPasswordBlurHandler}
              value={enteredConfirmPassword}
            ></input>
          </div>
          <button>Update Password</button>
        </form>
      </div>
    </Fragment>
  );
};

export default PasswordChangeForm;
