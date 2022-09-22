import { Fragment, useContext } from 'react';
import NewWebsiteForm from '../components/forms/NewWebsiteForm';
import AuthContext from '../store/auth-context';

const SiteSettings = () => {
  const AuthCtx = useContext(AuthContext);

  return (
    <Fragment>
      <div className="title">
        {AuthCtx.website.logo && (
          <img className="logo" src={AuthCtx.website.logo} alt="logo" />
        )}
        <h1>{AuthCtx.website.name}</h1>
      </div>
      <div>
        <NewWebsiteForm website={AuthCtx.website} />
      </div>
    </Fragment>
  );
};

export default SiteSettings;
