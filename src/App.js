import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Conference from './Components/Conference';
import Reports from './Components/Reports';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Conference />} />
        <Route path="/reports/daily" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;
