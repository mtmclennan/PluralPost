import Card from '../../UI/Card';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './UserSettingForm.module.css';
import useHttp from '../../hooks/use-http';
import useInput from '../../hooks/use-input';

const UserSettingForm = (props) => {
  const AuthCtx = useContext(AuthContext);
  const { isLoading, error, sendRequest } = useHttp();

  const emailValidate = (value) => {
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

  const responseData = (data) => {
    const { data: user } = data;
    console.log(user.user);
    AuthCtx.onLogin(user.user);
  };

  const accountSettingFormSubmitHandler = (e) => {
    e.preventDefault();

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    sendRequest(
      {
        url: 'http://localhost:3030/api/v1/users/updateMe',
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
            Update
          </button>
        </div>
      </form>
    </Card>
  );
};
export default UserSettingForm;
