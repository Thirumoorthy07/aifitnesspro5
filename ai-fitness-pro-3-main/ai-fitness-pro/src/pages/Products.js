import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Products = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Our Products
          </h1>
          <p className={`text-xl mb-8 max-w-3xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Discover our range of AI-powered fitness solutions tailored to your needs
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <ProductCard
            title="AI Personal Trainer"
            price="$29.99/month"
            description="Get personalized workout plans, real-time adjustments, and progress tracking"
            features={[
              "Custom workout plans",
              "Progress tracking",
              "Nutrition guidance",
              "24/7 AI support"
            ]}
            popularTag={true}
            isDarkMode={isDarkMode}
          />

          <ProductCard
            title="Nutrition Planner"
            price="$19.99/month"
            description="AI-generated meal plans and nutrition advice based on your fitness goals"
            features={[
              "Personalized meal plans",
              "Macro tracking",
              "Recipe suggestions",
              "Shopping lists"
            ]}
            isDarkMode={isDarkMode}
          />

          <ProductCard
            title="Premium Package"
            price="$39.99/month"
            description="Complete fitness solution combining workout and nutrition planning"
            features={[
              "All AI Trainer features",
              "All Nutrition features",
              "Priority support",
              "Advanced analytics"
            ]}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Features Section */}
        <div className={`p-8 rounded-lg shadow-lg mb-16 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className={`text-3xl font-bold mb-8 text-center ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Why Choose Our Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureItem
              icon="🎯"
              title="Goal-Oriented"
              description="Tailored to your specific fitness objectives"
              isDarkMode={isDarkMode}
            />
            <FeatureItem
              icon="🤖"
              title="AI-Powered"
              description="Advanced algorithms for optimal results"
              isDarkMode={isDarkMode}
            />
            <FeatureItem
              icon="📱"
              title="Mobile-First"
              description="Access your plans anywhere, anytime"
              isDarkMode={isDarkMode}
            />
            <FeatureItem
              icon="🔄"
              title="Adaptive"
              description="Plans that evolve with your progress"
              isDarkMode={isDarkMode}
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center p-12 rounded-lg shadow-lg ${
          isDarkMode ? 'bg-blue-900' : 'bg-blue-50'
        }`}>
          <h2 className={`text-3xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Ready to Transform Your Fitness Journey?
          </h2>
          <p className={`mb-8 ${
            isDarkMode ? 'text-blue-200' : 'text-blue-700'
          }`}>
            Start your journey today with our AI-powered fitness solutions
          </p>
          <Link
            to="/workout"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ title, price, description, features, popularTag, isDarkMode }) => (
  <div className={`relative p-6 rounded-lg shadow-lg ${
    isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
  } transition-colors`}>
    {popularTag && (
      <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
        Most Popular
      </div>
    )}
    <h3 className={`text-2xl font-bold mb-2 ${
      isDarkMode ? 'text-white' : 'text-gray-900'
    }`}>
      {title}
    </h3>
    <div className={`text-3xl font-bold mb-4 ${
      isDarkMode ? 'text-blue-400' : 'text-blue-600'
    }`}>
      {price}
    </div>
    <p className={`mb-6 ${
      isDarkMode ? 'text-gray-300' : 'text-gray-600'
    }`}>
      {description}
    </p>
    <ul className="space-y-3 mb-8">
      {features.map((feature, index) => (
        <li key={index} className={`flex items-center ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          <span className="mr-2">✓</span>
          {feature}
        </li>
      ))}
    </ul>
    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
      Choose Plan
    </button>
  </div>
);

const FeatureItem = ({ icon, title, description, isDarkMode }) => (
  <div className="text-center">
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

export default Products; 