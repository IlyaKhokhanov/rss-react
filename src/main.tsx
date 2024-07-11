import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import OpenCard from './components/OpenCard/OpenCard';
import Error from './components/Error/Error';
import NotFound from './components/NotFound/NotFound';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<Error />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/page/1" />} />
          <Route path="/page/:page" element={<App />}>
            <Route path="details/:id" element={<OpenCard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
