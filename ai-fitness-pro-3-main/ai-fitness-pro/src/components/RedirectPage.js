import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const RedirectPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only redirect if we're on the root path and have a saved path
    if (location.pathname === '/' && localStorage.getItem('lastPath')) {
      const savedPath = localStorage.getItem('lastPath');
      // Don't redirect if trying to access home page
      if (savedPath !== '/' && savedPath !== '/home') {
        navigate(savedPath);
      }
    }
  }, [navigate, location.pathname]);

  // Save the current path whenever it changes
  useEffect(() => {
    // Always save the current path
    localStorage.setItem('lastPath', location.pathname);
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

export default RedirectPage; 