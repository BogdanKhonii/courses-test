import { Header } from "@/modules/Common";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="min-h-screen bg-gray-100 ">
      <Header />
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
