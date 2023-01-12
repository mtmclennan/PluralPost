import React from 'react';
import classes from './SettingsContainer.module.scss';

interface SettingsContainerProps {
  children: React.ReactNode;
  heading: string;
}

const SettingsContainer = ({ children, heading }: SettingsContainerProps) => {
  return (
    <div className={classes.background}>
      <div className={classes.form}>
        <div className={classes.heading}>
          <h2>{heading}</h2>
        </div>
        <div className={classes.childContainer}>{children}</div>
      </div>
    </div>
  );
};

export default SettingsContainer;
