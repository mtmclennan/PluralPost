import React, { useState } from 'react';
import classes from './LargeTextBox.module.css';

type LargeTextBoxProps = {
  getValue: (value: string) => string;
  fieldName: string;
};

const LargeTextBox = ({ getValue, fieldName }: LargeTextBoxProps) => {
  const [value, setValue] = useState<string>('');

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  getValue(value);

  return (
    <div className={classes.container}>
      <label className="form__label" htmlFor="text-area">
        {fieldName}
      </label>
      <textarea
        className="form__input"
        id="text-area"
        spellCheck="true"
        autoCorrect="on"
        onChange={onChangeHandler}
        rows={5}
        cols={80}
      ></textarea>
    </div>
  );
};

export default LargeTextBox;
