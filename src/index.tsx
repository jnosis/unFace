import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import '@fortawesome/fontawesome-free/js/all';
import { MenuContextProvider } from './context/menu_context';
import App from './app';
import NotFound from './pages/not_found/not_found';
import Main from './pages/main/main';
import WorkDetail from './pages/work_detail/work_detail';
import Login from './pages/login/login';
import './index.module.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Navigate to='/404' />,
    children: [
      { index: true, element: <Main /> },
      { path: 'works/:title', element: <WorkDetail /> },
      { path: 'login', element: <Login /> },
      { path: '/404', element: <NotFound /> },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <MenuContextProvider>
      <RouterProvider router={router} />
    </MenuContextProvider>
  </React.StrictMode>
);
