import { Fragment } from 'react';
import MainHeader from './MainHeader';
import classes from './Layout.module.css';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Fragment>
      <MainHeader />
      <main className={classes.main}>{children}</main>
    </Fragment>
  );
};

export default Layout;
