import { Navigate } from 'react-router-dom';

export type ProtectedRouteProps = {
  loggedIn: boolean;
  path: string;
  component: JSX.Element;
};

export default function ProtectedRoute({loggedIn, path, component}: ProtectedRouteProps) {
  if (loggedIn) {
    return component;
  } else {
    return <Navigate to={path} />;
  }
};
