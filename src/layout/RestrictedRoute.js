import { Navigate, Outlet } from 'react-router-dom';

const RestrictedRoute = ({
  user,
  allowedRoles,
  redirectPath = '/start',
  children,
}) => {
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default RestrictedRoute;
