import useHttp from '../../hooks/use-http';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import useInput from '../../hooks/use-input';
import LoadingSpinner from '../../UI/LoadingSpinner';
import Card from '../../UI/Card';
import classes from './LoginForm.module.css';
import useModal from '../../hooks/use-modal';

const LoginForm = (props) => {
  const AuthCtx = useContext(AuthContext);
  const { isLoading, error, sendRequest: LoginRequest } = useHttp();
  const navigate = useNavigate();
  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/users/login`;
  const {} = useModal(error);

  useEffect(() => {
    if (AuthCtx.isLoggedIn) {
      navigate('/welcome');
    }
  }, [AuthCtx.isLoggedIn, navigate]);

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
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== '');

  const response = (data) => {
    if (data.status === 'success') {
      const { data: user } = data;

      AuthCtx.onLogin(user.user);
      resetPasswordInput();
      resetEmailInput();
    }
  };

  const LoginFormSubmitHandler = (e) => {
    e.preventDefault();

    if (!enteredPasswordIsValid || !enteredEmailIsValid) {
      return;
    }

    LoginRequest(
      {
        url: SERVER_URL,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          email: enteredEmail,
          password: enteredPassword,
        },
      },
      response
    );
  };

  const emailInputClasses = emailInputHasError
    ? `${classes['form__input']} ${classes.invalid}`
    : `${classes['form__input']}`;

  const passwordInputClasses = passwordInputHasError
    ? `${classes['form__input']} ${classes.invalid}`
    : `${classes['form__input']}`;

  return (
    <Card className={classes['login-form']}>
      {isLoading && (
        <div className={classes.loading}>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <form
          onSubmit={LoginFormSubmitHandler}
          className={classes['form--login']}
        >
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
            <label className={classes['form__label']} htmlFor="password">
              Password
            </label>
            <input
              className={passwordInputClasses}
              type="password"
              id="password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              value={enteredPassword}
            ></input>
          </div>
          <div className={classes['form__group']}>
            <button
              className={`${classes['form__group center']} ${classes['center']}`}
            >
              Submit
            </button>
          </div>
        </form>
      )}
      <div className={classes['form__group']}>
        <button className={`${classes['forgot']} ${classes['center']}`}>
          Forgot Password?
        </button>
      </div>
    </Card>
  );
};
export default LoginForm;
