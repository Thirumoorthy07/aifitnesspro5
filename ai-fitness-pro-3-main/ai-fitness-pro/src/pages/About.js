import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/global.css';

const About = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const teamMembers = [
    {
      name: 'Rajesh',
      role: 'Full Stack Web Developer',
      skills: [
        'Full Stack Development',
        'Hacking and Cyber Security Expert'
      ]
    },
    {
      name: 'Thirumoorthy',
      role: 'Marketing & Game Developer',
      skills: [
        'Marketing and Sales',
        'Game Development',
        'Basic Web Development'
      ]
    },
    {
      name: 'Saur Basha',
      role: 'Full Stack Developer',
      skills: [
        'Full Stack Development',
        'Graphic Design',
        'App Development'
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className={`
          premium-title text-5xl md:text-6xl lg:text-7xl
          text-center mb-8 relative
        `}>
          About Us
        </h1>
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            About AI Fitness Pro
          </h1>
          <p className={`text-xl mb-8 max-w-3xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Revolutionizing fitness through artificial intelligence and personalized workout plans
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            title="AI-Powered Workouts"
            description="Our advanced AI algorithms create personalized workout plans based on your goals and fitness level"
            icon="🤖"
            isDarkMode={isDarkMode}
          />
          <FeatureCard
            title="Scientific Approach"
            description="Evidence-based training methods combined with modern AI technology"
            icon="🔬"
            isDarkMode={isDarkMode}
          />
          <FeatureCard
            title="Personalized Plans"
            description="Custom workout routines tailored to your specific goals and body type"
            icon="📋"
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Mission Statement */}
        <div className={`p-8 rounded-lg blue-glow ${
          isDarkMode 
            ? 'bg-gray-800' 
            : 'bg-white'
        }`}>
          <h2 className={`text-3xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Our Mission
          </h2>
          <p className={`text-lg leading-relaxed ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            At AI Fitness Pro, we're committed to making professional-grade fitness guidance accessible to everyone. 
            By leveraging cutting-edge AI technology, we provide personalized workout plans that adapt to your progress 
            and help you achieve your fitness goals effectively.
          </p>
        </div>

        {/* Team Section */}
        <div className={`p-8 rounded-lg shadow-lg ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className={`text-3xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BenefitCard
              title="Smart Technology"
              description="Advanced AI algorithms that learn and adapt to your progress"
              isDarkMode={isDarkMode}
            />
            <BenefitCard
              title="Expert Knowledge"
              description="Built on proven fitness and nutrition principles"
              isDarkMode={isDarkMode}
            />
            <BenefitCard
              title="Personalized Experience"
              description="Customized plans that evolve with your fitness journey"
              isDarkMode={isDarkMode}
            />
            <BenefitCard
              title="Continuous Support"
              description="Regular updates and improvements to your workout plans"
              isDarkMode={isDarkMode}
            />
          </div>
        </div>

        {/* Add this heading before the team members grid */}
        <h2 className={`text-3xl font-bold mb-8 text-center ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Our Team
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member) => (
            <div key={member.name} className={`p-6 rounded-lg blue-glow ${
              isDarkMode 
                ? 'bg-gray-800' 
                : 'bg-white'
            }`}>
              <h3 className={`text-2xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {member.name}
              </h3>
              <p className={`text-lg mb-4 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {member.role}
              </p>
              <ul className={`list-disc list-inside ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {member.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, icon, isDarkMode }) => (
  <div className={`p-6 rounded-lg blue-glow ${
    isDarkMode 
      ? 'bg-gray-800 hover:bg-gray-700' 
      : 'bg-white hover:bg-gray-50'
  } transition-all duration-300`}>
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className={`text-xl font-bold mb-2 ${
      isDarkMode ? 'text-white' : 'text-gray-900'
    }`}>
      {title}
    </h3>
    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
      {description}
    </p>
  </div>
);

const BenefitCard = ({ title, description, isDarkMode }) => (
  <div className={`p-6 rounded-lg blue-glow ${
    isDarkMode 
      ? 'bg-gray-800' 
      : 'bg-white'
  }`}>
    <h3 className={`text-xl font-bold mb-2 ${
      isDarkMode ? 'text-white' : 'text-gray-900'
    }`}>
      {title}
    </h3>
    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
      {description}
    </p>
  </div>
);

export default About; 