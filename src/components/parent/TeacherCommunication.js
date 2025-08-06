import React, { useState } from 'react';

const TeacherCommunication = ({ expanded = false }) => {
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const teachers = [
    {
      id: 1,
      name: 'Mrs. Sharma',
      subject: 'Mathematics',
      avatar: '👩‍🏫',
      lastMessage: 'Your child is doing great in algebra!',
      time: '2h ago',
      unread: 2
    },
    {
      id: 2,
      name: 'Mr. Patel',
      subject: 'Science',
      avatar: '👨‍🏫',
      lastMessage: 'Please review chemistry notes',
      time: '1d ago',
      unread: 0
    },
    {
      id: 3,
      name: 'Ms. Singh',
      subject: 'English',
      avatar: '👩‍🏫',
      lastMessage: 'Essay writing assignment submitted',
      time: '3d ago',
      unread: 1
    }
  ];

  const messages = {
    1: [
      { sender: 'teacher', text: 'Hello! Aarav is showing excellent progress in mathematics.', time: '10:30 AM' },
      { sender: 'parent', text: 'Thank you for the update! Any areas we should focus on?', time: '10:35 AM' },
      { sender: 'teacher', text: 'Please practice more word problems. I\'ll send some extra worksheets.', time: '10:40 AM' }
    ]
  };

  const sendMessage = () => {
    if (newMessage.trim() && activeChat) {
      // Handle message sending
      setNewMessage('');
    }
  };

  return (
    <div className={`glass-card rounded-3xl p-6 ${expanded ? 'col-span-full' : ''}`}>
      <h2 className="text-2xl font-bold mb-6">Teacher Communication</h2>

      {!activeChat ? (
        // Teachers List
        <div className="space-y-4">
          {teachers.map(teacher => (
            <button
              key={teacher.id}
              onClick={() => setActiveChat(teacher.id)}
              className="w-full flex items-center space-x-4 p-4 bg-white dark:bg-gray-800/50 rounded-xl border hover:shadow-md transition-all text-left"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl">
                {teacher.avatar}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">{teacher.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{teacher.subject}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">{teacher.time}</div>
                    {teacher.unread > 0 && (
                      <div className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center mt-1">
                        {teacher.unread}
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">
                  {teacher.lastMessage}
                </p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        // Chat Interface
        <div className="space-y-4">
          <div className="flex items-center space-x-3 pb-4 border-b">
            <button
              onClick={() => setActiveChat(null)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              ←
            </button>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xl">
              {teachers.find(t => t.id === activeChat)?.avatar}
            </div>
            <div>
              <h3 className="font-semibold">{teachers.find(t => t.id === activeChat)?.name}</h3>
              <p className="text-sm text-gray-600">{teachers.find(t => t.id === activeChat)?.subject}</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 h-64 overflow-y-auto">
            {messages[activeChat]?.map((message, index) => (
              <div
                key={index}
                className={`mb-3 flex ${message.sender === 'parent' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs p-3 rounded-xl ${
                  message.sender === 'parent'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white'
                }`}>
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'parent' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherCommunication;
