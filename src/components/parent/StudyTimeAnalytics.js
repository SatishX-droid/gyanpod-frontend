import React, { useState } from 'react';

const StudyTimeAnalytics = ({ expanded = false }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  
  const analytics = {
    week: {
      totalTime: '18.5 hrs',
      dailyAverage: '2.6 hrs',
      bestDay: 'Monday',
      improvement: '+12%'
    },
    month: {
      totalTime: '78 hrs',
      dailyAverage: '2.5 hrs',
      bestDay: 'Weekdays',
      improvement: '+8%'
    }
  };

  const dailyData = [
    { day: 'Mon', hours: 3.2, subjects: ['Math', 'Science'] },
    { day: 'Tue', hours: 2.8, subjects: ['English', 'Hindi'] },
    { day: 'Wed', hours: 2.1, subjects: ['Math', 'Social'] },
    { day: 'Thu', hours: 3.5, subjects: ['Science', 'Math'] },
    { day: 'Fri', hours: 2.9, subjects: ['All Subjects'] },
    { day: 'Sat', hours: 2.0, subjects: ['Revision'] },
    { day: 'Sun', hours: 2.0, subjects: ['Quiz Practice'] }
  ];

  return (
    <div className={`glass-card rounded-3xl p-6 ${expanded ? 'col-span-full' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Study Time Analytics</h2>
        
        <div className="flex space-x-2">
          {['week', 'month'].map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedPeriod === period
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <div className="text-2xl font-bold text-blue-600">{analytics[selectedPeriod].totalTime}</div>
          <div className="text-sm text-blue-500">Total Time</div>
        </div>
        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
          <div className="text-2xl font-bold text-green-600">{analytics[selectedPeriod].dailyAverage}</div>
          <div className="text-sm text-green-500">Daily Average</div>
        </div>
        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
          <div className="text-2xl font-bold text-purple-600">{analytics[selectedPeriod].bestDay}</div>
          <div className="text-sm text-purple-500">Best Day</div>
        </div>
        <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
          <div className="text-2xl font-bold text-orange-600">{analytics[selectedPeriod].improvement}</div>
          <div className="text-sm text-orange-500">Improvement</div>
        </div>
      </div>

      {/* Daily Breakdown */}
      <div>
        <h3 className="font-semibold mb-4">Daily Study Time</h3>
        <div className="space-y-3">
          {dailyData.map((day, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 relative">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full"
                  style={{ width: `${(day.hours / 4) * 100}%` }}
                ></div>
              </div>
              <div className="w-16 text-sm font-medium text-gray-800 dark:text-white">{day.hours}h</div>
              <div className="flex-1 text-xs text-gray-500">
                {day.subjects.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="mt-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
        <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">📊 Insights</h3>
        <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
          <li>• Peak study time: 4:00 PM - 6:00 PM</li>
          <li>• Most productive subject: Mathematics</li>
          <li>• Recommended: Add 30 min breaks between subjects</li>
        </ul>
      </div>
    </div>
  );
};

export default StudyTimeAnalytics;
