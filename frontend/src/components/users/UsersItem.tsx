import { Fragment, useState } from 'react';
import useHttp from '../../hooks/use-http';
import SlideDownMenu from '../../UI/SlideDownMenu';
import classes from './UsersItem.module.css';
import Modal from '../../UI/Modal';
import useModal from '../../hooks/use-modal';
import { ButtonOnClick, SetStateBoolean } from '../../types/index.type';
import { Res } from '../../types/interfaces';

type UsersItemProps = {
  reload: SetStateBoolean;
  id: string;
  name: string;
  email: string;
  role: string;
};

const UsersItem = ({ reload, id, name, email, role }: UsersItemProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const { sendRequest, error } = useHttp();
  const [userId, setUserId] = useState('');

  const {
    setModalMessage,
    showModal,
    modalMessage,
    hideModal,
    setShowModalButtons,
    showModalButtons,
  } = useModal(error);

  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/users/`;

  const showMenuHandler = () => {
    setShowMenu((current) => !current);
  };

  const showModalHandler = () => {
    hideModal();
  };

  const confirmDeleteUser = (event: ButtonOnClick) => {
    setUserId(event.currentTarget.id);

    setShowModalButtons(true);
    setModalMessage('Are you sure you want to DELETE This User');
  };

  const deleteUserHandler = () => {
    const responce = (res: Res) => {
      if (res.status === 'success') {
        setShowModalButtons(false);
        setModalMessage(`User Deleted Successfuly`);

        setTimeout(() => {
          hideModal();
          reload((currentState) => !currentState);
        }, 1000);
      }
    };

    sendRequest(
      {
        url: `${SERVER_URL}${userId}`,
        method: 'DELETE',
      },
      responce
    );
  };

  return (
    <Fragment>
      {showModal && (
        <Modal onClose={showModalHandler}>
          <div className="modal">
            <h3>{modalMessage}</h3>
            {showModalButtons && (
              <div className={classes.modalMenu}>
                <button onClick={deleteUserHandler}>OK</button>
                <button onClick={showModalHandler}>Cancel</button>
              </div>
            )}
          </div>
        </Modal>
      )}
      <li className="user-item" onClick={showMenuHandler}>
        <p>{name}</p>
        <p>{email}</p>
        <p>{role}</p>
      </li>
      {showMenu && (
        <SlideDownMenu
          id={id}
          buttonLabel1={'delete'}
          onClick1={confirmDeleteUser}
        />
      )}
    </Fragment>
  );
};
export default UsersItem;
