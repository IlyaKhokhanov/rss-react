import './App.scss';
import { Search } from './components/Search/Search';

function App() {
  return (
    <div>
      <button
        className="error-btn"
        onClick={() => {
          throw new Error('Something went wrong');
        }}
      >
        Generate ERROR
      </button>
      <Search />
    </div>
  );
}

export default App;
