import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const StudentSetup = () => {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    studyPath: null,
    class: null,
    subject: null
  });
  const { completeUserSetup } = useAuth();

  const studyPaths = [
    { 
      id: 'school', 
      name: 'School Classes', 
      desc: 'Complete curriculum for foundation building', 
      classes: ['1','2','3','4','5','6','7','8','9','11'],
      icon: '🏫',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'board', 
      name: 'Board Classes', 
      desc: 'Board exam focused preparation', 
      classes: ['10','12'],
      icon: '🎓',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const subjects = [
    { id: 'mathematics', name: 'Mathematics', icon: '📐', color: 'from-blue-500 to-purple-500' },
    { id: 'science', name: 'Science', icon: '🔬', color: 'from-green-500 to-teal-500' },
    { id: 'physics', name: 'Physics', icon: '⚡', color: 'from-yellow-500 to-orange-500' },
    { id: 'chemistry', name: 'Chemistry', icon: '⚗️', color: 'from-pink-500 to-red-500' },
    { id: 'biology', name: 'Biology', icon: '🧬', color: 'from-emerald-500 to-green-500' },
    { id: 'english', name: 'English', icon: '📚', color: 'from-indigo-500 to-blue-500' },
    { id: 'hindi', name: 'Hindi', icon: '📝', color: 'from-orange-500 to-red-500' },
    { id: 'social-science', name: 'Social Science', icon: '🌍', color: 'from-cyan-500 to-blue-500' }
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Complete setup
      completeUserSetup('student', selections);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-4xl font-bold gradient-text mb-4">Choose Your Study Path</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Select the path that best fits your educational journey
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {studyPaths.map((path) => (
                <button
                  key={path.id}
                  onClick={() => {
                    setSelections({...selections, studyPath: path.id});
                    setTimeout(handleNext, 300);
                  }}
                  className={`group p-8 bg-gradient-to-r ${path.color} rounded-3xl text-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}
                >
                  <div className="text-6xl mb-4 group-hover:animate-bounce">{path.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{path.name}</h3>
                  <p className="text-white/90 mb-4">{path.desc}</p>
                  <div className="text-sm bg-white/20 px-4 py-2 rounded-full">
                    Classes: {path.classes.join(', ')}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        const selectedPath = studyPaths.find(p => p.id === selections.studyPath);
        return (
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="text-6xl mb-4">📚</div>
              <h2 className="text-4xl font-bold gradient-text mb-4">Select Your Class</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Choose your current class for personalized content
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              {selectedPath.classes.map((cls) => (
                <button
                  key={cls}
                  onClick={() => {
                    setSelections({...selections, class: cls});
                    setTimeout(handleNext, 300);
                  }}
                  className={`group w-24 h-24 rounded-3xl font-bold text-2xl transition-all duration-300 transform hover:scale-110 ${
                    selections.class === cls
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-xl'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:shadow-lg border-2 border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <div className="group-hover:animate-pulse">
                    Class<br/>{cls}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center max-w-6xl mx-auto">
            <div className="mb-8">
              <div className="text-6xl mb-4">📖</div>
              <h2 className="text-4xl font-bold gradient-text mb-4">Choose Your Subject</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Pick your favorite subject to start with (you can explore others later)
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => {
                    setSelections({...selections, subject: subject.id});
                    setTimeout(handleNext, 500);
                  }}
                  className={`group p-6 bg-gradient-to-r ${subject.color} rounded-2xl text-white hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
                >
                  <div className="text-4xl mb-3 group-hover:animate-bounce">{subject.icon}</div>
                  <div className="text-lg font-bold">{subject.name}</div>
                  <div className="text-xs text-white/80 mt-2">Click to select</div>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full">
        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex justify-center items-center mb-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">Step {step} of 3</div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-primary-500 to-accent-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(step/3) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Study Path</span>
            <span>Class</span>
            <span>Subject</span>
          </div>
        </div>

        {/* Step Content */}
        {renderStep()}

        {/* Navigation */}
        <div className="max-w-4xl mx-auto mt-12 flex justify-between items-center">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              <span>←</span>
              <span>Back</span>
            </button>
          ) : (
            <div></div>
          )}
          
          <div className="text-center">
            <div className="text-sm text-gray-500">
              {selections.studyPath && (
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded mr-2">
                  {studyPaths.find(p => p.id === selections.studyPath)?.name}
                </span>
              )}
              {selections.class && (
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded mr-2">
                  Class {selections.class}
                </span>
              )}
              {selections.subject && (
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">
                  {subjects.find(s => s.id === selections.subject)?.name}
                </span>
              )}
            </div>
          </div>
          
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default StudentSetup;
