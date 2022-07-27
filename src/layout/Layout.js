import { Fragment } from 'react';
import MainHeader from './MainHeader';
import classes from './Layout.module.css';
import RightSideBar from './RightSideBar';
import PostMenu from '../components/posts/PostMenu';

const Layout = (props) => {
  return (
    <Fragment>
      <MainHeader />
      <main className={classes.main}>{props.children}</main>
      <RightSideBar>
        <PostMenu />
      </RightSideBar>
    </Fragment>
  );
};

export default Layout;
