import React, { Fragment, useContext } from 'react';
import UserPhoto from '../components/users/userPhoto/UserPhoto';
import UserPhotoSetting from '../components/users/userPhotoSetting/UserPhotoSetting';
import SettingsContainer from '../layout/main/SettingsContainer';
import AuthContext from '../store/auth-context';
import ListItem from '../UI/listItem/ListItem';
import ListItemContainer from '../UI/listItemContainer/ListItemContainer';

const SettingsUser = () => {
  const AuthCtx = useContext(AuthContext);

  return (
    <Fragment>
      <SettingsContainer heading="User Settings">
        <UserPhotoSetting name={AuthCtx.user.name} />
        <ListItem heading="Display Name" text={AuthCtx.user.name} />
        <ListItem heading="Email" text={AuthCtx.user.email} />
        <ListItem heading="Password" text="***********" buttonText="Change" />
      </SettingsContainer>
    </Fragment>
  );
};

export default SettingsUser;
