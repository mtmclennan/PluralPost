import classes from './MainHeader.module.css';
import { NavLink } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import AuthContext from '../store/auth-context';

const MainHeader = () => {
  const AuthCtx = useContext(AuthContext);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <h1>SUBLIST</h1>
      </div>
      {AuthCtx.isLoggedIn && (
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink to="/welcome">Home</NavLink>
            </li>
            <li>
              <NavLink to="/subscribers">All Subscribers</NavLink>
            </li>
            <li>
              <NavLink to="/settings">Settings</NavLink>
            </li>
            {AuthCtx.user.role === 'admin' && (
              <li>
                <NavLink to="/users">Users</NavLink>
              </li>
            )}
          </ul>
        </nav>
      )}
      {AuthCtx.isLoggedIn && (
        <Fragment>
          <button onClick={AuthCtx.onLogout} className={classes.logout}>
            Logout
          </button>
          <h3>{AuthCtx.user.name}</h3>
        </Fragment>
      )}
    </header>
  );
};

export default MainHeader;
