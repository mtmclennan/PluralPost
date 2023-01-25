import { Fragment } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { User } from '../types/index.type';

type ProtectedRouteProps = {
  user: User;
  children?: React.ReactNode;
  redirectPath: string;
};

const ProtectedRoute = ({
  user,
  redirectPath = '/login',
  children,
}: ProtectedRouteProps) => {
  return !user?.name ? (
    <Navigate to={redirectPath} replace />
  ) : (
    <Fragment>{children ? children : <Outlet />}</Fragment>
  );
};

export default ProtectedRoute;
