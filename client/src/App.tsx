import './App.css';
import { useState, useEffect } from 'react';
import { UserContext } from './context';
import GamePlayer from './pages/GamePlayer/GamePlayer';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import { Routes, Route, Link, useNavigate} from 'react-router-dom';

const App = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (username === '') {
      navigate('/login');
    } else {
      navigate('/game');
    }
  }, [username, navigate])

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <div id="app-layout">
        <div className="games-bar">
          {username && <h3>Hello {username}</h3>}
          <h3>Play games</h3>
          <nav>
            <ul>
              <li><Link to="/game">Side Response</Link></li>
            </ul>
          </nav>
        </div>

        <div className="page-view">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/game" element={<GamePlayer />} />
            <Route path="/404" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default App;
