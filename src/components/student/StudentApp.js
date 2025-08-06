import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import StudentNavBar from './StudentNavBar';
import StudentProfile from './StudentProfile';
import QuickNotes from '../shared/QuickNotes';
import PulseQuiz from '../shared/PulseQuiz';
import ExamVault from '../shared/ExamVault';
import DoubtChat from '../shared/DoubtChat';
import ViewPoint from '../shared/ViewPoint';
import BoostMeter from '../shared/BoostMeter';
import SaveBox from '../shared/SaveBox';
import PrepTips from '../shared/PrepTips';
import AnytimeGo from '../shared/AnytimeGo';
import SettingsModal from './SettingsModal';

const StudentApp = () => {
  const { user, userSelections } = useAuth();
  const [showSettings, setShowSettings] = useState(false);
  const [selectedTab, setSelectedTab] = useState('dashboard');

  const renderContent = () => {
    switch(selectedTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <StudentProfile />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <QuickNotes filters={userSelections} />
              <PulseQuiz filters={userSelections} />
              <ExamVault filters={userSelections} />
              <DoubtChat />
              <ViewPoint filters={userSelections} />
              <BoostMeter />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SaveBox />
              <PrepTips />
            </div>
            <AnytimeGo />
          </div>
        );
      
      case 'notes':
        return (
          <div className="grid grid-cols-1 gap-6">
            <QuickNotes filters={userSelections} expanded={true} />
          </div>
        );
      
      case 'quiz':
        return (
          <div className="grid grid-cols-1 gap-6">
            <PulseQuiz filters={userSelections} expanded={true} />
          </div>
        );
      
      case 'papers':
        return (
          <div className="grid grid-cols-1 gap-6">
            <ExamVault filters={userSelections} expanded={true} />
          </div>
        );
      
      case 'videos':
        return (
          <div className="grid grid-cols-1 gap-6">
            <ViewPoint filters={userSelections} expanded={true} />
          </div>
        );
      
      case 'progress':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BoostMeter expanded={true} />
            <SaveBox expanded={true} />
          </div>
        );
      
      default:
        return <div>Coming Soon!</div>;
    }
  };

  return (
    <div className="min-h-screen">
      <StudentNavBar 
        onTabChange={setSelectedTab} 
        activeTab={selectedTab}
        onSettingsClick={() => setShowSettings(true)}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {renderContent()}
      </div>
      
      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
};

export default StudentApp;
