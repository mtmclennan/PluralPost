import { Fragment, useContext } from 'react';
import useModal from '../../hooks/use-modal';
import Modal from '../../UI/Modal';
import { useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/use-http';

import AuthContext from '../../store/auth-context';
import LoadingSpinner from '../../UI/LoadingSpinner';
import WebsiteListItem from './WebsiteListItem';
import { WebsiteData, Website } from '../../types/interfaces';
import { LiOnClick } from '../../types/index.type';

const WebsiteList = ({ websites }: WebsiteData) => {
  const AuthCtx = useContext(AuthContext);
  const { isLoading, error, sendRequest } = useHttp();
  const navigate = useNavigate();
  const { showModal, hideModal, modalMessage } = useModal(error);

  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/websites`;

  const hideModalHandler = () => {
    hideModal();
  };

  const websiteSelectHandler = (event: LiOnClick) => {
    sendRequest(
      {
        url: `${SERVER_URL}/${event.currentTarget.id}`,
      },
      ({ data }) => {
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
        {websites &&
          websites.data.map((website: Website) => (
            <WebsiteListItem
              key={website._id}
              id={website._id}
              onClick={websiteSelectHandler}
              name={website.name}
              category={website.category}
              url={website.url}
              logo={website.logo}
            />
          ))}
      </ul>
    </Fragment>
  );
};

export default WebsiteList;
