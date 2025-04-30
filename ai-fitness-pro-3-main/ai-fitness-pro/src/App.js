import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WorkoutForm from './components/WorkoutForm';
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Projects from './pages/Projects';
import Footer from './components/Footer';
import RedirectPage from './components/RedirectPage';
import './styles/WorkoutPlanGenerator.css';

function App() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <Router>
      <div className={`min-h-screen flex flex-col ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <Navbar />
        <main className="flex-grow pt-20 container mx-auto px-4">
          <RedirectPage />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/workout" element={<WorkoutForm />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 