import React from 'react';

const ProgressTracker = ({ currentMetrics, targetMetrics }) => {
  const progressPercentage = Math.min(
    Math.abs((currentMetrics.currentWeight - targetMetrics.targetWeight) / 
    targetMetrics.targetWeight * 100), 100
  );

  return (
    <div className="progress-tracker">
      <h3>Progress Tracking</h3>
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${100 - progressPercentage}%` }}
        />
      </div>
      <div className="progress-stats">
        <p>Current Weight: {currentMetrics.currentWeight}kg</p>
        <p>Target Weight: {targetMetrics.targetWeight}kg</p>
        <p>Weight to {currentMetrics.currentWeight > targetMetrics.targetWeight ? 'lose' : 'gain'}: 
          {Math.abs(currentMetrics.currentWeight - targetMetrics.targetWeight).toFixed(1)}kg
        </p>
      </div>
    </div>
  );
};

export default ProgressTracker; 