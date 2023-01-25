import { Fragment } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { User } from '../types/index.type';

type RestrictedRouteProps = {
  user: User;
  allowedRoles: string[];
  redirectPath: string;
  children?: React.ReactNode;
};

const RestrictedRoute = ({
  user,
  allowedRoles,
  redirectPath = '/start',
  children,
}: RestrictedRouteProps) => {
  const Redirect = () => {
    return <Navigate to={redirectPath} replace />;
  };
  return (
    <Fragment>
      {!allowedRoles.includes(user.role) ? (
        <Redirect />
      ) : children ? (
        children
      ) : (
        <Outlet />
      )}
    </Fragment>
  );
};

export default RestrictedRoute;
