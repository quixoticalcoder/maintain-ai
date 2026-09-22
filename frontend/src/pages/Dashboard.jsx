import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Clock,
  Zap,
  Thermometer,
  Gauge,
  RotateCw,
  HardDrive,
  Eye,
  Download,
  Bell,
  Calendar,
  Plus,
  BarChart3,
  List,
  Grid,
  Cpu,
  Users,
  Settings,
  FileText
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const Dashboard = ({ onAddMachine, onScheduleMaintenance }) => {
  const navigate = useNavigate();
  const [selectedMachine, setSelectedMachine] = useState('CNC #1');
  const [viewMode, setViewMode] = useState('overview');
  const [showAddMachineModal, setShowAddMachineModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [newMachineData, setNewMachineData] = useState({
    name: '',
    type: 'CNC',
    manufacturer: '',
    model: '',
    powerRating: '',
    installationDate: ''
  });

  // Dummy data - more realistic industrial values
  const machineHealthData = [
    { id: 'machine-1', machine: 'CNC #1', health: 92, uptime: 99.5, risk: 0.3, temp: 58, vibration: 2.8 },
    { id: 'machine-2', machine: 'Press #2', health: 65, uptime: 85.2, risk: 0.7, temp: 67, vibration: 4.1 },
    { id: 'machine-3', machine: 'Robot #3', health: 88, uptime: 96.8, risk: 0.4, temp: 52, vibration: 2.5 },
    { id: 'machine-4', machine: 'Cooling #4', health: 45, uptime: 72.1, risk: 0.9, temp: 72, vibration: 5.2 },
    { id: 'machine-5', machine: 'Conveyor #5', health: 78, uptime: 91.3, risk: 0.5, temp: 49, vibration: 2.1 },
  ];

  const sensorTrendData = [
    { time: '00:00', temp: 45, vibration: 2.1, pressure: 120, rpm: 2800 },
    { time: '04:00', temp: 47, vibration: 2.3, pressure: 122, rpm: 2850 },
    { time: '08:00', temp: 52, vibration: 2.8, pressure: 125, rpm: 2900 },
    { time: '12:00', temp: 58, vibration: 3.2, pressure: 130, rpm: 2950 },
    { time: '16:00', temp: 62, vibration: 3.8, pressure: 135, rpm: 2980 },
    { time: '20:00', temp: 55, vibration: 2.9, pressure: 128, rpm: 2850 },
  ];

  const failureTypesData = [
    { name: 'Bearing Wear', value: 35, color: '#f87171' },
    { name: 'Overheating', value: 25, color: '#fbbf24' },
    { name: 'Vibration', value: 20, color: '#60a5fa' },
    { name: 'Lubrication', value: 15, color: '#34d399' },
    { name: 'Electrical', value: 5, color: '#a78bfa' },
  ];

  const detailedMetricsData = [
    { hour: '00:00', efficiency: 94, quality: 98, downtime: 0 },
    { hour: '04:00', efficiency: 93, quality: 97, downtime: 5 },
    { hour: '08:00', efficiency: 95, quality: 99, downtime: 2 },
    { hour: '12:00', efficiency: 92, quality: 96, downtime: 10 },
    { hour: '16:00', efficiency: 90, quality: 95, downtime: 15 },
    { hour: '20:00', efficiency: 96, quality: 98, downtime: 3 },
  ];

  const stats = [
    {
      title: 'Active Machines',
      value: '12',
      change: '+2',
      icon: HardDrive,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Avg Temperature',
      value: '58°C',
      change: '+3°C',
      icon: Thermometer,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      title: 'Critical Alerts',
      value: '3',
      change: '-1',
      icon: AlertTriangle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100'
    },
    {
      title: 'Predicted Failures',
      value: '2',
      change: '+1',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const detailedStats = [
    {
      title: 'Overall OEE',
      value: '85.2%',
      change: '+2.1%',
      icon: Gauge,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Energy Consumption',
      value: '2450 kWh',
      change: '-5%',
      icon: Zap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Mean Time Between Failures',
      value: '425 hrs',
      change: '+25 hrs',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Worker Productivity',
      value: '92%',
      change: '+3%',
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    }
  ];

  const upcomingMaintenance = [
    { id: 1, machine: 'CNC Machine #1', type: 'Routine Check', date: 'Tomorrow', priority: 'medium' },
    { id: 2, machine: 'Hydraulic Press', type: 'Bearing Replacement', date: 'In 2 days', priority: 'high' },
    { id: 3, machine: 'Cooling System', type: 'Filter Change', date: 'Next Week', priority: 'low' },
  ];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-amber-100 text-amber-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleExportData = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      stats: viewMode === 'overview' ? stats : detailedStats,
      machineHealthData,
      sensorTrendData,
      failureTypesData,
      upcomingMaintenance
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `dashboard_export_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    console.log('Dashboard data exported successfully!');
  };

  const handleRefreshData = () => {
    console.log('Refreshing dashboard data...');
    alert('Dashboard data has been refreshed!');
  };

  const handleViewAllMachines = () => {
    navigate('/machines');
  };

  const handleScheduleMaintenance = () => {
    setShowScheduleModal(true);
  };

  const handleMachineClick = (machine) => {
    console.log(`Selected machine: ${machine.machine}`);
    setSelectedMachine(machine.machine);
    navigate(`/machine/${machine.id}`, { 
      state: { 
        machineData: machine,
        allMachines: machineHealthData 
      } 
    });
  };

  const handleViewDetails = (maintenance) => {
    console.log(`Viewing maintenance details: ${maintenance.id}`);
    alert(`Details for ${maintenance.type} on ${maintenance.machine}`);
  };

  const handleAddNewMachine = () => {
    setShowAddMachineModal(true);
  };

  const handleSubmitNewMachine = (e) => {
    e.preventDefault();
    console.log('New machine data:', newMachineData);
    
    // In a real app, this would be an API call
    const newMachine = {
      id: `machine-${Date.now()}`,
      ...newMachineData,
      health: 100,
      uptime: 100,
      status: 'active'
    };
    
    alert(`New machine "${newMachineData.name}" added successfully!`);
    console.log('Added machine:', newMachine);
    
    // Reset form and close modal
    setNewMachineData({
      name: '',
      type: 'CNC',
      manufacturer: '',
      model: '',
      powerRating: '',
      installationDate: ''
    });
    setShowAddMachineModal(false);
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    const scheduleData = {
      machine: e.target.machine.value,
      type: e.target.type.value,
      date: e.target.date.value,
      priority: e.target.priority.value,
      notes: e.target.notes.value
    };
    
    console.log('Scheduled maintenance:', scheduleData);
    alert(`Maintenance scheduled for ${scheduleData.machine} on ${scheduleData.date}`);
    setShowScheduleModal(false);
  };

  const handleGenerateReport = () => {
    const reportData = {
      title: 'Factory Performance Report',
      generated: new Date().toISOString(),
      summary: {
        overallHealth: 84,
        activeAlerts: 3,
        productionEfficiency: 92,
        energyConsumption: 2450
      },
      recommendations: [
        'Schedule maintenance for Press #2',
        'Monitor temperature on Cooling #4',
        'Review vibration levels on all machines'
      ]
    };

    // Create a PDF-like report in a new window
    const reportWindow = window.open('', '_blank');
    reportWindow.document.write(`
      <html>
        <head>
          <title>Factory Performance Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            h1 { color: #333; }
            .section { margin: 20px 0; }
            .metric { background: #f5f5f5; padding: 10px; border-radius: 5px; margin: 10px 0; }
            .recommendation { color: #d97706; margin: 5px 0; }
          </style>
        </head>
        <body>
          <h1>Factory Performance Report</h1>
          <p>Generated: ${new Date().toLocaleString()}</p>
          <div class="section">
            <h2>Summary</h2>
            <div class="metric">Overall Health: ${reportData.summary.overallHealth}%</div>
            <div class="metric">Active Alerts: ${reportData.summary.activeAlerts}</div>
            <div class="metric">Production Efficiency: ${reportData.summary.productionEfficiency}%</div>
            <div class="metric">Energy Consumption: ${reportData.summary.energyConsumption} kWh</div>
          </div>
          <div class="section">
            <h2>Recommendations</h2>
            ${reportData.recommendations.map(rec => `<div class="recommendation">• ${rec}</div>`).join('')}
          </div>
        </body>
      </html>
    `);
    reportWindow.document.close();
    
    console.log('Report generated successfully!');
  };

  const handleViewCalendar = () => {
    navigate('/calendar');
  };

  const handleViewAllAlerts = () => {
    navigate('/alerts');
  };

  const renderOverviewView = () => (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <button 
              key={index} 
              onClick={() => console.log(`Clicked ${stat.title}`)}
              className="mechanical-card p-6 hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.change.startsWith('+') ? (
                      <TrendingUp size={14} className="text-green-500" />
                    ) : (
                      <TrendingDown size={14} className="text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last week
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon size={24} className={stat.color} />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sensor Trends */}
        <div className="mechanical-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Sensor Trends (24h)</h3>
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-blue-500" />
              <span className="text-sm text-gray-600">Live Data</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sensorTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="temp" stroke="#f87171" strokeWidth={2} dot={{ r: 3 }} name="Temperature (°C)" />
              <Line type="monotone" dataKey="vibration" stroke="#60a5fa" strokeWidth={2} dot={{ r: 3 }} name="Vibration (mm/s)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Failure Distribution */}
        <div className="mechanical-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Failure Type Distribution</h3>
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-500" />
              <span className="text-sm text-gray-600">Last 30 days</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={failureTypesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {failureTypesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}%`, 'Percentage']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );

  const renderDetailedView = () => (
    <>
      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {detailedStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="mechanical-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.change.startsWith('+') ? (
                      <TrendingUp size={14} className="text-green-500" />
                    ) : (
                      <TrendingDown size={14} className="text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon size={24} className={stat.color} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Production Metrics */}
        <div className="mechanical-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Production Metrics (24h)</h3>
            <div className="flex items-center gap-2">
              <BarChart3 size={16} className="text-green-500" />
              <span className="text-sm text-gray-600">Detailed View</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={detailedMetricsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="hour" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="efficiency" fill="#60a5fa" name="Efficiency %" />
              <Bar dataKey="quality" fill="#34d399" name="Quality %" />
              <Bar dataKey="downtime" fill="#f87171" name="Downtime (min)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Machine Health Details */}
        <div className="mechanical-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Machine Health Details</h3>
            <div className="flex items-center gap-2">
              <Cpu size={16} className="text-blue-500" />
              <span className="text-sm text-gray-600">Real-time</span>
            </div>
          </div>
          <div className="space-y-4">
            {machineHealthData.map((machine, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${machine.health > 80 ? 'bg-green-500' : machine.health > 60 ? 'bg-amber-500' : 'bg-red-500'}`} />
                  <span className="font-medium">{machine.machine}</span>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <span className="text-gray-600">Temp: </span>
                      <span className="font-medium">{machine.temp}°C</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Vib: </span>
                      <span className="font-medium">{machine.vibration} mm/s</span>
                    </div>
                    <button 
                      onClick={() => handleMachineClick(machine)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Settings size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  // Add Machine Modal
  const renderAddMachineModal = () => {
    if (!showAddMachineModal) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4 text-center">
          {/* Background overlay */}
          <div 
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={() => setShowAddMachineModal(false)}
          />
          
          {/* Modal container */}
          <div className="relative transform overflow-hidden rounded-lg mechanical-card text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              {/* Modal header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Add New Machine</h3>
                <button
                  onClick={() => setShowAddMachineModal(false)}
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Modal form content */}
              <form id="add-machine-form" onSubmit={handleSubmitNewMachine} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Machine Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newMachineData.name}
                    onChange={(e) => setNewMachineData({...newMachineData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., CNC Machine #6"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Machine Type
                  </label>
                  <select
                    value={newMachineData.type}
                    onChange={(e) => setNewMachineData({...newMachineData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="CNC">CNC Machine</option>
                    <option value="Press">Hydraulic Press</option>
                    <option value="Robot">Assembly Robot</option>
                    <option value="Conveyor">Conveyor System</option>
                    <option value="Cooling">Cooling System</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Manufacturer
                    </label>
                    <input
                      type="text"
                      required
                      value={newMachineData.manufacturer}
                      onChange={(e) => setNewMachineData({...newMachineData, manufacturer: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Siemens"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Model
                    </label>
                    <input
                      type="text"
                      required
                      value={newMachineData.model}
                      onChange={(e) => setNewMachineData({...newMachineData, model: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., SINUMERIK 840D"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Power Rating
                  </label>
                  <input
                    type="text"
                    required
                    value={newMachineData.powerRating}
                    onChange={(e) => setNewMachineData({...newMachineData, powerRating: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 500 kW"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Installation Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newMachineData.installationDate}
                    onChange={(e) => setNewMachineData({...newMachineData, installationDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </form>
            </div>
            
            {/* Modal footer */}
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="submit"
                form="add-machine-form"
                className="mechanical-button flex items-center justify-center gap-2 w-full sm:w-auto sm:ml-3"
              >
                <Plus size={16} />
                Add Machine
              </button>
              <button
                type="button"
                onClick={() => setShowAddMachineModal(false)}
                className="mechanical-button-secondary mt-3 w-full sm:w-auto sm:mt-0"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Schedule Maintenance Modal
  const renderScheduleModal = () => {
    if (!showScheduleModal) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4 text-center">
          {/* Background overlay */}
          <div 
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={() => setShowScheduleModal(false)}
          />
          
          {/* Modal container */}
          <div className="relative transform overflow-hidden rounded-lg mechanical-card text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Schedule Maintenance</h3>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form id="schedule-form" onSubmit={handleScheduleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Machine
                  </label>
                  <select
                    name="machine"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a machine</option>
                    {machineHealthData.map((machine, idx) => (
                      <option key={idx} value={machine.machine}>{machine.machine}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maintenance Type
                  </label>
                  <select
                    name="type"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select type</option>
                    <option value="Routine Check">Routine Check</option>
                    <option value="Preventive Maintenance">Preventive Maintenance</option>
                    <option value="Repair">Repair</option>
                    <option value="Calibration">Calibration</option>
                    <option value="Parts Replacement">Parts Replacement</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      name="priority"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add maintenance notes..."
                  />
                </div>
              </form>
            </div>
            
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="submit"
                form="schedule-form"
                className="mechanical-button flex items-center justify-center gap-2 w-full sm:w-auto sm:ml-3"
              >
                <Calendar size={16} />
                Schedule
              </button>
              <button
                type="button"
                onClick={() => setShowScheduleModal(false)}
                className="mechanical-button-secondary mt-3 w-full sm:w-auto sm:mt-0"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {renderAddMachineModal()}
      {renderScheduleModal()}
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Factory Dashboard</h1>
          <p className="text-gray-600">Real-time monitoring and predictive analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <button 
              onClick={() => setViewMode('overview')}
              className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
                viewMode === 'overview' 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <Grid size={16} />
              Overview
            </button>
            <button 
              onClick={() => setViewMode('detailed')}
              className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
                viewMode === 'detailed' 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <List size={16} />
              Detailed
            </button>
          </div>
          <button 
            onClick={handleRefreshData}
            className="mechanical-button-secondary flex items-center gap-2"
          >
            <RotateCw size={16} />
            Refresh
          </button>
          <button 
            onClick={handleExportData}
            className="mechanical-button flex items-center gap-2"
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {viewMode === 'overview' ? renderOverviewView() : renderDetailedView()}

      {/* Machine Health & Maintenance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Machine Health Table */}
        <div className="mechanical-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Machine Health Status</h3>
            <button 
              onClick={handleViewAllMachines}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View All →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-medium text-gray-700">Machine</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-700">Health Score</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-700">Uptime</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-700">Risk Level</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {machineHealthData.map((machine, index) => (
                  <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                    <td className="py-3">
                      <button 
                        onClick={() => handleMachineClick(machine)}
                        className="flex items-center gap-3 hover:text-blue-600"
                      >
                        <div className={`w-3 h-3 rounded-full ${machine.health > 80 ? 'bg-green-500' : machine.health > 60 ? 'bg-amber-500' : 'bg-red-500'}`} />
                        <span className="text-sm font-medium">{machine.machine}</span>
                      </button>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${machine.health > 80 ? 'bg-green-500' : machine.health > 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${machine.health}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{machine.health}%</span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-gray-700">{machine.uptime}%</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        machine.risk > 0.7 ? 'bg-red-100 text-red-800' :
                        machine.risk > 0.4 ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {machine.risk > 0.7 ? 'High' : machine.risk > 0.4 ? 'Medium' : 'Low'}
                      </span>
                    </td>
                    <td className="py-3">
                      <button 
                        onClick={() => handleMachineClick(machine)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Maintenance */}
        <div className="mechanical-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Maintenance</h3>
            <button 
              onClick={handleViewCalendar}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View Calendar →
            </button>
          </div>
          <div className="space-y-4">
            {upcomingMaintenance.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div>
                  <h4 className="font-medium text-gray-900">{item.machine}</h4>
                  <p className="text-sm text-gray-600 mt-1">{item.type}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-900">{item.date}</span>
                  <div className="mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(item.priority)}`}>
                      {item.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={handleScheduleMaintenance}
            className="w-full mt-4 mechanical-button-secondary py-3 flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Schedule New Maintenance
          </button>
          <div className="mt-4">
            <button 
              onClick={handleViewCalendar}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium w-full text-center"
            >
              View Calendar →
            </button>
          </div>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="mechanical-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap size={20} className="text-blue-500" />
            <h4 className="font-medium text-gray-900">Power Consumption</h4>
          </div>
          <p className="text-3xl font-bold text-gray-900">24.5 kW</p>
          <p className="text-sm text-gray-600 mt-2">+12% from yesterday</p>
        </div>
        <div className="mechanical-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Gauge size={20} className="text-green-500" />
            <h4 className="font-medium text-gray-900">Production Rate</h4>
          </div>
          <p className="text-3xl font-bold text-gray-900">92%</p>
          <p className="text-sm text-gray-600 mt-2">Optimal performance</p>
        </div>
        <div className="mechanical-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <RotateCw size={20} className="text-purple-500" />
            <h4 className="font-medium text-gray-900">Cycle Time</h4>
          </div>
          <p className="text-3xl font-bold text-gray-900">45s</p>
          <p className="text-sm text-gray-600 mt-2">Within spec limits</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mechanical-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button 
            onClick={handleGenerateReport}
            className="mechanical-button-secondary py-3 flex items-center justify-center gap-2"
          >
            <FileText size={16} />
            Generate Report
          </button>
          <button 
            onClick={handleViewAllAlerts}
            className="mechanical-button-secondary py-3 flex items-center justify-center gap-2"
          >
            <Bell size={16} />
            View All Alerts
          </button>
          <button 
            onClick={handleAddNewMachine}
            className="mechanical-button py-3 flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Add New Machine
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;