import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/Router.jsx";
import AuthProvider from "./provider/authProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LenisProvider from "./provider/LenisProvider.jsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LenisProvider>
          <RouterProvider router={router} />
        </LenisProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
