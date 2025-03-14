import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import './shared/styles/main.scss';

/**
 * Точка входа в приложение
 */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);