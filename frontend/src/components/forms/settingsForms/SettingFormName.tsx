import React, { Fragment, useContext, useEffect } from 'react';
import classes from '../form.module.scss';
import SmallTextBox from '../../inputs/SmallTextBox';
import useInput from '../../../hooks/use-input';
import {
  Context,
  FormEvent,
  UserRes,
  SetStateBoolean,
} from '../../../types/index.type';
import useModal from '../../../hooks/use-modal';
import useHttp from '../../../hooks/use-http';
import AuthContext from '../../../store/auth-context';
import Modal from '../../../UI/Modal';
import LoadingSpinner from '../../../UI/LoadingSpinner';

type SettingsFormProps = {
  setEdit: SetStateBoolean;
};

const SettingFormName = ({ setEdit }: SettingsFormProps) => {
  const AuthCtx = useContext<Context>(AuthContext);
  const { isLoading, error, sendRequest } = useHttp();
  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/users/updateMe`;

  const { setModalMessage, showModal, modalMessage, hideModal } =
    useModal(error);

  useEffect(() => {
    setFirstName(AuthCtx.user.name.split(' ')[0]);
    setLastName(AuthCtx.user.name.split(' ')[1]);
  }, []);

  const {
    value: firstName,
    setValue: setFirstName,
    isValid: firstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: lastName,
    setValue: setLastName,
    isValid: lastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput((value) => value.trim() !== '');

  const onCloseHandler = () => {
    setEdit(false);
  };

  const responseData = (res: UserRes) => {
    if (res.status === 'success') {
      AuthCtx.onLogin(res.user);
      setModalMessage('Updated sucessfully!');
      setTimeout(() => {
        hideModal();
        setEdit(false);
        resetFirstNameInput();
        resetLastNameInput();
      }, 1000);
    } else {
      setTimeout(() => {
        hideModal();
      }, 3000);
      console.log(error);
      setModalMessage(error || 'Something went wrong!');
    }
  };

  const formSubmitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (!firstNameIsValid || !lastNameIsValid) {
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
          name: `${firstName} ${lastName}`,
        },
      },
      responseData
    );
  };

  const showModalHandler = () => {
    hideModal();
  };

  const firstNameInputClasses = firstNameInputHasError
    ? `${classes.input} ${classes.invalid}`
    : `${classes.input}`;

  const lastNameInputClasses = lastNameInputHasError
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
          fieldName="First Name"
          className={firstNameInputClasses}
          onBlur={firstNameBlurHandler}
          onChange={firstNameChangeHandler}
          value={firstName}
        />
        <SmallTextBox
          fieldName="Last Name"
          className={lastNameInputClasses}
          onBlur={lastNameBlurHandler}
          onChange={lastNameChangeHandler}
          value={lastName}
        />
        <div className={classes.btnContainer}>
          <button>Save</button>
          <button onClick={onCloseHandler}>Cancel</button>
        </div>
      </form>
    </Fragment>
  );
};

export default SettingFormName;
