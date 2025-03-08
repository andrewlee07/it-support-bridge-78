
import { Suspense, useEffect, useState } from "react";
import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from "./components/Layout";
import { Toaster } from "sonner";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Outlet />
        </Layout>
      ),
      children: [
        {
          index: true,
          element: <div>Dashboard</div>,
        }
      ],
    },
    {
      path: "/auth",
      element: <div>Auth Layout</div>,
      children: [
        {
          path: "login",
          element: <div>Login Page</div>,
        },
        {
          path: "register",
          element: <div>Register Page</div>,
        },
      ],
    },
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
