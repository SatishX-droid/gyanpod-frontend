import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const ContentSubmissionPanel = ({ expanded = false }) => {
  const [activeTab, setActiveTab] = useState('notes');
  const [formData, setFormData] = useState({
    title: '',
    class: '10',
    subject: 'mathematics',
    topic: '',
    content: '',
    videoUrl: '',
    paperFile: null,
    mcqs: []
  });

  const { user } = useAuth();

  const contentTypes = [
    { id: 'notes', name: 'Quick Notes', icon: '📝', description: 'Upload study notes and summaries' },
    { id: 'quiz', name: 'Quiz Questions', icon: '🧠', description: 'Create MCQ questions' },
    { id: 'paper', name: 'Question Papers', icon: '📋', description: 'Upload past papers' },
    { id: 'video', name: 'Video Links', icon: '📹', description: 'Share educational videos' }
  ];

  const classes = ['1','2','3','4','5','6','7','8','9','10','11','12'];
  const subjects = ['mathematics', 'science', 'physics', 'chemistry', 'biology', 'english', 'hindi', 'social-science'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const submissionData = {
        ...formData,
        type: activeTab,
        authorId: user.uid,
        authorName: user.displayName,
        authorEmail: user.email,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Here you would submit to Firebase
      console.log('Submitting content:', submissionData);
      
      alert('Content submitted successfully! It will be reviewed by admin.');
      
      // Reset form
      setFormData({
        title: '',
        class: '10',
        subject: 'mathematics',
        topic: '',
        content: '',
        videoUrl: '',
        paperFile: null,
        mcqs: []
      });
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error submitting content. Please try again.');
    }
  };

  const renderForm = () => {
    switch(activeTab) {
      case 'notes':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Class</label>
                <select
                  value={formData.class}
                  onChange={(e) => setFormData({...formData, class: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  {classes.map(cls => (
                    <option key={cls} value={cls}>Class {cls}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>
                      {subject.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Topic</label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => setFormData({...formData, topic: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Enter topic name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Enter note title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 h-32"
                placeholder="Enter your notes content here..."
              />
            </div>
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Class</label>
                <select
                  value={formData.class}
                  onChange={(e) => setFormData({...formData, class: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  {classes.map(cls => (
                    <option key={cls} value={cls}>Class {cls}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>
                      {subject.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Topic</label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => setFormData({...formData, topic: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Enter topic name"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-3">Add MCQ Questions</h4>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg h-24"
                placeholder="Format: Question|Option1,Option2,Option3,Option4|CorrectAnswer"
              />
              <button 
                type="button"
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Add Question
              </button>
            </div>
          </div>
        );

      case 'video':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Class</label>
                <select
                  value={formData.class}
                  onChange={(e) => setFormData({...formData, class: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  {classes.map(cls => (
                    <option key={cls} value={cls}>Class {cls}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>
                      {subject.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Topic</label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => setFormData({...formData, topic: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Enter topic name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Video Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Enter video title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">YouTube URL</label>
              <input
                type="url"
                value={formData.videoUrl}
                onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 h-20"
                placeholder="Brief description of the video content"
              />
            </div>
          </div>
        );

      default:
        return <div>Content type not implemented yet.</div>;
    }
  };

  return (
    <div className={`glass-card rounded-3xl p-6 ${expanded ? 'col-span-full' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl">📤</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Submit Content</h2>
            <p className="text-gray-600 dark:text-gray-400">Share your knowledge with students</p>
          </div>
        </div>
        <div className="text-sm text-green-600 font-medium">
          ✅ Approved Teacher
        </div>
      </div>

      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {contentTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setActiveTab(type.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
              activeTab === type.id
                ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span>{type.icon}</span>
            <span className="text-sm font-medium">{type.name}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {renderForm()}
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Content will be reviewed by admin before publishing
          </p>
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all font-medium"
          >
            Submit for Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContentSubmissionPanel;
