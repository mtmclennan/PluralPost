import React, { Fragment, useContext } from 'react';
import AuthContext from '../../../store/auth-context';
import { UserRes } from '../../../types/index.type';
import SmallPhotoInput from '../../inputs/SmallPhotoInput';
import UserPhoto from '../userPhoto/UserPhoto';
import classes from './UserPhotoSetting.module.scss';
import Modal from '../../../UI/Modal';
import useModal from '../../../hooks/use-modal';

const UserPhotoSetting = () => {
  const AuthCtx = useContext(AuthContext);
  const { setModalMessage, showModal, modalMessage, hideModal } = useModal();
  const photoUrl = `${process.env.REACT_APP_SERVER}img/users/${AuthCtx.user.photo}`;

  const photoResponseHandler = (res: UserRes) => {
    if (res.status === 'success') {
      AuthCtx.onLogin(res.user);
      setModalMessage('Updated sucessfully!');
      setTimeout(() => {
        hideModal();
      }, 1000);
    } else {
      setTimeout(() => {
        hideModal();
      }, 3000);
      setModalMessage('Something went wrong!');
    }
  };

  const showModalHandler = () => {
    hideModal();
  };

  return (
    <Fragment>
      {showModal && (
        <Modal onClose={showModalHandler}>
          <div className="modal">
            <h3>{modalMessage}</h3>
          </div>
        </Modal>
      )}
      <div className={classes.container}>
        <div className={classes.photo}>
          <UserPhoto photo={photoUrl} />
        </div>
        <div className={classes.name}>
          <h2>{AuthCtx.user.name}</h2>
          <SmallPhotoInput
            className={classes.btn}
            response={photoResponseHandler}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UserPhotoSetting;
