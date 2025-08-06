import React, { useState, useEffect } from 'react';

const SaveBox = ({ expanded = false }) => {
  const [savedItems, setSavedItems] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    // Load saved items from localStorage
    const saved = JSON.parse(localStorage.getItem('savedNotes') || '[]');
    const savedQuizzes = JSON.parse(localStorage.getItem('savedQuizzes') || '[]');
    const savedPapers = JSON.parse(localStorage.getItem('savedPapers') || '[]');
    
    const allItems = [
      ...saved.map(id => ({ id, type: 'note', title: 'Real Numbers Notes', subject: 'Mathematics', date: '2 days ago' })),
      ...savedQuizzes.map(id => ({ id, type: 'quiz', title: 'Polynomials Quiz', subject: 'Mathematics', date: '1 day ago' })),
      ...savedPapers.map(id => ({ id, type: 'paper', title: '2023 Sample Paper', subject: 'Science', date: '3 days ago' }))
    ];
    
    setSavedItems(allItems.slice(0, 6)); // Show first 6 items
  }, []);

  const getIcon = (type) => {
    switch(type) {
      case 'note': return '📝';
      case 'quiz': return '🧠';
      case 'paper': return '📋';
      case 'video': return '📹';
      default: return '📄';
    }
  };

  const getColor = (type) => {
    switch(type) {
      case 'note': return 'from-blue-500 to-cyan-500';
      case 'quiz': return 'from-purple-500 to-pink-500';
      case 'paper': return 'from-green-500 to-teal-500';
      case 'video': return 'from-red-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const filteredItems = activeTab === 'all' 
    ? savedItems 
    : savedItems.filter(item => item.type === activeTab);

  return (
    <div className={`glass-card rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 ${expanded ? 'col-span-full' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl">💾</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">SaveBox</h2>
            <p className="text-gray-600 dark:text-gray-400">Your bookmarked content</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500 dark:text-gray-400">Saved Items</div>
          <div className="text-2xl font-bold text-yellow-600">{filteredItems.length}</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-4 overflow-x-auto">
        {['all', 'note', 'quiz', 'paper', 'video'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {tab === 'all' ? '🔖 All' : `${getIcon(tab)} ${tab.charAt(0).toUpperCase() + tab.slice(1)}s`}
          </button>
        ))}
      </div>

      <div className={`space-y-3 ${expanded ? '' : 'max-h-80'} overflow-y-auto`}>
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl flex items-center justify-center">
              <span className="text-4xl">📦</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              No saved items yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Start saving notes, quizzes, and papers by clicking the heart icon!
            </p>
          </div>
        ) : (
          filteredItems.map((item, index) => (
            <div 
              key={index} 
              className="group flex items-center space-x-3 p-4 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${getColor(item.type)} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <span className="text-white text-xl">{getIcon(item.type)}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800 dark:text-white group-hover:text-primary-600 transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>{item.subject}</span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>
              </div>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Open">
                  <span className="text-sm">👁️</span>
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Remove">
                  <span className="text-sm">🗑️</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredItems.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              📊 {filteredItems.length} items saved
            </span>
            <button className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
              View All Saved Items →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaveBox;
