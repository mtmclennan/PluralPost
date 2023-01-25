import { Fragment, useEffect, useState } from 'react';
import useHttp from '../../hooks/use-http';
import { Website } from '../../types/interfaces';
import LoadingSpinner from '../../UI/LoadingSpinner';
import WebsiteListItem from './WebsiteListItem';

const WebsitesList = () => {
  const [websites, setWebsites] = useState([]);
  const { isLoading, sendRequest } = useHttp();
  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/websites`;

  useEffect(() => {
    sendRequest({ url: SERVER_URL }, (data) => {
      setWebsites(data);
    });
  }, [setWebsites, SERVER_URL, sendRequest]);

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      <div>
        {websites &&
          websites.map((website: Website) => (
            <WebsiteListItem name={website.name} category={website.category} />
          ))}
      </div>
    </Fragment>
  );
};

export default WebsitesList;
