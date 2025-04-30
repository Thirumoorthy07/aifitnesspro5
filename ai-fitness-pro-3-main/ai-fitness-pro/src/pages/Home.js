import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/global.css';  // Make sure to import the CSS

const Home = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className={`
          premium-title text-5xl md:text-6xl lg:text-7xl
          text-center mb-8 relative
        `}>
          AI-Powered
          <br />
          Fitness Journey
        </h1>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Get personalized workout plans, nutrition guidance, and progress tracking powered by artificial intelligence.
          </p>
          <Link
            to="/workout"
            className="premium-button text-white text-lg font-bold px-10 py-4 rounded-full 
              inline-block transition-all duration-300"
          >
            Start Your Journey
          </Link>
        </div>

        {/* Features Grid */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="aurora-card">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {/* Smart Workouts */}
              <div className={`p-4 sm:p-6 md:p-8 rounded-lg blue-glow ${
                isDarkMode 
                  ? 'bg-gray-800' 
                  : 'bg-white'
              } transition-all duration-300`}>
                <span className="text-4xl sm:text-5xl md:text-6xl mb-1 sm:mb-2 block">💪</span>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Smart Workouts</h2>
                <p className={`text-lg sm:text-xl leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  AI-generated workout plans tailored to your goals and fitness level
                </p>
              </div>

              {/* Progress Tracking */}
              <div className={`p-4 sm:p-6 md:p-8 rounded-lg blue-glow ${
                isDarkMode 
                  ? 'bg-gray-800' 
                  : 'bg-white'
              } transition-all duration-300`}>
                <span className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-4 block">📊</span>
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">Progress Tracking</h2>
                <p className={`text-base sm:text-lg ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Track your journey with detailed metrics and timelines
                </p>
              </div>

              {/* Goal Setting */}
              <div className={`p-4 sm:p-6 md:p-8 rounded-lg blue-glow ${
                isDarkMode 
                  ? 'bg-gray-800' 
                  : 'bg-white'
              } transition-all duration-300`}>
                <span className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-4 block">🎯</span>
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">Goal Setting</h2>
                <p className={`text-base sm:text-lg ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Set and achieve your fitness goals with personalized guidance
                </p>
              </div>

              {/* Video Tutorials */}
              <div className={`p-4 sm:p-6 md:p-8 rounded-lg blue-glow ${
                isDarkMode 
                  ? 'bg-gray-800' 
                  : 'bg-white'
              } transition-all duration-300`}>
                <span className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-4 block">🎥</span>
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">Video Tutorials</h2>
                <p className={`text-base sm:text-lg ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Access detailed exercise videos for proper form and technique
                </p>
              </div>

              {/* Nutrition Guidance */}
              <div className={`p-4 sm:p-6 md:p-8 rounded-lg blue-glow ${
                isDarkMode 
                  ? 'bg-gray-800' 
                  : 'bg-white'
              } transition-all duration-300`}>
                <span className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-4 block">🥗</span>
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">Nutrition Guidance</h2>
                <p className={`text-base sm:text-lg ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Get personalized protein intake recommendations and dietary tips
                </p>
              </div>

              {/* Gender Specific */}
              <div className={`p-4 sm:p-6 md:p-8 rounded-lg blue-glow ${
                isDarkMode 
                  ? 'bg-gray-800' 
                  : 'bg-white'
              } transition-all duration-300`}>
                <span className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-4 block">⚧️</span>
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">Gender Specific</h2>
                <p className={`text-base sm:text-lg ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Workouts tailored to male and female body types and goals
                </p>
              </div>

              {/* BMI Analysis */}
              <div className={`p-4 sm:p-6 md:p-8 rounded-lg blue-glow ${
                isDarkMode 
                  ? 'bg-gray-800' 
                  : 'bg-white'
              } transition-all duration-300`}>
                <span className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-4 block">📏</span>
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">BMI Analysis</h2>
                <p className={`text-base sm:text-lg ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Track your BMI progress and get targeted recommendations
                </p>
              </div>

              {/* Timeline Estimates */}
              <div className={`p-4 sm:p-6 md:p-8 rounded-lg blue-glow ${
                isDarkMode 
                  ? 'bg-gray-800' 
                  : 'bg-white'
              } transition-all duration-300`}>
                <span className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-4 block">⏱️</span>
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">Timeline Estimates</h2>
                <p className={`text-base sm:text-lg ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Get realistic timelines to achieve your fitness goals
                </p>
              </div>

              {/* Multiple Body Types */}
              <div className={`p-4 sm:p-6 md:p-8 rounded-lg blue-glow ${
                isDarkMode 
                  ? 'bg-gray-800' 
                  : 'bg-white'
              } transition-all duration-300`}>
                <span className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-4 block">🏃</span>
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">Multiple Body Types</h2>
                <p className={`text-base sm:text-lg ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Programs for different goals: lean, muscular, toned, and more
                </p>
              </div>
        </div>

        {/* How It Works Section */}
            <div className={`rounded-lg p-8 mb-16 blue-glow ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } transition-all duration-300`}>
          <h2 className={`text-3xl font-bold mb-8 text-center ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StepCard
              number="1"
              title="Enter Your Details"
              description="Provide your current measurements and fitness goals"
              isDarkMode={isDarkMode}
            />
            <StepCard
              number="2"
              title="Get Your Plan"
              description="Receive a customized workout plan generated by AI"
              isDarkMode={isDarkMode}
            />
            <StepCard
              number="3"
              title="Track Progress"
              description="Monitor your improvements and stay motivated"
              isDarkMode={isDarkMode}
            />
            <StepCard
              number="4"
              title="Achieve Goals"
              description="Reach your fitness goals with expert guidance"
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Helper Components
const FeatureCard = ({ icon, title, description, isDarkMode }) => (
  <div className={`p-8 rounded-lg blue-glow ${
    isDarkMode 
      ? 'bg-gray-800' 
      : 'bg-white'
  } transition-all duration-300`}>
    <span className="text-6xl mb-4 block">{icon}</span>
    <h2 className="text-2xl font-bold mb-2">
      {title}
    </h2>
    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
      {description}
    </p>
  </div>
);

const StepCard = ({ number, title, description, isDarkMode }) => (
  <div className="flex flex-col items-center text-center">
    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold mb-4 text-white">
      {number}
    </div>
    <h3 className={`text-lg font-bold mb-2 ${
      isDarkMode ? 'text-white' : 'text-gray-900'
    }`}>
      {title}
    </h3>
    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
      {description}
    </p>
  </div>
);

export default Home; 