import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '@/pages/AppLayout';
import Register from '@/components/auth/Register';
import MainLayout from '@/components/layout/MainLayout';
import Dashboard from '@/components/dashboard/Dashboard';
import Clients from '@/components/clients/Clients';
import Deals from '@/components/deals/Deals';
import Kanban from '@/components/kanban/Kanban';
import ClientDetail from '@/components/clients/ClientDetail';
import Login from '@/components/auth/Login';

export const router = createBrowserRouter([
  {path: "/", element: <AppLayout />},
  {path: "/login", element: <Login />},
  {path: "/register", element: <Register />},
  
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "clients", children: [
        {index: true, element: <Clients/>},
        { path: ":id", element: <ClientDetail /> }
      ] },
      { path: "deals", element: <Deals />},
      { path: "kanban", element: <Kanban /> },
    ]
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  },
]);