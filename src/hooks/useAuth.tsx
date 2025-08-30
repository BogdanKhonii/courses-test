import { simulateRequest } from "@/shared/helpers";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearUser = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login", { replace: true });
  };

  const getCurrentUser = useCallback(async () => {
    setIsLoading(true);

    const success = await simulateRequest();
    const user = localStorage.getItem("user");

    if (!success && user) {
      setIsLoading(false);
      clearUser();
      return toast.error("Failed to retrieve user");
    }

    if (user) {
      setUser(user);
    } else {
      clearUser();
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const login = useCallback(
    async (userData: { email: string; password: string }) => {
      const success = await simulateRequest();
      if (success) {
        localStorage.setItem("user", userData.email);
        setUser(userData.email);
        navigate("/", { replace: true });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
    [navigate]
  );

  const logout = useCallback(async () => {
    const success = await simulateRequest();
    if (success) {
      clearUser();
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  }, [navigate]);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };
};
