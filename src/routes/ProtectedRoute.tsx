import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/auth.store";

// Redirects unauthenticated users to /login.
// Wraps any route that requires a session.
const ProtectedRoute = () => {
  const is_authenticated = useAuthStore((s) => s.is_authenticated);

  if (!is_authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;