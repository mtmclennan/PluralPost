import { Fragment } from 'react';
import SettingsContainer from '../layout/main/SettingsContainer';
import ListItemContainer from '../UI/listItemContainer/ListItemContainer';

const Settings = () => {
  return (
    <Fragment>
      <SettingsContainer heading="General">
        <ListItemContainer>
          <p>Dark mode coming soon</p>
        </ListItemContainer>
        <ListItemContainer>
          <p>Other general settings coming soon</p>
        </ListItemContainer>
      </SettingsContainer>
    </Fragment>
  );
};

export default Settings;
