import React from 'react';
import { useAuth } from '../../context/AuthContext';

const StudentProfile = () => {
  const { user, userSelections } = useAuth();

  const stats = [
    { label: 'Study Streak', value: '5', unit: 'days', icon: '🔥', color: 'from-orange-500 to-red-500' },
    { label: 'Notes Read', value: '23', unit: 'topics', icon: '📚', color: 'from-blue-500 to-cyan-500' },
    { label: 'Quiz Score', value: '85', unit: '%', icon: '🎯', color: 'from-green-500 to-emerald-500' },
    { label: 'Time Spent', value: '4.5', unit: 'hrs', icon: '⏱️', color: 'from-purple-500 to-pink-500' }
  ];

  return (
    <div className="bg-gradient-to-r from-primary-500 via-accent-500 to-success-500 rounded-3xl p-8 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white transform translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white transform -translate-x-24 translate-y-24"></div>
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* User Info */}
          <div className="flex items-center space-x-6 mb-6 md:mb-0">
            <div className="relative">
              <img
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`}
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-white/30"
              />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-success-400 rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-white text-xs font-bold">🎓</span>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-1">Welcome back, {user.displayName?.split(' ')[0]}!</h2>
              <p className="text-white/80 text-lg">
                Class {userSelections.class} • {userSelections.subject?.replace('-', ' ')} Student
              </p>
              <p className="text-white/60 text-sm">
                Last login: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex space-x-3">
            <button className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all">
              <span className="flex items-center space-x-2">
                <span>📊</span>
                <span>View Progress</span>
              </span>
            </button>
            <button className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all">
              <span className="flex items-center space-x-2">
                <span>🎯</span>
                <span>Set Goal</span>
              </span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm hover:bg-white/30 transition-all"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                  <span className="text-xl">{stat.icon}</span>
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-white/70">{stat.unit}</div>
                </div>
              </div>
              <div className="text-sm text-white/80 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Today's Goal */}
        <div className="mt-6 bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">🎯 Today's Goal</h3>
              <p className="text-white/80 text-sm">Complete 3 topics to maintain your streak!</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <div className="text-lg font-bold">2/3</div>
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
