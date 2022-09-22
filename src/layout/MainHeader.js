import classes from './MainHeader.module.css';
import { NavLink } from 'react-router-dom';
import { House, At, PenNibStraight, Gear, UsersThree } from 'phosphor-react';
import { Newspaper } from 'phosphor-react';
import { Fragment, useContext } from 'react';
import AuthContext from '../store/auth-context';

const MainHeader = () => {
  const AuthCtx = useContext(AuthContext);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Newspaper size={32} color="#1864ab" weight="duotone" />
        <h3>CSMS</h3>
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
                  color="#1864ab"
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
                    <At size={20} color="#1864ab" weight="duotone" />
                    All Subscribers
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/new-post">
                    <PenNibStraight
                      size={20}
                      color="#1864ab"
                      weight="duotone"
                    />
                    Add New Post
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/posts">
                    <PenNibStraight
                      size={20}
                      color="#1864ab"
                      weight="duotone"
                    />
                    Posts
                  </NavLink>
                </li>
              </Fragment>
            )}
            <li>
              <NavLink to="/settings">
                <Gear size={20} color="#1864ab" weight="duotone" />
                Settings
              </NavLink>
            </li>
            {AuthCtx.user.role === 'admin' && (
              <li>
                <NavLink to="/users">
                  <UsersThree size={20} color="#1864ab" weight="duotone" />
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
          <button onClick={AuthCtx.onLogout} className={classes.logout}>
            Logout
          </button>
        </Fragment>
      )}
    </header>
  );
};

export default MainHeader;
