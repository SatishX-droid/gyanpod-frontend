import React from 'react';
import { useAuth } from '../../context/AuthContext';

const TeacherProfile = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Content Submitted', value: '12', icon: '📤', color: 'from-blue-500 to-cyan-500' },
    { label: 'Content Approved', value: '10', icon: '✅', color: 'from-green-500 to-emerald-500' },
    { label: 'Students Helped', value: '150+', icon: '👥', color: 'from-purple-500 to-pink-500' },
    { label: 'Contribution Score', value: '95', icon: '⭐', color: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 rounded-3xl p-8 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white transform translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white transform -translate-x-24 translate-y-24"></div>
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-6 mb-6 md:mb-0">
            <div className="relative">
              <img
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`}
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-white/30"
              />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-white text-xs font-bold">👩‍🏫</span>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-1">Hello, Teacher {user.displayName?.split(' ')[0]}!</h2>
              <p className="text-white/80 text-lg">Content Creator & Educator</p>
              <p className="text-white/60 text-sm">Approved Teacher • Active Contributor</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all">
              <span className="flex items-center space-x-2">
                <span>📊</span>
                <span>View Impact</span>
              </span>
            </button>
            <button className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all">
              <span className="flex items-center space-x-2">
                <span>📤</span>
                <span>Quick Upload</span>
              </span>
            </button>
          </div>
        </div>

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
                </div>
              </div>
              <div className="text-sm text-white/80 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">🎯 This Week's Goal</h3>
              <p className="text-white/80 text-sm">Submit 3 more quality content pieces!</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold">2/5</div>
              <div className="text-xs text-white/70">Submissions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
