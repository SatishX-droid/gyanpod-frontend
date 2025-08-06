import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const RoleSelection = () => {
  const [loading, setLoading] = useState(false);
  const { user, signInWithGoogle, completeUserSetup } = useAuth();

  const roles = [
    {
      id: 'student',
      name: 'Student',
      icon: '🎓',
      description: 'Access study materials, take quizzes, solve doubts',
      color: 'from-blue-500 to-purple-500',
      features: ['📝 Study Notes', '🧠 Practice Quizzes', '💬 Doubt Solver', '📊 Progress Tracking']
    },
    {
      id: 'teacher',
      name: 'Teacher',
      icon: '👩‍🏫',
      description: 'Create content, upload materials, track student progress',
      color: 'from-green-500 to-teal-500',
      features: ['📤 Upload Content', '📊 Student Analytics', '💡 Create Quizzes', '👥 Bulk Tools']
    },
    {
      id: 'parent',
      name: 'Parent',
      icon: '👨‍👩‍👧',
      description: 'Monitor child progress, communicate with teachers',
      color: 'from-orange-500 to-red-500',
      features: ['📈 Child Progress', '📱 Study Time Monitor', '💬 Teacher Chat', '🎯 Goal Setting']
    },
    {
      id: 'other',
      name: 'Others',
      icon: '🤝',
      description: 'General access to public study content',
      color: 'from-purple-500 to-pink-500',
      features: ['📚 Public Content', '🔍 Browse Materials', '📖 Limited Access', '👀 View Only']
    }
  ];

  const handleRoleSelect = async (roleId) => {
    setLoading(true);
    try {
      if (!user) {
        // First sign in with Google
        const result = await signInWithGoogle();
        if (result.newUser) {
          // New user - set role and complete setup
          await completeUserSetup(roleId);
        }
      } else {
        // Already signed in, just set role
        await completeUserSetup(roleId);
      }
    } catch (error) {
      console.error('Role selection error:', error);
      alert('Error selecting role. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center shadow-xl">
              <span className="text-white text-3xl font-bold">G</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold gradient-text mb-4">Welcome to GyanPod!</h1>
          <p className="text-gray-600 dark:text-gray-300 text-xl max-w-2xl mx-auto">
            Choose your role to unlock personalized features and start your learning journey
          </p>
        </div>
        
        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              disabled={loading}
              className={`group relative p-8 bg-gradient-to-r ${role.color} rounded-3xl text-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-black/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10 text-center">
                <div className="text-7xl mb-4 group-hover:animate-bounce">{role.icon}</div>
                <h3 className="text-3xl font-bold mb-3">{role.name}</h3>
                <p className="text-white/90 mb-6 text-lg">{role.description}</p>
                
                {/* Features List */}
                <div className="space-y-2">
                  {role.features.map((feature, index) => (
                    <div key={index} className="flex items-center justify-center space-x-2 text-sm">
                      <span className="w-2 h-2 bg-white/60 rounded-full"></span>
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Action Button */}
                <div className="mt-6">
                  <div className="bg-white/20 px-6 py-2 rounded-full backdrop-blur-sm">
                    {loading ? 'Setting up...' : `Continue as ${role.name}`}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 dark:text-gray-400">
            🔒 Secure Google Sign-in • 📱 Works on all devices • 🆓 Completely Free
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
