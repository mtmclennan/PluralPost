import useInput from '../../hooks/use-input';

const SmallTextBox = (props) => {
  return (
    <div className={props.className}>
      <label className="form__label" htmlFor={props.fieldName}>
        {props.fieldName}
      </label>
      <input className="form__input" id={props.fieldName}></input>
    </div>
  );
};

export default SmallTextBox;
