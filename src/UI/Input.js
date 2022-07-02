import classes from './Input.module.css';
import useInput from '../hooks/use-input';

const Input = (props) => {
  const emailValidate = (value) => {
    const emailFormat = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    return emailFormat.test(value);
  };

  const textValidate = (value) => value.trim() !== '';

  const validateFunction =
    props.type === 'email' ? emailValidate : textValidate;

  const {
    value,
    isValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  } = useInput(validateFunction);

  if (props.onReset) props.onReset(reset);

  const inputClasses = hasError
    ? `${classes['form__input']} ${classes.invalid}`
    : `${classes['form__input']}`;

  return (
    <div className={classes['form__group']}>
      <label className={classes['form__label']} htmlFor={props.id}>
        {props.label}
      </label>
      <input
        className={inputClasses}
        type={props.type ? props.type : 'text'}
        id={props.id}
        onChange={valueChangeHandler}
        onBlur={inputBlurHandler}
        value={value}
      ></input>
    </div>
  );
};

export default Input;
