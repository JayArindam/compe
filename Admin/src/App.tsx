import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInForm from './components/signin/signin';
import Dashboard from './pages/dashboard/dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
