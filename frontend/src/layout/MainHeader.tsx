import classes from './MainHeader.module.scss';
import { NavLink } from 'react-router-dom';
import { House, At, PenNibStraight, Gear, UsersThree } from 'phosphor-react';
import { Fragment, useContext } from 'react';
import pluarlPostLogo from '../assets/images/PPlogoonly.png';
import AuthContext from '../store/auth-context';

const MainHeader = () => {
  const AuthCtx = useContext(AuthContext);

  const iconColor = '#8626fa';

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img src={pluarlPostLogo} alt="PluarlPost" />
        <h2>PluralPost</h2>
      </div>
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

      {AuthCtx.isLoggedIn && (
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink to="/welcome">
                <House
                  size={20}
                  color={iconColor}
                  weight="duotone"
                  className={classes.icons}
                />
                Home
              </NavLink>
            </li>
            {AuthCtx.website.name && (
              <Fragment>
                <li>
                  <NavLink to="/subscribers">
                    <At size={20} color={iconColor} weight="duotone" />
                    All Subscribers
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/new-post">
                    <PenNibStraight
                      size={20}
                      color={iconColor}
                      weight="duotone"
                    />
                    Add New Post
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/posts">
                    <PenNibStraight
                      size={20}
                      color={iconColor}
                      weight="duotone"
                    />
                    Posts
                  </NavLink>
                </li>
              </Fragment>
            )}
            <li>
              <NavLink to="/settings">
                <Gear size={20} color={iconColor} weight="duotone" />
                Settings
              </NavLink>
            </li>
            {AuthCtx.user.role === 'admin' && (
              <li>
                <NavLink to="/users">
                  <UsersThree size={20} color={iconColor} weight="duotone" />
                  Users
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      )}
      {AuthCtx.isLoggedIn && (
        <Fragment>
          <div>
            <p className={classes.welcome}>Welcome</p>
            <p className={classes.username}>{AuthCtx.user.name}</p>
          </div>
          <button onClick={AuthCtx.onLogout} className={classes.btn}>
            Logout
          </button>
        </Fragment>
      )}
    </header>
  );
};

export default MainHeader;
