import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { LoginPage } from './pages/Login';
import { SignUpPage } from './pages/SignUp';
import { DashboardPage } from './pages/Dashboard';
import { ProfilePage } from './pages/Profile';
import { NotesPage } from './pages/NotesPage';
import { TodosPage } from './pages/TodosPage';
import { LogoutPage } from './pages/Logout';
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
      .then(res => {setUserData(res.data.profile)})
      .catch(error => {
        if (error) {
          console.clear();
          if (error.response.status === 401) {
            getRefreshToken();
            console.log("refreshed");
            setTimeout(() => {
              window.location.reload();
            }, 1000)
          }
      }
      })
    }
  }, [loggedIn, accessToken]);

  return (
    <Routes>
      <Route path="/" element={<Home loggedIn={loggedIn} />} />
      <Route path="/login/" element={<LoginPage />} />
      <Route path="/logout/" element={<LogoutPage />} />
      <Route path="/register/" element={<SignUpPage />} />
      <Route path="/dashboard/" element={<DashboardPage userData={userData} loggedIn={loggedIn}/>} />
      <Route path="/profile/" element={ <ProfilePage userData={userData} loggedIn={loggedIn} /> } />
      <Route path="/notes/" element={ <NotesPage userData={userData} loggedIn={loggedIn} /> } />
      <Route path="/todos/" element={ <TodosPage userData={userData} loggedIn={loggedIn} /> } />
    </Routes>
  );
}

export default App;
