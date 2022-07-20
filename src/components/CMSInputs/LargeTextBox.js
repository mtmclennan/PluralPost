import { useState } from 'react';
import classes from './LargeTextBox.module.css';

const LargeTextBox = (props) => {
  const [value, setValue] = useState();

  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };

  props.getValue(value);

  return (
    <div className={classes.container}>
      <label className="form__label" htmlFor="text-area">
        {props.fieldName}
      </label>
      <textarea
        className="form__input"
        id="text-area"
        spellCheck="true"
        autoCorrect="on"
        onChange={onChangeHandler}
        rows="5"
        cols="80"
      ></textarea>
    </div>
  );
};

export default LargeTextBox;
