import { Fragment, useState } from 'react';
import useHttp from '../../hooks/use-http';
import SlideDownMenu from '../../UI/SlideDownMenu';
import classes from './UsersItem.module.css';
import Modal from '../../UI/Modal';

const UsersItem = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const { sendRequest } = useHttp();
  const [showButtons, setShowButtons] = useState(false);
  const [userId, setUserId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [responceMessage, setResponceMessage] = useState();

  const showMenuHandler = (e) => {
    setShowMenu((current) => !current);
  };

  const mouseOutHandler = () => {
    return;
  };

  const showModalHandler = () => {
    setShowModal(false);
    setShowButtons(false);
  };

  const confirmDeleteUser = (e) => {
    e.preventDefault();
    setUserId(e.target.id);

    setShowModal(true);
    setShowButtons(true);
    setResponceMessage('Are you sure you want to DELETE This User');
  };

  const deleteUserHandler = (e) => {
    const responce = (res) => {
      console.log(res.status);
    };

    sendRequest(
      {
        url: `http://localhost:3030/api/v1/users/${userId}`,
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
            <h3>{responceMessage}</h3>
            {showButtons && (
              <div className={classes.modalMenu}>
                <button onClick={deleteUserHandler}>OK</button>
                <button onClick={showModalHandler}>Cancel</button>
              </div>
            )}
          </div>
        </Modal>
      )}
      <li
        className="user-item"
        onClick={showMenuHandler}
        onMouseLeave={mouseOutHandler}
      >
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
