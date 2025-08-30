import { Navigate, createBrowserRouter } from "react-router-dom";
import { LOGIN_ROUTE, COURSES_ROUTE } from "@/shared/constants/routes";
import { LoginPage, CoursesPage, RootPage } from "@/pages";

import type { RouteObject } from "react-router-dom";
import type { ReactNode } from "react";

type Router = ReturnType<typeof createBrowserRouter>;

const privateRoute = (
  path: string,
  element: ReactNode,
  isLoggedIn: boolean
): RouteObject => ({
  path,
  element: isLoggedIn ? element : <Navigate to={LOGIN_ROUTE} replace />,
});

export const router = (isLoggedIn: boolean): Router =>
  createBrowserRouter([
    privateRoute("/", <RootPage />, isLoggedIn),
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);
