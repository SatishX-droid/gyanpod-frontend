import React, { useState, useEffect } from 'react';

const QuickNotes = ({ filters, expanded = false }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedNote, setExpandedNote] = useState(null);

  // Sample data for demo
  const sampleNotes = [
    {
      topic: "Real Numbers",
      notes: "Euclid's division lemma states that for any positive integers a and b, there exist unique integers q and r such that a = bq + r, where 0 ≤ r < b. This fundamental theorem is used to find the HCF of two positive integers using Euclid's division algorithm.",
      class: "10",
      subject: "mathematics"
    },
    {
      topic: "Polynomials", 
      notes: "A polynomial p(x) in one variable x is an algebraic expression of the form p(x) = anxn + an-1xn-1 + ... + a1x + a0, where an ≠ 0. The highest power of x is called the degree of the polynomial.",
      class: "10",
      subject: "mathematics"
    },
    {
      topic: "Light - Reflection and Refraction",
      notes: "Laws of reflection: (1) The incident ray, reflected ray, and normal all lie in the same plane. (2) The angle of incidence equals the angle of reflection.",
      class: "10", 
      subject: "science"
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Filter notes based on current selections
    const filteredNotes = sampleNotes.filter(note => 
      (!filters.class || note.class === filters.class) &&
      (!filters.subject || note.subject === filters.subject)
    );
    
    setTimeout(() => {
      setNotes(filteredNotes);
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
          {[1, 2, 3].map(i => (
            <div key={i} className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`glass-card rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 ${expanded ? 'col-span-full' : ''}`}>
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-14 h-14 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-white text-2xl animate-pulse">📝</span>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">QuickNotes</h2>
          <p className="text-gray-600 dark:text-gray-400">Crisp topic digests & exam pointers</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500 dark:text-gray-400">Available</div>
          <div className="text-2xl font-bold text-primary-600">{notes.length}</div>
        </div>
      </div>
      
      <div className={`space-y-4 ${expanded ? '' : 'max-h-96'} overflow-y-auto`}>
        {notes.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-3xl flex items-center justify-center">
              <span className="text-4xl">📚</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Notes Coming Soon!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We're preparing amazing notes for this combination.
            </p>
          </div>
        ) : (
          notes.map((note, index) => (
            <div 
              key={index} 
              className="group relative bg-white dark:bg-gray-800/50 rounded-2xl p-5 border-l-4 border-gradient-to-b from-primary-500 to-accent-500 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-1 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
                    <span>{note.topic}</span>
                  </h3>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Class {note.class} • {note.subject}
                  </div>
                </div>
              </div>
              
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <p className={`transition-all duration-300 ${
                  expandedNote === index 
                    ? '' 
                    : 'line-clamp-3 overflow-hidden'
                }`}>
                  {note.notes}
                </p>
                
                {note.notes.length > 150 && (
                  <button
                    onClick={() => setExpandedNote(expandedNote === index ? null : index)}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm mt-2 transition-colors"
                  >
                    {expandedNote === index ? '📖 Show Less' : '📚 Read More'}
                  </button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                  📖 Study Material
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                  ⚡ Quick Review
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuickNotes;
