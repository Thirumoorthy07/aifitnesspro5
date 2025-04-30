import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import WorkoutPlanGenerator from './WorkoutPlanGenerator';

const WorkoutForm = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [showPlan, setShowPlan] = useState(false);
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    desiredShape: ''
  });

  const bodyShapeOptions = [
    {
      value: 'lean-athletic',
      label: 'Lean Athletic',
      description: 'Low body fat with moderate muscle definition'
    },
    {
      value: 'muscular',
      label: 'Muscular Build',
      description: 'High muscle mass with strength focus'
    },
    {
      value: 'slim-toned',
      label: 'Slim & Toned',
      description: 'Slender frame with light muscle definition'
    },
    {
      value: 'bodybuilder',
      label: 'Bodybuilder',
      description: 'Maximum muscle mass with definition'
    },
    {
      value: 'functional-fit',
      label: 'Functional Fitness',
      description: 'Balance of strength, endurance, and flexibility'
    },
    {
      value: 'powerlifter',
      label: 'Powerlifter',
      description: 'Focus on strength with dense muscle mass'
    },
    {
      value: 'crossfit',
      label: 'CrossFit Athletic',
      description: 'High-intensity functional movements'
    },
    {
      value: 'endurance',
      label: 'Endurance Athlete',
      description: 'Lean with high cardiovascular fitness'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPlan(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (showPlan) {
    return (
      <WorkoutPlanGenerator 
        userDetails={{
          weight: parseFloat(formData.weight),
          height: parseFloat(formData.height)
        }}
        desiredShape={formData.desiredShape}
      />
    );
  }

  return (
    <div className={`max-w-md mx-auto p-6 rounded-lg shadow-lg ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        Your Fitness Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className={`block mb-2 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Weight (kg)
          </label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className={`w-full p-2 rounded border ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            required
            min="30"
            max="200"
            step="0.1"
          />
        </div>

        <div>
          <label className={`block mb-2 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Height (cm)
          </label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className={`w-full p-2 rounded border ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            required
            min="100"
            max="250"
          />
        </div>

        <div>
          <label className={`block mb-2 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Desired Body Shape
          </label>
          <select
            name="desiredShape"
            value={formData.desiredShape}
            onChange={handleChange}
            className={`w-full p-2 rounded border ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            required
          >
            <option value="">Select desired shape</option>
            <option value="lean-athletic">Lean Athletic</option>
            <option value="muscular">Muscular Build</option>
            <option value="slim-toned">Slim & Toned</option>
            <option value="bodybuilder">Bodybuilder</option>
            <option value="functional-fit">Functional Fitness</option>
            <option value="powerlifter">Powerlifter</option>
            <option value="crossfit">CrossFit Athletic</option>
            <option value="endurance">Endurance Athlete</option>
          </select>
          {formData.desiredShape && (
            <p className="mt-2 text-sm text-gray-300">
              {bodyShapeOptions.find(opt => opt.value === formData.desiredShape)?.description}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Generate Workout Plan
        </button>
      </form>
    </div>
  );
};

export default WorkoutForm; 