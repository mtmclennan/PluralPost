import { Fragment, useEffect, useState } from 'react';
import SubscriberList from '../components/subscribers/SubscriberList';
import useHttp from '../hooks/use-http';

const Subscribers = () => {
  const { isLoading, sendRequest } = useHttp();
  const [subscribers, setSubcribers] = useState();

  useEffect(() => {
    sendRequest({ url: 'http://localhost:3030/api/v1/subscribers' }, (data) => {
      setSubcribers(data);
    });
  }, [sendRequest]);

  console.log(subscribers);
  return (
    <Fragment>
      <h1 className="centered">Subscribers</h1>
      {subscribers && <SubscriberList subscribers={subscribers} />}
    </Fragment>
  );
};

export default Subscribers;
