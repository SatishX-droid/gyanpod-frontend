import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ParentNavBar from './ParentNavBar';
import ParentProfile from './ParentProfile';
import ChildProgressMonitoring from './ChildProgressMonitoring';
import StudyTimeAnalytics from './StudyTimeAnalytics';
import TeacherCommunication from './TeacherCommunication';
import ContentSuggestions from './ContentSuggestions';

const ParentApp = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('dashboard');

  const renderContent = () => {
    switch(selectedTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <ParentProfile />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChildProgressMonitoring />
              <StudyTimeAnalytics />
              <TeacherCommunication />
              <ContentSuggestions />
            </div>
          </div>
        );
      
      case 'progress':
        return (
          <div className="space-y-6">
            <ChildProgressMonitoring expanded={true} />
          </div>
        );
      
      case 'analytics':
        return (
          <div className="space-y-6">
            <StudyTimeAnalytics expanded={true} />
          </div>
        );
      
      case 'communication':
        return (
          <div className="space-y-6">
            <TeacherCommunication expanded={true} />
          </div>
        );
      
      default:
        return <div>Coming Soon!</div>;
    }
  };

  return (
    <div className="min-h-screen">
      <ParentNavBar 
        onTabChange={setSelectedTab} 
        activeTab={selectedTab}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default ParentApp;
