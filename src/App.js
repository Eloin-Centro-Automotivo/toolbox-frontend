// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Conference from './Components/Conference';
import Reports from './Components/Reports';
import MechanicList from './Components/MechanicList';
import ToolList from './Components/ToolList';
import './App.css'; // Opcional: criar arquivo de estilos gerais

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Conferência</Link>
            </li>
            <li>
              <Link to="/mechanics">Mecânicos</Link>
            </li>
            <li>
              <Link to="/tools">Ferramentas</Link>
            </li>
            <li>
              <Link to="/reports/daily">Relatórios</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Conference />} />
          <Route path="/mechanics" element={<MechanicList />} />
          <Route path="/tools" element={<ToolList />} />
          <Route path="/reports/daily" element={<Reports />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
