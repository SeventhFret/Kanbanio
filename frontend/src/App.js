import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { LoginForm } from './pages/Login';
import { SignUpForm } from './pages/SignUp';


function App() {
  const accessToken = localStorage.getItem("access");
  const refreshToken = localStorage.getItem("refresh");
  let loggedIn = false;

  if (accessToken || refreshToken) {
    loggedIn = true;
  }

  return (
    <Routes>
      <Route path="/" element={<Home loggedIn={loggedIn} />} />
      <Route path="/login/" element={<LoginForm loggedIn={loggedIn} />} />
      <Route path="/register/" element={<SignUpForm loggedIn={loggedIn} />} />

    </Routes>
  );
}

export default App;
