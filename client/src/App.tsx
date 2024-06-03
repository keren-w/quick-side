import './App.css';
import { useEffect, useContext } from 'react';
import { UserContext, UserContextProvider } from './context';
import GameRunner from './pages/GameRunner';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import NavBar from './components/NavBar';
import { Routes, Route, useNavigate } from 'react-router-dom';

const AppContent = () => {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const { name } = userData;

  useEffect(() => {
    if (!name?.first) {
      navigate('/login');
    }
  }, [name, navigate])

  return (
    <div id="app-layout">
     <NavBar />
      <div className="page-view">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/game" element={<GameRunner />} />
          <Route path="/404" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <UserContextProvider>
      <AppContent />
    </UserContextProvider>
  );
};

export default App;
