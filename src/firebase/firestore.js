import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  setDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  increment,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { db } from './config';

// Collections
export const collections = {
  users: collection(db, 'users'),
  content: collection(db, 'content'),
  submissions: collection(db, 'submissions'),
  progress: collection(db, 'progress'),
  analytics: collection(db, 'analytics')
};

// User Operations
export const userOperations = {
  // Create or update user document
  saveUser: async (userId, userData) => {
    try {
      await setDoc(doc(collections.users, userId), {
        ...userData,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      console.error('Save user error:', error);
      throw error;
    }
  },

  // Get user by ID
  getUser: async (userId) => {
    try {
      const userDoc = await getDoc(doc(collections.users, userId));
      return userDoc.exists() ? { id: userDoc.id, ...userDoc.data() } : null;
    } catch (error) {
      console.error('Get user error:', error);
      throw error;
    }
  },

  // Update user data
  updateUser: async (userId, updates) => {
    try {
      await updateDoc(doc(collections.users, userId), {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  },

  // Get users by role
  getUsersByRole: async (role) => {
    try {
      const q = query(collections.users, where('role', '==', role));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Get users by role error:', error);
      throw error;
    }
  }
};

// Content Operations
export const contentOperations = {
  // Add new content
  addContent: async (contentData) => {
    try {
      const docRef = await addDoc(collections.content, {
        ...contentData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'pending',
        views: 0,
        likes: 0
      });
      return docRef.id;
    } catch (error) {
      console.error('Add content error:', error);
      throw error;
    }
  },

  // Get content by filters
  getContent: async (filters = {}) => {
    try {
      let q = collections.content;
      
      // Apply filters
      if (filters.class) {
        q = query(q, where('class', '==', filters.class));
      }
      
      if (filters.subject) {
        q = query(q, where('subject', '==', filters.subject));
      }
      
      if (filters.type) {
        q = query(q, where('type', '==', filters.type));
      }
      
      if (filters.status) {
        q = query(q, where('status', '==', filters.status));
      }
      
      // Add ordering and limit
      q = query(q, orderBy('createdAt', 'desc'));
      
      if (filters.limit) {
        q = query(q, limit(filters.limit));
      }
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Get content error:', error);
      throw error;
    }
  },

  // Update content
  updateContent: async (contentId, updates) => {
    try {
      await updateDoc(doc(collections.content, contentId), {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Update content error:', error);
      throw error;
    }
  },

  // Increment view count
  incrementViews: async (contentId) => {
    try {
      await updateDoc(doc(collections.content, contentId), {
        views: increment(1)
      });
    } catch (error) {
      console.error('Increment views error:', error);
      throw error;
    }
  },

  // Toggle like
  toggleLike: async (contentId, userId) => {
    try {
      const contentRef = doc(collections.content, contentId);
      const contentDoc = await getDoc(contentRef);
      
      if (contentDoc.exists()) {
        const data = contentDoc.data();
        const likedBy = data.likedBy || [];
        
        if (likedBy.includes(userId)) {
          // Remove like
          await updateDoc(contentRef, {
            likes: increment(-1),
            likedBy: arrayRemove(userId)
          });
          return false;
        } else {
          // Add like
          await updateDoc(contentRef, {
            likes: increment(1),
            likedBy: arrayUnion(userId)
          });
          return true;
        }
      }
    } catch (error) {
      console.error('Toggle like error:', error);
      throw error;
    }
  }
};

// Progress Operations
export const progressOperations = {
  // Save user progress
  saveProgress: async (userId, progressData) => {
    try {
      await setDoc(doc(collections.progress, userId), {
        ...progressData,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      console.error('Save progress error:', error);
      throw error;
    }
  },

  // Get user progress
  getProgress: async (userId) => {
    try {
      const progressDoc = await getDoc(doc(collections.progress, userId));
      return progressDoc.exists() ? progressDoc.data() : null;
    } catch (error) {
      console.error('Get progress error:', error);
      throw error;
    }
  },

  // Update specific progress metric
  updateProgressMetric: async (userId, metric, value) => {
    try {
      await updateDoc(doc(collections.progress, userId), {
        [metric]: value,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Update progress metric error:', error);
      throw error;
    }
  }
};

// Submission Operations
export const submissionOperations = {
  // Submit content for approval
  submitContent: async (submissionData) => {
    try {
      const docRef = await addDoc(collections.submissions, {
        ...submissionData,
        status: 'pending',
        submittedAt: serverTimestamp(),
        reviewedAt: null,
        reviewedBy: null,
        rejectionReason: null
      });
      return docRef.id;
    } catch (error) {
      console.error('Submit content error:', error);
      throw error;
    }
  },

  // Get submissions by user
  getUserSubmissions: async (userId) => {
    try {
      const q = query(
        collections.submissions, 
        where('authorId', '==', userId),
        orderBy('submittedAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Get user submissions error:', error);
      throw error;
    }
  },

  // Get pending submissions (for admin)
  getPendingSubmissions: async () => {
    try {
      const q = query(
        collections.submissions, 
        where('status', '==', 'pending'),
        orderBy('submittedAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Get pending submissions error:', error);
      throw error;
    }
  },

  // Approve submission
  approveSubmission: async (submissionId, reviewerId) => {
    try {
      await updateDoc(doc(collections.submissions, submissionId), {
        status: 'approved',
        reviewedAt: serverTimestamp(),
        reviewedBy: reviewerId
      });
    } catch (error) {
      console.error('Approve submission error:', error);
      throw error;
    }
  },

  // Reject submission
  rejectSubmission: async (submissionId, reviewerId, reason) => {
    try {
      await updateDoc(doc(collections.submissions, submissionId), {
        status: 'rejected',
        reviewedAt: serverTimestamp(),
        reviewedBy: reviewerId,
        rejectionReason: reason
      });
    } catch (error) {
      console.error('Reject submission error:', error);
      throw error;
    }
  }
};

// Analytics Operations
export const analyticsOperations = {
  // Track event
  trackEvent: async (eventData) => {
    try {
      await addDoc(collections.analytics, {
        ...eventData,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error('Track event error:', error);
      throw error;
    }
  },

  // Get analytics data
  getAnalytics: async (filters = {}) => {
    try {
      let q = collections.analytics;
      
      if (filters.userId) {
        q = query(q, where('userId', '==', filters.userId));
      }
      
      if (filters.eventType) {
        q = query(q, where('eventType', '==', filters.eventType));
      }
      
      q = query(q, orderBy('timestamp', 'desc'));
      
      if (filters.limit) {
        q = query(q, limit(filters.limit));
      }
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Get analytics error:', error);
      throw error;
    }
  }
};

export default {
  collections,
  userOperations,
  contentOperations,
  progressOperations,
  submissionOperations,
  analyticsOperations
};
