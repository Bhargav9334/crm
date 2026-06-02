import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({
  children,
  allowedRoles,
}) => {
  const { token, role, loading } =
    useAuth();

  if (loading) return null;

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(role)
  ) {
    if (role === "client") {
      return (
        <Navigate
          to="/client/dashboard"
          replace
        />
      );
    }

    if (role === "manager") {
      return (
        <Navigate
          to="/manager/dashboard"
          replace
        />
      );
    }

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;