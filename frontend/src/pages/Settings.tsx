import { Fragment } from 'react';
import SettingsContainer from '../layout/main/SettingsContainer';
import ListItemContainer from '../UI/listItemContainer/ListItemContainer';

const Settings = () => {
  return (
    <Fragment>
      <SettingsContainer heading="General">
        <ListItemContainer>
          <p>Settings</p>
        </ListItemContainer>
        <ListItemContainer>
          <p>Settings</p>
        </ListItemContainer>
      </SettingsContainer>
    </Fragment>
  );
};

export default Settings;
