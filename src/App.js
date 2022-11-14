import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Main from './pages/Main';

function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>

      </Router>
    </div>
  );
}

export default App;
