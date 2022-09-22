import { Fragment, useEffect, useState } from 'react';
import useHttp from '../../hooks/use-http';
import LoadingSpinner from '../../UI/LoadingSpinner';
import SubscriberPreviewItem from './SubscriberPreviewItem';

const SubscriberPreview = (props) => {
  const { isLoading, error, sendRequest } = useHttp();
  const [reload, setReload] = useState(false);
  const [allSubs, setAllSubs] = useState();

  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/subscribers/${props.website}/subscribers`;

  useEffect(() => {
    sendRequest({ url: SERVER_URL }, (data) => {
      setAllSubs(data);
    });
  }, [sendRequest, SERVER_URL, reload]);

  useEffect(() => {
    if (allSubs) {
      props.total(allSubs.data.length);
    }
  }, [allSubs, props.total, reload]);

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {allSubs &&
        allSubs.data
          .slice(0, 20)
          .map((sub) => (
            <SubscriberPreviewItem
              website={props.website}
              key={sub._id}
              id={sub._id}
              name={sub.name}
              email={sub.email}
              date={sub.createdAt}
              reload={setReload}
            />
          ))}
    </Fragment>
  );
};

export default SubscriberPreview;
