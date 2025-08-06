import React, { useState } from 'react';

const MyContributions = ({ expanded = false }) => {
  const [contributions] = useState([
    {
      id: 1,
      title: 'Real Numbers Notes',
      type: 'notes',
      class: '10',
      subject: 'mathematics',
      status: 'approved',
      submittedAt: '2 days ago',
      views: 234
    },
    {
      id: 2,
      title: 'Quadratic Equations Quiz',
      type: 'quiz',
      class: '10',
      subject: 'mathematics',
      status: 'pending',
      submittedAt: '1 day ago',
      views: 0
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className={`glass-card rounded-3xl p-6 ${expanded ? 'col-span-full' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">My Contributions</h2>
        <div className="text-sm text-gray-600">
          {contributions.length} submissions
        </div>
      </div>

      <div className="space-y-4">
        {contributions.map(item => (
          <div key={item.id} className="bg-white dark:bg-gray-800/50 rounded-xl p-4 border">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{item.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>📄 {item.type}</span>
              <span>Class {item.class}</span>
              <span>{item.subject}</span>
              <span>{item.submittedAt}</span>
              <span>👁️ {item.views} views</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyContributions;
