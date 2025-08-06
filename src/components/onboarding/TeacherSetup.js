// src/components/onboarding/TeacherSetup.js
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const TeacherSetup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    qualifications: '',
    subjects: [],
    experience: '',
    institution: '',
    verificationDoc: null
  });
  const { completeUserSetup } = useAuth();

  const subjects = [
    'Mathematics', 'Science', 'Physics', 'Chemistry', 'Biology', 
    'English', 'Hindi', 'Social Science', 'Computer Science'
  ];

  const handleSubjectToggle = (subject) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const handleSubmit = async () => {
    try {
      await completeUserSetup('teacher', formData);
    } catch (error) {
      alert('Error completing setup');
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8">Teacher Verification</h2>
            
            <div>
              <label className="block text-sm font-medium mb-2">Qualifications</label>
              <input
                type="text"
                value={formData.qualifications}
                onChange={(e) => setFormData({...formData, qualifications: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="e.g. B.Ed, M.Sc Mathematics"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Institution</label>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => setFormData({...formData, institution: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Your school/college name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Experience (Years)</label>
              <select
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select experience</option>
                <option value="0-1">0-1 years</option>
                <option value="1-5">1-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8">Your Teaching Subjects</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {subjects.map(subject => (
                <button
                  key={subject}
                  onClick={() => handleSubjectToggle(subject)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.subjects.includes(subject)
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
            
            <p className="text-center text-gray-600">
              Selected: {formData.subjects.length} subjects
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="text-sm text-gray-600">Step {step} of 2</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step/2) * 100}%` }}
            ></div>
          </div>
        </div>

        {renderStep()}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
          )}
          
          <button
            onClick={() => step < 2 ? setStep(step + 1) : handleSubmit()}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 ml-auto"
            disabled={step === 1 && (!formData.qualifications || !formData.institution)}
          >
            {step < 2 ? 'Next' : 'Complete Setup'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherSetup;
