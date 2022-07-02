import Card from '../../UI/Card';
import { Link } from 'react-router-dom';
import classes from './UserSettingsNav.module.css';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

const UserSettingsNav = () => {
  const AuthCtx = useContext(AuthContext);

  return (
    <Card className={classes.userViewMenu}>
      <ul className={classes.sideNav}>
        <li className={classes.sideNav}>
          <p>Settings</p>
        </li>
      </ul>
      {AuthCtx.user.role === 'admin' && (
        <div className={classes.admin}>
          <h5 className={classes.adminNavHeading}>Admin</h5>
          <ul className={classes.sideNav}>
            <li className={classes.sideNav}>
              <Link to="/manageSubs">Manage Subscribers</Link>
            </li>
            <li className={classes.sideNav}>
              <Link to="/Users">Manage Users</Link>
            </li>
          </ul>
        </div>
      )}
    </Card>
  );
};

export default UserSettingsNav;
