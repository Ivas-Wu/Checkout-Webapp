import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Information from './components/pages/Information';
import Stats from './components/pages/Stats';
import Goals from './components/pages/Goals';
import BasePage from './components/pages/BasePage';
import { ProtectedRoute } from './auth/ProtectedRoute';
import NotFound from './components/pages/NotFound';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<BasePage />} />
        <Route path="/home" element={<ProtectedRoute component={Home} />} />
        <Route path="/information" element={<ProtectedRoute component={Information} />} />
        <Route path="/stats" element={<ProtectedRoute component={Stats} />} />
        <Route path="/goals" element={<ProtectedRoute component={Goals} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
