import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@fortawesome/fontawesome-free/js/all';
import App from './app';
import Main from './pages/main/main';
import WorkDetail from './pages/work_detail/work_detail';
import Login from './pages/login/login';
import './index.module.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Main /> },
      { path: 'works/:title', element: <WorkDetail /> },
      { path: 'login', element: <Login /> },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
