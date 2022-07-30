import { Fragment, useContext, useEffect } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './UserSettingForm.module.css';
import Modal from '../../UI/Modal';
import useHttp from '../../hooks/use-http';
import useInput from '../../hooks/use-input';
import LoadingSpinner from '../../UI/LoadingSpinner';
import useModal from '../../hooks/use-modal';

const UserSettingForm = (props) => {
  const AuthCtx = useContext(AuthContext);
  const { isLoading, error, sendRequest } = useHttp();
  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/users/updateMe`;

  const { setModalMessage, showModal, modalMessage, hideModal } =
    useModal(error);

  const emailValidate = (value) => {
    const emailFormat = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    return emailFormat.test(value);
  };

  useEffect(() => {
    setEnteredName(AuthCtx.user.name);
    setEnteredEmail(AuthCtx.user.email);
  }, []);

  const {
    value: enteredEmail,
    setValue: setEnteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(emailValidate);

  const {
    value: enteredName,
    setValue: setEnteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== '');

  const responseData = (data) => {
    const { data: user } = data;
    AuthCtx.onLogin(user.user);

    if (data.status === 'success') {
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

  const showModalHandler = () => {
    hideModal();
  };

  const accountSettingFormSubmitHandler = (e) => {
    e.preventDefault();

    if (!enteredNameIsValid || !enteredEmailIsValid) {
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
          name: enteredName,
          email: enteredEmail,
        },
      },
      responseData
    );

    resetNameInput();
    resetEmailInput();
  };

  const emailInputClasses = emailInputHasError
    ? `${classes['form__input']} ${classes.invalid}`
    : `${classes['form__input']}`;

  const nameInputClasses = nameInputHasError
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
        <h3>Update your name and email</h3>
        <form
          onSubmit={accountSettingFormSubmitHandler}
          className={classes['form--login']}
        >
          <div className={classes['form__group']}>
            <label className={classes['form__label']} htmlFor="name">
              Name
            </label>
            <input
              className={nameInputClasses}
              type="text"
              id="name"
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              value={enteredName}
            ></input>
          </div>
          <div className={classes['form__group']}>
            <label className={classes['form__label']} htmlFor="email">
              Email
            </label>
            <input
              className={emailInputClasses}
              type="email"
              id="email"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={enteredEmail}
            ></input>
          </div>
          <div className={classes['form__group']}>
            <button
              className={`${classes['form__group center']} ${classes['center']}`}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
export default UserSettingForm;
