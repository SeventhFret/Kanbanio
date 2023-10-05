import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { LoginPage } from './pages/Login';
import { SignUpPage } from './pages/SignUp';
import { DashboardPage } from './pages/Dashboard';


function App() {
  const accessToken = localStorage.getItem("access");
  const refreshToken = localStorage.getItem("refresh");
  let loggedIn = false;

  

  if (accessToken && refreshToken) {
    loggedIn = true;
  }

  return (
    <Routes>
      <Route path="/" element={<Home loggedIn={loggedIn} />} />
      <Route path="/login/" element={<LoginPage />} />
      <Route path="/register/" element={<SignUpPage />} />
      <Route path="/dashboard/" element={<DashboardPage loggedIn={loggedIn}/>} />
    </Routes>
  );
}

export default App;
