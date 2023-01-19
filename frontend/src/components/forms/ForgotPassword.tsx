import React from 'react';
import classes from './LoginForm.module.scss';
import useInput from '../../hooks/use-input';
import useHttp from '../../hooks/use-http';
import useModal from '../../hooks/use-modal';
import SmallTextBox from '../inputs/SmallTextBox';
import Modal from '../../UI/Modal';
import LoadingSpinner from '../../UI/LoadingSpinner';
import Card from '../../UI/Card';
import { Res } from '../../types/interfaces';
import { SetStateBoolean } from '../../types/index.type';

const ForgotPassword = ({
  setShowResetForm,
}: {
  setShowResetForm: SetStateBoolean;
}) => {
  const { isLoading, error, sendRequest: resetRequest } = useHttp();
  const { setModalMessage, showModal, modalMessage, hideModal } =
    useModal(error);
  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/users/forgotPassword`;

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

  const response = (res: Res) => {
    if (res.status === 'success') {
      setModalMessage('Password Reset Link Sent to Your Email!');
      setTimeout(() => {
        hideModal();
        resetEmailInput();
        setShowResetForm(false);
      }, 2000);
    } else {
      setModalMessage('Invalid Email');
      setTimeout(() => {
        hideModal();
      }, 2000);
    }
  };

  const LoginFormSubmitHandler = (
    event: React.ChangeEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!enteredEmailIsValid) {
      return;
    }

    resetRequest(
      {
        url: SERVER_URL,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          email: enteredEmail,
        },
      },
      response
    );
  };

  const hideModalHandler = () => {
    hideModal();
  };

  const emailInputClasses = emailInputHasError
    ? `${classes.input} ${classes.invalid}`
    : `${classes.input}`;

  return (
    <Card className={classes.container}>
      {isLoading && (
        <div className={classes.loading}>
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && showModal && (
        <Modal className="modal" onClose={hideModalHandler}>
          <div className="modal__content">
            <p>{modalMessage}</p>
          </div>
        </Modal>
      )}
      {!isLoading && (
        <form onSubmit={LoginFormSubmitHandler} className={classes.form}>
          <p>
            Please enter the email address associated with your account. We'll
            email you instructions on how to reset you password.
          </p>

          <SmallTextBox
            className={emailInputClasses}
            onBlur={emailBlurHandler}
            onChange={emailChangeHandler}
            value={enteredEmail}
            fieldName="Email address"
          />

          <div className={classes.btnContainer}>
            <button>Reset Password</button>
          </div>
        </form>
      )}
    </Card>
  );
};

export default ForgotPassword;
