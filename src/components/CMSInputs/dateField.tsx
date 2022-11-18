type DateFieldProps = {
  fieldName: string;
};

const DateField = ({ fieldName }: DateFieldProps) => {
  return (
    <div>
      <label className="form__label" htmlFor={fieldName}>
        {fieldName}
      </label>
      <input className="form__input" type="date" id={fieldName}></input>
    </div>
  );
};

export default DateField;
