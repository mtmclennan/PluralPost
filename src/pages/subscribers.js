import { Fragment, useEffect, useState, useContext } from 'react';

import useHttp from '../hooks/use-http';
import LoadingSpinner from '../UI/LoadingSpinner';
import AuthContext from '../store/auth-context';
import Modal from '../UI/Modal';
import { Link } from 'react-router-dom';
import useModal from '../hooks/use-modal';
import SubscriberPreview from '../components/subscribers/SubscriberPreview';

const Subscribers = () => {
  const { isLoading, error, sendRequest } = useHttp();
  const [subTotal, setSubTotal] = useState();

  const { showModal, hideModal, modalMessage } = useModal(error);
  const AuthCtx = useContext(AuthContext);

  const hideModalHandler = () => {
    hideModal();
  };

  const subTotalHandler = (total) => {
    setSubTotal(total);
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
      <div className="container">
        <div className="heading">
          <h1>Subscribers</h1>
          {AuthCtx.user.role === 'admin' && (
            <Link to="/manageSubs" className="btn">
              Create New Subscriber
            </Link>
          )}
        </div>

        <div className="preview-sub__card">
          <div className="preview-post__heading">
            <p>Recent</p>
            <div className="centered">
              <p className="preview__total">Total:</p>
              {subTotal && (
                <p className="preview__total">{subTotal.toString()}</p>
              )}
            </div>
          </div>
          {AuthCtx.website.name && (
            <SubscriberPreview
              total={subTotalHandler}
              website={AuthCtx.website.name}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Subscribers;
