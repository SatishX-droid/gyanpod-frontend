import { useState, useEffect } from 'react';

export const useContent = (filters = {}) => {
  const [content, setContent] = useState({
    notes: [],
    quizzes: [],
    papers: [],
    videos: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      if (!filters.class || !filters.subject) return;

      setLoading(true);
      setError(null);

      try {
        // Try to load from data files
        const response = await import(`../data/classes/${filters.class}/${filters.subject}.json`);
        const data = response.default;

        // Process data
        const processedContent = {
          notes: data.filter(item => item.type === 'notes' || item.notes),
          quizzes: data.filter(item => item.type === 'quiz' || item.mcqs),
          papers: data.filter(item => item.type === 'paper' || item.paper),
          videos: data.filter(item => item.type === 'video' || item.video)
        };

        setContent(processedContent);
      } catch (err) {
        console.error('Error loading content:', err);
        setError('Failed to load content');
        setContent({ notes: [], quizzes: [], papers: [], videos: [] });
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [filters.class, filters.subject, filters.stream]);

  const refreshContent = () => {
    setContent({ notes: [], quizzes: [], papers: [], videos: [] });
    setLoading(true);
    // Trigger useEffect by updating a dependency
  };

  return {
    content,
    loading,
    error,
    refreshContent
  };
};

export default useContent;
