import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProfilePage from './ProfilePage.jsx'
import Dashboard from './Dashboard.jsx'
import HistoryPage from './HistoryPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProfilePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  )
}

export default App
