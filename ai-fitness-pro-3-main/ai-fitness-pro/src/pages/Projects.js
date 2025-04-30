import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/global.css';

const Projects = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const projects = [
    {
      name: 'Clip Hunt',
      url: 'https://cliphunt.in',
      description: 'Video clip hunting platform',
      emoji: '🎬',  // Video camera emoji
      emojiLabel: 'Video Camera'
    },
    {
      name: 'eBook Store',
      url: 'https://ebookcart.in',
      description: 'Digital book marketplace',
      emoji: '📚',  // Books emoji
      emojiLabel: 'Books'
    },
    {
      name: 'Chat Mate',
      url: 'https://chatmate-dc97.onrender.com/',
      description: 'Real-time chat application',
      emoji: '💬',  // Speech bubble emoji
      emojiLabel: 'Chat Bubble'
    },
    {
      name: 'Hire Skill Pro',
      url: 'https://hireskillpro.netlify.app/',
      description: 'Professional skill hiring platform',
      emoji: '👨‍💼',  // Business person emoji
      emojiLabel: 'Professional'
    },
    {
      name: 'Handwritten to Code',
      url: 'https://handcode.onrender.com',
      description: 'Convert handwritten code to digital format',
      emoji: '✍️',  // Writing hand emoji
      emojiLabel: 'Writing Hand'
    },
    {
      name: 'Data Insight Pro',
      url: 'http://Datainsight-pro.netlify.app',
      description: 'Advanced data analytics platform',
      emoji: '📊',  // Bar chart emoji
      emojiLabel: 'Chart'
    },
    {
      name: 'Last Minute Exam Prep AI',
      url: 'https://examprep-1.onrender.com/',
      description: 'AI-powered exam preparation assistant',
      emoji: '🎓',  // Graduation cap emoji
      emojiLabel: 'Graduation Cap'
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className={`
          premium-title text-5xl md:text-6xl lg:text-7xl
          text-center mb-8 relative
        `}>
          Our Projects
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`aurora-card group hover:scale-105 transition-all duration-300 blue-glow ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-white hover:bg-gray-50'
              } rounded-xl overflow-hidden`}
            >
              <div className="p-6 text-center">
                <span 
                  role="img" 
                  aria-label={project.emojiLabel}
                  className="text-6xl mb-4 block"
                >
                  {project.emoji}
                </span>
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {project.name}
                </h3>
                <p className={`${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {project.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://starkcloudie.netlify.app/#portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Try all our projects in our company website
          </a>
        </div>

        {/* Follow Us Section with premium button */}
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <h2 className="premium-title text-4xl mb-4">
            More Projects Coming Soon!
          </h2>
          <p className={`text-lg mb-6 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Stay tuned for exciting new projects! Follow us on Instagram to get exclusive access and updates.
          </p>
          <a
            href="https://www.instagram.com/starkcloudie/?igsh=MTRpcG96cmJpdXVx"
            target="_blank"
            rel="noopener noreferrer"
            className="premium-button text-white text-lg font-bold px-10 py-4 rounded-full 
              inline-flex items-center transition-all duration-300"
          >
            <svg 
              className="w-6 h-6 mr-2" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Follow Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects; 