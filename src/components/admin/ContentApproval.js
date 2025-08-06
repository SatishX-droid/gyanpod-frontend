import React, { useState, useEffect } from 'react';
import { submissionOperations } from '../../firebase/firestore';

const ContentApproval = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    loadSubmissions();
  }, [filter]);

  const loadSubmissions = async () => {
    setLoading(true);
    try {
      let data;
      if (filter === 'pending') {
        data = await submissionOperations.getPendingSubmissions();
      } else {
        // For other filters, you'd need to create appropriate functions
        data = [];
      }
      setSubmissions(data);
    } catch (error) {
      console.error('Error loading submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (submissionId) => {
    try {
      await submissionOperations.approveSubmission(submissionId, 'admin');
      // Refresh the list
      loadSubmissions();
      setSelectedSubmission(null);
      
      // Show success message
      window.addToast?.({
        type: 'success',
        title: 'Content Approved',
        message: 'Content has been approved and published.'
      });
    } catch (error) {
      console.error('Error approving submission:', error);
      window.addToast?.({
        type: 'error',
        title: 'Approval Failed',
        message: 'Failed to approve content. Please try again.'
      });
    }
  };

  const handleReject = async (submissionId, reason) => {
    try {
      await submissionOperations.rejectSubmission(submissionId, 'admin', reason);
      // Refresh the list
      loadSubmissions();
      setSelectedSubmission(null);
      
      // Show success message
      window.addToast?.({
        type: 'success',
        title: 'Content Rejected',
        message: 'Content has been rejected with feedback.'
      });
    } catch (error) {
      console.error('Error rejecting submission:', error);
      window.addToast?.({
        type: 'error',
        title: 'Rejection Failed',
        message: 'Failed to reject content. Please try again.'
      });
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'notes': return '📝';
      case 'quiz': return '🧠';
      case 'paper': return '📋';
      case 'video': return '📹';
      default: return '📄';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold gradient-text">📋 Content Approval</h2>
          
          <div className="flex space-x-2">
            {['pending', 'approved', 'rejected'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === status
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading submissions...</p>
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              No {filter} submissions
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              All caught up! No submissions to review right now.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map(submission => (
              <div 
                key={submission.id}
                className="bg-white dark:bg-gray-800/50 rounded-xl p-6 border hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{getTypeIcon(submission.type)}</span>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                          {submission.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                          <span>📚 Class {submission.class}</span>
                          <span>📖 {submission.subject}</span>
                          <span>👤 {submission.authorName}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {submission.description || 'No description provided.'}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>📅 {new Date(submission.submittedAt?.seconds * 1000).toLocaleDateString()}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                        {submission.status}
                      </span>
                    </div>
                  </div>
                  
                  {submission.status === 'pending' && (
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => setSelectedSubmission(submission)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                      >
                        👁️ Review
                      </button>
                      <button
                        onClick={() => handleApprove(submission.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                      >
                        ✅ Approve
                      </button>
                      <button
                        onClick={() => {
                          const reason = prompt('Please provide a reason for rejection:');
                          if (reason) {
                            handleReject(submission.id, reason);
                          }
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                      >
                        ❌ Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Review Content</h2>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <span className="text-xl">✕</span>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Title</h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedSubmission.title}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Content</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
                      {selectedSubmission.content || 'No content provided.'}
                    </pre>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Class</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedSubmission.class}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Subject</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedSubmission.subject}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Author</h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedSubmission.authorName} ({selectedSubmission.authorEmail})</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const reason = prompt('Please provide a reason for rejection:');
                  if (reason) {
                    handleReject(selectedSubmission.id, reason);
                  }
                }}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Reject
              </button>
              <button
                onClick={() => handleApprove(selectedSubmission.id)}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentApproval;
