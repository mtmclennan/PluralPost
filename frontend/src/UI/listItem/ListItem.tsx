import React, { useState } from 'react';
import { SetStateBoolean } from '../../types/index.type';
import ListItemContainer from '../listItemContainer/ListItemContainer';
import classes from './ListItem.module.scss';

interface ListItemProps {
  heading: string;
  text: string;
  buttonText?: string;
  setEdit?: SetStateBoolean;
  edit?: boolean;
  form?: React.ReactNode;
}

const ListItem = ({
  heading,
  text,
  buttonText,
  form,
  edit,
  setEdit,
}: ListItemProps) => {
  const onClickHandler = () => {
    if (setEdit) setEdit(true);
  };

  return (
    <ListItemContainer>
      <div className={classes.container}>
        <div className={classes.display}>
          <span className={classes.heading}>{heading}</span>
          <span className={classes.text}>{text}</span>
        </div>
        {setEdit && !edit && (
          <button onClick={onClickHandler} className={classes.btn}>
            {buttonText ? buttonText : 'Edit'}
          </button>
        )}
      </div>
      {edit && form}
    </ListItemContainer>
  );
};

export default ListItem;
