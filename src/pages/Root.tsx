import { Header } from "@/modules/Common";
import { CourseList } from "@/modules/Courses";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="min-h-screen bg-gray-100 ">
      <Header />
      <main className="p-8">
        <CourseList />
      </main>

      <Outlet />
    </div>
  );
};

export default Root;
