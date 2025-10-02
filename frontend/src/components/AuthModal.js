import React, { useState } from 'react';
import { useAuth } from '../App';

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    first_name: '',
    last_name: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, register } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        const result = await login(formData.email, formData.password);
        if (result.success) {
          onClose();
        } else {
          setError(result.error);
        }
      } else {
        const result = await register(formData);
        if (result.success) {
          onClose();
        } else {
          setError(result.error);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      email: '',
      phone: '',
      password: '',
      first_name: '',
      last_name: ''
    });
  };

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content" data-testid="auth-modal">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-800">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-600 mt-1">
                {isLogin 
                  ? 'Sign in to access your dashboard' 
                  : 'Join thousands of successful students'
                }
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
              data-testid="close-modal-btn"
            >
              ×
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message" data-testid="error-message">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6" data-testid="auth-form">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first_name" className="form-label">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className="form-input"
                    placeholder="First name"
                    data-testid="first-name-input"
                  />
                </div>
                <div>
                  <label htmlFor="last_name" className="form-label">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className="form-input"
                    placeholder="Last name"
                    data-testid="last-name-input"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="form-label">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="form-input"
                placeholder="Enter your email"
                data-testid="email-input"
              />
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your phone number"
                  data-testid="phone-input"
                />
              </div>
            )}

            <div>
              <label htmlFor="password" className="form-label">
                Password *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={6}
                className="form-input"
                placeholder="Enter your password"
                data-testid="password-input"
              />
              {!isLogin && (
                <p className="text-gray-500 text-xs mt-1">
                  Password must be at least 6 characters long
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full justify-center py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="submit-btn"
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </>
              ) : (
                <>
                  <span>{isLogin ? '🔑' : '🚀'}</span>
                  {isLogin ? 'Sign In' : 'Create Account'}
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={toggleMode}
                  className="text-orange-600 hover:text-orange-700 font-semibold ml-2"
                  data-testid="toggle-mode-btn"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>

              <div className="text-xs text-gray-500 space-y-1">
                <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    <span>Free Registration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    <span>Secure & Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-6 bg-orange-50 rounded-xl p-6">
            <h4 className="font-semibold text-gray-800 mb-3">
              🎯 What you get with your account:
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <span>📊</span>
                <span>Personal Dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>Book Appointments</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📝</span>
                <span>Track Applications</span>
              </div>
              <div className="flex items-center gap-2">
                <span>💬</span>
                <span>Direct Counsellor Chat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;