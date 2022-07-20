import { Fragment } from 'react';

const DateField = (props) => {
  return (
    <div>
      <label className="form__label" htmlFor={props.fieldName}>
        {props.fieldName}
      </label>
      <input className="form__input" type="date" id={props.fieldName}></input>
    </div>
  );
};

export default DateField;
