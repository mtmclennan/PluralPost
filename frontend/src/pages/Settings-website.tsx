import React, { Fragment, useContext, useState } from 'react';
import NewWebsiteForm from '../components/forms/NewWebsiteForm';
import SettingsContainer from '../layout/main/SettingsContainer';
import AuthContext from '../store/auth-context';
import WebsitePhoto from '../components/websites/WebsitePhoto';
import ListItem from '../UI/listItem/ListItem';

const SettingsUser = () => {
  const AuthCtx = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);

  const showFormHandler = () => {
    setShowForm((currentState) => !currentState);
  };

  return (
    <Fragment>
      <SettingsContainer heading="Site Settings">
        <WebsitePhoto
          photo={AuthCtx.website.logo}
          name={AuthCtx.website.name}
        />
        <ListItem heading="Name" text={AuthCtx.website.name} />
        <ListItem heading="Logo Url" text={AuthCtx.website.logo} />
        <ListItem heading="Site Url" text={AuthCtx.website.url} />
        <ListItem heading="Category" text={AuthCtx.website.category} />

        {showForm && (
          <NewWebsiteForm
            website={AuthCtx.website}
            setShowForm={showFormHandler}
          />
        )}
        {!showForm && <button onClick={showFormHandler}>Edit</button>}
      </SettingsContainer>
    </Fragment>
  );
};

export default SettingsUser;
