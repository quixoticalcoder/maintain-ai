import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Activity,
  AlertTriangle,
  Wrench,
  History,
  BarChart3,
  Cpu,
  Shield,
  Users,
  FileText
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/sensors', icon: Activity, label: 'Sensor Data' },
    { path: '/predictions', icon: BarChart3, label: 'Predictions' },
    { path: '/alerts', icon: AlertTriangle, label: 'Alerts' },
    { path: '/maintenance-history', icon: History, label: 'History' },
    { path: '/settings', icon: Shield, label: 'Settings' },
  ];

  const machines = [
    { id: 'machine-1', name: 'CNC #1', status: 'healthy', type: 'CNC', health: 92, uptime: 99.5, temp: 58, vibration: 2.8 },
    { id: 'machine-2', name: 'Press #2', status: 'warning', type: 'Press', health: 65, uptime: 85.2, temp: 67, vibration: 4.1 },
    { id: 'machine-3', name: 'Robot #3', status: 'healthy', type: 'Robot', health: 88, uptime: 96.8, temp: 52, vibration: 2.5 },
    { id: 'machine-4', name: 'Cooling #4', status: 'critical', type: 'Cooling', health: 45, uptime: 72.1, temp: 72, vibration: 5.2 },
    { id: 'machine-5', name: 'Conveyor #5', status: 'healthy', type: 'Conveyor', health: 78, uptime: 91.3, temp: 49, vibration: 2.1 },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'healthy': return 'bg-green-500';
      case 'warning': return 'bg-amber-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleMachineClick = (machine) => {
    console.log(`Selected machine: ${machine.name}`);
    navigate(`/machine/${machine.id}`, { 
      state: { 
        machineData: machine,
        allMachines: machines 
      } 
    });
  };

  const handleNewMaintenance = () => {
    navigate('/maintenance/new');
  };

  const handleAssignTeam = () => {
    navigate('/teams/assign');
  };

  const handleGenerateReport = () => {
    navigate('/reports/generate');
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-gray-200 bg-white">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
            <Cpu size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Factory Floor</h2>
            <p className="text-xs text-gray-500">12 Machines Active</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Machine Status */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 px-4">Machine Status</h3>
          <div className="space-y-2">
            {machines.map((machine) => (
              <button
                key={machine.id}
                onClick={() => handleMachineClick(machine)}
                className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 rounded-lg cursor-pointer w-full text-left"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(machine.status)}`} />
                  <span className="text-sm text-gray-700 truncate">{machine.name}</span>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  machine.health > 80 ? 'bg-green-100 text-green-800' :
                  machine.health > 60 ? 'bg-amber-100 text-amber-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {machine.health}%
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 px-4">Quick Actions</h3>
          <div className="space-y-2">
            <button 
              onClick={handleNewMaintenance}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg w-full"
            >
              <Wrench size={18} />
              <span className="text-sm font-medium">New Maintenance</span>
            </button>
            <button 
              onClick={handleAssignTeam}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg w-full"
            >
              <Users size={18} />
              <span className="text-sm font-medium">Assign Team</span>
            </button>
            <button 
              onClick={handleGenerateReport}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg w-full"
            >
              <FileText size={18} />
              <span className="text-sm font-medium">Generate Report</span>
            </button>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">System Uptime</span>
            <span className="text-sm font-bold text-green-400">99.8%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.8%' }}></div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Last updated: 2 mins ago</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;