import classes from './LeftSideBar.module.scss';
import pluarlPostLogo from '../assets/images/PPlogoonly.png';

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
