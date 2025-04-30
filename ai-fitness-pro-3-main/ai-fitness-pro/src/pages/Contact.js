import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/global.css';

const Contact = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const socialLinks = [
    {
      name: 'Email',
      icon: '📧',
      link: 'mailto:starkcloudie@gmail.com',
      display: 'starkcloudie@gmail.com'
    },
    {
      name: 'Instagram',
      icon: '📸',
      link: 'https://www.instagram.com/starkcloudie/?igsh=MTRpcG96cmJpdXVx',
      display: '@starkcloudie'
    },
    {
      name: 'Twitter',
      icon: '🐦',
      link: 'https://x.com/Rajeshcoder?t=uXXfNCnXc1wrqD7d8fSsiA&s=09',
      display: '@Rajeshcoder'
    },
    {
      name: 'GitHub',
      icon: '💻',
      link: 'https://github.com/rajeshstark2',
      display: 'rajeshstark2'
    }
  ];

  const handleEmailClick = () => {
    window.location.href = 'mailto:starkcloudie@gmail.com';
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className={`
          premium-title text-5xl md:text-6xl lg:text-7xl
          text-center mb-8 relative
        `}>
          Contact Us
        </h1>

        <div className="max-w-2xl mx-auto">
          <div className="space-y-6">
            <button
              onClick={handleEmailClick}
              className="premium-button text-white text-lg font-bold px-10 py-4 rounded-full 
                w-full transition-all duration-300 flex items-center justify-center"
            >
              <svg 
                className="w-6 h-6 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
              Send Message
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto grid gap-6 mt-12">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center p-4 rounded-lg blue-glow ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-white hover:bg-gray-50'
              } transition-all duration-300`}
            >
              <span className="text-2xl mr-4">{social.icon}</span>
              <div>
                <h2 className={`font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {social.name}
                </h2>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {social.display}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact; 