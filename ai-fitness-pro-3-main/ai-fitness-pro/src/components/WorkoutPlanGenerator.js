import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useSelector } from 'react-redux';

const WorkoutPlanGenerator = ({ userDetails, desiredShape }) => {
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [timeframeData, setTimeframeData] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);

  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const cleanJsonString = (text) => {
    // Remove markdown code block indicators and any surrounding whitespace
    return text.replace(/```json\n?|\n?```/g, '').trim();
  };

  const calculateDesiredBMI = (shape) => {
    // Ideal BMI ranges based on desired shape
    switch(shape) {
      case 'lean-athletic':
        return 22.5;
      case 'muscular':
        return 24.5;
      case 'slim-toned':
        return 21.0;
      case 'bodybuilder':
        return 26.0;
      case 'functional-fit':
        return 23.0;
      case 'powerlifter':
        return 27.0;
      case 'crossfit':
        return 23.5;
      case 'endurance':
        return 21.5;
      default:
        return 22.0;
    }
  };

  const estimateCurrentProtein = (weight, currentBMI) => {
    // Base protein estimation using a more conservative multiplier
    const baseProtein = weight * 0.8; // 0.8g per kg as base
    
    if (currentBMI < 18.5) {
      return Math.round(baseProtein * 0.9); // Slightly lower for underweight
    } else if (currentBMI > 25) {
      return Math.round(baseProtein * 1.1); // Slightly higher for overweight
    }
    return Math.round(baseProtein);
  };

  const calculateTargetProtein = (weight, desiredShape, height) => {
    // Calculate lean body mass (LBM) using the Boer formula
    const lbm = (0.407 * weight) + (0.267 * height) - 19.2;
    
    // More realistic protein multipliers based on desired shape
    const multipliers = {
      'lean-athletic': 1.6,     // 1.6g per kg for athletic build
      'muscular': 1.8,          // 1.8g per kg for muscle gain
      'slim-toned': 1.4,        // 1.4g per kg for toning
      'bodybuilder': 2.0,       // 2.0g per kg for bodybuilding
      'functional-fit': 1.5,    // 1.5g per kg for functional fitness
      'powerlifter': 1.8,       // 1.8g per kg for strength
      'crossfit': 1.7,          // 1.7g per kg for high intensity
      'endurance': 1.4          // 1.4g per kg for endurance
    };

    // Calculate protein based on total body weight instead of LBM for more realistic values
    return Math.round(weight * (multipliers[desiredShape] || 1.6));
  };

  const getExpectedTimeframe = (currentBMI, desiredBMI, desiredShape) => {
    const bmiDifference = Math.abs(currentBMI - desiredBMI);
    
    // More realistic base timeframes in months
    const baseTimeframes = {
      'lean-athletic': {
        min: 2,
        max: 4,
        rate: 'Expect 0.5-1kg change per week'
      },
      'muscular': {
        min: 3,
        max: 6,
        rate: 'Expect 0.25-0.5kg muscle gain per week'
      },
      'slim-toned': {
        min: 2,
        max: 3,
        rate: 'Expect 0.5-0.75kg change per week'
      },
      'bodybuilder': {
        min: 6,
        max: 12,
        rate: 'Expect 0.25-0.5kg muscle gain per week'
      },
      'functional-fit': {
        min: 2,
        max: 4,
        rate: 'Expect balanced progress over time'
      },
      'powerlifter': {
        min: 3,
        max: 6,
        rate: 'Focus on strength gains over body composition'
      },
      'crossfit': {
        min: 2,
        max: 4,
        rate: 'Expect performance improvements weekly'
      },
      'endurance': {
        min: 2,
        max: 3,
        rate: 'Focus on endurance over body composition'
      }
    };

    const timeframe = baseTimeframes[desiredShape] || baseTimeframes['lean-athletic'];
    
    // Adjust timeframe based on BMI difference, but with a smaller multiplier
    const adjustedMin = Math.round(timeframe.min * (1 + (bmiDifference * 0.1)));
    const adjustedMax = Math.round(timeframe.max * (1 + (bmiDifference * 0.1)));

    return {
      minMonths: Math.min(adjustedMin, 12), // Cap at 12 months
      maxMonths: Math.min(adjustedMax, 18), // Cap at 18 months
      rate: timeframe.rate
    };
  };

  const generateWorkoutPlan = async (gender = selectedGender) => {
    try {
      setLoading(true);
      setError(null);
      
      // Calculate timeframe before API call to ensure it's set
      const currentBMI = getCurrentBMI();
      const desiredBMI = calculateDesiredBMI(desiredShape);
      const calculatedTimeframe = getExpectedTimeframe(
        currentBMI,
        desiredBMI,
        desiredShape
      );
      
      // Set timeframe data immediately
      setTimeframeData({
        minMonths: calculatedTimeframe.minMonths,
        maxMonths: calculatedTimeframe.maxMonths,
        rate: calculatedTimeframe.rate
      });

      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash"
      });

      const prompt = `Create a focused 3-day workout plan targeting exactly 9 different muscles (3 muscles per day) specifically designed for a ${gender} aiming for a ${desiredShape} physique:

Day 1 - Upper Body Push:
- Target Muscles: Chest, Shoulders, Triceps
- 2 exercises per muscle (total 6 exercises)
- Include sets, reps, and rest periods
- Warm-up: 5-10 minutes
- Workout duration: 45-60 minutes
${gender === 'female' ? '- Focus on toning and definition\n- Include exercises suitable for female anatomy' : '- Focus on muscle development and strength\n- Include compound movements for muscle mass'}

Day 2 - Upper Body Pull:
- Target Muscles: Back, Biceps, Rear Deltoids
- 2 exercises per muscle (total 6 exercises)
- Include sets, reps, and rest periods
- Warm-up: 5-10 minutes
- Workout duration: 45-60 minutes
${gender === 'female' ? '- Emphasis on posture and upper body toning\n- Include exercises for long, lean muscles' : '- Focus on back width and thickness\n- Include heavy pulling movements'}

Day 3 - Lower Body:
- Target Muscles: Legs, Core, Calves
- 2 exercises per muscle (total 6 exercises)
- Include sets, reps, and rest periods
- Warm-up: 5-10 minutes
- Workout duration: 45-60 minutes
${gender === 'female' ? '- Focus on glute development and leg toning\n- Include exercises for hip stability' : '- Focus on leg strength and size\n- Include power movements'}

For each exercise include:
1. Proper form instructions specific to ${gender} anatomy
2. Number of sets (${gender === 'female' ? '3-4 with moderate weight' : '3-4 with progressive weight'})
3. Number of reps (${gender === 'female' ? '12-15 for toning' : '8-12 for muscle growth'})
4. Rest period between sets (${gender === 'female' ? '45-60 seconds' : '60-90 seconds'})

Additional Information:
- Estimated time to reach ${desiredShape} goal: ${calculatedTimeframe.minMonths}-${calculatedTimeframe.maxMonths} months
- Progress rate: ${calculatedTimeframe.rate}
- Required protein intake: ${calculateTargetProtein(userDetails.weight, desiredShape, userDetails.height)}g per day
- Gender-specific considerations: ${gender === 'female' 
  ? 'Focus on toning, definition, and functional strength while considering hormonal differences'
  : 'Focus on muscle mass, strength development, and considering natural testosterone levels'}`;

      const result = await model.generateContent({
        contents: [{ parts: [{ text: prompt }] }]
      });

      if (!result || !result.response) {
        throw new Error('No response received from model');
      }

      const responseText = result.response.text();
      setWorkoutPlan(formatWorkoutData(responseText));
      setLoading(false);

    } catch (error) {
      console.error("Generation Error Details:", error);
      setError("Failed to generate workout plan. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    generateWorkoutPlan();
  }, [userDetails, desiredShape]);

  const formatWorkoutData = (text) => {
    // Initialize the days structure
    const days = {
      1: {
        name: 'Upper Body Push',
        muscles: {
          chest: { name: 'Chest', exercises: [] },
          shoulders: { name: 'Shoulders', exercises: [] },
          triceps: { name: 'Triceps', exercises: [] }
        }
      },
      2: {
        name: 'Upper Body Pull',
        muscles: {
          back: { name: 'Back', exercises: [] },
          biceps: { name: 'Biceps', exercises: [] },
          rearDeltoids: { name: 'Rear Deltoids', exercises: [] }
        }
      },
      3: {
        name: 'Lower Body',
        muscles: {
          legs: { name: 'Legs', exercises: [] },
          core: { name: 'Core', exercises: [] },
          calves: { name: 'Calves', exercises: [] }
        }
      }
    };

    try {
      // Split the text into days
      const sections = text.split(/Day \d+/).filter(section => section.trim());
      
      sections.forEach((section, index) => {
        const dayNum = index + 1;
        const lines = section.split('\n').filter(line => line.trim());
        
        let currentMuscle = null;
        
        lines.forEach(line => {
          // Check for muscle groups
          Object.keys(days[dayNum].muscles).forEach(muscle => {
            if (line.toLowerCase().includes(muscle.toLowerCase()) ||
                (muscle === 'legs' && line.toLowerCase().includes('quadriceps')) ||
                (muscle === 'core' && line.toLowerCase().includes('hamstrings'))) {
              currentMuscle = muscle;
            }
          });
          
          // Check for exercises
          if (currentMuscle && line.includes('**')) {
            const exercise = {
              name: line.includes('**') ? line.split('**')[1].trim() : line.trim(),
              form: line.includes('Form:') ? line.split('Form:')[1].trim() : '',
              sets: '3-4',
              reps: '8-12',
              rest: '60-90 seconds'
            };

            // Add exercise if it's not already in the array
            if (!days[dayNum].muscles[currentMuscle].exercises.some(e => e.name === exercise.name)) {
              days[dayNum].muscles[currentMuscle].exercises.push(exercise);
            }
          }
        });

        // If no exercises were found, add placeholder exercises
        Object.keys(days[dayNum].muscles).forEach(muscle => {
          if (days[dayNum].muscles[muscle].exercises.length === 0) {
            days[dayNum].muscles[muscle].exercises = [
              {
                name: `${days[dayNum].muscles[muscle].name} Exercise 1`,
                form: 'Maintain proper form throughout the movement',
                sets: '3-4',
                reps: '8-12',
                rest: '60-90 seconds'
              },
              {
                name: `${days[dayNum].muscles[muscle].name} Exercise 2`,
                form: 'Focus on controlled movement and proper technique',
                sets: '3-4',
                reps: '8-12',
                rest: '60-90 seconds'
              }
            ];
          }
        });
      });

      console.log('Formatted workout data:', days); // Debug log
      return days;

    } catch (error) {
      console.error('Error formatting workout data:', error);
      return days; // Return default structure if parsing fails
    }
  };

  const handleVideoWatch = (exerciseName, muscleGroup) => {
    // Special handling for chest, shoulder, triceps, biceps, back, rear deltoids, legs, core, and calves exercises
    if (muscleGroup === 'chest') {
      window.open('https://youtu.be/zoKu5Bw9rLU?si=L3EuNgQmrluGBo2f', '_blank');
    } else if (muscleGroup === 'shoulders') {
      window.open('https://youtu.be/hmnvQmUPsto?si=kivMGhJYHuO_TN8l', '_blank');
    } else if (muscleGroup === 'triceps') {
      window.open('https://youtu.be/k8mkr459wA8?si=4Q7vrNBzq8pWhlK5', '_blank');
    } else if (muscleGroup === 'biceps') {
      window.open('https://youtu.be/v07X1a7nOAE?si=vsZg-oEi7NU9sJH5', '_blank');
    } else if (muscleGroup === 'back') {
      window.open('https://youtu.be/fX36liNtKzw?si=8hO6MBWlu_XwhwEj', '_blank');
    } else if (muscleGroup === 'rearDeltoids') {
      window.open('https://youtu.be/dKluhLck1Zs?si=MWtLWKER8NL3yLLH', '_blank');
    } else if (muscleGroup === 'legs') {
      window.open('https://youtu.be/QXtXEug0PLU?si=N55JnH3AWCOSdEsb', '_blank');
    } else if (muscleGroup === 'core') {
      window.open('https://youtu.be/95hX_OMuIpg?si=Ulz7tU_8R-LBhbaM', '_blank');
    } else if (muscleGroup === 'calves') {
      window.open('https://youtu.be/esdQSIxteQg?si=ghPEqecej4SerC8u', '_blank');
    } else {
      // For other exercises, just log for now
      console.log(`Opening video for: ${exerciseName}`);
    }
  };

  const getBMIClassification = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi < 24.9) return 'Normal weight';
    if (bmi >= 25 && bmi < 29.9) return 'Overweight';
    if (bmi >= 30) return 'Obese';
    return 'Unknown';
  };

  // Add this function to safely calculate BMI if it's not provided
  const getCurrentBMI = () => {
    if (userDetails?.bmi) {
      return userDetails.bmi;
    }
    // Calculate BMI if height and weight are available
    if (userDetails?.height && userDetails?.weight) {
      const heightInMeters = userDetails.height / 100; // Convert cm to meters
      const bmi = userDetails.weight / (heightInMeters * heightInMeters);
      return bmi;
    }
    return null;
  };

  return (
    <div className={`workout-plan-container max-w-4xl mx-auto p-6 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
    } rounded-lg shadow-lg blue-glow`}>
      
      {/* Gender Selection */}
      {!selectedGender && (
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-4 text-center ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Select Your Gender
          </h2>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setSelectedGender('male');
                generateWorkoutPlan('male');
              }}
              className={`px-8 py-4 rounded-lg transition-all duration-300 blue-glow ${
                isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              Male
            </button>
            <button
              onClick={() => {
                setSelectedGender('female');
                generateWorkoutPlan('female');
              }}
              className={`px-8 py-4 rounded-lg transition-all duration-300 blue-glow ${
                isDarkMode
                  ? 'bg-pink-600 hover:bg-pink-700 text-white'
                  : 'bg-pink-500 hover:bg-pink-600 text-white'
              }`}
            >
              Female
            </button>
          </div>
        </div>
      )}

      {/* Only show workout plan if gender is selected */}
      {selectedGender && (
        <>
          <h1 className={`text-3xl font-bold mb-8 text-center ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Your 3-Day Workout Plan
          </h1>
          
          {/* Timeline and Protein Info */}
          {timeframeData && (
            <div className="mb-8 grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Current BMI Card */}
              <div className={`p-4 rounded-lg blue-glow ${
                isDarkMode ? 'bg-gray-800 text-yellow-300' : 'bg-yellow-50 text-yellow-800'
              }`}>
                <h3 className="font-semibold mb-2">Current BMI</h3>
                <p className="text-lg font-bold">
                  {getCurrentBMI() ? getCurrentBMI().toFixed(1) : 'Calculate BMI'}
                </p>
                <p className="text-sm mt-1">
                  {getCurrentBMI() ? getBMIClassification(getCurrentBMI()) : 'Enter height and weight'}
                </p>
              </div>

              {/* Desired BMI Card */}
              <div className={`p-4 rounded-lg blue-glow ${
                isDarkMode ? 'bg-gray-800 text-orange-300' : 'bg-orange-50 text-orange-800'
              }`}>
                <h3 className="font-semibold mb-2">Target BMI</h3>
                <p className="text-lg font-bold">{calculateDesiredBMI(desiredShape).toFixed(1)}</p>
                <p className="text-sm mt-1">
                  {desiredShape.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </p>
              </div>

              {/* Existing Timeline Card */}
              <div className={`p-4 rounded-lg blue-glow ${
                isDarkMode ? 'bg-gray-800 text-blue-300' : 'bg-blue-50 text-blue-800'
              }`}>
                <h3 className="font-semibold mb-2">Estimated Timeline</h3>
                {timeframeData.minMonths && timeframeData.maxMonths ? (
                  <>
                    <p>{timeframeData.minMonths}-{timeframeData.maxMonths} months</p>
                    <p className="text-sm mt-1">{timeframeData.rate || 'Progress rate varies by individual'}</p>
                  </>
                ) : (
                  <p>Calculating timeline...</p>
                )}
              </div>

              {/* Existing Current Protein Card */}
              <div className={`p-4 rounded-lg blue-glow ${
                isDarkMode ? 'bg-gray-800 text-green-300' : 'bg-green-50 text-green-800'
              }`}>
                <h3 className="font-semibold mb-2">Current Protein</h3>
                <p>{estimateCurrentProtein(userDetails.weight, getCurrentBMI())}g/day</p>
              </div>

              {/* Existing Target Protein Card */}
              <div className={`p-4 rounded-lg blue-glow ${
                isDarkMode ? 'bg-gray-800 text-purple-300' : 'bg-purple-50 text-purple-800'
              }`}>
                <h3 className="font-semibold mb-2">Target Protein</h3>
                <p>{calculateTargetProtein(userDetails.weight, desiredShape, userDetails.height)}g/day</p>
              </div>
            </div>
          )}

          {/* Days Selection */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[1, 2, 3].map(day => (
              <button
                key={day}
                onClick={() => {
                  setSelectedDay(day);
                  setSelectedMuscle(null);
                }}
                className={`p-4 rounded-lg transition-all duration-300 blue-glow ${
                  selectedDay === day
                    ? 'bg-blue-600 text-white'
                    : isDarkMode
                      ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                <h2 className="font-bold">Day {day}</h2>
                <p className="text-sm">{workoutPlan?.[day]?.name}</p>
              </button>
            ))}
            </div>

          {/* Muscles Selection */}
          {selectedDay && (
            <div className="mb-8">
              <h3 className={`text-xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>Target Muscles</h3>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(workoutPlan[selectedDay].muscles).map(([key, muscle]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedMuscle(key)}
                    className={`p-4 rounded-lg transition-all duration-300 blue-glow ${
                      selectedMuscle === key
                        ? 'bg-green-600 text-white'
                        : isDarkMode
                          ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                  >
                    {muscle.name}
                  </button>
                ))}
            </div>
            </div>
          )}

          {/* Exercises Display */}
          {selectedDay && selectedMuscle && (
            <div className="space-y-6">
              <h3 className={`text-xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                {workoutPlan[selectedDay].muscles[selectedMuscle].name} Exercises
                  </h3>
              {workoutPlan[selectedDay].muscles[selectedMuscle].exercises.map((exercise, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg border blue-glow ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 text-gray-200' 
                      : 'bg-gray-50 border-gray-200 text-gray-700'
                  }`}
                >
                  <h4 className={`font-bold text-lg mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{exercise.name}</h4>
                  <div className="space-y-2">
                    <p><span className="font-semibold">Form:</span> {exercise.form}</p>
                    <p><span className="font-semibold">Sets:</span> {exercise.sets}</p>
                    <p><span className="font-semibold">Reps:</span> {exercise.reps}</p>
                    <p><span className="font-semibold">Rest:</span> {exercise.rest}</p>
                    </div>
                  <div className="mt-4">
                    <button 
                      className={`px-4 py-2 rounded-lg flex items-center blue-glow ${
                        isDarkMode 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      } transition-all transform hover:scale-105`}
                      onClick={() => handleVideoWatch(exercise.name, selectedMuscle)}
                    >
                      <svg 
                        className="w-5 h-5 mr-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                      </svg>
                      Watch Video
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
                isDarkMode ? 'border-blue-400' : 'border-blue-600'
              } mx-auto mb-4`}></div>
              <p className={`text-lg ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Generating your personalized workout plan...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-red-900 text-red-200' : 'bg-red-50 text-red-700'
            }`}>
              <p>{error}</p>
              <button 
                onClick={generateWorkoutPlan}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
          </div>
          )}

          {selectedGender && (
            <button
              onClick={() => {
                setSelectedGender(null);
                setWorkoutPlan(null);
              }}
              className={`mb-4 px-4 py-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              Change Gender
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default WorkoutPlanGenerator; 