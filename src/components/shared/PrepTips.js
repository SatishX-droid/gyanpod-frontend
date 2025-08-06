import React, { useState } from 'react';

const PrepTips = ({ expanded = false }) => {
  const [activeTip, setActiveTip] = useState(0);

  const tips = [
    {
      icon: '📚',
      title: 'Daily Revision',
      tip: 'Spend 30 minutes daily reviewing what you learned',
      details: 'Regular revision helps consolidate memory and improves long-term retention. Set aside time each day to go through your notes.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '⏰',
      title: 'Time Management',
      tip: 'Create a study schedule and stick to it',
      details: 'Break your study time into manageable chunks. Use techniques like Pomodoro (25 min study, 5 min break) for better focus.',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: '✅',
      title: 'Practice Tests',
      tip: 'Take mock tests to improve your exam technique',
      details: 'Regular practice tests help you understand exam patterns and improve your speed and accuracy under timed conditions.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🎯',
      title: 'Focus Mode',
      tip: 'Remove distractions while studying',
      details: 'Keep your phone away, find a quiet space, and use tools like website blockers to maintain concentration during study sessions.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: '🤝',
      title: 'Study Groups',
      tip: 'Join study groups for better understanding',
      details: 'Discussing concepts with peers can provide new perspectives and help clarify doubts. Teach others to solidify your own knowledge.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: '💡',
      title: 'Active Learning',
      tip: 'Make notes, ask questions, and summarize',
      details: 'Don\'t just read passively. Create mind maps, ask "why" and "how", and summarize topics in your own words.',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <div className={`glass-card rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 ${expanded ? 'col-span-full' : ''}`}>
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-white text-2xl">💡</span>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">PrepTips</h2>
          <p className="text-gray-600 dark:text-gray-400">Study hacks & exam strategies</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500 dark:text-gray-400">Tips Available</div>
          <div className="text-2xl font-bold text-indigo-600">{tips.length}</div>
        </div>
      </div>

      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div 
            key={index} 
            className={`relative overflow-hidden rounded-2xl transition-all duration-300 cursor-pointer ${
              activeTip === index ? 'shadow-lg' : 'hover:shadow-md'
            }`}
            onClick={() => setActiveTip(activeTip === index ? -1 : index)}
          >
            <div className={`bg-gradient-to-r ${tip.color} p-1 rounded-2xl`}>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${tip.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white text-2xl">{tip.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-gray-800 dark:text-white text-lg">
                        {tip.title}
                      </h3>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <span className={`transform transition-transform ${activeTip === index ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </button>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      {tip.tip}
                    </p>
                    
                    {activeTip === index && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          {tip.details}
                        </p>
                        <div className="flex items-center space-x-4 mt-3">
                          <button className="text-xs bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            📖 Learn More
                          </button>
                          <button className="text-xs bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            ✅ Mark as Applied
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-4 border border-indigo-200 dark:border-indigo-800">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">🌟</div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white">Pro Tip of the Day</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Review your mistakes from previous quizzes before studying new topics. Learning from errors is the fastest way to improve!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrepTips;
