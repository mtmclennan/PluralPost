import { Fragment, useState } from 'react';
import useHttp from '../../hooks/use-http';
import SlideDownMenu from '../../UI/SlideDownMenu';
import classes from './UsersItem.module.css';
import Modal from '../../UI/Modal';
import useModal from '../../hooks/use-modal';

const UsersItem = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const { sendRequest, error } = useHttp();
  const [userId, setUserId] = useState();

  const {
    setModalMessage,
    showModal,
    modalMessage,
    hideModal,
    setShowModalButtons,
    showModalButtons,
  } = useModal(error);

  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/users/`;

  const showMenuHandler = (e) => {
    setShowMenu((current) => !current);
  };

  const showModalHandler = () => {
    hideModal();
  };

  const confirmDeleteUser = (e) => {
    e.preventDefault();
    setUserId(e.target.id);

    setShowModalButtons(true);
    setModalMessage('Are you sure you want to DELETE This User');
  };

  const deleteUserHandler = (e) => {
    const responce = (res) => {
      if (res.status === 'success') {
        setShowModalButtons(false);
        setModalMessage(`User Deleted Successfuly`);

        setTimeout(() => {
          hideModal();
          props.reload((currentState) => !currentState);
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

  console.log('render');

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
        <p>{props.name}</p>
        <p>{props.email}</p>
        <p>{props.role}</p>
      </li>
      {showMenu && (
        <SlideDownMenu
          id={props.id}
          buttonLabel1={'delete'}
          onClick1={confirmDeleteUser}
        />
      )}
    </Fragment>
  );
};
export default UsersItem;
