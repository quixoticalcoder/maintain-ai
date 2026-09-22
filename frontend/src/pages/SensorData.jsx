import React, { useState, useEffect } from 'react';
import {
  Activity,
  Thermometer,
  Gauge,
  Zap,
  RotateCw,
  HardDrive,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Plus,
  Trash2,
  Bell,
  Clock,
  AlertTriangle,
  Settings,
  Database,
  BarChart3,
  X,
  ChevronRight
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const SensorData = () => {
  const [selectedMachine, setSelectedMachine] = useState('CNC Machine #1');
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedSensors, setSelectedSensors] = useState(['temp', 'vibration', 'pressure', 'rpm', 'voltage']);
  const [isLive, setIsLive] = useState(true);
  const [dataPoints, setDataPoints] = useState(50);
  const [showAddChartModal, setShowAddChartModal] = useState(false);
  const [customCharts, setCustomCharts] = useState([]);
  const [selectedChartType, setSelectedChartType] = useState('line');
  const [sensorDetails, setSensorDetails] = useState(null);
  const [sensorReadings, setSensorReadings] = useState([]);
  const [currentReadings, setCurrentReadings] = useState([]);

  // Machine data with realistic sensor data
  const machineData = {
    'CNC Machine #1': {
      id: 'cnc1',
      name: 'CNC Machine #1',
      status: 'healthy',
      online: true,
      sensors: {
        temperature: { current: 58, unit: '°C', min: 35, max: 72, threshold: 65, trend: 'increasing' },
        vibration: { current: 3.2, unit: 'mm/s', min: 1.5, max: 5.8, threshold: 4.0, trend: 'stable' },
        pressure: { current: 130, unit: 'PSI', min: 110, max: 145, threshold: 150, trend: 'decreasing' },
        rpm: { current: 2950, unit: 'RPM', min: 2700, max: 3050, threshold: 3000, trend: 'stable' },
        voltage: { current: 422, unit: 'V', min: 410, max: 430, threshold: 440, trend: 'stable' },
        current: { current: 45, unit: 'A', min: 40, max: 48, threshold: 50, trend: 'stable' },
      }
    },
    'Hydraulic Press': {
      id: 'press2',
      name: 'Hydraulic Press',
      status: 'warning',
      online: true,
      sensors: {
        temperature: { current: 67, unit: '°C', min: 40, max: 80, threshold: 75, trend: 'increasing' },
        vibration: { current: 4.1, unit: 'mm/s', min: 2.0, max: 6.0, threshold: 4.5, trend: 'increasing' },
        pressure: { current: 180, unit: 'PSI', min: 150, max: 200, threshold: 190, trend: 'stable' },
        rpm: { current: 1200, unit: 'RPM', min: 1000, max: 1400, threshold: 1300, trend: 'stable' },
        voltage: { current: 415, unit: 'V', min: 400, max: 425, threshold: 430, trend: 'stable' },
        current: { current: 62, unit: 'A', min: 50, max: 70, threshold: 65, trend: 'increasing' },
      }
    },
    'Assembly Robot': {
      id: 'robot3',
      name: 'Assembly Robot',
      status: 'healthy',
      online: true,
      sensors: {
        temperature: { current: 42, unit: '°C', min: 30, max: 60, threshold: 55, trend: 'stable' },
        vibration: { current: 1.8, unit: 'mm/s', min: 1.0, max: 3.0, threshold: 2.5, trend: 'stable' },
        pressure: { current: 95, unit: 'PSI', min: 80, max: 110, threshold: 105, trend: 'stable' },
        rpm: { current: 4500, unit: 'RPM', min: 4000, max: 5000, threshold: 4800, trend: 'stable' },
        voltage: { current: 240, unit: 'V', min: 220, max: 250, threshold: 245, trend: 'stable' },
        current: { current: 28, unit: 'A', min: 25, max: 35, threshold: 32, trend: 'stable' },
      }
    },
    'Cooling System': {
      id: 'cooling4',
      name: 'Cooling System',
      status: 'critical',
      online: true,
      sensors: {
        temperature: { current: 72, unit: '°C', min: 50, max: 85, threshold: 80, trend: 'increasing' },
        vibration: { current: 5.2, unit: 'mm/s', min: 2.5, max: 7.0, threshold: 6.0, trend: 'increasing' },
        pressure: { current: 85, unit: 'PSI', min: 70, max: 100, threshold: 95, trend: 'decreasing' },
        rpm: { current: 3200, unit: 'RPM', min: 2800, max: 3500, threshold: 3400, trend: 'decreasing' },
        voltage: { current: 418, unit: 'V', min: 400, max: 430, threshold: 425, trend: 'stable' },
        current: { current: 55, unit: 'A', min: 45, max: 60, threshold: 58, trend: 'increasing' },
      }
    },
    'Conveyor Belt': {
      id: 'conveyor5',
      name: 'Conveyor Belt',
      status: 'healthy',
      online: true,
      sensors: {
        temperature: { current: 38, unit: '°C', min: 30, max: 50, threshold: 45, trend: 'stable' },
        vibration: { current: 2.1, unit: 'mm/s', min: 1.0, max: 3.5, threshold: 3.0, trend: 'stable' },
        pressure: { current: 105, unit: 'PSI', min: 90, max: 120, threshold: 115, trend: 'stable' },
        rpm: { current: 1800, unit: 'RPM', min: 1600, max: 2000, threshold: 1950, trend: 'stable' },
        voltage: { current: 408, unit: 'V', min: 400, max: 420, threshold: 415, trend: 'stable' },
        current: { current: 32, unit: 'A', min: 28, max: 40, threshold: 38, trend: 'stable' },
      }
    }
  };

  const machines = Object.values(machineData);

  // Sensor mapping for display
  const sensorOptions = [
    { id: 'temp', label: 'Temperature', color: 'bg-red-100 text-red-700', lineColor: '#f87171', key: 'temperature', icon: Thermometer },
    { id: 'vibration', label: 'Vibration', color: 'bg-blue-100 text-blue-700', lineColor: '#60a5fa', key: 'vibration', icon: Activity },
    { id: 'pressure', label: 'Pressure', color: 'bg-green-100 text-green-700', lineColor: '#34d399', key: 'pressure', icon: Gauge },
    { id: 'rpm', label: 'RPM', color: 'bg-purple-100 text-purple-700', lineColor: '#a78bfa', key: 'rpm', icon: RotateCw },
    { id: 'voltage', label: 'Voltage', color: 'bg-amber-100 text-amber-700', lineColor: '#f59e0b', key: 'voltage', icon: Zap },
    { id: 'current', label: 'Current', color: 'bg-indigo-100 text-indigo-700', lineColor: '#818cf8', key: 'current', icon: HardDrive },
  ];

  // Generate realistic sensor data for the selected machine based on time range
  const generateSensorData = (machineName = selectedMachine, range = timeRange, points = dataPoints) => {
    const machine = machineData[machineName];
    if (!machine || !machine.sensors) {
      return generateFallbackData(points);
    }
    
    const baseData = [];
    const now = new Date();
    
    // Adjust time range multiplier based on selected range
    let timeMultiplier = 1; // Default 24h
    let intervalMinutes = 30; // Default interval in minutes
    
    switch(range) {
      case '1h':
        timeMultiplier = 1/24; // 1 hour
        intervalMinutes = 5;
        break;
      case '6h':
        timeMultiplier = 0.25; // 6 hours
        intervalMinutes = 10;
        break;
      case '24h':
        timeMultiplier = 1; // 24 hours
        intervalMinutes = 30;
        break;
      case '7d':
        timeMultiplier = 7; // 7 days
        intervalMinutes = 120; // 2 hours
        break;
      case '30d':
        timeMultiplier = 30; // 30 days
        intervalMinutes = 1440; // 1 day
        break;
    }
    
    for (let i = points; i >= 0; i--) {
      const timeOffset = i * (timeMultiplier * 24 * 60 * 60 * 1000) / points;
      const time = new Date(now.getTime() - timeOffset);
      const hour = time.getHours();
      const minute = time.getMinutes();
      const day = time.getDate();
      
      // Get machine-specific sensor values
      const tempSensor = machine.sensors.temperature;
      const vibSensor = machine.sensors.vibration;
      const pressSensor = machine.sensors.pressure;
      const rpmSensor = machine.sensors.rpm;
      const voltSensor = machine.sensors.voltage;
      const currSensor = machine.sensors.current;
      
      // Add machine-specific patterns and variations based on time
      let baseTemp, baseVibration, basePressure, baseRpm, baseVoltage, baseCurrent;
      
      if (range === '30d') {
        // Monthly patterns
        baseTemp = tempSensor.current + Math.sin((day/30) * Math.PI) * 10;
        baseVibration = vibSensor.current + Math.cos((day/15) * Math.PI) * 1;
        basePressure = pressSensor.current + Math.sin((day/10) * Math.PI) * 15;
        baseRpm = rpmSensor.current + Math.cos((day/5) * Math.PI) * 200;
        baseVoltage = voltSensor.current + Math.sin((day/7) * Math.PI) * 5;
        baseCurrent = currSensor.current + Math.cos((day/8) * Math.PI) * 3;
      } else if (range === '7d') {
        // Weekly patterns
        baseTemp = tempSensor.current + Math.sin((hour/24 + day) * Math.PI) * 8;
        baseVibration = vibSensor.current + Math.cos((hour/12 + day) * Math.PI) * 0.8;
        basePressure = pressSensor.current + Math.sin((hour/8 + day) * Math.PI) * 12;
        baseRpm = rpmSensor.current + Math.cos((hour/6 + day) * Math.PI) * 150;
        baseVoltage = voltSensor.current + Math.sin((hour/12 + day) * Math.PI) * 4;
        baseCurrent = currSensor.current + Math.cos((hour/8 + day) * Math.PI) * 2.5;
      } else {
        // Daily patterns
        baseTemp = tempSensor.current + Math.sin(hour / 24 * Math.PI) * 5;
        baseVibration = vibSensor.current + Math.cos(hour / 12 * Math.PI) * 0.5;
        basePressure = pressSensor.current + Math.sin(hour / 8 * Math.PI) * 8;
        baseRpm = rpmSensor.current + Math.cos(hour / 6 * Math.PI) * 100;
        baseVoltage = voltSensor.current + Math.sin(hour / 12 * Math.PI) * 3;
        baseCurrent = currSensor.current + Math.cos(hour / 8 * Math.PI) * 2;
      }
      
      // Add random noise
      const noiseFactor = range.includes('d') ? 0.5 : 1; // Less noise for longer ranges
      const temperature = Math.round((baseTemp + (Math.random() * 2 - 1) * noiseFactor) * 10) / 10;
      const vibration = Math.max(0.5, Math.round((baseVibration + (Math.random() * 0.3 - 0.15) * noiseFactor) * 10) / 10);
      const pressure = Math.round(basePressure + (Math.random() * 3 - 1.5) * noiseFactor);
      const rpm = Math.round(baseRpm + (Math.random() * 50 - 25) * noiseFactor);
      const voltage = Math.round((baseVoltage + (Math.random() * 1 - 0.5) * noiseFactor) * 10) / 10;
      const current = Math.round((baseCurrent + (Math.random() * 0.5 - 0.25) * noiseFactor) * 10) / 10;
      
      // Format time based on range
      let timeDisplay;
      if (range === '30d') {
        timeDisplay = time.toLocaleDateString([], { month: 'short', day: 'numeric' });
      } else if (range === '7d') {
        timeDisplay = time.toLocaleDateString([], { weekday: 'short', hour: '2-digit' });
      } else {
        timeDisplay = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      
      baseData.push({
        time: timeDisplay,
        timestamp: time.toISOString(),
        temperature,
        vibration,
        pressure,
        rpm,
        voltage,
        current
      });
    }
    
    return baseData.reverse();
  };

  // Fallback data generation
  const generateFallbackData = (points = 50) => {
    const baseData = [];
    const now = new Date();
    
    for (let i = points; i >= 0; i--) {
      const timeOffset = i * (24 * 60 * 60 * 1000) / points;
      const time = new Date(now.getTime() - timeOffset);
      
      baseData.push({
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: time.toISOString(),
        temperature: 50 + Math.random() * 10,
        vibration: 2.5 + Math.random() * 1,
        pressure: 120 + Math.random() * 20,
        rpm: 2800 + Math.random() * 200,
        voltage: 415 + Math.random() * 10,
        current: 45 + Math.random() * 5
      });
    }
    
    return baseData.reverse();
  };

  // Initialize data on component mount
  useEffect(() => {
    // Generate initial sensor data
    const initialData = generateSensorData('CNC Machine #1', '24h', 50);
    setSensorReadings(initialData);
    
    // Set current readings for selected machine
    updateCurrentReadings('CNC Machine #1');
  }, []);

  // Update current readings when machine changes
  const updateCurrentReadings = (machineName) => {
    const machine = machineData[machineName];
    if (!machine) return;

    const readings = [
      { 
        sensor: 'Temperature', 
        value: `${machine.sensors.temperature.current}${machine.sensors.temperature.unit}`, 
        unit: 'Celsius', 
        icon: Thermometer, 
        status: machine.sensors.temperature.current > machine.sensors.temperature.threshold * 0.9 ? 'warning' : 'healthy',
        threshold: `${machine.sensors.temperature.threshold}${machine.sensors.temperature.unit}`,
        min: `${machine.sensors.temperature.min}${machine.sensors.temperature.unit}`,
        max: `${machine.sensors.temperature.max}${machine.sensors.temperature.unit}`,
        trend: machine.sensors.temperature.trend
      },
      { 
        sensor: 'Vibration', 
        value: `${machine.sensors.vibration.current}${machine.sensors.vibration.unit}`, 
        unit: 'Velocity', 
        icon: Activity, 
        status: machine.sensors.vibration.current > machine.sensors.vibration.threshold * 0.9 ? 'warning' : 'healthy',
        threshold: `${machine.sensors.vibration.threshold}${machine.sensors.vibration.unit}`,
        min: `${machine.sensors.vibration.min}${machine.sensors.vibration.unit}`,
        max: `${machine.sensors.vibration.max}${machine.sensors.vibration.unit}`,
        trend: machine.sensors.vibration.trend
      },
      { 
        sensor: 'Pressure', 
        value: `${machine.sensors.pressure.current}${machine.sensors.pressure.unit}`, 
        unit: 'Pressure', 
        icon: Gauge, 
        status: machine.sensors.pressure.current > machine.sensors.pressure.threshold * 0.9 ? 'warning' : 'healthy',
        threshold: `${machine.sensors.pressure.threshold}${machine.sensors.pressure.unit}`,
        min: `${machine.sensors.pressure.min}${machine.sensors.pressure.unit}`,
        max: `${machine.sensors.pressure.max}${machine.sensors.pressure.unit}`,
        trend: machine.sensors.pressure.trend
      },
      { 
        sensor: 'RPM', 
        value: `${machine.sensors.rpm.current}${machine.sensors.rpm.unit}`, 
        unit: 'Revolutions', 
        icon: RotateCw, 
        status: machine.sensors.rpm.current > machine.sensors.rpm.threshold * 0.95 ? 'warning' : 'healthy',
        threshold: `${machine.sensors.rpm.threshold}${machine.sensors.rpm.unit}`,
        min: `${machine.sensors.rpm.min}${machine.sensors.rpm.unit}`,
        max: `${machine.sensors.rpm.max}${machine.sensors.rpm.unit}`,
        trend: machine.sensors.rpm.trend
      },
      { 
        sensor: 'Voltage', 
        value: `${machine.sensors.voltage.current}${machine.sensors.voltage.unit}`, 
        unit: 'Electrical', 
        icon: Zap, 
        status: machine.sensors.voltage.current > machine.sensors.voltage.threshold * 0.95 ? 'warning' : 'healthy',
        threshold: `${machine.sensors.voltage.threshold}${machine.sensors.voltage.unit}`,
        min: `${machine.sensors.voltage.min}${machine.sensors.voltage.unit}`,
        max: `${machine.sensors.voltage.max}${machine.sensors.voltage.unit}`,
        trend: machine.sensors.voltage.trend
      },
      { 
        sensor: 'Current', 
        value: `${machine.sensors.current.current}${machine.sensors.current.unit}`, 
        unit: 'Amperage', 
        icon: HardDrive, 
        status: machine.sensors.current.current > machine.sensors.current.threshold * 0.95 ? 'warning' : 'healthy',
        threshold: `${machine.sensors.current.threshold}${machine.sensors.current.unit}`,
        min: `${machine.sensors.current.min}${machine.sensors.current.unit}`,
        max: `${machine.sensors.current.max}${machine.sensors.current.unit}`,
        trend: machine.sensors.current.trend
      },
    ];
    
    setCurrentReadings(readings);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-amber-600 bg-amber-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusBgColor = (status) => {
    switch(status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-amber-100 text-amber-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleExportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + [
        "Timestamp,Temperature (°C),Vibration (mm/s),Pressure (PSI),RPM,Voltage (V),Current (A),Machine",
        ...sensorReadings.map(row => 
          `${row.timestamp},${row.temperature},${row.vibration},${row.pressure},${row.rpm},${row.voltage},${row.current},${selectedMachine}`
        )
      ].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sensor_data_${selectedMachine.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert(`Sensor data for ${selectedMachine} exported as CSV!`);
  };

  const handleRefreshData = () => {
    const newData = generateSensorData(selectedMachine, timeRange, dataPoints);
    setSensorReadings(newData);
    
    // Update current readings
    updateCurrentReadings(selectedMachine);
    
    alert(`Sensor data for ${selectedMachine} refreshed!`);
  };

  const handleToggleLive = () => {
    setIsLive(!isLive);
  };

  const handleSensorSelect = (sensor) => {
    if (selectedSensors.includes(sensor)) {
      setSelectedSensors(selectedSensors.filter(s => s !== sensor));
    } else {
      setSelectedSensors([...selectedSensors, sensor]);
    }
  };

  const handleSetAlert = (reading) => {
    const threshold = parseFloat(reading.threshold);
    const current = parseFloat(reading.value);
    const alertThreshold = threshold * 0.9; // Alert at 90% of threshold
    
    alert(`Alert set for ${reading.sensor}!\nCurrent: ${reading.value}\nThreshold: ${reading.threshold}\nWill alert at ${alertThreshold.toFixed(1)}${reading.value.replace(/[0-9.]/g, '')}`);
  };

  const handleViewDetails = (reading) => {
    const machine = machineData[selectedMachine];
    if (!machine) return;
    
    const sensorKey = reading.sensor.toLowerCase();
    const sensorData = machine.sensors[sensorKey] || {};
    
    setSensorDetails({
      name: reading.sensor,
      machine: selectedMachine,
      current: reading.value,
      status: reading.status,
      trend: reading.trend,
      min: reading.min,
      max: reading.max,
      threshold: reading.threshold,
      history: sensorReadings.slice(-20).map(r => ({
        time: r.time,
        value: r[sensorKey] || 0
      }))
    });
  };

  const handleAddCustomChart = () => {
    setShowAddChartModal(true);
  };

  const handleCreateCustomChart = () => {
    const newChart = {
      id: Date.now(),
      title: `Custom Chart ${customCharts.length + 1}`,
      type: selectedChartType,
      sensors: [...selectedSensors],
      machine: selectedMachine,
      timeRange: timeRange
    };
    
    setCustomCharts([...customCharts, newChart]);
    setShowAddChartModal(false);
    alert('Custom chart added!');
  };

  const handleDataPointsChange = (points) => {
    setDataPoints(points);
    const newData = generateSensorData(selectedMachine, timeRange, points);
    setSensorReadings(newData);
  };

  const handleMachineSelect = (machineName) => {
    setSelectedMachine(machineName);
    
    // Generate new data for selected machine with current settings
    const newData = generateSensorData(machineName, timeRange, dataPoints);
    setSensorReadings(newData);
    
    // Update current readings
    updateCurrentReadings(machineName);
    
    // Clear any selected sensor details
    setSensorDetails(null);
  };

  const handleClearFilters = () => {
    setSelectedSensors(['temp', 'vibration', 'pressure', 'rpm', 'voltage']);
    setTimeRange('24h');
    setDataPoints(50);
    setSensorDetails(null);
    
    // Refresh data with cleared filters
    const newData = generateSensorData(selectedMachine, '24h', 50);
    setSensorReadings(newData);
    
    alert('All filters cleared!');
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    
    // Adjust data points based on time range
    let points = dataPoints;
    switch(range) {
      case '1h': points = 12; break; // 5 minute intervals
      case '6h': points = 36; break; // 10 minute intervals
      case '24h': points = 48; break; // 30 minute intervals
      case '7d': points = 84; break; // 2 hour intervals
      case '30d': points = 30; break; // daily intervals
    }
    
    setDataPoints(points);
    const newData = generateSensorData(selectedMachine, range, points);
    setSensorReadings(newData);
  };

  const handleRemoveCustomChart = (chartId) => {
    setCustomCharts(customCharts.filter(chart => chart.id !== chartId));
  };

  // Simulate live data updates
  useEffect(() => {
    let interval;
    
    if (isLive) {
      interval = setInterval(() => {
        // Get the last reading or create a default one
        const lastReading = sensorReadings[sensorReadings.length - 1] || {
          temperature: 50,
          vibration: 2.5,
          pressure: 120,
          rpm: 2800,
          voltage: 415,
          current: 45
        };
        
        const newTime = new Date();
        const newReading = {
          time: newTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          timestamp: newTime.toISOString(),
          temperature: Math.max(20, Math.min(80, lastReading.temperature + (Math.random() * 0.3 - 0.15))),
          vibration: Math.max(0.5, lastReading.vibration + (Math.random() * 0.1 - 0.05)),
          pressure: Math.max(80, Math.min(200, lastReading.pressure + (Math.random() * 1 - 0.5))),
          rpm: Math.max(2500, Math.min(3500, lastReading.rpm + (Math.random() * 10 - 5))),
          voltage: Math.max(400, Math.min(430, lastReading.voltage + (Math.random() * 0.2 - 0.1))),
          current: Math.max(20, Math.min(70, lastReading.current + (Math.random() * 0.1 - 0.05))),
        };
        
        // Add new reading and limit total readings to 100
        setSensorReadings(prev => {
          const newReadings = [...prev, newReading];
          return newReadings.length > 100 ? newReadings.slice(-100) : newReadings;
        });
      }, 5000); // Update every 5 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLive, sensorReadings.length]);

  // Add Custom Chart Modal
  const renderAddChartModal = () => {
    if (!showAddChartModal) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4 text-center">
          <div 
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={() => setShowAddChartModal(false)}
          />
          
          <div className="relative transform overflow-hidden rounded-lg mechanical-card text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Add Custom Chart</h3>
                <button
                  onClick={() => setShowAddChartModal(false)}
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chart Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['line', 'area', 'bar'].map(type => (
                      <button
                        key={type}
                        onClick={() => setSelectedChartType(type)}
                        className={`p-3 rounded-lg border flex flex-col items-center gap-2 ${
                          selectedChartType === type
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <BarChart3 size={20} />
                        <span className="text-sm capitalize">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Sensors
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {sensorOptions.map(sensor => (
                      <button
                        key={sensor.id}
                        onClick={() => {
                          if (selectedSensors.includes(sensor.id)) {
                            setSelectedSensors(selectedSensors.filter(s => s !== sensor.id));
                          } else {
                            setSelectedSensors([...selectedSensors, sensor.id]);
                          }
                        }}
                        className={`px-3 py-2 rounded-lg border text-sm ${
                          selectedSensors.includes(sensor.id)
                            ? `${sensor.color} border-transparent`
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {sensor.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Range
                  </label>
                  <select 
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="1h">Last 1 Hour</option>
                    <option value="6h">Last 6 Hours</option>
                    <option value="24h">Last 24 Hours</option>
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                  </select>
                </div>
                
                <div className="pt-4">
                  <p className="text-sm text-gray-600">
                    Machine: <span className="font-medium">{selectedMachine}</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={handleCreateCustomChart}
                className="mechanical-button flex items-center justify-center gap-2 w-full sm:w-auto sm:ml-3"
              >
                <Plus size={16} />
                Create Chart
              </button>
              <button
                type="button"
                onClick={() => setShowAddChartModal(false)}
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

  // Sensor Details Modal
  const renderSensorDetails = () => {
    if (!sensorDetails) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4 text-center">
          <div 
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={() => setSensorDetails(null)}
          />
          
          <div className="relative transform overflow-hidden rounded-lg mechanical-card text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{sensorDetails.name}</h3>
                  <p className="text-sm text-gray-600">Sensor Details for {sensorDetails.machine}</p>
                </div>
                <button
                  onClick={() => setSensorDetails(null)}
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="mechanical-card p-4">
                    <p className="text-sm text-gray-600">Current Value</p>
                    <p className="text-2xl font-bold text-gray-900">{sensorDetails.current}</p>
                  </div>
                  
                  <div className="mechanical-card p-4">
                    <p className="text-sm text-gray-600">Status</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-3 h-3 rounded-full ${
                        sensorDetails.status === 'healthy' ? 'bg-green-500' :
                        sensorDetails.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                      }`} />
                      <span className="font-medium capitalize">{sensorDetails.status}</span>
                    </div>
                  </div>
                  
                  <div className="mechanical-card p-4">
                    <p className="text-sm text-gray-600">Trend</p>
                    <p className="font-medium capitalize">{sensorDetails.trend}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="mechanical-card p-4">
                    <p className="text-sm text-gray-600">Thresholds</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Min:</span>
                        <span className="font-medium">{sensorDetails.min}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Max:</span>
                        <span className="font-medium">{sensorDetails.max}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Alert:</span>
                        <span className="font-medium text-amber-600">{sensorDetails.threshold}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mechanical-card p-4">
                    <p className="text-sm text-gray-600">Recent History</p>
                    <div className="mt-2">
                      <ResponsiveContainer width="100%" height={100}>
                        <LineChart data={sensorDetails.history}>
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#4f46e5" 
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => handleSetAlert({ 
                      sensor: sensorDetails.name, 
                      value: sensorDetails.current,
                      threshold: sensorDetails.threshold 
                    })}
                    className="mechanical-button-secondary flex items-center gap-2"
                  >
                    <Bell size={16} />
                    Set Alert
                  </button>
                  <button
                    onClick={() => {
                      alert(`Configuring ${sensorDetails.name} sensor...`);
                      setSensorDetails(null);
                    }}
                    className="mechanical-button flex items-center gap-2"
                  >
                    <Settings size={16} />
                    Configure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Custom Charts Display
  const renderCustomCharts = () => {
    if (customCharts.length === 0) return null;

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Custom Charts</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {customCharts.map(chart => {
            // Filter readings based on chart sensors
            const filteredReadings = sensorReadings.slice(-dataPoints).map(reading => {
              const filteredReading = { time: reading.time };
              sensorOptions.forEach(sensor => {
                if (chart.sensors.includes(sensor.id)) {
                  filteredReading[sensor.key] = reading[sensor.key];
                }
              });
              return filteredReading;
            });

            return (
              <div key={chart.id} className="mechanical-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">{chart.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{chart.machine}</span>
                    <button
                      onClick={() => handleRemoveCustomChart(chart.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                
                <ResponsiveContainer width="100%" height={200}>
                  {chart.type === 'line' ? (
                    <LineChart data={filteredReadings}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="time" stroke="#6b7280" fontSize={10} />
                      <YAxis stroke="#6b7280" fontSize={10} />
                      <Tooltip />
                      <Legend />
                      {chart.sensors.includes('temp') && (
                        <Line type="monotone" dataKey="temperature" stroke="#f87171" strokeWidth={1.5} />
                      )}
                      {chart.sensors.includes('vibration') && (
                        <Line type="monotone" dataKey="vibration" stroke="#60a5fa" strokeWidth={1.5} />
                      )}
                      {chart.sensors.includes('pressure') && (
                        <Line type="monotone" dataKey="pressure" stroke="#34d399" strokeWidth={1.5} />
                      )}
                      {chart.sensors.includes('rpm') && (
                        <Line type="monotone" dataKey="rpm" stroke="#a78bfa" strokeWidth={1.5} />
                      )}
                      {chart.sensors.includes('voltage') && (
                        <Line type="monotone" dataKey="voltage" stroke="#f59e0b" strokeWidth={1.5} />
                      )}
                      {chart.sensors.includes('current') && (
                        <Line type="monotone" dataKey="current" stroke="#818cf8" strokeWidth={1.5} />
                      )}
                    </LineChart>
                  ) : chart.type === 'area' ? (
                    <AreaChart data={filteredReadings}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="time" stroke="#6b7280" fontSize={10} />
                      <YAxis stroke="#6b7280" fontSize={10} />
                      <Tooltip />
                      <Legend />
                      {chart.sensors.includes('temp') && (
                        <Area type="monotone" dataKey="temperature" stroke="#f87171" fill="#f87171" fillOpacity={0.2} />
                      )}
                      {chart.sensors.includes('vibration') && (
                        <Area type="monotone" dataKey="vibration" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.2} />
                      )}
                    </AreaChart>
                  ) : (
                    <BarChart data={filteredReadings.slice(-10)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="time" stroke="#6b7280" fontSize={10} />
                      <YAxis stroke="#6b7280" fontSize={10} />
                      <Tooltip />
                      <Legend />
                      {chart.sensors.includes('temp') && (
                        <Bar dataKey="temperature" fill="#f87171" />
                      )}
                      {chart.sensors.includes('vibration') && (
                        <Bar dataKey="vibration" fill="#60a5fa" />
                      )}
                    </BarChart>
                  )}
                </ResponsiveContainer>
                
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                  <span>Time Range: {chart.timeRange}</span>
                  <span>{chart.sensors.length} sensors</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Filter sensor readings based on selected sensors for charts
  const getFilteredReadings = () => {
    return sensorReadings.map(reading => {
      const filteredReading = { time: reading.time };
      sensorOptions.forEach(sensor => {
        if (selectedSensors.includes(sensor.id)) {
          filteredReading[sensor.key] = reading[sensor.key];
        }
      });
      return filteredReading;
    }).slice(-dataPoints);
  };

  // Get current machine status
  const currentMachine = machineData[selectedMachine];

  return (
    <div className="space-y-6">
      {renderAddChartModal()}
      {renderSensorDetails()}
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sensor Data Monitoring</h1>
          <p className="text-gray-600">Real-time sensor readings and historical trends</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportData}
            className="mechanical-button flex items-center gap-2"
          >
            <Download size={16} />
            Export Data
          </button>
          <button 
            onClick={handleRefreshData}
            className="mechanical-button-secondary flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Machine Selector and Status */}
      <div className="mechanical-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Select Machine</h3>
            <div className="flex flex-wrap gap-2">
              {machines.map((machine) => (
                <button
                  key={machine.id}
                  onClick={() => handleMachineSelect(machine.name)}
                  className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 ${
                    selectedMachine === machine.name
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      machine.status === 'healthy' ? 'bg-green-500' :
                      machine.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                    }`} />
                    {machine.name}
                    {machine.online ? (
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {currentMachine && (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Current Machine Status</p>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBgColor(currentMachine.status)}`}>
                    {currentMachine.status.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-500">
                    {currentMachine.online ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Control Panel */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time Range
                </label>
                <select 
                  value={timeRange}
                  onChange={(e) => handleTimeRangeChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="1h">Last 1 Hour</option>
                  <option value="6h">Last 6 Hours</option>
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Points
                </label>
                <div className="flex gap-2">
                  {[12, 24, 50, 100].map(points => (
                    <button
                      key={points}
                      onClick={() => handleDataPointsChange(points)}
                      className={`px-3 py-1 rounded text-sm ${
                        dataPoints === points
                          ? 'bg-blue-100 text-blue-700 border border-blue-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {points}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleToggleLive}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  isLive
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                {isLive ? 'Live Data' : 'Paused'}
              </button>

              <button
                onClick={handleAddCustomChart}
                className="mechanical-button flex items-center gap-2"
              >
                <Plus size={16} />
                Add Chart
              </button>
            </div>
          </div>

          {/* Sensor Selection */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-gray-700">Select Sensors to Display:</p>
              <button
                onClick={handleClearFilters}
                className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
              >
                <Trash2 size={14} />
                Clear Filters
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {sensorOptions.map(sensor => (
                <button
                  key={sensor.id}
                  onClick={() => handleSensorSelect(sensor.id)}
                  className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
                    selectedSensors.includes(sensor.id)
                      ? `${sensor.color} border-transparent`
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {sensor.label}
                  {selectedSensors.includes(sensor.id) && <ChevronRight size={14} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Current Readings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentReadings.map((reading, index) => {
          const Icon = reading.icon;
          return (
            <div key={index} className="mechanical-card p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getStatusColor(reading.status)}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{reading.sensor}</h3>
                    <p className="text-sm text-gray-500">{reading.unit}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusBgColor(reading.status)}`}>
                    {reading.status.toUpperCase()}
                  </span>
                  <button
                    onClick={() => handleViewDetails(reading)}
                    className="text-gray-400 hover:text-gray-600"
                    title="View Details"
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{reading.value}</p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Min: {reading.min}</span>
                  <span className="text-gray-600">Max: {reading.max}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      reading.status === 'healthy' ? 'bg-green-500' :
                      reading.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(100, (parseFloat(reading.value) / parseFloat(reading.threshold)) * 100)}%` }}
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleSetAlert(reading)}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Bell size={14} />
                  Set Alert
                </button>
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <Clock size={14} />
                  Trend: {reading.trend}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Charts Section */}
      {renderCustomCharts()}

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temperature & Vibration */}
        <div className="mechanical-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Temperature & Vibration</h3>
            <div className="flex items-center gap-2">
              <Thermometer size={16} className="text-red-500" />
              <Activity size={16} className="text-blue-500" />
              <span className="text-sm text-gray-600">{selectedMachine}</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={getFilteredReadings()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="time" 
                stroke="#6b7280"
                tick={{ fontSize: 12 }}
              />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              {selectedSensors.includes('temp') && (
                <Area 
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="#f87171" 
                  fill="#fca5a5" 
                  fillOpacity={0.3} 
                  name="Temperature (°C)" 
                />
              )}
              {selectedSensors.includes('vibration') && (
                <Area 
                  type="monotone" 
                  dataKey="vibration" 
                  stroke="#60a5fa" 
                  fill="#93c5fd" 
                  fillOpacity={0.3} 
                  name="Vibration (mm/s)" 
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pressure, RPM & Voltage */}
        <div className="mechanical-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Pressure, RPM & Voltage</h3>
            <div className="flex items-center gap-2">
              <Gauge size={16} className="text-green-500" />
              <RotateCw size={16} className="text-purple-500" />
              <Zap size={16} className="text-amber-500" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={getFilteredReadings()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="time" 
                stroke="#6b7280"
                tick={{ fontSize: 12 }}
              />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              {selectedSensors.includes('pressure') && (
                <Line 
                  type="monotone" 
                  dataKey="pressure" 
                  stroke="#34d399" 
                  strokeWidth={2} 
                  dot={false} 
                  name="Pressure (PSI)" 
                />
              )}
              {selectedSensors.includes('rpm') && (
                <Line 
                  type="monotone" 
                  dataKey="rpm" 
                  stroke="#a78bfa" 
                  strokeWidth={2} 
                  dot={false} 
                  name="RPM" 
                />
              )}
              {selectedSensors.includes('voltage') && (
                <Line 
                  type="monotone" 
                  dataKey="voltage" 
                  stroke="#f59e0b" 
                  strokeWidth={2} 
                  dot={false} 
                  name="Voltage (V)" 
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Raw Data Table */}
      <div className="mechanical-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Raw Sensor Data - {selectedMachine}</h3>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleExportData}
              className="mechanical-button-secondary flex items-center gap-2"
            >
              <Download size={16} />
              Export CSV
            </button>
            <button 
              onClick={handleRefreshData}
              className="mechanical-button-secondary flex items-center gap-2"
            >
              <RefreshCw size={16} />
              Refresh Table
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Timestamp</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Temperature (°C)</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Vibration (mm/s)</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Pressure (PSI)</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">RPM</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Voltage (V)</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Current (A)</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sensorReadings.slice(-10).map((reading, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 last:border-0">
                  <td className="py-3 px-4 text-sm text-gray-900">{reading.time}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        reading.temperature > 60 ? 'bg-red-500' : 
                        reading.temperature > 55 ? 'bg-amber-500' : 'bg-green-500'
                      }`} />
                      <span className={`text-sm font-medium ${
                        reading.temperature > 60 ? 'text-red-600' : 
                        reading.temperature > 55 ? 'text-amber-600' : 'text-green-600'
                      }`}>
                        {reading.temperature.toFixed(1)}°C
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">{reading.vibration.toFixed(1)} mm/s</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{reading.pressure} PSI</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{reading.rpm}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{reading.voltage.toFixed(1)} V</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{reading.current.toFixed(1)} A</td>
                  <td className="py-3 px-4">
                    <button 
                      onClick={() => {
                        alert(`Analyzing data point from ${reading.time}\nTemperature: ${reading.temperature}°C\nVibration: ${reading.vibration} mm/s\nPressure: ${reading.pressure} PSI\nRPM: ${reading.rpm}\nVoltage: ${reading.voltage}V\nCurrent: ${reading.current}A`);
                      }}
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      Analyze
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing last 10 of {sensorReadings.length} readings for {selectedMachine}
          </p>
          <button 
            onClick={() => alert(`Viewing all ${sensorReadings.length} data points for ${selectedMachine}`)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All Data →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SensorData;