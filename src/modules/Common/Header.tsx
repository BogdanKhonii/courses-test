import { useAuth } from "@/shared/hooks";

import { Button } from "@/components/ui/button";

const Header = () => {
  const { user, logout, isLoading } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <h1 className="text-lg font-semibold">Welcome, {user?.email}</h1>
      <Button
        variant="outline"
        size="default"
        onClick={logout}
        disabled={isLoading}
      >
        Logout
      </Button>
    </header>
  );
};

export default Header;
