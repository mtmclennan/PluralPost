import { Fragment, Suspense, useContext, lazy } from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import HomePage from './pages/Home';
import StartPage from './pages/StartPage';
import Login from './pages/Login';
import ProtectedRoute from './layout/ProtectedRoute';
import AuthContext from './store/auth-context';
import LoadingSpinner from './UI/LoadingSpinner';
import RestrictedRoute from './layout/RestrictedRoute';
import Layout from './layout/Layout';
import NotFound from './pages/NotFound';
import ResetPassword from './pages/ResetPassword';

const Subscribers = lazy(() => import('./pages/Subscribers'));
const Settings = lazy(() => import('./pages/Settings'));
const SettingsWebsite = lazy(() => import('./pages/SettingsWebsite'));
const ManageSubs = lazy(() => import('./pages/ManageSubs'));
const Cms = lazy(() => import('./pages/Cms'));
const Posts = lazy(() => import('./pages/Posts'));
const EditPost = lazy(() => import('./pages/Edit-post'));
const SettingsUser = lazy(() => import('./pages/SettingsUser'));
const Email = lazy(() => import('./pages/Email'));

const Users = lazy(() => import('./pages/Users'));
function App() {
  const AuthCtx = useContext(AuthContext);

  return (
    <Fragment>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" replace />} />
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
                <ProtectedRoute
                  user={AuthCtx.user}
                  redirectPath="/login"
                ></ProtectedRoute>
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
              <ProtectedRoute
                user={AuthCtx.user}
                redirectPath="/login"
              ></ProtectedRoute>
            }
          >
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
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
