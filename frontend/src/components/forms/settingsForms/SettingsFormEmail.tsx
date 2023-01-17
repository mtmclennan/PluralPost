import React, { Fragment, useContext } from 'react';
import classes from '../form.module.scss';
import SmallTextBox from '../../inputs/SmallTextBox';
import useInput from '../../../hooks/use-input';
import useHttp from '../../../hooks/use-http';
import Modal from '../../../UI/Modal';
import useModal from '../../../hooks/use-modal';
import LoadingSpinner from '../../../UI/LoadingSpinner';
import AuthContext from '../../../store/auth-context';
import {
  SetStateBoolean,
  FormEvent,
  UserRes,
  Context,
} from '../../../types/index.type';

type SettingsFormProps = {
  setEdit: SetStateBoolean;
};

const SettingFormEmail = ({ setEdit }: SettingsFormProps) => {
  const AuthCtx = useContext<Context>(AuthContext);
  const { isLoading, error, sendRequest } = useHttp();
  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/users/updateMe`;

  const { setModalMessage, showModal, modalMessage, hideModal } =
    useModal(error);

  const emailValidate = (value: string) => {
    const emailFormat = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    return emailFormat.test(value);
  };

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(emailValidate);

  const onCloseHandler = () => {
    setEdit(false);
  };

  const responseData = (res: UserRes) => {
    if (res.status === 'success') {
      console.log(res);
      AuthCtx.onLogin(res.user);
      setModalMessage('Updated sucessfully!');
      setTimeout(() => {
        hideModal();
        setEdit(false);
        resetEmailInput();
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
    console.log('HERE');

    if (!enteredEmailIsValid) {
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
          email: enteredEmail,
        },
      },
      responseData
    );
  };

  const showModalHandler = () => {
    hideModal();
  };

  const emailInputClasses = emailInputHasError
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
          fieldName="New Email"
          className={emailInputClasses}
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
          value={enteredEmail}
        />
        <div className={classes.btnContainer}>
          <button>Save</button>
          <button onClick={onCloseHandler}>Cancel</button>
        </div>
      </form>
    </Fragment>
  );
};

export default SettingFormEmail;
