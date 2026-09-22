import React, { useState } from 'react';
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  Clock,
  AlertCircle,
  Info,
  ExternalLink,
  Printer,
  Calendar,
  History
} from 'lucide-react';

const Alerts = () => {
  const [filter, setFilter] = useState('all');
  const [selectedAlerts, setSelectedAlerts] = useState([]);
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      machine: 'Hydraulic Press',
      component: 'Main Bearing',
      type: 'critical',
      title: 'Bearing Temperature Critical',
      description: 'Temperature exceeded 85°C threshold. Immediate attention required.',
      timestamp: '2024-01-15 14:30',
      sensor: 'Temperature Sensor #4',
      value: '87°C',
      threshold: '85°C',
      acknowledged: false,
      recommendations: ['Immediate shutdown', 'Bearing replacement required'],
      machineId: 'HP-001'
    },
    {
      id: 2,
      machine: 'CNC Machine #1',
      component: 'Spindle Motor',
      type: 'warning',
      title: 'Vibration Levels High',
      description: 'Vibration exceeds normal operating range. Monitor closely.',
      timestamp: '2024-01-15 13:45',
      sensor: 'Vibration Sensor #2',
      value: '4.2 mm/s',
      threshold: '4.0 mm/s',
      acknowledged: true,
      recommendations: ['Schedule maintenance', 'Check motor alignment'],
      machineId: 'CNC-001'
    },
    {
      id: 3,
      machine: 'Cooling System',
      component: 'Water Pump',
      type: 'info',
      title: 'Pressure Drop Detected',
      description: 'System pressure below optimal range.',
      timestamp: '2024-01-15 12:15',
      sensor: 'Pressure Sensor #1',
      value: '110 PSI',
      threshold: '120 PSI',
      acknowledged: false,
      recommendations: ['Check for leaks', 'Verify pump operation'],
      machineId: 'CS-001'
    },
    {
      id: 4,
      machine: 'Conveyor Belt',
      component: 'Drive Motor',
      type: 'warning',
      title: 'Current Surge Detected',
      description: 'Motor current spiked above safe limit.',
      timestamp: '2024-01-15 10:30',
      sensor: 'Current Sensor #3',
      value: '52A',
      threshold: '50A',
      acknowledged: false,
      recommendations: ['Inspect electrical connections', 'Check motor load'],
      machineId: 'CB-001'
    },
    {
      id: 5,
      machine: 'Assembly Robot',
      component: 'Axis 3 Motor',
      type: 'critical',
      title: 'Position Error',
      description: 'Position deviation exceeds tolerance limits.',
      timestamp: '2024-01-15 09:15',
      sensor: 'Encoder #2',
      value: '0.12° deviation',
      threshold: '0.1° deviation',
      acknowledged: true,
      recommendations: ['Emergency stop', 'Encoder calibration required'],
      machineId: 'AR-001'
    },
  ]);

  const [activeView, setActiveView] = useState('alerts'); // 'alerts', 'machine', 'schedule'
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    date: '',
    time: '',
    priority: 'medium',
    notes: ''
  });

  // Dummy machine data
  const machineDetails = {
    'HP-001': {
      id: 'HP-001',
      name: 'Hydraulic Press',
      type: 'Press',
      model: 'HP-5000X',
      manufacturer: 'Industrial Press Co.',
      installationDate: '2023-06-15',
      lastMaintenance: '2024-01-10',
      status: 'Operational',
      powerRating: '500 kW',
      operatingHours: 2450,
      alerts: ['Temperature High', 'Pressure Fluctuation'],
      sensors: [
        { name: 'Temperature Sensor #4', type: 'Thermocouple', status: 'Active' },
        { name: 'Pressure Sensor #2', type: 'Piezoelectric', status: 'Active' },
        { name: 'Vibration Sensor #1', type: 'Accelerometer', status: 'Active' }
      ]
    },
    'CNC-001': {
      id: 'CNC-001',
      name: 'CNC Machine #1',
      type: 'Milling Machine',
      model: 'CNC-Mill Pro',
      manufacturer: 'Precision Tools Inc.',
      installationDate: '2023-08-22',
      lastMaintenance: '2024-01-12',
      status: 'Operational',
      powerRating: '350 kW',
      operatingHours: 1875,
      alerts: ['Vibration High', 'Spindle Speed Error'],
      sensors: [
        { name: 'Vibration Sensor #2', type: 'Accelerometer', status: 'Active' },
        { name: 'Spindle Sensor', type: 'Encoder', status: 'Active' },
        { name: 'Temperature Sensor', type: 'RTD', status: 'Active' }
      ]
    },
    'CS-001': {
      id: 'CS-001',
      name: 'Cooling System',
      type: 'Cooling System',
      model: 'CS-3000',
      manufacturer: 'CoolTech Systems',
      installationDate: '2023-11-05',
      lastMaintenance: '2024-01-05',
      status: 'Operational',
      powerRating: '150 kW',
      operatingHours: 1200,
      alerts: ['Pressure Low', 'Flow Rate Warning'],
      sensors: [
        { name: 'Pressure Sensor #1', type: 'Piezoelectric', status: 'Active' },
        { name: 'Flow Sensor', type: 'Ultrasonic', status: 'Active' },
        { name: 'Temperature Sensor', type: 'Thermocouple', status: 'Active' }
      ]
    },
    'CB-001': {
      id: 'CB-001',
      name: 'Conveyor Belt',
      type: 'Conveyor System',
      model: 'CB-2000',
      manufacturer: 'Conveyor Solutions Ltd',
      installationDate: '2023-09-18',
      lastMaintenance: '2024-01-08',
      status: 'Operational',
      powerRating: '75 kW',
      operatingHours: 2150,
      alerts: ['Current Surge', 'Speed Variation'],
      sensors: [
        { name: 'Current Sensor #3', type: 'CT Sensor', status: 'Active' },
        { name: 'Speed Sensor', type: 'Encoder', status: 'Active' },
        { name: 'Load Cell', type: 'Strain Gauge', status: 'Active' }
      ]
    },
    'AR-001': {
      id: 'AR-001',
      name: 'Assembly Robot',
      type: 'Industrial Robot',
      model: 'IRB-6600',
      manufacturer: 'RoboTech Inc.',
      installationDate: '2023-10-30',
      lastMaintenance: '2024-01-03',
      status: 'Operational',
      powerRating: '120 kW',
      operatingHours: 1650,
      alerts: ['Position Error', 'Torque Warning'],
      sensors: [
        { name: 'Encoder #2', type: 'Rotary Encoder', status: 'Active' },
        { name: 'Torque Sensor', type: 'Strain Gauge', status: 'Active' },
        { name: 'Temperature Sensor', type: 'Thermistor', status: 'Active' }
      ]
    }
  };

  const stats = {
    critical: alerts.filter(a => a.type === 'critical').length,
    warning: alerts.filter(a => a.type === 'warning').length,
    info: alerts.filter(a => a.type === 'info').length,
    unacknowledged: alerts.filter(a => !a.acknowledged).length,
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'critical': return AlertTriangle;
      case 'warning': return AlertCircle;
      case 'info': return Info;
      default: return Bell;
    }
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(alert => filter === 'unacknowledged' ? !alert.acknowledged : alert.type === filter);

  // Acknowledge alert
  const acknowledgeAlert = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, acknowledged: true } : alert
    ));
    console.log(`Alert ${id} acknowledged`);
  };

  // Acknowledge all alerts
  const acknowledgeAllAlerts = () => {
    setAlerts(alerts.map(alert => ({ ...alert, acknowledged: true })));
    console.log('All alerts acknowledged');
  };

  // Export alerts to CSV
  const exportAlerts = () => {
    const headers = ['ID', 'Machine', 'Component', 'Type', 'Title', 'Description', 'Timestamp', 'Sensor', 'Value', 'Threshold', 'Acknowledged'];
    const csvContent = [
      headers.join(','),
      ...alerts.map(alert => [
        alert.id,
        alert.machine,
        alert.component,
        alert.type,
        alert.title,
        alert.description,
        alert.timestamp,
        alert.sensor,
        alert.value,
        alert.threshold,
        alert.acknowledged ? 'Yes' : 'No'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alerts_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    console.log('Alerts exported to CSV');
  };

  // View machine details
  const viewMachineDetails = (machineId) => {
    setSelectedMachine(machineDetails[machineId]);
    setActiveView('machine');
  };

  // Schedule maintenance
  const scheduleMaintenance = (machineId) => {
    const machine = alerts.find(a => a.machineId === machineId)?.machine || 'Unknown Machine';
    setScheduleData({
      ...scheduleData,
      notes: `Maintenance for ${machine}`
    });
    setShowScheduleForm(true);
  };

  // Handle schedule form submission
  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    console.log('Maintenance scheduled:', {
      ...scheduleData,
      machine: selectedMachine?.name || 'Unknown'
    });
    
    // Show success message
    alert(`Maintenance scheduled for ${scheduleData.date} at ${scheduleData.time}`);
    
    // Reset form
    setShowScheduleForm(false);
    setScheduleData({
      date: '',
      time: '',
      priority: 'medium',
      notes: ''
    });
  };

  // Back to alerts view
  const backToAlerts = () => {
    setActiveView('alerts');
    setSelectedMachine(null);
    setShowScheduleForm(false);
  };

  // Machine Details View
  const renderMachineDetails = () => {
    if (!selectedMachine) return null;

    return (
      <div className="space-y-6">
        {/* Back button */}
        <button
          onClick={backToAlerts}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          ← Back to Alerts
        </button>

        {/* Machine Header */}
        <div className="mechanical-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedMachine.name}</h2>
              <p className="text-gray-600">Machine ID: {selectedMachine.id}</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              {selectedMachine.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Basic Info */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Basic Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{selectedMachine.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Model:</span>
                  <span className="font-medium">{selectedMachine.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Manufacturer:</span>
                  <span className="font-medium">{selectedMachine.manufacturer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Installation Date:</span>
                  <span className="font-medium">{selectedMachine.installationDate}</span>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Performance Metrics</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Power Rating:</span>
                  <span className="font-medium">{selectedMachine.powerRating}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Operating Hours:</span>
                  <span className="font-medium">{selectedMachine.operatingHours} hrs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Maintenance:</span>
                  <span className="font-medium">{selectedMachine.lastMaintenance}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sensors */}
          <div className="mt-8">
            <h3 className="font-semibold text-gray-900 mb-3">Sensors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {selectedMachine.sensors.map((sensor, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{sensor.name}</p>
                      <p className="text-sm text-gray-600">{sensor.type}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {sensor.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="mt-8">
            <h3 className="font-semibold text-gray-900 mb-3">Recent Alerts</h3>
            <div className="space-y-2">
              {selectedMachine.alerts.map((alert, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <AlertTriangle size={16} className="text-amber-500" />
                  <span className="text-sm">{alert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Schedule Maintenance Form
  const renderScheduleForm = () => {
    if (!showScheduleForm) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="mechanical-card max-w-md w-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Schedule Maintenance</h3>
            <button
              onClick={() => setShowScheduleForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <form onSubmit={handleScheduleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                required
                value={scheduleData.date}
                onChange={(e) => setScheduleData({...scheduleData, date: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                required
                value={scheduleData.time}
                onChange={(e) => setScheduleData({...scheduleData, time: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={scheduleData.priority}
                onChange={(e) => setScheduleData({...scheduleData, priority: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={scheduleData.notes}
                onChange={(e) => setScheduleData({...scheduleData, notes: e.target.value})}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add maintenance notes..."
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowScheduleForm(false)}
                className="flex-1 mechanical-button-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 mechanical-button flex items-center justify-center gap-2"
              >
                <Calendar size={16} />
                Schedule
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {renderScheduleForm()}
      
      {activeView === 'machine' ? (
        renderMachineDetails()
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Alerts & Notifications</h1>
              <p className="text-gray-600">Monitor and manage system alerts in real-time</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={exportAlerts}
                className="mechanical-button-secondary flex items-center gap-2"
              >
                <Download size={16} />
                Export Alerts
              </button>
              <button 
                onClick={acknowledgeAllAlerts}
                className="mechanical-button flex items-center gap-2"
              >
                <CheckCircle size={16} />
                Acknowledge All
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="mechanical-card p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle size={20} className="text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Critical</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.critical}</p>
                </div>
              </div>
            </div>
            <div className="mechanical-card p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <AlertCircle size={20} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Warnings</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.warning}</p>
                </div>
              </div>
            </div>
            <div className="mechanical-card p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Info size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Info</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.info}</p>
                </div>
              </div>
            </div>
            <div className="mechanical-card p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Bell size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Unacknowledged</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.unacknowledged}</p>
                </div>
              </div>
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
              All Alerts ({alerts.length})
            </button>
            <button
              onClick={() => setFilter('critical')}
              className={`px-4 py-2 rounded-lg border ${
                filter === 'critical'
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              Critical ({stats.critical})
            </button>
            <button
              onClick={() => setFilter('warning')}
              className={`px-4 py-2 rounded-lg border ${
                filter === 'warning'
                  ? 'border-amber-500 bg-amber-50 text-amber-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              Warnings ({stats.warning})
            </button>
            <button
              onClick={() => setFilter('info')}
              className={`px-4 py-2 rounded-lg border ${
                filter === 'info'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              Info ({stats.info})
            </button>
            <button
              onClick={() => setFilter('unacknowledged')}
              className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
                filter === 'unacknowledged'
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <Filter size={16} />
              Unacknowledged ({stats.unacknowledged})
            </button>
          </div>

          {/* Alerts List */}
          <div className="space-y-4">
            {filteredAlerts.map((alert) => {
              const TypeIcon = getTypeIcon(alert.type);
              return (
                <div
                  key={alert.id}
                  className={`mechanical-card p-6 border-l-4 ${
                    alert.type === 'critical' ? 'border-l-red-500' :
                    alert.type === 'warning' ? 'border-l-amber-500' : 'border-l-blue-500'
                  } ${!alert.acknowledged ? 'bg-gradient-to-r from-white to-gray-50' : ''}`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${getTypeColor(alert.type).split(' ')[0]}`}>
                          <TypeIcon size={20} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="font-bold text-gray-900">{alert.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(alert.type)}`}>
                              {alert.type.toUpperCase()}
                            </span>
                            {!alert.acknowledged && (
                              <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800 animate-pulse">
                                UNACKNOWLEDGED
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mt-1">{alert.description}</p>
                          <div className="flex flex-wrap gap-4 mt-4 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">Machine:</span>
                              <span className="font-medium">{alert.machine}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">Component:</span>
                              <span className="font-medium">{alert.component}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">Sensor:</span>
                              <span className="font-medium">{alert.sensor}</span>
                            </div>
                          </div>
                          <div className="mt-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Alert Details:</p>
                            <div className="flex flex-wrap gap-4">
                              <div className="bg-gray-50 px-3 py-2 rounded-lg">
                                <span className="text-gray-600 text-sm">Value:</span>
                                <span className="font-bold ml-2">{alert.value}</span>
                              </div>
                              <div className="bg-gray-50 px-3 py-2 rounded-lg">
                                <span className="text-gray-600 text-sm">Threshold:</span>
                                <span className="font-bold ml-2">{alert.threshold}</span>
                              </div>
                              <div className="bg-gray-50 px-3 py-2 rounded-lg">
                                <span className="text-gray-600 text-sm">Time:</span>
                                <span className="font-bold ml-2">{alert.timestamp}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recommendations */}
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-sm font-medium text-gray-700 mb-3">Recommended Actions:</p>
                        <div className="space-y-2">
                          {alert.recommendations.map((rec, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                alert.type === 'critical' ? 'bg-red-500' :
                                alert.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                              }`} />
                              <span className="text-sm text-gray-700">{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 min-w-[200px]">
                      {!alert.acknowledged ? (
                        <button
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="mechanical-button flex items-center justify-center gap-2 w-full"
                        >
                          <CheckCircle size={16} />
                          Acknowledge
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                          <CheckCircle size={16} />
                          <span className="text-sm font-medium">Acknowledged</span>
                        </div>
                      )}
                      <button 
                        onClick={() => viewMachineDetails(alert.machineId)}
                        className="mechanical-button-secondary flex items-center justify-center gap-2 w-full"
                      >
                        <ExternalLink size={16} />
                        View Machine Details
                      </button>
                      <button 
                        onClick={() => scheduleMaintenance(alert.machineId)}
                        className="mechanical-button-secondary flex items-center justify-center gap-2 w-full"
                      >
                        <Clock size={16} />
                        Schedule Maintenance
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredAlerts.length === 0 && (
            <div className="mechanical-card p-12 text-center">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Alerts Found</h3>
              <p className="text-gray-600">Great! All systems are operating within normal parameters.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Alerts;