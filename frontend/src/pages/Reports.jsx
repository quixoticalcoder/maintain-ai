import React, { useState } from 'react';
import {
  FileText,
  Download,
  Calendar,
  Filter,
  Printer,
  Share2,
  Eye,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Clock,
  Users,
  DollarSign,
  ChevronRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('30d');
  const [reportType, setReportType] = useState('summary');

  const reports = [
    {
      id: 'overview',
      title: 'Monthly Overview Report',
      description: 'Complete overview of system performance',
      date: 'Jan 2024',
      type: 'summary',
      size: '2.4 MB',
      charts: 4,
      pages: 12
    },
    {
      id: 'predictions',
      title: 'Predictive Analysis Report',
      description: 'Failure predictions and accuracy metrics',
      date: 'Dec 2023',
      type: 'analysis',
      size: '3.1 MB',
      charts: 6,
      pages: 18
    },
    {
      id: 'maintenance',
      title: 'Maintenance Cost Analysis',
      description: 'Cost breakdown and ROI analysis',
      date: 'Nov 2023',
      type: 'financial',
      size: '1.8 MB',
      charts: 3,
      pages: 8
    },
    {
      id: 'sensors',
      title: 'Sensor Performance Report',
      description: 'Sensor accuracy and calibration data',
      date: 'Oct 2023',
      type: 'technical',
      size: '4.2 MB',
      charts: 5,
      pages: 15
    },
    {
      id: 'downtime',
      title: 'Downtime Analysis Report',
      description: 'Uptime statistics and root cause analysis',
      date: 'Sep 2023',
      type: 'analysis',
      size: '2.9 MB',
      charts: 4,
      pages: 10
    },
    {
      id: 'energy',
      title: 'Energy Consumption Report',
      description: 'Power usage and efficiency metrics',
      date: 'Aug 2023',
      type: 'environmental',
      size: '1.5 MB',
      charts: 3,
      pages: 7
    }
  ];

  const chartData = [
    { month: 'Jan', uptime: 98.5, failures: 3, cost: 12500 },
    { month: 'Feb', uptime: 99.2, failures: 2, cost: 9800 },
    { month: 'Mar', uptime: 97.8, failures: 5, cost: 15200 },
    { month: 'Apr', uptime: 99.5, failures: 1, cost: 8500 },
    { month: 'May', uptime: 98.9, failures: 3, cost: 11200 },
    { month: 'Jun', uptime: 99.8, failures: 0, cost: 7500 },
  ];

  const failureData = [
    { name: 'Bearing Wear', value: 35, color: '#f87171' },
    { name: 'Overheating', value: 25, color: '#fbbf24' },
    { name: 'Vibration', value: 20, color: '#60a5fa' },
    { name: 'Lubrication', value: 15, color: '#34d399' },
    { name: 'Electrical', value: 5, color: '#a78bfa' },
  ];

  const handleGenerateReport = () => {
    console.log('Generating new report...');
    alert('New report generation started!');
  };

  const handleExportReport = (report) => {
    console.log(`Exporting report: ${report.title}`);
    alert(`Report "${report.title}" exported successfully!`);
  };

  const handlePrintReport = (report) => {
    console.log(`Printing report: ${report.title}`);
    alert(`Report "${report.title}" sent to printer!`);
  };

  const handleShareReport = (report) => {
    console.log(`Sharing report: ${report.title}`);
    const email = prompt('Enter email address to share:');
    if (email) {
      alert(`Report shared with ${email}`);
    }
  };

  const handleViewReport = (report) => {
    setSelectedReport(report.id);
    console.log(`Viewing report: ${report.title}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate and view system reports</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleGenerateReport}
            className="mechanical-button flex items-center gap-2"
          >
            <FileText size={16} />
            Generate New Report
          </button>
          <button className="mechanical-button-secondary flex items-center gap-2">
            <Calendar size={16} />
            Schedule
          </button>
        </div>
      </div>

      {/* Report Controls */}
      <div className="mechanical-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="industrial-input"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>

            <select 
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="industrial-input"
            >
              <option value="all">All Report Types</option>
              <option value="summary">Summary Reports</option>
              <option value="analysis">Analysis Reports</option>
              <option value="financial">Financial Reports</option>
              <option value="technical">Technical Reports</option>
            </select>

            <button className="mechanical-button-secondary flex items-center gap-2">
              <Filter size={16} />
              Filter Reports
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Total Reports: {reports.length}</span>
            <span className="text-sm text-gray-600">•</span>
            <span className="text-sm text-gray-600">Last Generated: Today</span>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="mechanical-card p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{report.title}</h3>
                  <p className="text-sm text-gray-600">{report.date}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${
                report.type === 'summary' ? 'bg-blue-100 text-blue-700' :
                report.type === 'analysis' ? 'bg-green-100 text-green-700' :
                report.type === 'financial' ? 'bg-amber-100 text-amber-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                {report.type}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">{report.description}</p>

            <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-4">
                <span>{report.charts} charts</span>
                <span>{report.pages} pages</span>
                <span>{report.size}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => handleViewReport(report)}
                className="flex-1 mechanical-button-secondary flex items-center justify-center gap-1 text-sm"
              >
                <Eye size={14} />
                View
              </button>
              <button 
                onClick={() => handleExportReport(report)}
                className="flex-1 mechanical-button-secondary flex items-center justify-center gap-1 text-sm"
              >
                <Download size={14} />
                Export
              </button>
              <button 
                onClick={() => handlePrintReport(report)}
                className="p-2 text-gray-600 hover:text-gray-900"
                title="Print"
              >
                <Printer size={16} />
              </button>
              <button 
                onClick={() => handleShareReport(report)}
                className="p-2 text-gray-600 hover:text-gray-900"
                title="Share"
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Report Preview */}
      {selectedReport && (
        <div className="mechanical-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {reports.find(r => r.id === selectedReport)?.title} Preview
            </h2>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleExportReport(reports.find(r => r.id === selectedReport))}
                className="mechanical-button flex items-center gap-2"
              >
                <Download size={16} />
                Export Full Report
              </button>
              <button 
                onClick={() => handlePrintReport(reports.find(r => r.id === selectedReport))}
                className="mechanical-button-secondary flex items-center gap-2"
              >
                <Printer size={16} />
                Print
              </button>
            </div>
          </div>

          {/* Charts Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Uptime & Failures</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="uptime" fill="#4f46e5" name="Uptime %" />
                  <Bar dataKey="failures" fill="#f87171" name="Failures" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-4">Failure Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={failureData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {failureData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg Uptime</p>
                  <p className="text-2xl font-bold text-gray-900">99.2%</p>
                </div>
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle size={20} className="text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Failures</p>
                  <p className="text-2xl font-bold text-gray-900">14</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cost Saved</p>
                  <p className="text-2xl font-bold text-gray-900">$42.5K</p>
                </div>
              </div>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Clock size={20} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Downtime</p>
                  <p className="text-2xl font-bold text-gray-900">8.5h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Types */}
      <div className="mechanical-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Report Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <div className="flex items-center gap-3">
              <BarChart3 size={20} className="text-blue-600" />
              <span className="font-medium text-gray-900">Performance</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">System performance metrics</p>
          </button>
          <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <div className="flex items-center gap-3">
              <PieChartIcon size={20} className="text-green-600" />
              <span className="font-medium text-gray-900">Analysis</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Detailed analysis reports</p>
          </button>
          <button className="p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
            <div className="flex items-center gap-3">
              <LineChartIcon size={20} className="text-amber-600" />
              <span className="font-medium text-gray-900">Trends</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Historical trend analysis</p>
          </button>
          <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <div className="flex items-center gap-3">
              <Users size={20} className="text-purple-600" />
              <span className="font-medium text-gray-900">Team</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Team performance reports</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;