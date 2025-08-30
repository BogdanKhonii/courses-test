import { simulateRequest } from "@/shared/helpers";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "./redux";
import { selectUser } from "@/store/user/selector";
import { clearMyUser, setUser } from "@/store/user/reducer";

export const useAuth = (initUser?: boolean) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [isLoading, setIsLoading] = useState(false);

  const clearUser = () => {
    localStorage.removeItem("user");
    dispatch(clearMyUser());
    window.history.pushState({}, "", "/login");
    window.dispatchEvent(new PopStateEvent("popstate"));
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
        window.history.pushState({}, "", "/");
        window.dispatchEvent(new PopStateEvent("popstate"));
      }
    } else {
      clearUser();
    }

    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (userData: { email: string; password: string }) => {
      const success = await simulateRequest();
      if (success) {
        localStorage.setItem("user", userData.email);
        dispatch(setUser({ email: userData.email }));
        window.history.pushState({}, "", "/");
        window.dispatchEvent(new PopStateEvent("popstate"));
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
    []
  );

  const logout = useCallback(async () => {
    const success = await simulateRequest();
    if (success) {
      clearUser();
    } else {
      toast.error("Something went wrong. Please try again.");
    }
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
