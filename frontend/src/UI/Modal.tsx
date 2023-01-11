import ReactDOM from 'react-dom';
import { Fragment } from 'react';
import classes from './Modal.module.css';

type ModalProps = {
  onClose?: () => void;
  className?: string;
  children?: JSX.Element;
};

const Backdrop = ({ onClose }: ModalProps) => {
  return <div className={classes.backdrop} onClick={onClose} />;
};

const ModalOverlay = ({ className, children }: ModalProps) => {
  return (
    <div className={className || classes.Modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays')! as HTMLDivElement;

const Modal = ({ onClose, className, children }: ModalProps) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay className={className}>{children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
