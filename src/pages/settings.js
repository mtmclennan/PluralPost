import UserSettingForm from '../components/forms/UserSettingForm';
import PasswordChangeForm from '../components/forms/PasswordChangeForm';

const Settings = () => {
  return (
    <div className="user-view">
      <UserSettingForm />
      <PasswordChangeForm />
    </div>
  );
};

export default Settings;
