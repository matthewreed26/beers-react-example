import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from '@/common/primary/app/App';
import { AppProvide } from '@/common/primary/app/AppContext';
import Router from '@/router';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <NextUIProvider>
      <App appProvide={AppProvide} router={Router} />
    </NextUIProvider>
  </React.StrictMode>,
);
