// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Router from "./Routers/Router";
import AuthProvider from "./provider/AuthProvider";
import { ToastProvider } from "./context/ToastContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
       <ToastProvider>
      <RouterProvider router={Router} />
      </ToastProvider>
    </AuthProvider>
  </StrictMode>
);
