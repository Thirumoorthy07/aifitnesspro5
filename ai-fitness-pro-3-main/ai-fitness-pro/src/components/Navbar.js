import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../store/slices/themeSlice';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const location = useLocation();

  const menuItems = [
    { name: 'Home', path: '/home' },
    { name: 'About', path: '/about' },
    { name: 'Our Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`${
      isDarkMode 
        ? 'bg-gradient-to-r from-gray-900 to-gray-800' 
        : 'bg-gradient-to-r from-blue-50 via-white to-blue-50'
    } shadow-lg relative z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            {/* Logo/Brand */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/home" className={`text-2xl font-bold ${
                isDarkMode 
                  ? 'text-blue-400 hover:text-blue-300' 
                  : 'text-blue-600 hover:text-blue-700'
              } transition-colors duration-200`}>
                AI Fitness Pro
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden sm:flex sm:space-x-6">
              <Link
                to="/home"
                className={`
                  inline-flex items-center px-4 py-3 text-lg font-medium rounded-lg
                  transition-all duration-200 hover:scale-105
                  ${isDarkMode 
                    ? location.pathname === '/home' || location.pathname === '/'
                      ? 'bg-gradient-to-r from-blue-900 to-blue-800 text-white' 
                      : 'text-gray-300 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-800 hover:text-white'
                    : location.pathname === '/home' || location.pathname === '/'
                      ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900'
                      : 'text-blue-800 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200'
                  }
                `}
              >
                Home
              </Link>

              <Link
                to="/about"
                className={`
                  inline-flex items-center px-4 py-3 text-lg font-medium rounded-lg
                  transition-all duration-200 hover:scale-105
                  ${isDarkMode 
                    ? location.pathname === '/about'
                      ? 'bg-gradient-to-r from-blue-900 to-blue-800 text-white' 
                      : 'text-gray-300 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-800 hover:text-white'
                    : location.pathname === '/about'
                      ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900'
                      : 'text-blue-800 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200'
                  }
                `}
              >
                About
              </Link>

              <Link
                to="/projects"
                className={`
                  inline-flex items-center px-4 py-3 text-lg font-medium rounded-lg
                  transition-all duration-200 hover:scale-105
                  ${isDarkMode 
                    ? location.pathname === '/projects'
                      ? 'bg-gradient-to-r from-blue-900 to-blue-800 text-white' 
                      : 'text-gray-300 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-800 hover:text-white'
                    : location.pathname === '/projects'
                      ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900'
                      : 'text-blue-800 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200'
                  }
                `}
              >
                Our Projects
              </Link>

              <Link
                to="/contact"
                className={`
                  inline-flex items-center px-4 py-3 text-lg font-medium rounded-lg
                  transition-all duration-200 hover:scale-105
                  ${isDarkMode 
                    ? location.pathname === '/contact'
                      ? 'bg-gradient-to-r from-blue-900 to-blue-800 text-white' 
                      : 'text-gray-300 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-800 hover:text-white'
                    : location.pathname === '/contact'
                      ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900'
                      : 'text-blue-800 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200'
                  }
                `}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Hamburger Menu Button */}
          <div className="flex items-center">
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className={`mr-4 p-2 rounded-lg ${
                isDarkMode ? 'text-yellow-300' : 'text-gray-600'
              }`}
            >
              {isDarkMode ? '🌞' : '🌙'}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 focus:outline-none sm:hidden"
              aria-label="Toggle menu"
            >
              <div className="space-y-2">
                <span className={`block w-8 h-0.5 transition-all duration-300 ${
                  isDarkMode ? 'bg-white' : 'bg-black'
                } ${isMenuOpen ? 'transform rotate-45 translate-y-2.5' : ''}`}></span>
                <span className={`block w-8 h-0.5 ${
                  isDarkMode ? 'bg-white' : 'bg-black'
                } ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-8 h-0.5 transition-all duration-300 ${
                  isDarkMode ? 'bg-white' : 'bg-black'
                } ${isMenuOpen ? 'transform -rotate-45 -translate-y-2.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Updated */}
        <div className={`
          fixed inset-x-0 
          transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
          ${isDarkMode 
            ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
            : 'bg-gradient-to-b from-white to-blue-50'
          }
          sm:hidden
        `} style={{
          top: '64px', // Height of the navbar
          height: isMenuOpen ? 'calc(100vh - 64px)' : '0',
          transition: 'height 0.3s ease-in-out, opacity 0.3s ease-in-out'
        }}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  block px-6 py-4 text-lg font-medium rounded-lg
                  transition-all duration-200
                  ${location.pathname === item.path || (item.path === '/home' && location.pathname === '/')
                    ? isDarkMode
                      ? 'bg-gradient-to-r from-blue-900 to-blue-800 text-white'
                      : 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900'
                    : isDarkMode
                      ? 'text-gray-300 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-800 hover:text-white'
                      : 'text-blue-800 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200'
                  }
                `}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 