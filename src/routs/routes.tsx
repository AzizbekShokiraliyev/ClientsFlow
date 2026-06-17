import { createBrowserRouter, Navigate } from "react-router-dom"
import AppLayout from "@/pages/AppLayout"
import Register from "@/components/auth/Register"
import MainLayout from "@/components/layout/MainLayout"
import Dashboard from "@/components/dashboard/Dashboard"
import Clients from "@/components/clients/Clients"
import Tasks from "@/components/deals/Tasks"
import Kanban from "@/components/kanban/Kanban"
import ClientDetail from "@/components/clients/clientDetail/ClientDetail"
import Login from "@/components/auth/Login"
import ProtectedRoute from "./ProtectRoute"

export const router = createBrowserRouter([
  { path: "/", element: <AppLayout /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> },
      {
        path: "clients",
        children: [
          { index: true, element: <Clients /> },
          { path: ":clientId", element: <ClientDetail /> },
          { path: ":clientId/deals/:dealId", element: <Tasks /> },
        ],
      },
      { path: "kanban", element: <Kanban /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
])
