type SmallTextBoxProps = {
  className: string;
  fieldName: string;
};

const SmallTextBox = ({ className, fieldName }: SmallTextBoxProps) => {
  return (
    <div className={className}>
      <label className="form__label" htmlFor={fieldName}>
        {fieldName}
      </label>
      <input className="form__input" id={fieldName}></input>
    </div>
  );
};

export default SmallTextBox;
