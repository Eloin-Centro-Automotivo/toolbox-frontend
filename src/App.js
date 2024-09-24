// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Conferencia from './Components/Conferencia';
import Relatorios from './Components/Relatorios';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Conferencia />} />
        <Route path="/relatorios" element={<Relatorios />} />
      </Routes>
    </Router>
  );
}

export default App;
