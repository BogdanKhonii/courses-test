import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

import { Router } from "./routes";

import store from "./store/index.ts";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Provider store={store}>
        <Router />
        <Toaster />
      </Provider>
    </HashRouter>
  </StrictMode>
);
