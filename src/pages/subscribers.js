import { Fragment, useEffect, useState, useContext } from 'react';
import SubscriberList from '../components/subscribers/SubscriberList';
import useHttp from '../hooks/use-http';
import LoadingSpinner from '../UI/LoadingSpinner';
import AuthContext from '../store/auth-context';
import Modal from '../UI/Modal';
import { Link } from 'react-router-dom';
import useModal from '../hooks/use-modal';

const Subscribers = () => {
  const { isLoading, error, sendRequest } = useHttp();
  const [subscribers, setSubcribers] = useState();
  const [reload, setReload] = useState(false);
  const { showModal, hideModal, modalMessage } = useModal(error);
  const AuthCtx = useContext(AuthContext);
  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/subscribers`;

  useEffect(() => {
    sendRequest({ url: SERVER_URL }, (data) => {
      setSubcribers(data);
    });
  }, [sendRequest, SERVER_URL, reload]);

  const hideModalHandler = () => {
    hideModal();
  };

  return (
    <Fragment>
      {showModal && (
        <Modal onClose={hideModalHandler}>
          <div className="modal">
            <h3>{modalMessage}</h3>
          </div>
        </Modal>
      )}
      {isLoading && <LoadingSpinner />}
      <div className="heading">
        <h1>Subscribers</h1>
        {AuthCtx.user.role === 'admin' && (
          <Link to="/manageSubs" className="btn">
            Create New Subscriber
          </Link>
        )}
      </div>

      {subscribers && (
        <SubscriberList subscribers={subscribers} reload={setReload} />
      )}
    </Fragment>
  );
};

export default Subscribers;
