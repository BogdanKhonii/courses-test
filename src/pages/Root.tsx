import { Header } from "@/modules/Common";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Root;
