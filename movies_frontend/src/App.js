import './App.css';

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

import Movies from './components/Movies';
import Movie from  './components/Movie';


function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movies/:id" element={<Movie/>} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
