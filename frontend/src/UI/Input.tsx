import classes from './Input.module.css';
import useInput from '../hooks/use-input';

type InputProps = {
  type: string;
  onReset?: Function;
  id: string;
  label: string;
};

const Input = ({ type, onReset, id, label }: InputProps) => {
  const emailValidate = (value: string) => {
    const emailFormat = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    return emailFormat.test(value);
  };

  const textValidate = (value: string) => value.trim() !== '';

  const validateFunction = type === 'email' ? emailValidate : textValidate;

  const { value, hasError, valueChangeHandler, inputBlurHandler, reset } =
    useInput(validateFunction);

  if (onReset) onReset(reset);

  const inputClasses = hasError
    ? `${classes['form__input']} ${classes.invalid}`
    : `${classes['form__input']}`;

  return (
    <div className={classes['form__group']}>
      <label className={classes['form__label']} htmlFor={id}>
        {label}
      </label>
      <input
        className={inputClasses}
        type={type ? type : 'text'}
        id={id}
        onChange={valueChangeHandler}
        onBlur={inputBlurHandler}
        value={value}
      ></input>
    </div>
  );
};

export default Input;
