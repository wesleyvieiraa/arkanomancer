import { JSXElementConstructor, ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  isAuthenticated: boolean;
  redirectPath?: string;
  children: ReactElement<any, string | JSXElementConstructor<any>>;
}

export const ProtectedRoute = ({
  isAuthenticated,
  redirectPath = "/auth/login",
  children,
}: Props): JSX.Element => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
