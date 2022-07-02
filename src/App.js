import { Fragment, useContext, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/home';
import Subscribers from './pages/subscribers';
import Users from './pages/users';
import Settings from './pages/settings';
import Login from './pages/login';
import MainHeader from './layout/MainHeader';
import ProtectedRoute from './layout/ProtectedRoute';
import AuthContext from './store/auth-context';
import ManageSubs from './pages/manageSubs';

function App(props) {
  const AuthCtx = useContext(AuthContext);
  console.log(AuthCtx.user);
  return (
    <Fragment>
      <MainHeader />
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} exact />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute user={AuthCtx.user.name} />}>
          <Route path="/welcome" element={<HomePage />} />
          <Route path="/subscribers" element={<Subscribers />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/ManageSubs" element={<ManageSubs />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
