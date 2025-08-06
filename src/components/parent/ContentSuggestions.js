import React from 'react';

const ContentSuggestions = ({ expanded = false }) => {
  const suggestions = [
    {
      type: 'notes',
      title: 'Quadratic Equations - Chapter 4',
      subject: 'Mathematics',
      class: '10',
      difficulty: 'Medium',
      timeRequired: '30 min',
      reason: 'Based on recent quiz performance'
    },
    {
      type: 'video',
      title: 'Photosynthesis Process Explained',
      subject: 'Science',
      class: '10',
      difficulty: 'Easy',
      timeRequired: '15 min',
      reason: 'Popular among similar students'
    },
    {
      type: 'quiz',
      title: 'English Grammar Practice',
      subject: 'English',
      class: '10',
      difficulty: 'Easy',
      timeRequired: '20 min',
      reason: 'Recommended by teacher'
    }
  ];

  const getTypeIcon = (type) => {
    switch(type) {
      case 'notes': return '📝';
      case 'video': return '📹';
      case 'quiz': return '🧠';
      default: return '📄';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className={`glass-card rounded-3xl p-6 ${expanded ? 'col-span-full' : ''}`}>
      <h2 className="text-2xl font-bold mb-6">Content Suggestions</h2>
      
      <div className="space-y-4">
        {suggestions.map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-800/50 rounded-xl p-4 border hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{getTypeIcon(item.type)}</div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">{item.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>{item.subject}</span>
                    <span>•</span>
                    <span>Class {item.class}</span>
                    <span>•</span>
                    <span>{item.timeRequired}</span>
                  </div>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                {item.difficulty}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                💡 {item.reason}
              </p>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                Suggest to Child
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
          View All Suggestions →
        </button>
      </div>
    </div>
  );
};

export default ContentSuggestions;
