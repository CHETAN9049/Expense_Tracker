import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
import Dashboard from './components/Dashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ViewUsers from './pages/ViewUsers';
import Verify2FA from './pages/Verify2FA';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/addashboard" element={<AdminDashboard />} />
      <Route path="/view-users" element={<ViewUsers />} />
      <Route path="/verify-2fa" element={<Verify2FA/>}/>
    </Routes>
  );
}

export default App;

