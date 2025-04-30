import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FitnessAssessmentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    bodyShape: 'athletic'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the data to your state management system
    console.log('Form submitted:', formData);
    // Navigate to the next step or dashboard
    navigate('/dashboard');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Fitness Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight (kg)
          </label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your weight in kg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Height (cm)
          </label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your height in cm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Desired Body Shape
          </label>
          <select
            name="bodyShape"
            value={formData.bodyShape}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="athletic">Athletic</option>
            <option value="lean">Lean</option>
            <option value="muscular">Muscular</option>
            <option value="slim">Slim</option>
            <option value="toned">Toned</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default FitnessAssessmentForm; 