import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const StudentProgress = () => {
  const { userSelections } = useAuth();
  const [timeframe, setTimeframe] = useState('week');

  const progressData = {
    week: {
      studyTime: '12.5 hrs',
      topicsCompleted: 8,
      quizzesTaken: 5,
      averageScore: 78,
      streak: 5,
      subjects: [
        { name: 'Mathematics', progress: 85, time: '4.5 hrs' },
        { name: 'Science', progress: 72, time: '3.2 hrs' },
        { name: 'English', progress: 90, time: '2.8 hrs' },
        { name: 'Hindi', progress: 65, time: '2.0 hrs' }
      ]
    },
    month: {
      studyTime: '52 hrs',
      topicsCompleted: 34,
      quizzesTaken: 22,
      averageScore: 82,
      streak: 18,
      subjects: [
        { name: 'Mathematics', progress: 88, time: '18 hrs' },
        { name: 'Science', progress: 76, time: '14 hrs' },
        { name: 'English', progress: 92, time: '12 hrs' },
        { name: 'Hindi', progress: 70, time: '8 hrs' }
      ]
    }
  };

  const currentData = progressData[timeframe];

  const achievements = [
    { id: 1, title: '5 Day Streak', icon: '🔥', earned: true },
    { id: 2, title: 'Quiz Master', icon: '🧠', earned: true },
    { id: 3, title: 'Fast Learner', icon: '⚡', earned: false },
    { id: 4, title: 'Perfect Score', icon: '💯', earned: false }
  ];

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold gradient-text">📊 Study Progress</h2>
          <div className="flex space-x-2">
            {['week', 'month'].map(period => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeframe === period
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <div className="text-3xl font-bold text-blue-600">{currentData.studyTime}</div>
            <div className="text-sm text-blue-500">Study Time</div>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <div className="text-3xl font-bold text-green-600">{currentData.topicsCompleted}</div>
            <div className="text-sm text-green-500">Topics Completed</div>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <div className="text-3xl font-bold text-purple-600">{currentData.quizzesTaken}</div>
            <div className="text-sm text-purple-500">Quizzes Taken</div>
          </div>
          <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
            <div className="text-3xl font-bold text-orange-600">{currentData.averageScore}%</div>
            <div className="text-sm text-orange-500">Average Score</div>
          </div>
        </div>

        {/* Subject-wise Progress */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">📚 Subject Progress</h3>
          <div className="space-y-4">
            {currentData.subjects.map((subject, index) => (
              <div key={index} className="bg-white dark:bg-gray-800/50 rounded-xl p-4 border">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-800 dark:text-white">{subject.name}</h4>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {subject.time} • {subject.progress}%
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      subject.progress >= 80 ? 'bg-green-500' :
                      subject.progress >= 60 ? 'bg-blue-500' : 'bg-orange-500'
                    }`}
                    style={{ width: `${subject.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-xl font-bold mb-4">🏆 Achievements</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map(achievement => (
              <div
                key={achievement.id}
                className={`text-center p-4 rounded-xl transition-all ${
                  achievement.earned
                    ? 'bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-300 dark:border-yellow-600'
                    : 'bg-gray-100 dark:bg-gray-800 opacity-50 border-2 border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className={`text-3xl mb-2 ${achievement.earned ? '' : 'grayscale'}`}>
                  {achievement.icon}
                </div>
                <div className="text-sm font-medium text-gray-800 dark:text-white">
                  {achievement.title}
                </div>
                {achievement.earned && (
                  <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                    ✓ Earned
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProgress;
