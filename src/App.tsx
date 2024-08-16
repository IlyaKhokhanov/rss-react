import { Route, Routes } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import UncontrolledForm from './components/Form/UncontrolledForm';
import ReactHookForm from './components/Form/ReactHookForm';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="/uncontrolled" element={<UncontrolledForm />} />
        <Route path="/hookform" element={<ReactHookForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
