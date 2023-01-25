import React, { useEffect, useState } from 'react';
import { SetStateBoolean } from '../types/index.type';
import classes from './SliderButton.module.scss';

const SilderButton = ({
  setIsChecked,
  isChecked,
}: {
  setIsChecked: SetStateBoolean;
  isChecked: boolean;
}) => {
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    console.log(checked);
    setIsChecked(checked);
  };

  const sliderClasses = isChecked
    ? `${classes.checked} ${classes.slider}`
    : `${classes.unChecked} ${classes.slider}`;

  console.log(checked);
  return (
    <div className={sliderClasses}>
      <label htmlFor="switch">Toggle</label>
      <input
        type="checkbox"
        id="switch"
        checked={checked}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default SilderButton;
