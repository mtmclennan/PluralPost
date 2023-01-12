import React from 'react';
import ListItemContainer from '../listItemContainer/ListItemContainer';
import classes from './ListItem.module.scss';

interface ListItemProps {
  heading: string;
  text: string;
  buttonText?: string;
}

const ListItem = ({ heading, text, buttonText }: ListItemProps) => {
  return (
    <ListItemContainer>
      <div className={classes.container}>
        <div className={classes.display}>
          <span className={classes.heading}>{heading}</span>
          <span>{text}</span>
        </div>
        <button className={classes.btn}>
          {buttonText ? buttonText : 'Edit'}
        </button>
      </div>
    </ListItemContainer>
  );
};

export default ListItem;
