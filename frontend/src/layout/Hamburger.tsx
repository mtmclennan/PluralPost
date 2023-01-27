import { useEffect, useState } from 'react';
import { SetStateBoolean } from '../types/index.type';
import classes from './Hamburger.module.scss';

type HamburgerProps = {
  setShowMenu: SetStateBoolean;
  showMenu: boolean;
};

const Hamburger = ({ setShowMenu, showMenu }: HamburgerProps) => {
  const [topBarClass, setTopBarClass] = useState(classes.topBar);
  const [midBarClass, setMidBarClass] = useState(classes.midBar);
  const [bottomBarClass, setbottomBarClass] = useState(classes.bottomBar);

  const hamburgerHandler = () => {
    setShowMenu((current) => !current);
  };

  useEffect(() => {
    if (showMenu === true) {
      setTopBarClass(classes.topBarOpen);
      setMidBarClass(classes.midBarOpen);
      setbottomBarClass(classes.bottomBarOpen);
    } else {
      setTopBarClass(classes.topBar);
      setMidBarClass(classes.midBar);
      setbottomBarClass(classes.bottomBar);
    }
  }, [showMenu]);

  return (
    <div className={classes.ham} onClick={hamburgerHandler}>
      <div className={topBarClass}></div>
      <div className={midBarClass}></div>
      <div className={bottomBarClass}></div>
    </div>
  );
};

export default Hamburger;
