import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { LoginPage } from './pages/Login';
import { SignUpPage } from './pages/SignUp';
import { DashboardPage } from './pages/Dashboard';
import { api } from './components/ApiClient';
import { getRefreshToken } from './components/Utils';


function App() {
  const accessToken = localStorage.getItem("access");
  const refreshToken = localStorage.getItem("refresh");
  const [userData, setUserData] = useState();
  let loggedIn = false;

  

  if (accessToken && refreshToken) {
    loggedIn = true;
  }

  useEffect(() => {
    if (loggedIn) {
      api.get("/users/get/", {
        headers: {
          Authorization: "JWT " + accessToken
        }
      })
      .then(res => {setUserData(res.data.profile);console.log(res);})
      .catch(error => {
        if (error.response.status === 401) {
          getRefreshToken();
          console.log("refreshed");
        }
      })
    }
  }, [loggedIn, accessToken])

  return (
    <Routes>
      <Route path="/" element={<Home loggedIn={loggedIn} />} />
      <Route path="/login/" element={<LoginPage />} />
      <Route path="/register/" element={<SignUpPage />} />
      <Route path="/dashboard/" element={<DashboardPage userData={userData} loggedIn={loggedIn}/>} />
    </Routes>
  );
}

export default App;
