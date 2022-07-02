import Card from '../../UI/Card';
import classes from './SignupForm.module.css';
import useHttp from '../../hooks/use-http';
import useInput from '../../hooks/use-input';
const SignupUserForm = () => {
  const { isLoading, error, sendRequest } = useHttp();

  const emailValidate = (value) => {
    const emailFormat = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    return emailFormat.test(value);
  };

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(emailValidate);

  const {
    value: enteredRole,
    isValid: entereRoleIsValid,
    hasError: roleInputHasError,
    valueChangeHandler: roleChangeHandler,
    inputBlurHandler: roleBlurHandler,
    reset: resetRoleInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredConfirmPassword,
    isValid: enteredConfirmPasswordIsValid,
    hasError: confirmPasswordInputHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPasswordInput,
  } = useInput((value) => value.trim() !== '');

  const response = (res) => {
    console.log(res.status);
  };

  const signupFormSubmitHandler = (e) => {
    e.preventDefault();

    if (
      !enteredNameIsValid ||
      !enteredEmailIsValid ||
      !entereRoleIsValid ||
      !enteredPasswordIsValid ||
      !enteredConfirmPasswordIsValid
    ) {
      return;
    }

    sendRequest(
      {
        url: 'http://localhost:3030/api/v1/users/signup',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          name: enteredName,
          email: enteredEmail,
          role: enteredRole,
          password: enteredPassword,
          passwordConfirm: enteredConfirmPassword,
          passwordChangedAt: Date.now(),
        },
      },
      response
    );

    resetNameInput();
    resetEmailInput();
    resetRoleInput();
    resetPasswordInput();
    resetConfirmPasswordInput();
  };

  const emailInputClasses = emailInputHasError
    ? `${classes['form__input']} ${classes.invalid}`
    : `${classes['form__input']}`;

  const nameInputClasses = nameInputHasError
    ? `${classes['form__input']} ${classes.invalid}`
    : `${classes['form__input']}`;

  const roleInputClasses = roleInputHasError
    ? `${classes['form__input']} ${classes.invalid}`
    : `${classes['form__input']}`;
  const passwordInputClasses = passwordInputHasError
    ? `${classes['form__input']} ${classes.invalid}`
    : `${classes['form__input']}`;

  const confirmPasswordInputClasses = confirmPasswordInputHasError
    ? `${classes['form__input']} ${classes.invalid}`
    : `${classes['form__input']}`;

  return (
    <Card className={classes.formContainer}>
      <form
        onSubmit={signupFormSubmitHandler}
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
          <label className={classes['form__label']} htmlFor="role">
            Role
          </label>
          <input
            className={roleInputClasses}
            type="text"
            id="role"
            onChange={roleChangeHandler}
            onBlur={roleBlurHandler}
            value={enteredRole}
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
          <label className={classes['form__label']} htmlFor="confirm-password">
            Role
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
        <div className={classes['form__group']}>
          <button
            className={`${classes['form__group center']} ${classes['center']}`}
          >
            Create Account
          </button>
        </div>
      </form>
    </Card>
  );
};

export default SignupUserForm;
