import classes from './LeftSideBar.module.scss';
import { NavLink } from 'react-router-dom';
import { House, At, PenNibStraight, Gear, UsersThree } from 'phosphor-react';
import { Fragment, ReactComponentElement, useContext } from 'react';
import pluarlPostLogo from '../assets/images/PPlogoonly.png';
import AuthContext from '../store/auth-context';
import NavItem from './nav/navItem/NavItem';

interface LeftSideBarProps {
  children: React.ReactNode;
}

const LeftSideBar = ({ children }: LeftSideBarProps) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img src={pluarlPostLogo} alt="PluarlPost" />
        <h2>PluralPost</h2>
      </div>
      {children}
    </header>
  );
};

export default LeftSideBar;
