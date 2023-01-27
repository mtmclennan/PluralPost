import React, { useContext, Fragment } from 'react';
import NavItem from '../navItem/NavItem';
import { NavLink, useLocation } from 'react-router-dom';

import classes from './NavSetting.module.scss';
import { Browser, House, IdentificationCard } from 'phosphor-react';
import AuthContext from '../../../store/auth-context';
import Back from '../Back';

const NavSetting = () => {
  const location = useLocation();
  const iconColor = '#8626fa';
  const AuthCtx = useContext(AuthContext);

  return (
    <div className={classes.container}>
      {location.pathname !== '/welcome' ? <Back /> : ''}
      <NavItem
        text="Home"
        icon={<House size={20} color={iconColor} weight="duotone" />}
        to={AuthCtx.website.name ? '/start' : '/welcome'}
      />

      <div>
        <h3>Settings</h3>
      </div>

      <ul>
        <NavItem to="/settings" text="General" />
        <NavItem
          to="/settings-user"
          text="User"
          icon={
            <IdentificationCard size={20} color={iconColor} weight="duotone" />
          }
        />
        {AuthCtx.website.name && (
          <NavItem
            to="/settings-website"
            text="Website"
            icon={<Browser size={20} color={iconColor} weight="duotone" />}
          />
        )}
      </ul>
      <ul></ul>
      {AuthCtx.isLoggedIn && (
        <Fragment>
          <div className={classes.user}>
            <p className={classes.username}>{AuthCtx.user.name}</p>
            <button onClick={AuthCtx.onLogout} className={classes.btn}>
              Logout
            </button>
          </div>
        </Fragment>
      )}
      {AuthCtx.website.name && (
        <div className={classes.website}>
          <NavLink className="logo-link" to="/start">
            <img
              className="logo-small"
              src={`${AuthCtx.website.logo}`}
              alt="logo"
            />
            <h3>{AuthCtx.website.name.toUpperCase()}</h3>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default NavSetting;
