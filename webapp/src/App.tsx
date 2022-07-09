import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home'
import Information from './components/pages/Information'
import Stats from './components/pages/Stats'
import Goals from './components/pages/Goals'
import Login from './components/auth/Login';
import useAuthToken from './components/auth/useAuthToken';


function App() {
  const { authToken, setAuthToken, removeAuthToken } = useAuthToken();
  const [, setLoggedIn] = useState(true);

  const logOut = () => {
      removeAuthToken()
      setLoggedIn(false)
  }

  if(!authToken) {
    return <Login setAuthToken={setAuthToken} />
  }
  
  return (
    <>
      <Router>
        <Navbar Buttonfunc={logOut} Buttonname='Logout'/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Information' element={<Information />} />
          <Route path='/Stats' element={<Stats />} />
          <Route path='/Goals' element={<Goals />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
