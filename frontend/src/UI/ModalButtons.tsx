import React from 'react';
import classes from './ModalButtons.module.scss';

type ModalButtonsProps = {
  onDelete: () => void;
  onCancel: () => void;
};

const ModalButtons = ({ onDelete, onCancel }: ModalButtonsProps) => {
  return (
    <div className={classes.modalMenu}>
      <button className={classes.cancelBtn} onClick={onCancel}>
        Cancel
      </button>
      <button onClick={onDelete}>Confirm</button>
    </div>
  );
};

export default ModalButtons;
