import { Navigate, createHashRouter } from "react-router-dom";
import { LOGIN_ROUTE } from "@/shared/constants/routes";
import { LoginPage, RootPage } from "@/pages";

import type { RouteObject } from "react-router-dom";
import type { ReactNode } from "react";

type Router = ReturnType<typeof createHashRouter>;

const privateRoute = (
  path: string,
  element: ReactNode,
  isLoggedIn: boolean
): RouteObject => ({
  path,
  element: isLoggedIn ? element : <Navigate to={LOGIN_ROUTE} replace />,
});

export const router = (isLoggedIn: boolean): Router =>
  createHashRouter([
    privateRoute("/", <RootPage />, isLoggedIn),
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);
