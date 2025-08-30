import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";

function App() {
  const isAuthenticated = Boolean(localStorage.getItem("user"));

  return <RouterProvider router={router(isAuthenticated)} />;
}

export default App;
