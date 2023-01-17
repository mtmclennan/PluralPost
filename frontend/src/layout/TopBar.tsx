import useScroll from '../hooks/use-scroll';
import classes from './TopBar.module.scss';

type TopBarProps = {
  children: React.ReactNode;
};

const TopBar = ({ children }: TopBarProps) => {
  const hide = useScroll();

  const cssClasses = !hide
    ? `${classes.topBar}`
    : `${classes.topBar} ${classes.hidden}`;

  return <div className={cssClasses}>{children}</div>;
};

export default TopBar;
