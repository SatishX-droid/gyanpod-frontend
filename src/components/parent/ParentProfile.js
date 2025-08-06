import React from 'react';
import { useAuth } from '../../context/AuthContext';

const ParentProfile = () => {
  const { user } = useAuth();

  const childrenData = [
    { name: 'Aarav', class: '10', subject: 'Mathematics', progress: 78 },
    { name: 'Priya', class: '8', subject: 'Science', progress: 85 }
  ];

  return (
    <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl p-8 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white transform translate-x-32 -translate-y-32"></div>
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
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-white text-xs font-bold">👨‍👩‍👧</span>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-1">Hello, {user.displayName?.split(' ')[0]}!</h2>
              <p className="text-white/80 text-lg">Parent Dashboard</p>
              <p className="text-white/60 text-sm">Monitoring {childrenData.length} children</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all">
              <span className="flex items-center space-x-2">
                <span>📊</span>
                <span>Weekly Report</span>
              </span>
            </button>
            <button className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all">
              <span className="flex items-center space-x-2">
                <span>💬</span>
                <span>Message Teacher</span>
              </span>
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Children Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {childrenData.map((child, index) => (
              <div key={index} className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-lg">{child.name}</h4>
                    <p className="text-white/80 text-sm">Class {child.class} • {child.subject}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{child.progress}%</div>
                    <div className="text-xs text-white/70">Progress</div>
                  </div>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all"
                    style={{ width: `${child.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentProfile;
