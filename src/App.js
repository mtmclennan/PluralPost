import { Fragment, useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/home';
import Subscribers from './pages/subscribers';
import Users from './pages/users';
import Settings from './pages/settings';
import StartPage from './pages/startPage';
import Login from './pages/login';
import ProtectedRoute from './layout/ProtectedRoute';
import AuthContext from './store/auth-context';
import ManageSubs from './pages/manageSubs';
import Cms from './pages/cms';
import Posts from './pages/posts';
import EditPost from './pages/edit-post';
import SiteSettings from './pages/siteSettings';
import RestrictedRoute from './layout/RestrictedRoute';

function App() {
  const AuthCtx = useContext(AuthContext);

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} exact />
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute user={AuthCtx.user.name} redirectPath="/login" />
          }
        >
          <Route path="/welcome" element={<HomePage />} />
          <Route path="/start" element={<StartPage />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/edit-post/:postId" element={<EditPost />} />
          <Route path="/new-post" element={<Cms />} />
          <Route path="/subscribers" element={<Subscribers />} />
          <Route
            element={
              <RestrictedRoute
                user={AuthCtx.user}
                allowedRoles={['admin', 'editor']}
                redirectPath={'/start'}
              />
            }
          >
            <Route path="/siteSettings" element={<SiteSettings />} />
            <Route path="/users" element={<Users />} />
            <Route path="/ManageSubs" element={<ManageSubs />} />
          </Route>

          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
