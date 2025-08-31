import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "./redux";
import { simulateRequest } from "@/shared/helpers";

import { selectUser } from "@/store/user/selector";
import { clearMyUser, setUser } from "@/store/user/reducer";
import { clearCourses } from "@/store/course/reducer";

export const useAuth = (initUser?: boolean) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(!!initUser);

  const clearUser = () => {
    localStorage.removeItem("user");
    dispatch(clearMyUser());
    dispatch(clearCourses());
    navigate("/login");
  };

  const getCurrentUser = useCallback(async () => {
    const user = localStorage.getItem("user");
    setIsLoading(!!user);

    if (!user) {
      return;
    }

    const success = await simulateRequest();

    if (!success && user) {
      setIsLoading(false);
      clearUser();
      return toast.error("Failed to retrieve user");
    }

    if (user) {
      dispatch(setUser({ email: user }));
      if (window.location.pathname === "/login") {
        navigate("/");
      }
    } else {
      clearUser();
    }

    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (userData: { email: string; password: string }) => {
      setIsLoading(true);
      const success = await simulateRequest();
      if (success) {
        localStorage.setItem("user", userData.email);
        dispatch(setUser({ email: userData.email }));
        navigate("/");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      setIsLoading(false);
    },
    []
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    const success = await simulateRequest();
    if (success) {
      clearUser();
    } else {
      toast.error("Something went wrong. Please try again.");
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!user && initUser) {
      getCurrentUser();
    }
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };
};
