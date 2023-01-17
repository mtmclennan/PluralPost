import React, { Fragment, useContext, useState } from 'react';
import SettingFormEmail from '../components/forms/settingsForms/SettingsFormEmail';
import SettingFormName from '../components/forms/settingsForms/SettingFormName';
import UserPhotoSetting from '../components/users/userPhotoSetting/UserPhotoSetting';
import SettingsContainer from '../layout/main/SettingsContainer';
import AuthContext from '../store/auth-context';
import ListItem from '../UI/listItem/ListItem';
import SettingFormPassword from '../components/forms/settingsForms/SettingFormPassword';

const SettingsUser = () => {
  const AuthCtx = useContext(AuthContext);
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  return (
    <Fragment>
      <SettingsContainer heading="User Settings">
        <UserPhotoSetting />
        <ListItem
          heading="Display Name"
          text={AuthCtx.user.name}
          form={<SettingFormName setEdit={setEditName} />}
          edit={editName}
          setEdit={setEditName}
        />
        <ListItem
          heading="Email"
          text={AuthCtx.user.email}
          form={<SettingFormEmail setEdit={setEditEmail} />}
          edit={editEmail}
          setEdit={setEditEmail}
        />
        <ListItem
          heading="Password"
          text="***********"
          buttonText="Change"
          form={<SettingFormPassword setEdit={setEditPassword} />}
          edit={editPassword}
          setEdit={setEditPassword}
        />
      </SettingsContainer>
    </Fragment>
  );
};

export default SettingsUser;
