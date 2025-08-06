import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import TeacherNavBar from './TeacherNavBar';
import TeacherProfile from './TeacherProfile';
import ContentSubmissionPanel from './ContentSubmissionPanel';
import MyContributions from './MyContributions';
import StudentAnalytics from './StudentAnalytics';
import BulkUploadTools from './BulkUploadTools';
import QuickNotes from '../shared/QuickNotes';
import PulseQuiz from '../shared/PulseQuiz';
import ExamVault from '../shared/ExamVault';

const TeacherApp = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [showSettings, setShowSettings] = useState(false);

  const renderContent = () => {
    switch(selectedTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <TeacherProfile />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ContentSubmissionPanel />
              <MyContributions />
              <StudentAnalytics />
              <BulkUploadTools />
            </div>
          </div>
        );
      
      case 'submit':
        return (
          <div className="space-y-6">
            <ContentSubmissionPanel expanded={true} />
          </div>
        );
      
      case 'contributions':
        return (
          <div className="space-y-6">
            <MyContributions expanded={true} />
          </div>
        );
      
      case 'analytics':
        return (
          <div className="space-y-6">
            <StudentAnalytics expanded={true} />
          </div>
        );
      
      case 'tools':
        return (
          <div className="space-y-6">
            <BulkUploadTools expanded={true} />
          </div>
        );
      
      case 'browse':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <QuickNotes filters={{ class: '10', subject: 'mathematics' }} />
              <PulseQuiz filters={{ class: '10', subject: 'mathematics' }} />
              <ExamVault filters={{ class: '10', subject: 'mathematics' }} />
            </div>
          </div>
        );
      
      default:
        return <div>Coming Soon!</div>;
    }
  };

  return (
    <div className="min-h-screen">
      <TeacherNavBar 
        onTabChange={setSelectedTab} 
        activeTab={selectedTab}
        onSettingsClick={() => setShowSettings(true)}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default TeacherApp;
