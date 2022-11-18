import classes from './RightSideBar.module.css';

type RightSideBarProps = {
  children: React.ReactNode;
};

const RightSideBar = ({ children }: RightSideBarProps) => {
  return <div className={classes.sideBar}>{children}</div>;
};

export default RightSideBar;
