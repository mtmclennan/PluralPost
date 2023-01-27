import { Fragment, useEffect, useState } from 'react';
import Header from './Header';
import classes from './Layout.module.scss';
import NavMain from './nav/navmain/NavMain';
import NavSetting from './nav/navSetting/NavSetting';
import Hamburger from './Hamburger';
import MobileMenu from './MobileMenu';
import NavDesktop from './nav/navmain/NavDesktop';
import { useLocation } from 'react-router-dom';

type LayoutProps = {
  children: React.ReactNode;
  settings?: boolean;
};

const Layout = ({ children, settings }: LayoutProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setShowMenu(false);
  }, [location]);

  return (
    <Fragment>
      <Header>
        <Hamburger setShowMenu={setShowMenu} showMenu={showMenu} />

        <NavDesktop>{settings ? <NavSetting /> : <NavMain />}</NavDesktop>
      </Header>
      <main className={classes.main}>
        {showMenu && (
          <MobileMenu> {settings ? <NavSetting /> : <NavMain />}</MobileMenu>
        )}
        {children}
      </main>
    </Fragment>
  );
};

export default Layout;
