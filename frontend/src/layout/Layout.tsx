import { Fragment } from 'react';
import LeftSideBar from './LeftSideBar';
import classes from './Layout.module.css';
import NavMain from './nav/navmain/NavMain';
import NavSetting from './nav/navSetting/NavSetting';

type LayoutProps = {
  children: React.ReactNode;
  settings?: boolean;
};

const Layout = ({ children, settings }: LayoutProps) => {
  return (
    <Fragment>
      <LeftSideBar>{settings ? <NavSetting /> : <NavMain />}</LeftSideBar>
      <main className={classes.main}>{children}</main>
    </Fragment>
  );
};

export default Layout;
