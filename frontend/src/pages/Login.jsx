import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Factory, Lock, Mail, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Login attempt:', { email, password });
      
      // Dummy validation
      if (email && password) {
        alert('Login successful!');
        navigate('/dashboard');
      } else {
        alert('Please enter both email and password');
      }
      
      setLoading(false);
    }, 1000);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    const recoveryEmail = prompt('Enter your email for password recovery:');
    if (recoveryEmail) {
      alert(`Password reset link sent to ${recoveryEmail}`);
    }
  };

  const handleDemoLogin = () => {
    setEmail('demo@maintain-ai.example');
    setPassword('demo123');
    alert('Demo credentials loaded. Click Login to continue.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 mb-4">
            <Factory size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">maintain-ai</h1>
          <p className="text-gray-300 mt-2">Industrial AI Monitoring System</p>
        </div>

        {/* Login Card */}
        <div className="mechanical-card p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign In</h2>
          
          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="you@company.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-12 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mechanical-button py-3 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Login */}
          <div className="mt-6">
            <button
              onClick={handleDemoLogin}
              className="w-full mechanical-button-secondary py-3"
            >
              Use Demo Credentials
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">or continue with</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Additional Info */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Need an account?{' '}
              <button
                onClick={() => alert('Contact administrator for account creation')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Contact Admin
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            © 2024 maintain-ai System. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            v2.0.0 • Industrial AI Monitoring
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;