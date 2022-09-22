import { Fragment, useContext, useEffect, useState } from 'react';
import NewWebsiteForm from '../components/forms/NewWebsiteForm';
import WebsiteList from '../components/websites/WebsiteList';
import AuthContext from '../store/auth-context';
import useHttp from '../hooks/use-http';
import Card from '../UI/Card';

import LoadingSpinner from '../UI/LoadingSpinner';

const HomePage = () => {
  const AuthCtx = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);

  const [websites, setWebsites] = useState();
  const { isLoading, sendRequest } = useHttp();

  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/websites`;

  useEffect(() => {
    AuthCtx.onWebsiteReset();
  }, []);

  useEffect(() => {
    sendRequest({ url: SERVER_URL }, (data) => {
      setWebsites(data);
    });
  }, [sendRequest, SERVER_URL, showForm]);

  const showFormHandler = () => {
    setShowForm((current) => !current);
  };

  return (
    <Fragment>
      <div className="container">
        <div className="centered-vertical">
          <h1>Welcome to CSMS</h1>
          <h3>The complete Site Management System</h3>
          <p>For your Blog/Marketing site</p>

          {AuthCtx.user.role === 'admin' && (
            <button onClick={showFormHandler}>Add A New Website</button>
          )}
        </div>
        {showForm && <NewWebsiteForm showForm={showFormHandler} />}
        {isLoading && <LoadingSpinner />}
        <Card>
          <div className="website-list__heading">
            <p>Websites</p>
          </div>
          {websites && <WebsiteList websites={websites} />}
        </Card>
      </div>
    </Fragment>
  );
};

export default HomePage;
