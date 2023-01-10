import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/css/index.css";
import { AuthProvider } from "./providers/AuthProvider";

const root = createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
