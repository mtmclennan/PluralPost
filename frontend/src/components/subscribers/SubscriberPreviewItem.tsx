import { Fragment, useState } from 'react';
import Modal from '../../UI/Modal';
import useModal from '../../hooks/use-modal';
import SlideDownMenu from '../../UI/SlideDownMenu';
import useHttp from '../../hooks/use-http';
import { Res } from '../../types/interfaces';
import { ButtonOnClick, SetStateBoolean } from '../../types/index.type';
import ModalButtons from '../../UI/ModalButtons';

type SubscriberPreviewItemProps = {
  website: string;
  reload: SetStateBoolean;
  id: string;
  name: string;
  email: string;
  date: string;
};

const SubscriberPreviewItem = ({
  website,
  reload,
  id,
  name,
  email,
  date,
}: SubscriberPreviewItemProps) => {
  const { error, sendRequest } = useHttp();
  const [showMenu, setShowMenu] = useState(false);
  const [subscriberId, setSubscriberId] = useState('');
  const {
    setModalMessage,
    showModal,
    modalMessage,
    hideModal,
    setShowModalButtons,
    showModalButtons,
  } = useModal(error);

  const SERVER_URL_DELETE = `${process.env.REACT_APP_SERVER_URL}/subscribers/${website}/delete/`;
  const showModalHandler = () => {
    hideModal();
  };
  const showMenuHandler = () => {
    setShowMenu((current) => !current);
  };

  const confirmDeleteUser = (event: ButtonOnClick) => {
    event.preventDefault();

    setSubscriberId(event.currentTarget.id!);

    setShowModalButtons(true);
    setModalMessage('Are you sure you want to DELETE This Subscriber');
  };

  const deleteHandler = () => {
    const responce = (res: Res) => {
      if (res.status === 'success') {
        setShowModalButtons(false);
        setModalMessage(`Subscriber Deleted Successfuly`);

        setTimeout(() => {
          hideModal();
          reload((currentState: boolean) => !currentState);
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
            <Fragment>
              <h3>Delete Subscriber?</h3>
              <p>{modalMessage}</p>
              {showModalButtons && (
                <ModalButtons
                  onCancel={showModalHandler}
                  onDelete={deleteHandler}
                />
              )}
            </Fragment>
          </Modal>
        )}
      </Fragment>
      <Fragment>
        <li key={id} className="preview-sub__row" onClick={showMenuHandler}>
          <div>
            <div>
              <p>{name}</p>
              <p>{email}</p>
            </div>
          </div>
          <div>
            <p>Joined</p>
            <p>{date.split('T')[0]}</p>
          </div>
        </li>
        {showMenu && (
          <SlideDownMenu
            id={id}
            buttonLabel1={'delete'}
            onClick1={confirmDeleteUser}
          />
        )}
      </Fragment>
    </Fragment>
  );
};

export default SubscriberPreviewItem;
