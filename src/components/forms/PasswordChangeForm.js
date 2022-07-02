import Card from '../../UI/Card';
import classes from './PasswordChangeForm.module.css';
import useInput from '../../hooks/use-input';
import useHttp from '../../hooks/use-http';

const PasswordChangeForm = (props) => {
  const { isLoading, error, sendRequest } = useHttp();

  const passwordvalidate = (value) => {
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

  const responce = (res) => {
    console.log(res.status);
    //modal popup 'Success'
  };

  const changePasswordFormSubmitHandler = (e) => {
    e.preventDefault();

    if (enteredNewPassword !== enteredConfirmPassword) {
      //error model popup warning
      console.log('passwords dont match');
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
        url: 'http://localhost:3030/api/v1/users/updateMyPassword',
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
    <Card className={classes.formContainer}>
      <form onSubmit={changePasswordFormSubmitHandler}>
        <div className={classes['form__group']}>
          <label className={classes['form__label']} htmlFor="current-password">
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
          <label className={classes['form__label']} htmlFor="confirm-password">
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
        <button>Submit</button>
      </form>
    </Card>
  );
};

export default PasswordChangeForm;
