import Card from '../../UI/Card';
import classes from './SubscriberForm.module.css';
import useInput from '../../hooks/use-input';
import useHttp from '../../hooks/use-http';
import Modal from '../../UI/Modal';
import { Fragment, useContext } from 'react';
import useModal from '../../hooks/use-modal';
import LoadingSpinner from '../../UI/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import { Res } from '../../types/interfaces';
import { FormEvent } from '../../types/index.type';

const SubscriberForm = () => {
  const { isLoading, error, sendRequest } = useHttp();
  const { showModal, hideModal, modalMessage, setModalMessage } =
    useModal(error);
  const AuthCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/subscribers/${AuthCtx.website.name}/subscribers`;

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

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== '');

  const accountSettingFormSubmitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    const response = (res: Res) => {
      if (res.status === 'success') {
        setModalMessage('Subscriber Added');
        setTimeout(() => {
          hideModal();
          resetNameInput();
          resetEmailInput();
          // resetWebsiteeInput();
          navigate('/subscribers');
        }, 1000);
      } else {
        setModalMessage('Something went wrong!');
        setTimeout(() => {
          hideModal();
        }, 2000);
      }
    };
    sendRequest(
      {
        url: SERVER_URL,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          name: enteredName,
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
    ? `${classes['form__input']} ${classes.invalid}`
    : `${classes['form__input']}`;

  const nameInputClasses = nameInputHasError
    ? `${classes['form__input']} ${classes.invalid}`
    : `${classes['form__input']}`;

  return (
    <Fragment>
      {showModal && (
        <Modal onClose={hideModalHandler}>
          <div className="modal">
            <h3>{modalMessage}</h3>
          </div>
        </Modal>
      )}
      {isLoading && <LoadingSpinner />}
      <div className="heading">
        <h3>Add a New Subscriber</h3>
      </div>
      <Card className={classes.formContainer}>
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
              Add New Subscriber
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default SubscriberForm;
