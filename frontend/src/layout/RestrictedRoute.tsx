import { Navigate, Outlet } from 'react-router-dom';
import { User } from '../types/index.type';

type RestrictedRouteProps = {
  user: User;
  allowedRoles: string[];
  redirectPath: string;
  children: React.ReactNode;
};

const RestrictedRoute = ({
  user,
  allowedRoles,
  redirectPath = '/start',
  children,
}: RestrictedRouteProps) => {
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default RestrictedRoute;
