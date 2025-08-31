import { useState } from "react";

import { useAuth } from "@/hooks";

import { Button } from "@/components/ui/button";

const Header = () => {
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();

  const onLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <h1 className="text-lg font-semibold">Welcome, {user?.email}</h1>
      <Button
        variant="outline"
        size="default"
        onClick={onLogout}
        disabled={loading}
      >
        Logout
      </Button>
    </header>
  );
};

export default Header;
