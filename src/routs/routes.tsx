import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '@/pages/AppLayout';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import MainLayout from '@/components/layout/MainLayout';
import Dashboard from '@/components/dashboard/Dashboard';
import Clients from '@/components/clients/Clients';
import Deals from '@/components/deals/Deals';
import Kanban from '@/components/kanban/Kanban';
import Tasks from '@/components/tasks/Tasks';

export const router = createBrowserRouter([
  {path: "/", element: <AppLayout />},
  {path: "/login", element: <Login />},
  {path: "/register", element: <Register />},
  
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "clients", element: <Clients /> },
      { path: "tasks", element: <Tasks /> },
      { path: "deals", element: <Deals /> },
      { path: "kanban", element: <Kanban /> },
    ]
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  },
]);