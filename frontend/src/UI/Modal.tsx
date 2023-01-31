import ReactDOM from 'react-dom';
import { Fragment } from 'react';
import classes from './Modal.module.scss';
import { X } from 'phosphor-react';

type ModalProps = {
  onClose?: () => void;
  className?: string;
  children?: JSX.Element;
};

const Backdrop = ({ onClose }: ModalProps) => {
  return <div className={classes.backdrop} onClick={onClose} />;
};

const ModalOverlay = ({ className, children, onClose }: ModalProps) => {
  return (
    <div className={className ? className : classes.modal}>
      <span onClick={onClose} className={classes.close}>
        <X size={32} />
      </span>
      {children}
    </div>
  );
};

const portalElement = document.getElementById('overlays')! as HTMLDivElement;

const Modal = ({ onClose, className, children }: ModalProps) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={onClose} className={className}>
          {children}
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
