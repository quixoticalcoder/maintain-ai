import React, { useState } from 'react';
import {
  Calendar,
  Wrench,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Filter,
  Plus,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const MaintenanceHistory = () => {
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('30d');

  const maintenanceHistory = [
    {
      id: 1,
      machine: 'CNC Machine #1',
      type: 'Preventive',
      component: 'Spindle Bearing',
      description: 'Routine bearing inspection and lubrication',
      technician: 'Operator 5',
      status: 'completed',
      date: '2024-01-14',
      duration: '2h',
      cost: '$450',
      partsReplaced: ['Bearing #A-123', 'Seal #S-456'],
      notes: 'No issues found, bearings in good condition'
    },
    {
      id: 2,
      machine: 'Hydraulic Press',
      type: 'Corrective',
      component: 'Main Pump',
      description: 'Emergency pump replacement due to failure',
      technician: 'Operator 6',
      status: 'completed',
      date: '2024-01-12',
      duration: '4h',
      cost: '$1,200',
      partsReplaced: ['Hydraulic Pump #HP-789', 'Gasket Set'],
      notes: 'System pressure restored to normal levels'
    },
    {
      id: 3,
      machine: 'Assembly Robot',
      type: 'Predictive',
      component: 'Axis 2 Motor',
      description: 'Motor replacement based on AI prediction',
      technician: 'Operator 7',
      status: 'scheduled',
      date: '2024-01-18',
      duration: '3h',
      cost: '$850',
      partsReplaced: ['Servo Motor #SM-234'],
      notes: 'Scheduled maintenance to prevent failure'
    },
    {
      id: 4,
      machine: 'Cooling System',
      type: 'Preventive',
      component: 'Water Filter',
      description: 'Monthly filter replacement',
      technician: 'Operator 8',
      status: 'in-progress',
      date: '2024-01-15',
      duration: '1h',
      cost: '$150',
      partsReplaced: ['Filter Cartridge #FC-567'],
      notes: 'In progress - estimated completion 30 mins'
    },
    {
      id: 5,
      machine: 'Conveyor Belt',
      type: 'Corrective',
      component: 'Drive Motor',
      description: 'Motor overheating issue resolution',
      technician: 'Operator 1',
      status: 'completed',
      date: '2024-01-10',
      duration: '2.5h',
      cost: '$600',
      partsReplaced: ['Thermal Sensor', 'Cooling Fan'],
      notes: 'Temperature normalized after repair'
    },
  ];

  const statsData = [
    { month: 'Jul', preventive: 12, corrective: 8, predictive: 4 },
    { month: 'Aug', preventive: 14, corrective: 6, predictive: 5 },
    { month: 'Sep', preventive: 15, corrective: 5, predictive: 6 },
    { month: 'Oct', preventive: 16, corrective: 4, predictive: 8 },
    { month: 'Nov', preventive: 18, corrective: 3, predictive: 10 },
    { month: 'Dec', preventive: 20, corrective: 2, predictive: 12 },
  ];

  const kpis = [
    { label: 'MTBF', value: '420h', change: '+15%', trend: 'up' },
    { label: 'MTTR', value: '2.3h', change: '-8%', trend: 'down' },
    { label: 'Preventive Rate', value: '78%', change: '+12%', trend: 'up' },
    { label: 'Cost Saved', value: '$24.5k', change: '+18%', trend: 'up' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-amber-100 text-amber-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Preventive': return 'text-blue-600 bg-blue-50';
      case 'Corrective': return 'text-red-600 bg-red-50';
      case 'Predictive': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredHistory = filter === 'all' 
    ? maintenanceHistory 
    : maintenanceHistory.filter(item => item.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maintenance History</h1>
          <p className="text-gray-600">Track and analyze maintenance activities</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="mechanical-button-secondary flex items-center gap-2">
            <Download size={16} />
            Export Report
          </button>
          <button className="mechanical-button flex items-center gap-2">
            <Plus size={16} />
            New Maintenance
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <div key={index} className="mechanical-card p-6">
            <p className="text-sm text-gray-600 mb-2">{kpi.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
              <div className={`flex items-center gap-1 ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                <span className="text-sm font-medium">{kpi.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="mechanical-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Maintenance Trends</h3>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-500" />
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="industrial-input text-sm"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">Last Year</option>
              </select>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="preventive" fill="#3b82f6" name="Preventive" />
              <Bar dataKey="corrective" fill="#ef4444" name="Corrective" />
              <Bar dataKey="predictive" fill="#8b5cf6" name="Predictive" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mechanical-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Cost Analysis</h3>
            <Wrench size={20} className="text-gray-500" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={statsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="preventive" stroke="#3b82f6" strokeWidth={2} name="Preventive Cost" />
              <Line type="monotone" dataKey="corrective" stroke="#ef4444" strokeWidth={2} name="Corrective Cost" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg border ${
            filter === 'all'
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg border ${
            filter === 'completed'
              ? 'border-green-500 bg-green-50 text-green-700'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle size={16} />
            Completed
          </div>
        </button>
        <button
          onClick={() => setFilter('in-progress')}
          className={`px-4 py-2 rounded-lg border ${
            filter === 'in-progress'
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="flex items-center gap-2">
            <Clock size={16} />
            In Progress
          </div>
        </button>
        <button
          onClick={() => setFilter('scheduled')}
          className={`px-4 py-2 rounded-lg border ${
            filter === 'scheduled'
              ? 'border-amber-500 bg-amber-50 text-amber-700'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            Scheduled
          </div>
        </button>
        <button className="mechanical-button-secondary flex items-center gap-2">
          <Filter size={16} />
          More Filters
        </button>
      </div>

      {/* History Table */}
      <div className="mechanical-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Machine</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Type</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Component</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Date</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Duration</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Cost</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 last:border-0">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">{item.machine}</p>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-xs px-3 py-1 rounded-full ${getTypeColor(item.type)}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-medium text-gray-900">{item.component}</p>
                    <p className="text-sm text-gray-600 mt-1">By: {item.technician}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`status-indicator ${getStatusColor(item.status)}`}>
                      {item.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{item.date}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-gray-500" />
                      <span className="text-gray-700">{item.duration}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900">{item.cost}</td>
                  <td className="py-4 px-6">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View Details →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="mechanical-card p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Maintenance Types</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Preventive</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
                <span className="font-medium">70%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Predictive</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
                <span className="font-medium">20%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Corrective</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
                <span className="font-medium">10%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mechanical-card p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Recent Parts Used</h4>
          <div className="space-y-3">
            {maintenanceHistory.slice(0, 3).flatMap(item => item.partsReplaced).map((part, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-gray-700">{part}</span>
                <span className="text-sm text-gray-500">Used: 2 times</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mechanical-card p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Top Technicians</h4>
          <div className="space-y-3">
            {[...new Set(maintenanceHistory.map(item => item.technician))].slice(0, 3).map((tech, idx) => (
              <div key={idx} className="flex items-center justify-between py-2">
                <span className="text-gray-700">{tech}</span>
                <span className="text-sm text-gray-500">
                  {maintenanceHistory.filter(item => item.technician === tech).length} jobs
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceHistory;