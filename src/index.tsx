import React, { memo } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.module.css';
import App from './app';
import { firebaseApp } from './service/firebase';
import AuthService from './service/auth_service';
import WorkRepository from './service/work_repository';
import ImageUploader from './service/image_uploader';
import ImageFileInput from './components/image_file_input/image_file_input';

const authService = new AuthService(firebaseApp);
const workRepository = new WorkRepository(firebaseApp);
const imageUploader = new ImageUploader();

type FileInputProps = {
  name: string | null;
  onFileChange(file: FileData): void;
};
const FileInput = memo((props: FileInputProps) => {
  return <ImageFileInput {...props} imageUploader={imageUploader} />;
});
export const IFileInput = FileInput;

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App
        FileInput={FileInput}
        authService={authService}
        workRepository={workRepository}
      />
    </BrowserRouter>
  </React.StrictMode>
);
