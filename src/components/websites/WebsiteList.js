import { Fragment, useContext } from 'react';
import useModal from '../../hooks/use-modal';
import Modal from '../../UI/Modal';
import { useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import Card from '../../UI/Card';

import AuthContext from '../../store/auth-context';
import LoadingSpinner from '../../UI/LoadingSpinner';
import WebsiteListItem from './WebsiteListItem';

const WebsiteList = (props) => {
  const AuthCtx = useContext(AuthContext);
  const { isLoading, error, sendRequest } = useHttp();
  const navigate = useNavigate();
  const { showModal, hideModal, modalMessage } = useModal(error);

  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/websites`;

  const hideModalHandler = () => {
    hideModal();
  };

  const websiteSelectHandler = (e) => {
    sendRequest(
      {
        url: `${SERVER_URL}/${e.currentTarget.id}`,
      },
      (data) => {
        AuthCtx.onWebsiteSelect(data);
      }
    );

    navigate('/start');
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
      <ul>
        {isLoading && <LoadingSpinner />}
        {props.websites &&
          props.websites.data.map((item) => (
            <WebsiteListItem
              key={item._id}
              id={item._id}
              onClick={websiteSelectHandler}
              website={item.name}
              category={item.category}
              url={item.url}
              logo={item.logo}
            />
          ))}
      </ul>
    </Fragment>
  );
};

export default WebsiteList;
