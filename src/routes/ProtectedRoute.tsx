import type { User } from "@/store/user/type";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  user: User | null;
  isLoading?: boolean;
  children: React.ReactNode;
};

const ProtectedRoute = ({ user, isLoading, children }: ProtectedRouteProps) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
