import { useAuth } from "@/hooks";
import { Header } from "@/modules/Common";
import { Outlet } from "react-router-dom";

const Root = () => {
  const { isLoading } = useAuth();
  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <span className="text-lg">Loading...</span>
        </div>
      ) : (
        <>
          <Header />
          <Outlet />
        </>
      )}
    </div>
  );
};

export default Root;
