// src/components/onboarding/ParentSetup.js
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const ParentSetup = () => {
  const [children, setChildren] = useState([
    { name: '', class: '1', subjects: [] }
  ]);
  const { completeUserSetup } = useAuth();

  const classes = ['1','2','3','4','5','6','7','8','9','10','11','12'];
  
  const addChild = () => {
    setChildren([...children, { name: '', class: '1', subjects: [] }]);
  };

  const updateChild = (index, field, value) => {
    const updated = children.map((child, i) => 
      i === index ? { ...child, [field]: value } : child
    );
    setChildren(updated);
  };

  const handleSubmit = async () => {
    try {
      await completeUserSetup('parent', { children });
    } catch (error) {
      alert('Error completing setup');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Setup Your Children's Profiles</h2>
          <p className="text-gray-600">Add your children to monitor their study progress</p>
        </div>

        <div className="space-y-6">
          {children.map((child, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold mb-4">Child {index + 1}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={child.name}
                    onChange={(e) => updateChild(index, 'name', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Child's name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Class</label>
                  <select
                    value={child.class}
                    onChange={(e) => updateChild(index, 'class', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    {classes.map(cls => (
                      <option key={cls} value={cls}>Class {cls}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={addChild}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            + Add Another Child
          </button>
          
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            disabled={children.some(child => !child.name)}
          >
            Complete Setup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParentSetup;
