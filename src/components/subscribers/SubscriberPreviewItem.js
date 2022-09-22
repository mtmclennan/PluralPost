import { Fragment, useState, useEffect } from 'react';
import Modal from '../../UI/Modal';
import useModal from '../../hooks/use-modal';
import SlideDownMenu from '../../UI/SlideDownMenu';
import useHttp from '../../hooks/use-http';

const SubscriberPreviewItem = (props) => {
  const { isLoading, error, sendRequest } = useHttp();
  const [showMenu, setShowMenu] = useState(false);
  const [subscriberId, setSubscriberId] = useState();
  const {
    setModalMessage,
    showModal,
    modalMessage,
    hideModal,
    setShowModalButtons,
    showModalButtons,
  } = useModal(error);

  const SERVER_URL_DELETE = `${process.env.REACT_APP_SERVER_URL}/subscribers/${props.website}/delete/`;
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
        url: `${SERVER_URL_DELETE}${subscriberId}`,
        method: 'DELETE',
      },
      responce
    );
  };

  return (
    <Fragment>
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
      </Fragment>
      <Fragment>
        <li
          key={props.id}
          className="preview-sub__row"
          onClick={showMenuHandler}
        >
          <div>
            <div>
              <p>{props.name}</p>
              <p>{props.email}</p>
            </div>
          </div>
          <div>
            <p>Joined</p>
            <p>{props.date.split('T')[0]}</p>
          </div>
        </li>
        {showMenu && (
          <SlideDownMenu
            id={props.id}
            buttonLabel1={'delete'}
            onClick1={confirmDeleteUser}
          />
        )}
      </Fragment>
    </Fragment>
  );
};

export default SubscriberPreviewItem;
