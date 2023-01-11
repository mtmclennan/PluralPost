import { Navigate, Outlet } from 'react-router-dom';
import { User } from '../types/index.type';

type ProtectedRouteProps = {
  user: User;
  children: React.ReactNode;
  redirectPath: string;
};

const ProtectedRoute = ({
  user,
  redirectPath = '/login',
  children,
}: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
