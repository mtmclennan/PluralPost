import classes from './Header.module.scss';
import pluarlPostLogo from '../assets/images/PPlogoonly.png';
import { NavLink } from 'react-router-dom';

interface LeftSideBarProps {
  children: React.ReactNode;
}

const Header = ({ children }: LeftSideBarProps) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <NavLink to="/">
          <img src={pluarlPostLogo} alt="PluarlPost" />
          <h2>PluralPost</h2>
        </NavLink>
      </div>
      {children}
    </header>
  );
};

export default Header;
