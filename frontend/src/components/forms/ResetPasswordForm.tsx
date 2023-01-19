import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../UI/LoadingSpinner';
import classes from './form.module.scss';
import Card from '../../UI/Card';
import useHttp from '../../hooks/use-http';
import useInput from '../../hooks/use-input';
import useModal from '../../hooks/use-modal';
import Modal from '../../UI/Modal';
import SmallTextBox from '../inputs/SmallTextBox';
import { Res } from '../../types/interfaces';

const ResetPasswordForm = () => {
  const { isLoading, error, sendRequest: LoginRequest } = useHttp();
  const navigate = useNavigate();
  const { token } = useParams();
  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/users/resetPassword/${token}`;
  const { setModalMessage, showModal, modalMessage, hideModal } =
    useModal(error);

  const passwordValidate = (value: string) => {
    const passwordFormat = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$');
    return passwordFormat.test(value);
  };

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(passwordValidate);

  const {
    value: passwordConfirm,
    isValid: passwordConfirmIsValid,
    hasError: passwordConfirmHasError,
    valueChangeHandler: passwordConfirmChangeHandler,
    inputBlurHandler: passwordConfirmBlurHandler,
    reset: resetPasswordConfirm,
  } = useInput(passwordValidate);

  const response = (res: Res) => {
    if (res.status === 'success') {
      setModalMessage('Password Updated!');
      setTimeout(() => {
        hideModal();
        resetPassword();
        resetPasswordConfirm();
        navigate('/login');
      }, 1000);
    } else {
      setModalMessage('Something went wrong!');
      setTimeout(() => {
        hideModal();
      }, 2000);
    }
  };

  const formSubmitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!passwordIsValid || !passwordConfirmIsValid) {
      return;
    }

    LoginRequest(
      {
        url: SERVER_URL,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          password: password,
          passwordConfirm: passwordConfirm,
        },
      },
      response
    );
  };

  const passwordInputClasses = passwordHasError
    ? `${classes.input} ${classes.invalid}`
    : `${classes.input}`;

  const passwordConfirmInputClasses = passwordConfirmHasError
    ? `${classes.input} ${classes.invalid}`
    : `${classes.input}`;

  const hideModalHandler = () => {
    hideModal();
  };

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
        <form onSubmit={formSubmitHandler} className={classes.form}>
          <p>
            Password must contain one upper case, and one lower case letter.
            Minimum length 8 characters
          </p>
          <SmallTextBox
            className={passwordInputClasses}
            onBlur={passwordBlurHandler}
            onChange={passwordChangeHandler}
            value={password}
            fieldName="Password"
            type="password"
          />
          <SmallTextBox
            className={passwordConfirmInputClasses}
            onBlur={passwordConfirmBlurHandler}
            onChange={passwordConfirmChangeHandler}
            value={passwordConfirm}
            fieldName="Confirm Password"
            type="password"
          />
          <div className={classes.btnContainer}>
            <button>Create New Password</button>
          </div>
        </form>
      )}
    </Card>
  );
};

export default ResetPasswordForm;
