import { Fragment, useState } from 'react';
import useHttp from '../../hooks/use-http';
import Modal from '../../UI/Modal';
import useModal from '../../hooks/use-modal';
import SlideDownMenu from '../../UI/SlideDownMenu';

const SubsciberItem = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const { sendRequest, error } = useHttp();
  const [subscriberId, setSubscriberId] = useState();
  const {
    setModalMessage,
    showModal,
    modalMessage,
    hideModal,
    setShowModalButtons,
    showModalButtons,
  } = useModal(error);
  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/subscribers/`;

  const showModalHandler = () => {
    hideModal();
  };

  const showMenuHandler = (e) => {
    setShowMenu((current) => !current);
  };

  const confirmDeleteUser = (e) => {
    e.preventDefault();
    setSubscriberId(e.target.id);

    setShowModalButtons(true);
    setModalMessage('Are you sure you want to DELETE This Subscriber');
  };

  const deleteHandler = (e) => {
    const responce = (res) => {
      if (res.status === 'success') {
        setShowModalButtons(false);
        setModalMessage(`Subscriber Deleted Successfuly`);

        setTimeout(() => {
          hideModal();
          props.reload((currentState) => !currentState);
        }, 1000);
      }
    };

    sendRequest(
      {
        url: `${SERVER_URL}${subscriberId}`,
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
              <div className="model-menu">
                <button onClick={deleteHandler}>OK</button>
                <button onClick={showModalHandler}>Cancel</button>
              </div>
            )}
          </div>
        </Modal>
      )}
      <li className="sub-item" onClick={showMenuHandler}>
        <p>{props.name}</p>
        <p>{props.email}</p>
        <p>{props.website}</p>
        <p>{props.dateJoined}</p>
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
export default SubsciberItem;
