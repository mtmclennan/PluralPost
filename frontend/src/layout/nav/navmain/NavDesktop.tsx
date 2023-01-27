import React from 'react';
import classes from './NavDesktop.module.scss';

const NavDesktop = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav className={classes.nav}>
      <ul>{children}</ul>
    </nav>
  );
};

export default NavDesktop;
