import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Users,
  Database,
  Cpu,
  Wifi,
  Save,
  RotateCw,
  AlertTriangle,
  Eye,
  EyeOff,
  Upload
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: true,
    criticalAlerts: true,
    weeklyReports: false,
    predictiveAlerts: true,
  });
  const [thresholds, setThresholds] = useState({
    temperature: 65,
    vibration: 4.0,
    pressure: 150,
    current: 50,
    rpm: 3000,
  });
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey] = useState('sk_live_xxxxxxxxxxxxxx');

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'thresholds', label: 'Thresholds', icon: AlertTriangle },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'integrations', label: 'Integrations', icon: Cpu },
  ];

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleThresholdChange = (key, value) => {
    setThresholds(prev => ({
      ...prev,
      [key]: parseFloat(value) || 0
    }));
  };

  const handleSave = () => {
    // In real app, this would make an API call
    console.log('Saving settings...');
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    // In real app, this would reset to default values
    setThresholds({
      temperature: 65,
      vibration: 4.0,
      pressure: 150,
      current: 50,
      rpm: 3000,
    });
    alert('Thresholds reset to default values.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        <p className="text-gray-600">Configure your predictive maintenance system</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Settings Content */}
      <div className="mechanical-card p-8">
        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">General Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Name
                </label>
                <input
                  type="text"
                  defaultValue="Predictive Maintenance System v2.0"
                  className="industrial-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Zone
                </label>
                <select className="industrial-input w-full">
                  <option>UTC (Coordinated Universal Time)</option>
                  <option>EST (Eastern Standard Time)</option>
                  <option>PST (Pacific Standard Time)</option>
                  <option>CET (Central European Time)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Retention (Days)
                </label>
                <input
                  type="number"
                  defaultValue="90"
                  className="industrial-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Frequency
                </label>
                <select className="industrial-input w-full">
                  <option>Real-time (1 second)</option>
                  <option>Fast (5 seconds)</option>
                  <option>Normal (30 seconds)</option>
                  <option>Slow (1 minute)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="auto-updates"
                  defaultChecked
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor="auto-updates" className="ml-2 text-sm text-gray-700">
                  Enable automatic updates
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="data-backup"
                  defaultChecked
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor="data-backup" className="ml-2 text-sm text-gray-700">
                  Enable automatic data backup
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Settings */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Notification Settings</h2>
            
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {key.includes('critical') ? 'Receive immediate alerts for critical failures' :
                       key.includes('predictive') ? 'Get notified about predicted failures' :
                       key.includes('weekly') ? 'Receive weekly summary reports' :
                       'Get notified about all system alerts'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handleNotificationChange(key)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-medium text-gray-900 mb-4">Notification Channels</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="alerts@yourfactory.com"
                    className="industrial-input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMS Number (for critical alerts)
                  </label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="industrial-input w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Thresholds Settings */}
        {activeTab === 'thresholds' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Alert Thresholds</h2>
            <p className="text-gray-600">Configure warning and critical thresholds for sensors</p>
            
            <div className="space-y-6">
              {Object.entries(thresholds).map(([key, value]) => (
                <div key={key} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900 capitalize">
                        {key} Threshold
                      </h4>
                      <p className="text-sm text-gray-600">
                        Set warning and critical levels for {key}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-gray-900">{value}</span>
                      <span className="text-sm text-gray-600 ml-1">
                        {key === 'temperature' ? '°C' :
                         key === 'vibration' ? 'mm/s' :
                         key === 'pressure' ? 'PSI' :
                         key === 'current' ? 'A' : 'RPM'}
                      </span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={key === 'temperature' ? 100 :
                         key === 'vibration' ? 10 :
                         key === 'pressure' ? 200 :
                         key === 'current' ? 100 : 5000}
                    step="1"
                    value={value}
                    onChange={(e) => handleThresholdChange(key, e.target.value)}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>0</span>
                    <span>Warning: {value * 0.8}</span>
                    <span>Critical: {value}</span>
                    <span>
                      {key === 'temperature' ? 100 :
                       key === 'vibration' ? 10 :
                       key === 'pressure' ? 200 :
                       key === 'current' ? 100 : 5000}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <button
                onClick={handleReset}
                className="mechanical-button-secondary flex items-center gap-2"
              >
                <RotateCw size={16} />
                Reset to Defaults
              </button>
              <button
                onClick={handleSave}
                className="mechanical-button flex items-center gap-2"
              >
                <Save size={16} />
                Save Thresholds
              </button>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Security Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 industrial-input flex items-center">
                    {showApiKey ? apiKey : '••••••••••••••••••••'}
                  </div>
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="mechanical-button-secondary px-4"
                  >
                    {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button className="mechanical-button-secondary px-4">
                    Regenerate
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Timeout (Minutes)
                  </label>
                  <input
                    type="number"
                    defaultValue="30"
                    className="industrial-input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Failed Login Attempts
                  </label>
                  <input
                    type="number"
                    defaultValue="5"
                    className="industrial-input w-full"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="2fa"
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label htmlFor="2fa" className="ml-2 text-sm text-gray-700">
                    Enable Two-Factor Authentication
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="ip-restriction"
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label htmlFor="ip-restriction" className="ml-2 text-sm text-gray-700">
                    IP Address Restriction
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="audit-log"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label htmlFor="audit-log" className="ml-2 text-sm text-gray-700">
                    Enable Audit Logging
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons (Common for all tabs) */}
        <div className="flex justify-end gap-3 mt-8 pt-8 border-t border-gray-200">
          <button className="mechanical-button-secondary px-6">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="mechanical-button flex items-center gap-2 px-6"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>

      {/* System Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="mechanical-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Database size={20} className="text-blue-500" />
            <h3 className="font-medium text-gray-900">Database Status</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Size</span>
              <span className="font-medium">24.5 GB</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Uptime</span>
              <span className="font-medium">99.9%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Last Backup</span>
              <span className="font-medium">2 hours ago</span>
            </div>
          </div>
        </div>

        <div className="mechanical-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Cpu size={20} className="text-green-500" />
            <h3 className="font-medium text-gray-900">ML Model Status</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Active Model</span>
              <span className="font-medium">XGBoost v2.3</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Accuracy</span>
              <span className="font-medium">94.2%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Last Training</span>
              <span className="font-medium">Yesterday</span>
            </div>
          </div>
        </div>

        <div className="mechanical-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Wifi size={20} className="text-purple-500" />
            <h3 className="font-medium text-gray-900">IoT Connectivity</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Connected Sensors</span>
              <span className="font-medium">48/50</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Gateway Status</span>
              <span className="font-medium text-green-600">Online</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Data Rate</span>
              <span className="font-medium">1.2 MB/s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;