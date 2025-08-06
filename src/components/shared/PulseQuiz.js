import React, { useState, useEffect } from 'react';

const PulseQuiz = ({ filters, expanded = false }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);

  // Sample questions
  const sampleQuestions = [
    {
      q: "The HCF of 12 and 18 using Euclid's division algorithm is:",
      options: ["2", "3", "6", "9"],
      answer: "6",
      topic: "Real Numbers",
      class: "10",
      subject: "mathematics"
    },
    {
      q: "The degree of the polynomial 3x² + 2x + 1 is:",
      options: ["1", "2", "3", "0"],
      answer: "2",
      topic: "Polynomials",
      class: "10",
      subject: "mathematics"
    },
    {
      q: "The focal length of a concave mirror is 20cm. Its radius of curvature is:",
      options: ["10cm", "20cm", "40cm", "80cm"],
      answer: "40cm",
      topic: "Light",
      class: "10",
      subject: "science"
    }
  ];

  useEffect(() => {
    // Filter questions based on current selections
    const filteredQuestions = sampleQuestions.filter(question => 
      (!filters.class || question.class === filters.class) &&
      (!filters.subject || question.subject === filters.subject)
    ).slice(0, 5);
    
    setQuestions(filteredQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setTimeLeft(30);
  }, [filters]);

  useEffect(() => {
    if (questions.length > 0 && !showResult && !userAnswer && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !userAnswer) {
      handleAnswer('');
    }
  }, [timeLeft, questions.length, showResult, userAnswer]);

  const handleAnswer = (answer) => {
    const isCorrect = answer === questions[currentQuestion].answer;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setUserAnswer(answer);
    
    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswer('');
        setTimeLeft(30);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setUserAnswer('');
    setTimeLeft(30);
  };

  if (questions.length === 0) {
    return (
      <div className="glass-card rounded-3xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xl">🧠</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">PulseQuiz</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">MCQs, quick rounds, instant answers</p>
          </div>
        </div>
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🎯</div>
          <p className="text-gray-600 dark:text-gray-400">Quiz questions coming soon!</p>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className={`glass-card rounded-3xl p-6 ${expanded ? 'col-span-full' : ''}`}>
        <div className="text-center">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '🥈' : '💪'}
          </div>
          <h2 className="text-2xl font-bold mb-4 gradient-text">Quiz Complete!</h2>
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl p-6 mb-6">
            <div className="text-3xl font-bold">{score}/{questions.length}</div>
            <div className="text-xl">{percentage}% Score</div>
            <div className="text-sm opacity-90 mt-2">
              {percentage >= 80 ? 'Excellent! 🌟' : percentage >= 60 ? 'Good Job! 👍' : 'Keep Practicing! 💪'}
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={resetQuiz}
              className="bg-gradient-to-r from-success-500 to-accent-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all"
            >
              🔄 Try Again
            </button>
            <button className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full hover:shadow-lg transition-all">
              📊 View Analysis
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  
  return (
    <div className={`glass-card rounded-3xl p-6 relative overflow-hidden ${expanded ? 'col-span-full' : ''}`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100/30 to-pink-100/30 rounded-full transform translate-x-16 -translate-y-16"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">🧠</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">PulseQuiz</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Question {currentQuestion + 1} of {questions.length}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
                <div className="text-xl font-bold text-primary-500">{score}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">Time</div>
                <div className={`text-xl font-bold ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-success-500'}`}>
                  {timeLeft}s
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Progress</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          
          <div className="mt-2">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
              <div 
                className={`h-1 rounded-full transition-all duration-1000 ${timeLeft <= 10 ? 'bg-red-500' : 'bg-green-500'}`}
                style={{ width: `${(timeLeft / 30) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Topic: {question.topic}</div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            {question.q}
          </h3>
          
          <div className="grid grid-cols-1 gap-3">
            {question.options.map((option, index) => {
              let buttonClass = "p-4 text-left rounded-xl border-2 transition-all hover:shadow-md ";
              
              if (userAnswer) {
                if (option === question.answer) {
                  buttonClass += "bg-green-100 dark:bg-green-900 border-green-500 text-green-700 dark:text-green-300";
                } else if (option === userAnswer && userAnswer !== question.answer) {
                  buttonClass += "bg-red-100 dark:bg-red-900 border-red-500 text-red-700 dark:text-red-300";
                } else {
                  buttonClass += "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400";
                }
              } else {
                buttonClass += "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white hover:border-primary-500 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer";
              }
              
              return (
                <button
                  key={index}
                  onClick={() => !userAnswer && handleAnswer(option)}
                  disabled={!!userAnswer}
                  className={buttonClass}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {userAnswer && (
          <div className="text-center">
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
              userAnswer === question.answer 
                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
                : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
            }`}>
              <span>{userAnswer === question.answer ? '✅' : '❌'}</span>
              <span>{userAnswer === question.answer ? 'Correct!' : `Wrong! Answer: ${question.answer}`}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PulseQuiz;
