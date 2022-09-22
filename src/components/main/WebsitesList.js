import { Fragment, useEffect, useState } from 'react';
import useHttp from '../../hooks/use-http';
import LoadingSpinner from '../../UI/LoadingSpinner';
import WebsiteListItem from '../websites/WebsiteListItem';

const WebsitesList = (props) => {
  const [websites, setWebsites] = useState();
  const { isLoading, error, sendRequest } = useHttp();
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
          websites.map((website) => (
            <WebsiteListItem
              website={website.title}
              category={website.category}
            />
          ))}
      </div>
    </Fragment>
  );
};

export default WebsitesList;
