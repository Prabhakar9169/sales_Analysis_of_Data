import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SalesAnalysisPage from './components/SalesAnalysisPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<SalesAnalysisPage />} />
      </Routes>
    </Router>
  );
}

export default App;
