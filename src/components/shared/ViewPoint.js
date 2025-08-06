import React, { useState, useEffect } from 'react';

const ViewPoint = ({ filters, expanded = false }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample videos data
  const sampleVideos = [
    {
      title: 'Real Numbers - Complete Chapter',
      url: 'https://www.youtube.com/embed/X3kWxGxCKDE',
      duration: '25:30',
      views: '15K',
      topic: 'Real Numbers',
      class: '10',
      subject: 'mathematics',
      channel: 'CBSE Guide'
    },
    {
      title: 'Polynomials Explained Simply',
      url: 'https://www.youtube.com/embed/1wYC3zAhJ8Y',
      duration: '18:45',
      views: '12K',
      topic: 'Polynomials',
      class: '10',
      subject: 'mathematics',
      channel: 'Math Master'
    },
    {
      title: 'Light - Reflection & Refraction',
      url: 'https://www.youtube.com/embed/O4Y8tgT9p4A',
      duration: '22:15',
      views: '8.5K',
      topic: 'Light',
      class: '10',
      subject: 'science',
      channel: 'Physics Pro'
    }
  ];

  useEffect(() => {
    setLoading(true);
    const filteredVideos = sampleVideos.filter(video => 
      (!filters.class || video.class === filters.class) &&
      (!filters.subject || video.subject === filters.subject)
    );
    
    setTimeout(() => {
      setVideos(filteredVideos);
      setLoading(false);
    }, 1000);
  }, [filters]);

  if (loading) {
    return (
      <div className="glass-card rounded-3xl p-6 animate-pulse">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-32"></div>
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`glass-card rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 ${expanded ? 'col-span-full' : ''}`}>
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-white text-2xl">📹</span>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">ViewPoint</h2>
          <p className="text-gray-600 dark:text-gray-400">Video lectures & tutorials</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500 dark:text-gray-400">Videos</div>
          <div className="text-2xl font-bold text-red-600">{videos.length}</div>
        </div>
      </div>

      <div className={`space-y-4 ${expanded ? '' : 'max-h-80'} overflow-y-auto`}>
        {videos.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-red-100 to-pink-100 rounded-3xl flex items-center justify-center">
              <span className="text-4xl">📺</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Videos Coming Soon!
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Educational videos will be available here.
            </p>
          </div>
        ) : (
          videos.map((video, index) => (
            <div 
              key={index} 
              className="group bg-white dark:bg-gray-800/50 rounded-xl p-4 border hover:shadow-lg transition-all cursor-pointer"
              onClick={() => window.open(video.url.replace('embed/', 'watch?v='), '_blank')}
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-20 h-14 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="text-white text-2xl">▶️</span>
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 dark:text-white group-hover:text-red-600 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {video.channel} • Topic: {video.topic}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mt-2">
                    <span className="flex items-center space-x-1">
                      <span>👁️</span>
                      <span>{video.views} views</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span>⏱️</span>
                      <span>{video.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span>📚</span>
                      <span>Class {video.class}</span>
                    </span>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-red-500 text-lg">🎬</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewPoint;
