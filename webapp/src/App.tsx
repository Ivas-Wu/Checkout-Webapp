import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Information from './components/pages/Information';
import Stats from './components/pages/Stats';
import Goals from './components/pages/Goals';
import BasePage from './components/pages/BasePage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<BasePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/information" element={<Information />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/goals" element={<Goals />} />
      </Routes>
    </>
  );
}

export default App;
