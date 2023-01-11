import { Fragment, useContext, useEffect, useState } from 'react';
import NewWebsiteForm from '../components/forms/NewWebsiteForm';
import WebsiteList from '../components/websites/WebsiteList';
import AuthContext from '../store/auth-context';
import useHttp from '../hooks/use-http';
import Card from '../UI/Card';
import PluarlPostLogo from '../assets/images/PPlogoonly.png';

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
        <div className="welcome">
          <h2>Welcome To</h2>
          <img src={PluarlPostLogo} alt="PluarlPost" />
          <h1>PluralPost</h1>
          <p>For your Blog/Marketing site</p>
        </div>

        {AuthCtx.user.role === 'admin' && (
          <button className="btn__website" onClick={showFormHandler}>
            Add A New Website
          </button>
        )}
        {showForm && <NewWebsiteForm setShowForm={showFormHandler} />}
        {isLoading && <LoadingSpinner />}
        <Card>
          <div className="website-list__heading">
            <h3>Websites</h3>
          </div>
          {websites && <WebsiteList websites={websites} />}
        </Card>
      </div>
    </Fragment>
  );
};

export default HomePage;
