import classes from './MobileMenu.module.scss';
import React, { useEffect, useState } from 'react';

const MobileMenu = ({ children }: { children: React.ReactNode }) => {
  const [menuClass, setMenuClass] = useState(classes.menuHidden);

  useEffect(() => {
    setMenuClass(classes.menu);
  }, []);

  return <div className={menuClass}>{children}</div>;
};

export default MobileMenu;
