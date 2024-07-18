import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import i18n from '@/locales';
import AuthRouter from './router/Auth';
import 'tailwindcss/tailwind.css';
import './assets/scss/index.scss';

import App from './App';
// import { registerShader } from './shaders';

const bootstrap = () => {
  // registerShader();
  const root = document.getElementById('root') as HTMLElement;
  ReactDOM.createRoot(root).render(
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <React.StrictMode>
          <AuthRouter>
            <App />
          </AuthRouter>
        </React.StrictMode>
      </BrowserRouter>
    </I18nextProvider>
  );
};

bootstrap();
