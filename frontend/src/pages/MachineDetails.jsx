import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Edit2,
  Save,
  X,
  AlertTriangle,
  Activity,
  Thermometer,
  Gauge,
  Clock,
  HardDrive,
  Zap,
  RotateCw,
  BarChart3,
  Settings,
  Download,
  Printer,
  History,
  Wrench,
  Calendar,
  TrendingUp,
  TrendingDown,
  Shield
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const MachineDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [editMode, setEditMode] = useState('basic'); // 'basic' or 'advanced'
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  // Initial machine data - in a real app, this would come from an API
  const initialMachineData = {
    id: id,
    name: 'CNC Machine #1',
    type: 'CNC Machine',
    manufacturer: 'Siemens',
    model: 'SINUMERIK 840D',
    serialNumber: 'SN-2023-CNC-001',
    installationDate: '2023-01-15',
    powerRating: '500 kW',
    voltage: '380V',
    frequency: '50Hz',
    dimensions: '2500x1800x2100mm',
    weight: '4500kg',
    currentHealth: 92,
    uptime: 99.5,
    temperature: 58,
    vibration: 2.8,
    pressure: 120,
    rpm: 2800,
    efficiency: 94,
    quality: 98,
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-02-15',
    status: 'Running',
    operator: 'Operator 5',
    department: 'Production Line A',
    notes: 'Machine operating within normal parameters. Regular maintenance performed.',
    safetyRating: 'A',
    energyConsumption: '245 kWh/day',
    cycleTime: '45s',
    totalCycles: '125,842',
    errorRate: '0.2%'
  };

  const [machineData, setMachineData] = useState(initialMachineData);
  const [originalData, setOriginalData] = useState(initialMachineData);

  // Try to get data from navigation state first
  useEffect(() => {
    if (location.state?.machineData) {
      const stateData = location.state.machineData;
      // Merge state data with defaults
      const mergedData = {
        ...initialMachineData,
        ...stateData,
        name: stateData.name || initialMachineData.name,
        health: stateData.health || initialMachineData.currentHealth,
        currentHealth: stateData.health || initialMachineData.currentHealth,
        temperature: stateData.temp || initialMachineData.temperature,
        vibration: stateData.vibration || initialMachineData.vibration,
        uptime: stateData.uptime || initialMachineData.uptime
      };
      setMachineData(mergedData);
      setOriginalData(mergedData);
    }
  }, [location.state, id]);

  const performanceData = [
    { hour: '00:00', efficiency: 94, temperature: 45, vibration: 2.1 },
    { hour: '04:00', efficiency: 93, temperature: 47, vibration: 2.3 },
    { hour: '08:00', efficiency: 95, temperature: 52, vibration: 2.8 },
    { hour: '12:00', efficiency: 92, temperature: 58, vibration: 3.2 },
    { hour: '16:00', efficiency: 90, temperature: 62, vibration: 3.8 },
    { hour: '20:00', efficiency: 96, temperature: 55, vibration: 2.9 },
  ];

  const maintenanceHistory = [
    { date: '2024-01-15', type: 'Routine Maintenance', technician: 'Operator 2', duration: '2 hours', cost: '$450' },
    { date: '2023-12-10', type: 'Bearing Replacement', technician: 'Operator 3', duration: '4 hours', cost: '$1,200' },
    { date: '2023-11-05', type: 'Software Update', technician: 'Operator 4', duration: '1 hour', cost: '$300' },
    { date: '2023-10-20', type: 'Calibration', technician: 'Operator 2', duration: '3 hours', cost: '$600' },
  ];

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      showAlert('Machine details updated successfully!', 'success');
      setOriginalData(machineData);
    }
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setMachineData(originalData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setMachineData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlertModal(true);
    setTimeout(() => {
      setShowAlertModal(false);
    }, 3000);
  };

  const handleExportData = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      machineDetails: machineData,
      performanceData,
      maintenanceHistory
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `machine_${id}_export_${new Date().toISOString().split('T')[0]}.json`);
    linkElement.click();
    
    showAlert('Machine data exported successfully!', 'success');
  };

  const handlePrintReport = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Machine Report - ${machineData.name}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
            .section { margin: 30px 0; }
            .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
            .metric { background: #f5f5f5; padding: 15px; border-radius: 5px; }
            .label { font-weight: bold; color: #666; }
            .value { font-size: 18px; margin-top: 5px; }
            .header { text-align: center; margin-bottom: 30px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Machine Report</h1>
            <h2>${machineData.name}</h2>
            <p>Generated: ${new Date().toLocaleString()}</p>
          </div>
          <div class="section">
            <h3>Basic Information</h3>
            <div class="grid">
              <div class="metric">
                <div class="label">Type</div>
                <div class="value">${machineData.type}</div>
              </div>
              <div class="metric">
                <div class="label">Manufacturer</div>
                <div class="value">${machineData.manufacturer}</div>
              </div>
              <div class="metric">
                <div class="label">Model</div>
                <div class="value">${machineData.model}</div>
              </div>
              <div class="metric">
                <div class="label">Serial Number</div>
                <div class="value">${machineData.serialNumber}</div>
              </div>
            </div>
          </div>
          <div class="section">
            <h3>Performance Metrics</h3>
            <div class="grid">
              <div class="metric">
                <div class="label">Health Score</div>
                <div class="value">${machineData.currentHealth}%</div>
              </div>
              <div class="metric">
                <div class="label">Uptime</div>
                <div class="value">${machineData.uptime}%</div>
              </div>
              <div class="metric">
                <div class="label">Efficiency</div>
                <div class="value">${machineData.efficiency}%</div>
              </div>
              <div class="metric">
                <div class="label">Temperature</div>
                <div class="value">${machineData.temperature}°C</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleScheduleMaintenance = () => {
    navigate('/maintenance/schedule', { state: { machineId: id, machineName: machineData.name } });
  };

  const handleViewHistory = () => {
    navigate('/maintenance/history', { state: { machineId: id } });
  };

  const handleRefreshData = () => {
    showAlert('Machine data refreshed!', 'info');
  };

  const getHealthColor = (health) => {
    if (health > 80) return 'text-green-600 bg-green-100';
    if (health > 60) return 'text-amber-600 bg-amber-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'running': return 'bg-green-500';
      case 'idle': return 'bg-blue-500';
      case 'maintenance': return 'bg-amber-500';
      case 'stopped': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const renderAlertModal = () => {
    if (!showAlertModal) return null;

    const bgColor = alertType === 'success' ? 'bg-green-100 border-green-400' :
                   alertType === 'error' ? 'bg-red-100 border-red-400' :
                   'bg-blue-100 border-blue-400';

    const textColor = alertType === 'success' ? 'text-green-800' :
                     alertType === 'error' ? 'text-red-800' :
                     'text-blue-800';

    return (
      <div className="fixed top-4 right-4 z-50 animate-slide-in">
        <div className={`${bgColor} border ${textColor} px-4 py-3 rounded-lg shadow-lg flex items-center gap-2`}>
          <AlertTriangle size={16} />
          <span className="font-medium">{alertMessage}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {renderAlertModal()}
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{machineData.name}</h1>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getHealthColor(machineData.currentHealth)}`}>
                {machineData.currentHealth}% Health
              </span>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(machineData.status)} text-white`}>
                {machineData.status}
              </span>
            </div>
            <p className="text-gray-600 mt-1">{machineData.type} • {machineData.manufacturer} {machineData.model}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleRefreshData}
            className="mechanical-button-secondary flex items-center gap-2"
          >
            <RotateCw size={16} />
            Refresh
          </button>
          <button 
            onClick={handleExportData}
            className="mechanical-button-secondary flex items-center gap-2"
          >
            <Download size={16} />
            Export
          </button>
          <button 
            onClick={handlePrintReport}
            className="mechanical-button-secondary flex items-center gap-2"
          >
            <Printer size={16} />
            Print
          </button>
          {isEditing ? (
            <div className="flex gap-2">
              <button 
                onClick={handleCancelEdit}
                className="mechanical-button-secondary flex items-center gap-2"
              >
                <X size={16} />
                Cancel
              </button>
              <button 
                onClick={handleEditToggle}
                className="mechanical-button flex items-center gap-2"
              >
                <Save size={16} />
                Save
              </button>
            </div>
          ) : (
            <button 
              onClick={handleEditToggle}
              className="mechanical-button flex items-center gap-2"
            >
              <Edit2 size={16} />
              Edit Details
            </button>
          )}
        </div>
      </div>

      {/* Edit Mode Toggle */}
      {isEditing && (
        <div className="flex gap-2 p-4 bg-blue-50 rounded-lg">
          <button
            onClick={() => setEditMode('basic')}
            className={`px-4 py-2 rounded-lg ${editMode === 'basic' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
          >
            Basic Details
          </button>
          <button
            onClick={() => setEditMode('advanced')}
            className={`px-4 py-2 rounded-lg ${editMode === 'advanced' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
          >
            Advanced Settings
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Basic Info & Metrics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Chart */}
          <div className="mechanical-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Performance Trends (24h)</h3>
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-blue-500" />
                <span className="text-sm text-gray-600">Live Monitoring</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="hour" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="efficiency" stroke="#60a5fa" strokeWidth={2} dot={{ r: 3 }} name="Efficiency %" />
                <Line type="monotone" dataKey="temperature" stroke="#f87171" strokeWidth={2} dot={{ r: 3 }} name="Temperature °C" />
                <Line type="monotone" dataKey="vibration" stroke="#34d399" strokeWidth={2} dot={{ r: 3 }} name="Vibration mm/s" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Machine Details Form */}
          <div className="mechanical-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {isEditing ? 'Edit Machine Details' : 'Machine Details'}
              </h3>
              <div className="flex items-center gap-2">
                <Settings size={16} className="text-gray-500" />
                <span className="text-sm text-gray-600">ID: {machineData.id}</span>
              </div>
            </div>

            {isEditing ? (
              editMode === 'basic' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Machine Name
                      </label>
                      <input
                        type="text"
                        value={machineData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Machine Type
                      </label>
                      <select
                        value={machineData.type}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="CNC Machine">CNC Machine</option>
                        <option value="Hydraulic Press">Hydraulic Press</option>
                        <option value="Assembly Robot">Assembly Robot</option>
                        <option value="Conveyor System">Conveyor System</option>
                        <option value="Cooling System">Cooling System</option>
                        <option value="Welding Machine">Welding Machine</option>
                        <option value="Injection Molding">Injection Molding</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Manufacturer
                      </label>
                      <input
                        type="text"
                        value={machineData.manufacturer}
                        onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Model
                      </label>
                      <input
                        type="text"
                        value={machineData.model}
                        onChange={(e) => handleInputChange('model', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Serial Number
                      </label>
                      <input
                        type="text"
                        value={machineData.serialNumber}
                        onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Installation Date
                      </label>
                      <input
                        type="date"
                        value={machineData.installationDate}
                        onChange={(e) => handleInputChange('installationDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Operator
                      </label>
                      <input
                        type="text"
                        value={machineData.operator}
                        onChange={(e) => handleInputChange('operator', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Department
                      </label>
                      <input
                        type="text"
                        value={machineData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Power Rating
                      </label>
                      <input
                        type="text"
                        value={machineData.powerRating}
                        onChange={(e) => handleInputChange('powerRating', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Voltage
                      </label>
                      <input
                        type="text"
                        value={machineData.voltage}
                        onChange={(e) => handleInputChange('voltage', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dimensions
                      </label>
                      <input
                        type="text"
                        value={machineData.dimensions}
                        onChange={(e) => handleInputChange('dimensions', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Weight
                      </label>
                      <input
                        type="text"
                        value={machineData.weight}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Safety Rating
                      </label>
                      <select
                        value={machineData.safetyRating}
                        onChange={(e) => handleInputChange('safetyRating', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="A">A - Excellent</option>
                        <option value="B">B - Good</option>
                        <option value="C">C - Average</option>
                        <option value="D">D - Needs Improvement</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        value={machineData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Running">Running</option>
                        <option value="Idle">Idle</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Stopped">Stopped</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Health Score
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={machineData.currentHealth}
                        onChange={(e) => handleInputChange('currentHealth', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>0%</span>
                        <span className="font-medium">{machineData.currentHealth}%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Notes
                      </label>
                      <textarea
                        value={machineData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <span className="block text-sm font-medium text-gray-700">Type</span>
                    <span className="text-lg font-semibold text-gray-900">{machineData.type}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-700">Manufacturer</span>
                    <span className="text-lg font-semibold text-gray-900">{machineData.manufacturer}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-700">Model</span>
                    <span className="text-lg font-semibold text-gray-900">{machineData.model}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-700">Serial Number</span>
                    <span className="text-lg font-semibold text-gray-900">{machineData.serialNumber}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="block text-sm font-medium text-gray-700">Installation Date</span>
                    <span className="text-lg font-semibold text-gray-900">{machineData.installationDate}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-700">Operator</span>
                    <span className="text-lg font-semibold text-gray-900">{machineData.operator}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-700">Department</span>
                    <span className="text-lg font-semibold text-gray-900">{machineData.department}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-700">Safety Rating</span>
                    <span className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Shield size={16} className="text-green-600" />
                      {machineData.safetyRating}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Maintenance History */}
          <div className="mechanical-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Maintenance History</h3>
              <button 
                onClick={handleViewHistory}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                View All History →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-medium text-gray-700">Date</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-700">Type</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-700">Technician</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-700">Duration</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-700">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {maintenanceHistory.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                      <td className="py-3 text-sm text-gray-700">{item.date}</td>
                      <td className="py-3">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {item.type}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-700">{item.technician}</td>
                      <td className="py-3 text-sm text-gray-700">{item.duration}</td>
                      <td className="py-3 text-sm font-medium text-gray-900">{item.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Metrics & Quick Actions */}
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="mechanical-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Key Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Gauge size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Health Score</p>
                    <p className="text-2xl font-bold text-gray-900">{machineData.currentHealth}%</p>
                  </div>
                </div>
                <TrendingUp size={20} className="text-green-500" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Clock size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Uptime</p>
                    <p className="text-2xl font-bold text-gray-900">{machineData.uptime}%</p>
                  </div>
                </div>
                <TrendingUp size={20} className="text-green-500" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Thermometer size={20} className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Temperature</p>
                    <p className="text-2xl font-bold text-gray-900">{machineData.temperature}°C</p>
                  </div>
                </div>
                <TrendingUp size={20} className="text-red-500" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Activity size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Vibration</p>
                    <p className="text-2xl font-bold text-gray-900">{machineData.vibration} mm/s</p>
                  </div>
                </div>
                <TrendingDown size={20} className="text-green-500" />
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="mechanical-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Technical Specifications</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Power Rating</span>
                <span className="text-sm font-medium text-gray-900">{machineData.powerRating}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Voltage</span>
                <span className="text-sm font-medium text-gray-900">{machineData.voltage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Frequency</span>
                <span className="text-sm font-medium text-gray-900">{machineData.frequency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Dimensions</span>
                <span className="text-sm font-medium text-gray-900">{machineData.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Weight</span>
                <span className="text-sm font-medium text-gray-900">{machineData.weight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Cycle Time</span>
                <span className="text-sm font-medium text-gray-900">{machineData.cycleTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Energy Consumption</span>
                <span className="text-sm font-medium text-gray-900">{machineData.energyConsumption}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mechanical-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={handleScheduleMaintenance}
                className="w-full mechanical-button-secondary py-3 flex items-center justify-center gap-2"
              >
                <Calendar size={16} />
                Schedule Maintenance
              </button>
              <button 
                onClick={() => navigate('/alerts')}
                className="w-full mechanical-button-secondary py-3 flex items-center justify-center gap-2"
              >
                <AlertTriangle size={16} />
                View Alerts
              </button>
              <button 
                onClick={handleViewHistory}
                className="w-full mechanical-button-secondary py-3 flex items-center justify-center gap-2"
              >
                <History size={16} />
                Full History
              </button>
              <button 
                onClick={() => navigate('/reports')}
                className="w-full mechanical-button py-3 flex items-center justify-center gap-2"
              >
                <BarChart3 size={16} />
                Generate Report
              </button>
            </div>
          </div>

          {/* Upcoming Maintenance */}
          <div className="mechanical-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Upcoming Maintenance</h3>
              <Wrench size={16} className="text-blue-500" />
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">Next Scheduled</p>
                <p className="text-lg font-bold text-gray-900">{machineData.nextMaintenance}</p>
                <p className="text-xs text-gray-600 mt-1">Routine Check</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">Last Maintenance</p>
                <p className="text-lg font-bold text-gray-900">{machineData.lastMaintenance}</p>
                <p className="text-xs text-gray-600 mt-1">Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineDetails;