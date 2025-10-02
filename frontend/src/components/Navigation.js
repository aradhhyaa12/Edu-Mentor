import React, { useState } from 'react';
import { useAuth } from '../App';

const Navigation = ({ onAuthClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="nav-glass fixed w-full top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-orange-red rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-gray-800">Edu-Mentor</h1>
              <p className="text-xs text-gray-500">15+ Years of Excellence</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              Home
            </a>
            <a href="#services" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              Services
            </a>
            <a href="#courses" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              Courses
            </a>
            <a href="/college-finder" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              College Finder
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              Success Stories
            </a>
            <a href="#contact" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              Contact
            </a>
          </div>

          {/* Contact Info & Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-orange-600">📞 6203803252</p>
              <p className="text-xs text-gray-500">Free Counselling</p>
            </div>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center space-x-2 bg-orange-50 px-4 py-2 rounded-xl hover:bg-orange-100 transition-colors"
                  data-testid="user-menu-button"
                >
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user.first_name?.[0]?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="text-gray-700 font-medium">{user.first_name}</span>
                </button>
                
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                    <a
                      href="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      data-testid="dashboard-link"
                    >
                      Dashboard
                    </a>
                    {user.role === 'admin' && (
                      <a
                        href="/admin"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        data-testid="admin-link"
                      >
                        Admin Panel
                      </a>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      data-testid="logout-button"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="btn-primary"
                data-testid="login-button"
              >
                Get Started
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            data-testid="mobile-menu-button"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className="block w-6 h-0.5 bg-gray-600 mb-1"></span>
              <span className="block w-6 h-0.5 bg-gray-600 mb-1"></span>
              <span className="block w-6 h-0.5 bg-gray-600"></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <a href="#home" className="text-gray-700 hover:text-orange-500 font-medium">
                Home
              </a>
              <a href="#services" className="text-gray-700 hover:text-orange-500 font-medium">
                Services
              </a>
              <a href="#courses" className="text-gray-700 hover:text-orange-500 font-medium">
                Courses
              </a>
              <a href="/college-finder" className="text-gray-700 hover:text-orange-500 font-medium">
                College Finder
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-orange-500 font-medium">
                Success Stories
              </a>
              <a href="#contact" className="text-gray-700 hover:text-orange-500 font-medium">
                Contact
              </a>
              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm font-semibold text-orange-600">📞 6203803252 | 6202198223</p>
                {!user && (
                  <button
                    onClick={onAuthClick}
                    className="btn-primary mt-3 w-full justify-center"
                  >
                    Get Started
                  </button>
                )}
                {user && (
                  <div className="mt-3 space-y-2">
                    <a
                      href="/dashboard"
                      className="block text-gray-700 hover:text-orange-500 font-medium"
                    >
                      Dashboard
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block text-red-600 hover:text-red-700 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;