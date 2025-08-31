import { Route, Routes } from "react-router-dom";

import { CoursesPage, LoginPage, RootPage } from "@/pages";
import { ProtectedRoute } from "./";

import { LOGIN_ROUTE } from "@/shared/constants/routes";
import { useAuth } from "@/shared/hooks";

const Router = () => {
  const { user, isLoading } = useAuth(true);
  return (
    <Routes>
      <Route path="/" element={<RootPage />}>
        <Route
          index
          element={
            <ProtectedRoute user={user} isLoading={isLoading}>
              <CoursesPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path={LOGIN_ROUTE} element={<LoginPage />} />
    </Routes>
  );
};

export default Router;
