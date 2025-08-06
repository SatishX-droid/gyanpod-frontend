import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    notifications: true,
    autoSave: true,
    studyReminders: true,
    soundEffects: true,
    dataUsage: 'wifi', // 'wifi', 'cellular', 'all'
    downloadQuality: 'medium', // 'low', 'medium', 'high'
    language: 'en',
    fontSize: 'medium', // 'small', 'medium', 'large'
    animationsEnabled: true,
    offlineMode: false
  });

  const [preferences, setPreferences] = useState({
    studySchedule: {
      startTime: '16:00',
      endTime: '20:00',
      breakDuration: 15,
      sessionDuration: 45
    },
    subjects: [],
    difficulty: 'medium',
    goals: {
      dailyStudyTime: 120, // minutes
      weeklyTopics: 5,
      monthlyTests: 8
    }
  });

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('gyanpod_settings');
    const savedPreferences = localStorage.getItem('gyanpod_preferences');
    
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  // Save settings to localStorage
  const updateSettings = (newSettings) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('gyanpod_settings', JSON.stringify(updatedSettings));
  };

  const updatePreferences = (newPreferences) => {
    const updatedPreferences = { ...preferences, ...newPreferences };
    setPreferences(updatedPreferences);
    localStorage.setItem('gyanpod_preferences', JSON.stringify(updatedPreferences));
  };

  const resetSettings = () => {
    const defaultSettings = {
      notifications: true,
      autoSave: true,
      studyReminders: true,
      soundEffects: true,
      dataUsage: 'wifi',
      downloadQuality: 'medium',
      language: 'en',
      fontSize: 'medium',
      animationsEnabled: true,
      offlineMode: false
    };
    
    setSettings(defaultSettings);
    localStorage.setItem('gyanpod_settings', JSON.stringify(defaultSettings));
  };

  const exportData = () => {
    const data = {
      settings,
      preferences,
      exportDate: new Date().toISOString(),
      version: '2.0.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gyanpod-settings-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.settings) updateSettings(data.settings);
        if (data.preferences) updatePreferences(data.preferences);
        window.addToast?.({
          type: 'success',
          title: 'Settings Imported',
          message: 'Your settings have been successfully imported.'
        });
      } catch (error) {
        window.addToast?.({
          type: 'error',
          title: 'Import Failed',
          message: 'Failed to import settings. Please check the file format.'
        });
      }
    };
    reader.readAsText(file);
  };

  const value = {
    settings,
    preferences,
    updateSettings,
    updatePreferences,
    resetSettings,
    exportData,
    importData
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
