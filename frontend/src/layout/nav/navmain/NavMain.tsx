import React, { Fragment, useContext } from 'react';
import classes from './Navmain.module.scss';
import { House, Gear, UsersThree } from 'phosphor-react';
import { NavLink, useLocation } from 'react-router-dom';
import NavItem from '../navItem/NavItem';
import AuthContext from '../../../store/auth-context';
import NavWebsiteEdit from './NavWebsiteEdit';
import Back from '../Back';

const NavMain = () => {
  const location = useLocation();
  const AuthCtx = useContext(AuthContext);
  const iconColor = '#8626fa';

  return (
    <Fragment>
      {' '}
      {AuthCtx.isLoggedIn && (
        <nav className={classes.nav}>
          <ul>
            {location.pathname !== '/welcome' ? <Back /> : ''}

            <NavItem
              to="/welcome"
              text="Home"
              icon={<House size={20} color={iconColor} weight="duotone" />}
            />
            {AuthCtx.website.name && <NavWebsiteEdit />}

            <NavItem
              icon={<Gear size={20} color={iconColor} weight="duotone" />}
              text="Settings"
              to="/settings-user"
            />
            {AuthCtx.user.role === 'admin' && (
              <NavItem
                icon={
                  <UsersThree size={20} color={iconColor} weight="duotone" />
                }
                to="/users"
                text="Users"
              />
            )}
          </ul>
        </nav>
      )}
      {AuthCtx.isLoggedIn && (
        <Fragment>
          <div className={classes.user}>
            <p className={classes.welcome}>Welcome</p>
            <p className={classes.username}>{AuthCtx.user.name}</p>
            <button onClick={AuthCtx.onLogout} className={classes.btn}>
              Logout
            </button>
          </div>
        </Fragment>
      )}
      {AuthCtx.website.name && (
        <div className="logo-container">
          <NavLink className="logo-link" to="/start">
            <img
              className="logo-small"
              src={`${AuthCtx.website.logo}`}
              alt="logo"
            />
            <h3>{AuthCtx.website.name}</h3>
          </NavLink>
        </div>
      )}
    </Fragment>
  );
};

export default NavMain;
