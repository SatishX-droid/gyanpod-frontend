import React, { useState } from 'react';

const GoalSetting = ({ expanded = false }) => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: 'Math Chapter Completion',
      target: 'Complete 2 chapters this month',
      progress: 65,
      deadline: '2024-01-31',
      status: 'active'
    },
    {
      id: 2,
      title: 'Daily Study Time',
      target: '3 hours daily study',
      progress: 80,
      deadline: 'Ongoing',
      status: 'active'
    }
  ]);

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    target: '',
    deadline: ''
  });

  const addGoal = () => {
    if (newGoal.title && newGoal.target) {
      setGoals([...goals, {
        id: Date.now(),
        ...newGoal,
        progress: 0,
        status: 'active'
      }]);
      setNewGoal({ title: '', target: '', deadline: '' });
      setShowAddGoal(false);
    }
  };

  return (
    <div className={`glass-card rounded-3xl p-6 ${expanded ? 'col-span-full' : ''}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Goal Setting</h2>
        <button
          onClick={() => setShowAddGoal(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          + Add Goal
        </button>
      </div>

      {showAddGoal && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
          <h3 className="font-semibold mb-4">Create New Goal</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Goal title"
              value={newGoal.title}
              onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Target description"
              value={newGoal.target}
              onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="date"
              value={newGoal.deadline}
              onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <div className="flex space-x-2">
              <button
                onClick={addGoal}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Create Goal
              </button>
              <button
                onClick={() => setShowAddGoal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {goals.map(goal => (
          <div key={goal.id} className="bg-white dark:bg-gray-800/50 rounded-xl p-4 border">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">{goal.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{goal.target}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">{goal.progress}%</div>
                <div className="text-xs text-gray-500">Progress</div>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${goal.progress}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Deadline: {goal.deadline}
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                {goal.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalSetting;
