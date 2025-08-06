import React, { useState, useEffect } from 'react';

const ExamVault = ({ filters, expanded = false }) => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('all');

  // Sample papers data
  const samplePapers = [
    {
      title: 'Mathematics Annual Exam 2023',
      year: '2023',
      url: 'https://cbseacademic.nic.in/web_material/QuestionPapers/10/maths_2023.pdf',
      type: 'Board Paper',
      marks: '80',
      duration: '3 hours',
      class: '10',
      subject: 'mathematics'
    },
    {
      title: 'Science Practice Set 2023',
      year: '2023',
      url: '#',
      type: 'Practice Paper',
      marks: '80',
      duration: '3 hours',
      class: '10',
      subject: 'science'
    },
    {
      title: 'Mathematics Sample Paper 2022',
      year: '2022',
      url: '#',
      type: 'Sample Paper',
      marks: '80',
      duration: '3 hours',
      class: '10',
      subject: 'mathematics'
    }
  ];

  useEffect(() => {
    setLoading(true);
    const filteredPapers = samplePapers.filter(paper => 
      (!filters.class || paper.class === filters.class) &&
      (!filters.subject || paper.subject === filters.subject)
    );
    
    setTimeout(() => {
      setPapers(filteredPapers);
      setLoading(false);
    }, 1000);
  }, [filters]);

  const years = ['all', '2023', '2022', '2021', '2020'];
  const filteredPapers = selectedYear === 'all' 
    ? papers 
    : papers.filter(paper => paper.year === selectedYear);

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
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`glass-card rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 ${expanded ? 'col-span-full' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl">📋</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">ExamVault</h2>
            <p className="text-gray-600 dark:text-gray-400">Past papers & practice sets</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-gray-500 dark:text-gray-400">Available Papers</div>
          <div className="text-2xl font-bold text-success-600">{filteredPapers.length}</div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {years.map(year => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedYear === year
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {year === 'all' ? 'All Years' : year}
            </button>
          ))}
        </div>
      </div>
      
      <div className={`space-y-4 ${expanded ? '' : 'max-h-80'} overflow-y-auto`}>
        {filteredPapers.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-green-100 rounded-3xl flex items-center justify-center">
              <span className="text-4xl">📄</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Papers Coming Soon!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We're adding more question papers for this subject.
            </p>
          </div>
        ) : (
          filteredPapers.map((paper, index) => (
            <div 
              key={index}
              className="group bg-white dark:bg-gray-800/50 rounded-2xl p-4 border hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{paper.year}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white">{paper.title}</h3>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>📄 {paper.type}</span>
                        <span>⏱️ {paper.duration}</span>
                        <span>📊 {paper.marks} marks</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => window.open(paper.url, '_blank')}
                    className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                    title="View Paper"
                  >
                    <span className="text-sm">👁️</span>
                  </button>
                  <button 
                    className="p-2 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                    title="Download"
                  >
                    <span className="text-sm">📥</span>
                  </button>
                  <button 
                    className="p-2 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                    title="Start Online Test"
                  >
                    <span className="text-sm">⚡</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExamVault;
