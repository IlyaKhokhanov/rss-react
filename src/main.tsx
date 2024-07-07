import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { App } from './App';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { Error } from './components/Error/Error';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<Error />}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
