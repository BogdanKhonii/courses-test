import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { useAuth } from "./hooks";

function App() {
  const { user, isLoading } = useAuth(true);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-lg">Loading...</span>
      </div>
    );
  }
  return <RouterProvider router={router(!!user)} />;
}

export default App;
