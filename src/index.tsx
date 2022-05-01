import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.css';
import App from './app';
import { firebaseApp } from './service/firebase';
import AuthService from './service/auth_service';
import WorkRepository from './service/work_repository';

const authService = new AuthService(firebaseApp);
const workRepository = new WorkRepository(firebaseApp);

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App authService={authService} workRepository={workRepository} />
  </React.StrictMode>
);
