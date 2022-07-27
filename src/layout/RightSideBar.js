import classes from './RightSideBar.module.css';

const RightSideBar = (props) => {
  return <div className={classes.sideBar}>{props.children}</div>;
};

export default RightSideBar;
