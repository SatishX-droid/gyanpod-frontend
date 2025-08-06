import React from 'react';

const ChildProgressMonitoring = ({ expanded = false }) => {
  const children = [
    { name: 'Aarav', class: '10', progress: 78, streak: 5, subjects: ['Math', 'Science'] },
    { name: 'Priya', class: '8', progress: 85, streak: 3, subjects: ['English', 'Social'] }
  ];

  return (
    <div className={`glass-card rounded-3xl p-6 ${expanded ? 'col-span-full' : ''}`}>
      <h2 className="text-2xl font-bold mb-6">Child Progress Monitoring</h2>
      
      <div className="space-y-6">
        {children.map((child, index) => (
          <div key={index} className="bg-white dark:bg-gray-800/50 rounded-xl p-4 border">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{child.name}</h3>
                <p className="text-sm text-gray-600">Class {child.class}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{child.progress}%</div>
                <div className="text-xs text-gray-500">Overall Progress</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-2 bg-orange-50 rounded-lg">
                <div className="text-lg font-bold text-orange-600">{child.streak}</div>
                <div className="text-xs text-orange-500">Day Streak</div>
              </div>
              <div className="text-center p-2 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">{child.subjects.length}</div>
                <div className="text-xs text-green-500">Active Subjects</div>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: `${child.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChildProgressMonitoring;
