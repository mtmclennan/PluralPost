import UserSettingForm from '../components/forms/UserSettingForm';
import PasswordChangeForm from '../components/forms/PasswordChangeForm';
import Card from '../UI/Card';
import UserSettingsNav from '../components/users/UserSettingNav';

const Settings = () => {
  return (
    <Card className="main">
      <Card className="user-view">
        <UserSettingsNav />
        <Card className="user-view__content">
          <UserSettingForm />
          <PasswordChangeForm />
        </Card>
      </Card>
    </Card>
  );
};

export default Settings;
