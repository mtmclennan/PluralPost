import React from 'react';
import classes from './ListItemContainer.module.scss';

interface ListItemContainerProps {
  children: React.ReactNode;
}

const ListItemContainer = ({ children }: ListItemContainerProps) => {
  return <div className={classes.container}>{children}</div>;
};

export default ListItemContainer;
