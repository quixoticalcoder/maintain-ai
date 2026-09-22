import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  TrendingUp,
  Clock,
  BarChart3,
  Target,
  Shield,
  Download,
  Eye,
  RefreshCw,
  Filter,
  Calendar,
  Users,
  Wrench,
  FileText,
  ChevronRight,
  Plus,
  TrendingDown
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
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Predictions = () => {
  const [selectedModel, setSelectedModel] = useState('random-forest');
  const [timeRange, setTimeRange] = useState('30d');
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [predictionHistory, setPredictionHistory] = useState([]);

  // Model-specific dummy data
  const modelData = {
    'random-forest': {
      performance: { accuracy: 92, precision: 89, recall: 91, f1: 90 },
      predictions: [
        { id: 1, machine: 'Hydraulic Press', component: 'Main Bearing', probability: 87, eta: '48h', priority: 'high' },
        { id: 2, machine: 'CNC Machine #1', component: 'Spindle Motor', probability: 65, eta: '72h', priority: 'medium' },
        { id: 3, machine: 'Cooling System', component: 'Pump Assembly', probability: 42, eta: '120h', priority: 'low' },
      ],
      features: ['Temperature', 'Vibration', 'Load Cycles', 'Pressure', 'RPM']
    },
    'xgboost': {
      performance: { accuracy: 94, precision: 91, recall: 93, f1: 92 },
      predictions: [
        { id: 1, machine: 'Hydraulic Press', component: 'Main Bearing', probability: 92, eta: '36h', priority: 'high' },
        { id: 2, machine: 'Assembly Robot', component: 'Axis Motor', probability: 78, eta: '96h', priority: 'medium' },
        { id: 3, machine: 'Conveyor Belt', component: 'Drive Motor', probability: 55, eta: '144h', priority: 'low' },
      ],
      features: ['Temperature', 'Vibration', 'Current', 'Voltage', 'Power']
    },
    'lstm': {
      performance: { accuracy: 89, precision: 87, recall: 88, f1: 87 },
      predictions: [
        { id: 1, machine: 'Cooling System', component: 'Heat Exchanger', probability: 81, eta: '60h', priority: 'high' },
        { id: 2, machine: 'CNC Machine #2', component: 'Tool Head', probability: 72, eta: '84h', priority: 'medium' },
        { id: 3, machine: 'Hydraulic Press', component: 'Seals', probability: 48, eta: '168h', priority: 'low' },
      ],
      features: ['Temperature', 'Pressure', 'Flow Rate', 'Vibration', 'Time Series']
    },
    'ensemble': {
      performance: { accuracy: 96, precision: 94, recall: 95, f1: 94 },
      predictions: [
        { id: 1, machine: 'Hydraulic Press', component: 'Main Bearing', probability: 95, eta: '24h', priority: 'high' },
        { id: 2, machine: 'Assembly Robot', component: 'Gripper', probability: 83, eta: '48h', priority: 'high' },
        { id: 3, machine: 'Cooling System', component: 'Pump', probability: 67, eta: '96h', priority: 'medium' },
      ],
      features: ['All Sensors', 'Historical Data', 'Maintenance Logs', 'Environmental']
    }
  };

  // Dummy data for charts
  const timeToFailureData = {
    'random-forest': [
      { month: 'Jan', predicted: 12, actual: 10 },
      { month: 'Feb', predicted: 15, actual: 14 },
      { month: 'Mar', predicted: 18, actual: 17 },
      { month: 'Apr', predicted: 14, actual: 13 },
      { month: 'May', predicted: 16, actual: 15 },
      { month: 'Jun', predicted: 20, actual: 18 },
    ],
    'xgboost': [
      { month: 'Jan', predicted: 10, actual: 9 },
      { month: 'Feb', predicted: 13, actual: 12 },
      { month: 'Mar', predicted: 16, actual: 15 },
      { month: 'Apr', predicted: 12, actual: 11 },
      { month: 'May', predicted: 14, actual: 13 },
      { month: 'Jun', predicted: 18, actual: 17 },
    ],
    'lstm': [
      { month: 'Jan', predicted: 11, actual: 10 },
      { month: 'Feb', predicted: 14, actual: 13 },
      { month: 'Mar', predicted: 17, actual: 16 },
      { month: 'Apr', predicted: 13, actual: 12 },
      { month: 'May', predicted: 15, actual: 14 },
      { month: 'Jun', predicted: 19, actual: 18 },
    ],
    'ensemble': [
      { month: 'Jan', predicted: 9, actual: 8 },
      { month: 'Feb', predicted: 12, actual: 11 },
      { month: 'Mar', predicted: 15, actual: 14 },
      { month: 'Apr', predicted: 11, actual: 10 },
      { month: 'May', predicted: 13, actual: 12 },
      { month: 'Jun', predicted: 17, actual: 16 },
    ]
  };

  const riskFactorsData = {
    'random-forest': [
      { factor: 'Temperature', value: 85, impact: 'High' },
      { factor: 'Vibration', value: 78, impact: 'High' },
      { factor: 'Load Cycles', value: 65, impact: 'Medium' },
      { factor: 'Age', value: 42, impact: 'Low' },
      { factor: 'Lubrication', value: 58, impact: 'Medium' },
    ],
    'xgboost': [
      { factor: 'Current', value: 92, impact: 'High' },
      { factor: 'Temperature', value: 81, impact: 'High' },
      { factor: 'Voltage', value: 72, impact: 'Medium' },
      { factor: 'Power', value: 65, impact: 'Medium' },
      { factor: 'Efficiency', value: 48, impact: 'Low' },
    ],
    'lstm': [
      { factor: 'Time Series', value: 88, impact: 'High' },
      { factor: 'Pressure', value: 76, impact: 'High' },
      { factor: 'Flow Rate', value: 69, impact: 'Medium' },
      { factor: 'Temperature', value: 64, impact: 'Medium' },
      { factor: 'Historical', value: 52, impact: 'Low' },
    ],
    'ensemble': [
      { factor: 'Sensor Fusion', value: 95, impact: 'High' },
      { factor: 'Pattern Recognition', value: 89, impact: 'High' },
      { factor: 'Historical Data', value: 78, impact: 'Medium' },
      { factor: 'Real-time Analysis', value: 72, impact: 'Medium' },
      { factor: 'Environmental', value: 61, impact: 'Low' },
    ]
  };

  const failureDistribution = [
    { name: 'Bearing Wear', value: 35, color: '#f87171' },
    { name: 'Overheating', value: 25, color: '#fbbf24' },
    { name: 'Vibration', value: 20, color: '#60a5fa' },
    { name: 'Lubrication', value: 15, color: '#34d399' },
    { name: 'Electrical', value: 5, color: '#a78bfa' },
  ];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'high': return <AlertTriangle size={14} className="text-red-500" />;
      case 'medium': return <AlertTriangle size={14} className="text-amber-500" />;
      case 'low': return <AlertTriangle size={14} className="text-green-500" />;
    }
  };

  const handleExportReport = () => {
    console.log(`Exporting report for ${selectedModel} model`);
    
    // Create CSV content
    const currentModel = modelData[selectedModel];
    const csvContent = [
      ['Model', 'Accuracy', 'Precision', 'Recall', 'F1 Score'],
      [selectedModel.toUpperCase(), 
       currentModel.performance.accuracy + '%',
       currentModel.performance.precision + '%',
       currentModel.performance.recall + '%',
       currentModel.performance.f1 + '%'
      ],
      [],
      ['Predictions', 'Machine', 'Component', 'Probability', 'ETA', 'Priority'],
      ...currentModel.predictions.map(p => [
        p.id, p.machine, p.component, p.probability + '%', p.eta, p.priority.toUpperCase()
      ])
    ].map(row => row.join(',')).join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `predictions_report_${selectedModel}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    alert(`Report for ${selectedModel} model exported successfully!`);
  };

  const handleViewDetailedAnalysis = () => {
    setShowDetailedAnalysis(!showDetailedAnalysis);
    console.log(`Detailed analysis ${showDetailedAnalysis ? 'closed' : 'opened'}`);
  };

  const handlePredictionClick = (prediction) => {
    setSelectedPrediction(prediction);
    console.log(`Selected prediction: ${prediction.machine} - ${prediction.component}`);
    
    // Generate prediction history
    const history = Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
      probability: Math.max(10, Math.min(prediction.probability + (Math.random() * 20 - 10), 95)),
      confidence: Math.max(70, Math.min(85 + (Math.random() * 20 - 10), 98))
    })).reverse();
    
    setPredictionHistory(history);
  };

  const handleScheduleMaintenance = (prediction) => {
    console.log(`Scheduling maintenance for ${prediction.machine}`);
    const date = prompt('Enter maintenance date (YYYY-MM-DD):', 
      new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    if (date) {
      alert(`Maintenance scheduled for ${prediction.machine} on ${date}`);
    }
  };

  const handleAssignTeam = (prediction) => {
    console.log(`Assigning team to ${prediction.machine}`);
    const team = prompt('Enter team name:', 'Maintenance Team A');
    if (team) {
      alert(`Team "${team}" assigned to ${prediction.machine}`);
    }
  };

  const handleRefreshPredictions = () => {
    console.log('Refreshing predictions...');
    // In a real app, this would fetch new data
    alert('Predictions refreshed with latest data!');
  };

  const handleModelChange = (model) => {
    setSelectedModel(model);
    console.log(`Model changed to: ${model}`);
    setSelectedPrediction(null); // Reset selected prediction
  };

  const currentModel = modelData[selectedModel];
  const currentTimeData = timeToFailureData[selectedModel];
  const currentRiskFactors = riskFactorsData[selectedModel];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Failure Predictions</h1>
          <p className="text-gray-600">AI-powered failure prediction and risk assessment</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportReport}
            className="mechanical-button flex items-center gap-2"
          >
            <Download size={16} />
            Export Report
          </button>
          <button 
            onClick={handleRefreshPredictions}
            className="mechanical-button-secondary flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Model Selection & Performance */}
      <div className="mechanical-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI Model Performance</h3>
            <p className="text-sm text-gray-600">Select model to view predictions</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex gap-2">
              {Object.keys(modelData).map(model => (
                <button
                  key={model}
                  onClick={() => handleModelChange(model)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium ${
                    selectedModel === model
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400 text-gray-700'
                  }`}
                >
                  {model.replace('-', ' ').toUpperCase()}
                </button>
              ))}
            </div>
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="industrial-input text-sm"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
          </div>
        </div>
        
        {/* Performance Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(currentModel.performance).map(([key, value]) => (
            <div key={key} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <p className="text-sm text-gray-600 mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
              <p className="text-2xl font-bold text-gray-900">{value}%</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                {value > 90 ? (
                  <>
                    <TrendingUp size={14} className="text-green-500" />
                    <span className="text-xs text-green-600">Excellent</span>
                  </>
                ) : value > 80 ? (
                  <>
                    <TrendingUp size={14} className="text-amber-500" />
                    <span className="text-xs text-amber-600">Good</span>
                  </>
                ) : (
                  <>
                    <TrendingDown size={14} className="text-red-500" />
                    <span className="text-xs text-red-600">Needs improvement</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Model Features */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">Key Features Used:</p>
          <div className="flex flex-wrap gap-2">
            {currentModel.features.map((feature, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {feature}
              </span>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={Object.values(modelData).map((m, i) => ({
            model: Object.keys(modelData)[i].replace('-', ' ').toUpperCase(),
            accuracy: m.performance.accuracy,
            f1: m.performance.f1
          }))}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="model" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Score']}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar dataKey="accuracy" fill="#4f46e5" name="Accuracy" />
            <Bar dataKey="f1" fill="#7c3aed" name="F1 Score" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Predictions */}
        <div className="space-y-6">
          <div className="mechanical-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Active Predictions</h3>
                <p className="text-sm text-gray-600">Based on {selectedModel} model</p>
              </div>
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-500" />
                <span className="text-sm text-gray-600">
                  High: {currentModel.predictions.filter(p => p.priority === 'high').length}
                </span>
              </div>
            </div>
            <div className="space-y-4">
              {currentModel.predictions.map((prediction) => (
                <div 
                  key={prediction.id}
                  onClick={() => handlePredictionClick(prediction)}
                  className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-all ${
                    selectedPrediction?.id === prediction.id 
                      ? 'ring-2 ring-blue-500 ' + getPriorityColor(prediction.priority)
                      : getPriorityColor(prediction.priority)
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {getPriorityIcon(prediction.priority)}
                        <h4 className="font-bold text-gray-900">{prediction.machine}</h4>
                      </div>
                      <p className="text-sm text-gray-700">{prediction.component}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Target size={16} />
                        <span className="text-2xl font-bold">{prediction.probability}%</span>
                      </div>
                      <p className="text-xs text-gray-600">Failure Probability</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Shield size={14} className="text-gray-500" />
                        <span className="text-gray-700">
                          Confidence: {85 + Math.floor(Math.random() * 10)}%
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-gray-500" />
                        <span className="text-gray-700">ETA: {prediction.eta}</span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button 
                onClick={() => handleScheduleMaintenance(currentModel.predictions[0])}
                className="mechanical-button-secondary flex items-center justify-center gap-2"
              >
                <Calendar size={16} />
                Schedule All
              </button>
              <button 
                onClick={() => handleAssignTeam(currentModel.predictions[0])}
                className="mechanical-button-secondary flex items-center justify-center gap-2"
              >
                <Users size={16} />
                Assign Teams
              </button>
            </div>
          </div>

          {/* Failure Distribution */}
          <div className="mechanical-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Failure Distribution</h3>
              <BarChart3 size={20} className="text-gray-500" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={failureDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {failureDistribution.map((entry, index) => (
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

        {/* Right Column - Charts and Details */}
        <div className="space-y-6">
          {/* Prediction Accuracy */}
          <div className="mechanical-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Prediction Accuracy</h3>
                <p className="text-sm text-gray-600">Model performance over time</p>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-green-500" />
                <span className="text-sm text-gray-600">+8% this month</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={currentTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="predicted" stroke="#4f46e5" strokeWidth={2} name="Predicted" />
                <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} name="Actual" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Factors */}
          <div className="mechanical-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Risk Factor Analysis</h3>
              <AlertTriangle size={20} className="text-gray-500" />
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={currentRiskFactors}>
                <PolarGrid />
                <PolarAngleAxis dataKey="factor" />
                <PolarRadiusAxis />
                <Radar name="Risk Score" dataKey="value" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.3} />
                <Tooltip 
                  formatter={(value) => [`${value}`, 'Risk Score']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Analysis Button */}
          <button 
            onClick={handleViewDetailedAnalysis}
            className="w-full mechanical-button p-4 flex items-center justify-center gap-3"
          >
            <Eye size={20} />
            {showDetailedAnalysis ? 'Hide Detailed Analysis' : 'View Detailed Analysis'}
            <ChevronRight size={20} className={`transform transition-transform ${showDetailedAnalysis ? 'rotate-90' : ''}`} />
          </button>
        </div>
      </div>

      {/* Selected Prediction Details */}
      {selectedPrediction && (
        <div className="mechanical-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Prediction Details</h3>
              <p className="text-sm text-gray-600">
                {selectedPrediction.machine} - {selectedPrediction.component}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`status-indicator ${getPriorityColor(selectedPrediction.priority)}`}>
                {selectedPrediction.priority.toUpperCase()} PRIORITY
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Prediction History */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Prediction History</h4>
              <div className="space-y-3">
                {predictionHistory.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{record.date}</p>
                      <p className="text-xs text-gray-600">Confidence: {record.confidence}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{record.probability}%</p>
                      <p className="text-xs text-gray-600">Probability</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Actions */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Recommended Actions</h4>
              <div className="space-y-3">
                {['Inspect component', 'Schedule maintenance', 'Monitor closely', 'Order replacement parts', 'Update maintenance logs'].map((action, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded ${
                      index < 2 ? 'bg-red-100' : 'bg-amber-100'
                    }`}>
                      <Wrench size={16} className={index < 2 ? 'text-red-600' : 'text-amber-600'} />
                    </div>
                    <span className="text-sm text-gray-700">{action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <button 
                  onClick={() => handleScheduleMaintenance(selectedPrediction)}
                  className="w-full mechanical-button-secondary flex items-center justify-center gap-2 p-3"
                >
                  <Calendar size={16} />
                  Schedule Maintenance
                </button>
                <button 
                  onClick={() => handleAssignTeam(selectedPrediction)}
                  className="w-full mechanical-button-secondary flex items-center justify-center gap-2 p-3"
                >
                  <Users size={16} />
                  Assign Team
                </button>
                <button 
                  onClick={() => console.log('Generate report')}
                  className="w-full mechanical-button-secondary flex items-center justify-center gap-2 p-3"
                >
                  <FileText size={16} />
                  Generate Report
                </button>
                <button 
                  onClick={() => alert('Notification sent to maintenance team')}
                  className="w-full mechanical-button flex items-center justify-center gap-2 p-3"
                >
                  <AlertTriangle size={16} />
                  Send Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="mechanical-card p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Predictions</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp size={14} className="text-green-500" />
            <p className="text-sm text-green-600">+24% this month</p>
          </div>
        </div>
        <div className="mechanical-card p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Shield size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Confidence</p>
              <p className="text-2xl font-bold text-gray-900">89%</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Above threshold: 92%</p>
        </div>
        <div className="mechanical-card p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Clock size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Early Warning</p>
              <p className="text-2xl font-bold text-gray-900">72h</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Before failure</p>
        </div>
      </div>

      {/* Detailed Analysis Panel */}
      {showDetailedAnalysis && (
        <div className="mechanical-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Detailed Analysis</h3>
            <button 
              onClick={() => setShowDetailedAnalysis(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Model Comparison */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Model Comparison</h4>
              <div className="space-y-4">
                {Object.entries(modelData).map(([model, data]) => (
                  <div key={model} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">
                        {model.replace('-', ' ').toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        model === selectedModel 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {model === selectedModel ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-gray-600">Accuracy</p>
                        <p className="text-lg font-bold">{data.performance.accuracy}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">F1 Score</p>
                        <p className="text-lg font-bold">{data.performance.f1}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Insights */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Performance Insights</h4>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">Best Performing Model</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">XGBoost</p>
                  <p className="text-sm text-gray-600 mt-1">94% accuracy with 92% F1 score</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">Early Detection Rate</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">89%</p>
                  <p className="text-sm text-gray-600 mt-1">Failures detected before critical stage</p>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">Average Warning Time</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">72 hours</p>
                  <p className="text-sm text-gray-600 mt-1">Before actual failure occurs</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Actions */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={handleExportReport}
                className="mechanical-button flex items-center gap-2"
              >
                <Download size={16} />
                Export Full Analysis
              </button>
              <button 
                onClick={() => alert('Training new model...')}
                className="mechanical-button-secondary flex items-center gap-2"
              >
                <RefreshCw size={16} />
                Train New Model
              </button>
              <button 
                onClick={() => alert('Opening model settings...')}
                className="mechanical-button-secondary flex items-center gap-2"
              >
                <BarChart3 size={16} />
                Model Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Predictions;