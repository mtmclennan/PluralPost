import { Fragment, useContext } from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import HomePage from './pages/home';
import Subscribers from './pages/subscribers';
import Users from './pages/users';
import Settings from './pages/settings';
import StartPage from './pages/startPage';
import Login from './pages/login';
import SettingsWebsite from './pages/Settings-website.tsx';
import ProtectedRoute from './layout/ProtectedRoute';
import AuthContext from './store/auth-context';
import ManageSubs from './pages/manageSubs';
import Cms from './pages/cms';
import Posts from './pages/posts';
import EditPost from './pages/edit-post';
import SettingsUser from './pages/settingsUser.tsx';
import RestrictedRoute from './layout/RestrictedRoute';
import Layout from './layout/Layout';
import NotFound from './pages/notFound';
import ResetPassword from './pages/ResetPassword';
import Email from './pages/email';

function App() {
  const AuthCtx = useContext(AuthContext);

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} exact />
        <Route path="/login" element={<Login />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route
            element={
              <ProtectedRoute user={AuthCtx.user.name} redirectPath="/login" />
            }
          >
            <Route path="/email" element={<Email />} />
            <Route path="/edit-email/:id" element={<Email />} />
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
              <Route path="/users" element={<Users />} />
              <Route path="/ManageSubs" element={<ManageSubs />} />
            </Route>
          </Route>
        </Route>
        <Route
          element={
            <Layout settings={true}>
              <Outlet />
            </Layout>
          }
        >
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings-user" element={<SettingsUser />} />
          <Route path="/settings-website" element={<SettingsWebsite />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
}

export default App;
