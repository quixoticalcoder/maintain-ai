import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import SensorData from './pages/SensorData';
import Predictions from './pages/Predictions';
import MaintenanceHistory from './pages/MaintenanceHistory';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';
import MachineDetails from './pages/MachineDetails';
import Reports from './pages/Reports';
import Login from './pages/Login';

function App() {
  const isLoggedIn = true; // In real app, check auth state

  if (!isLoggedIn) {
    return <Login />;
  }

  return (

      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/sensors" element={<SensorData />} />
              <Route path="/predictions" element={<Predictions />} />
              <Route path="/maintenance-history" element={<MaintenanceHistory />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/machine/:id" element={<MachineDetails />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </div>
      </div>
 
  );
}

export default App;