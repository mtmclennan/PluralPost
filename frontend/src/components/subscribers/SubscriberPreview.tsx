import { Fragment, useEffect, useState } from 'react';
import useHttp from '../../hooks/use-http';
import { SubscriberData } from '../../types/interfaces';
import LoadingSpinner from '../../UI/LoadingSpinner';
import SubscriberPreviewItem from './SubscriberPreviewItem';

type SubscriberPreviewProps = {
  total: (x: number) => void;
  website: string;
};

const SubscriberPreview = ({ total, website }: SubscriberPreviewProps) => {
  const { isLoading, sendRequest } = useHttp();
  const [reload, setReload] = useState(false);
  const [allSubs, setAllSubs] = useState<SubscriberData>();

  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/subscribers/${website}/subscribers`;

  useEffect(() => {
    sendRequest({ url: SERVER_URL }, (data) => {
      setAllSubs(data);
    });
  }, [sendRequest, SERVER_URL, reload]);

  useEffect(() => {
    if (allSubs) {
      total(allSubs.data.length);
    }
  }, [allSubs, total, reload]);

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {allSubs &&
        allSubs.data
          .slice(0, 20)
          .map((sub) => (
            <SubscriberPreviewItem
              website={website}
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
