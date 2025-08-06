import React, { useState, useEffect } from 'react';

const BoostMeter = ({ expanded = false }) => {
  const [progress, setProgress] = useState(65);
  const [streak, setStreak] = useState(5);
  const [stats, setStats] = useState({
    notesRead: 23,
    quizTaken: 8,
    timeSpent: 4.5,
    accuracy: 85
  });

  const achievements = [
    { id: 1, name: '5 Day Streak', icon: '🔥', unlocked: true },
    { id: 2, name: 'Quiz Master', icon: '🧠', unlocked: true },
    { id: 3, name: 'Note Taker', icon: '📝', unlocked: true },
    { id: 4, name: 'Perfect Score', icon: '💯', unlocked: false },
    { id: 5, name: 'Speed Reader', icon: '⚡', unlocked: false },
    { id: 6, name: 'Doubt Solver', icon: '💡', unlocked: false }
  ];

  return (
    <div className={`glass-card rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 ${expanded ? 'col-span-full' : ''}`}>
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-white text-2xl">🚀</span>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">BoostMeter</h2>
          <p className="text-gray-600 dark:text-gray-400">Your learning progress</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500 dark:text-gray-400">Level</div>
          <div className="text-2xl font-bold text-green-600">5</div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Weekly Progress */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Weekly Goal</span>
            <span className="text-sm text-gray-500">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 relative overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-500 to-teal-500 h-3 rounded-full transition-all duration-1000 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {progress >= 100 ? '🎉 Goal Completed!' : `${100 - progress}% to go!`}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3">
            <div className="text-2xl font-bold text-blue-600">{streak}</div>
            <div className="text-xs text-blue-500">🔥 Day Streak</div>
          </div>
          <div className="text-center bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3">
            <div className="text-2xl font-bold text-purple-600">{stats.notesRead}</div>
            <div className="text-xs text-purple-500">📚 Notes Read</div>
          </div>
          <div className="text-center bg-green-50 dark:bg-green-900/20 rounded-xl p-3">
            <div className="text-2xl font-bold text-green-600">{stats.quizTaken}</div>
            <div className="text-xs text-green-500">🧠 Quiz Taken</div>
          </div>
          <div className="text-center bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3">
            <div className="text-2xl font-bold text-orange-600">{stats.timeSpent}h</div>
            <div className="text-xs text-orange-500">⏱️ Time Spent</div>
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">🏆 Achievements</h3>
          <div className="grid grid-cols-3 gap-2">
            {achievements.map(achievement => (
              <div 
                key={achievement.id}
                className={`text-center p-3 rounded-lg transition-all ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800' 
                    : 'bg-gray-100 dark:bg-gray-800 opacity-50'
                }`}
              >
                <div className={`text-2xl mb-1 ${achievement.unlocked ? '' : 'grayscale'}`}>
                  {achievement.icon}
                </div>
                <div className="text-xs font-medium text-gray-800 dark:text-white">
                  {achievement.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Goal */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-2xl p-4 border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-1">🎯 Today's Goal</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Complete 3 more topics to maintain your streak!</p>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white font-bold">
                2/5
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoostMeter;
