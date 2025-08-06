import React, { useState, useRef, useEffect } from 'react';

const DoubtChat = ({ expanded = false }) => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hi! I\'m your AI study assistant. Ask me any CBSE-related question! 🤖',
      time: new Date().toLocaleTimeString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      type: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "Great question! Here's what you need to know: This topic requires understanding the basic concepts first. Let me break it down for you step by step.",
        "I can help you with that! Remember to practice regularly and focus on understanding rather than memorizing.",
        "This is an important topic for your exams. Make sure you understand the underlying principles and practice with examples.",
        "Good question! Let's solve this together. Start by identifying what's given and what you need to find."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const botMessage = {
        type: 'bot',
        text: randomResponse,
        time: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const quickQuestions = [
    "Explain photosynthesis",
    "Quadratic formula",
    "Parts of speech",
    "Newton's laws",
    "Chemical bonding"
  ];

  return (
    <div className={`glass-card rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 ${expanded ? 'col-span-full' : ''}`}>
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-white text-2xl animate-pulse">💬</span>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">DoubtChat</h2>
          <p className="text-gray-600 dark:text-gray-400">AI-powered doubt solver</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-600 font-medium">Online</span>
        </div>
      </div>

      <div className={`bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 ${expanded ? 'h-96' : 'h-80'} overflow-y-auto mb-4`}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
              message.type === 'user'
                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white'
            }`}>
              <p className="text-sm whitespace-pre-line">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.type === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
              }`}>
                {message.time}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-2 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Quick questions:</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => setInputText(question)}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs hover:bg-primary-100 hover:text-primary-700 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask your doubt here..."
          className="flex-1 px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
          disabled={isTyping}
        />
        <button
          onClick={handleSend}
          disabled={!inputText.trim() || isTyping}
          className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isTyping ? '⏳' : '📤'}
        </button>
      </div>
    </div>
  );
};

export default DoubtChat;
