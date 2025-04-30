import React from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <footer className={`w-full py-4 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    } shadow-lg mt-auto`}>
      <div className="container mx-auto px-4 text-center">
        <p className={`text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Powered by{' '}
          <a 
            href="https://starkcloudie.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:underline ${
              isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            Stark Cloudie
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer; 