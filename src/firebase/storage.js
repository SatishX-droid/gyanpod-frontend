import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  uploadBytesResumable,
  getMetadata,
  updateMetadata,
  listAll
} from 'firebase/storage';
import { storage } from './config';

// Storage paths
const STORAGE_PATHS = {
  notes: 'content/notes',
  papers: 'content/papers',
  images: 'content/images',
  videos: 'content/videos',
  avatars: 'users/avatars',
  submissions: 'submissions'
};

// Upload file with progress tracking
export const uploadFile = async (file, path, onProgress = null) => {
  try {
    const storageRef = ref(storage, path);
    
    if (onProgress) {
      // Upload with progress tracking
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress(progress);
          },
          (error) => {
            console.error('Upload error:', error);
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            } catch (error) {
              reject(error);
            }
          }
        );
      });
    } else {
      // Simple upload
      const snapshot = await uploadBytes(storageRef, file);
      return await getDownloadURL(snapshot.ref);
    }
  } catch (error) {
    console.error('Upload file error:', error);
    throw error;
  }
};

// Upload multiple files
export const uploadMultipleFiles = async (files, basePath, onProgress = null) => {
  try {
    const uploadPromises = files.map((file, index) => {
      const fileName = `${Date.now()}_${index}_${file.name}`;
      const path = `${basePath}/${fileName}`;
      
      return uploadFile(file, path, (progress) => {
        if (onProgress) {
          onProgress(index, progress);
        }
      });
    });
    
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Upload multiple files error:', error);
    throw error;
  }
};

// Delete file
export const deleteFile = async (path) => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Delete file error:', error);
    throw error;
  }
};

// Get file metadata
export const getFileMetadata = async (path) => {
  try {
    const storageRef = ref(storage, path);
    return await getMetadata(storageRef);
  } catch (error) {
    console.error('Get file metadata error:', error);
    throw error;
  }
};

// Update file metadata
export const updateFileMetadata = async (path, metadata) => {
  try {
    const storageRef = ref(storage, path);
    return await updateMetadata(storageRef, metadata);
  } catch (error) {
    console.error('Update file metadata error:', error);
    throw error;
  }
};

// List files in directory
export const listFiles = async (path) => {
  try {
    const storageRef = ref(storage, path);
    const result = await listAll(storageRef);
    
    const files = await Promise.all(
      result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        const metadata = await getMetadata(itemRef);
        return {
          name: itemRef.name,
          fullPath: itemRef.fullPath,
          url: url,
          metadata: metadata
        };
      })
    );
    
    return files;
  } catch (error) {
    console.error('List files error:', error);
    throw error;
  }
};

// Upload avatar image
export const uploadAvatar = async (file, userId, onProgress = null) => {
  const path = `${STORAGE_PATHS.avatars}/${userId}_${Date.now()}.jpg`;
  return await uploadFile(file, path, onProgress);
};

// Upload content file
export const uploadContentFile = async (file, contentType, userId, onProgress = null) => {
  const timestamp = Date.now();
  const fileName = `${userId}_${timestamp}_${file.name}`;
  const path = `${STORAGE_PATHS[contentType]}/${fileName}`;
  return await uploadFile(file, path, onProgress);
};

// Upload submission file
export const uploadSubmissionFile = async (file, userId, onProgress = null) => {
  const timestamp = Date.now();
  const fileName = `${userId}_${timestamp}_${file.name}`;
  const path = `${STORAGE_PATHS.submissions}/${fileName}`;
  return await uploadFile(file, path, onProgress);
};

// Get file size in human readable format
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Validate file type and size
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 10 * 1024 * 1024, // 10MB default
    allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'video/mp4'],
    required = false
  } = options;
  
  const errors = [];
  
  if (required && !file) {
    errors.push('File is required');
    return { isValid: false, errors };
  }
  
  if (!file) {
    return { isValid: true, errors: [] };
  }
  
  if (file.size > maxSize) {
    errors.push(`File size must be less than ${formatFileSize(maxSize)}`);
  }
  
  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type must be one of: ${allowedTypes.join(', ')}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export default {
  uploadFile,
  uploadMultipleFiles,
  deleteFile,
  getFileMetadata,
  updateFileMetadata,
  listFiles,
  uploadAvatar,
  uploadContentFile,
  uploadSubmissionFile,
  formatFileSize,
  validateFile,
  STORAGE_PATHS
};
