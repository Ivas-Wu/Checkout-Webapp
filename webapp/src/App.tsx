import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home'
import Information from './components/pages/Information'
import Stats from './components/pages/Stats'
import Goals from './components/pages/Goals'


function App() {
  return (
    <>
      <Router>
        <Navbar />
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
