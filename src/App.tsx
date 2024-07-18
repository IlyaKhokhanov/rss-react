import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import OpenCard from './components/OpenCard/OpenCard';
import Error from './components/Error/Error';
import NotFound from './components/NotFound/NotFound';
import MainPage from './components/MainPage/MainPage';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import './App.scss';

function App() {
  return (
    <ErrorBoundary fallback={<Error />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/page/1" />} />
          <Route path="/page" element={<Navigate to="/page/1" />} />
          <Route path="/page/:page" element={<MainPage />}>
            <Route path="details/:id" element={<OpenCard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
