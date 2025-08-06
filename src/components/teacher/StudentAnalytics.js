import React from 'react';

const StudentAnalytics = ({ expanded = false }) => {
  const stats = [
    { label: 'Students Reached', value: '1,234', trend: '+12%' },
    { label: 'Content Views', value: '5,678', trend: '+8%' },
    { label: 'Quiz Attempts', value: '890', trend: '+15%' },
    { label: 'Average Score', value: '78%', trend: '+3%' }
  ];

  return (
    <div className={`glass-card rounded-3xl p-6 ${expanded ? 'col-span-full' : ''}`}>
      <h2 className="text-2xl font-bold mb-6">Student Analytics</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
            <div className="text-xs text-green-600">{stat.trend}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentAnalytics;
