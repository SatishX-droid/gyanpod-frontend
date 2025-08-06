import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './components/HomePage'; // ✅ Import HomePage
import RoleSelection from './components/onboarding/RoleSelection';
import StudentSetup from './components/onboarding/StudentSetup';
import StudentApp from './components/student/StudentApp';
import TeacherApp from './components/teacher/TeacherApp';
import ParentApp from './components/parent/ParentApp';
import './App.css';

const AppRouter = () => {
  const { user, userRole, setupComplete, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  // 🎯 KEY CHANGE: Show HomePage for non-logged users
  if (!user) {
    return <HomePage />; // ✅ Changed from RoleSelection to HomePage
  }

  // Logged in but no role selected
  if (!userRole) {
    return <RoleSelection />;
  }

  // Has role but setup not complete (for students)
  if (userRole === 'student' && !setupComplete) {
    return <StudentSetup />;
  }

  // Route to appropriate dashboard based on role
  const getDashboardComponent = () => {
    switch (userRole) {
      case 'student':
        return <StudentApp />;
      case 'teacher':
        return <TeacherApp />;
      case 'parent':
        return <ParentApp />;
      case 'other':
        return <StudentApp />; // Others get limited student access
      default:
        return <StudentApp />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={getDashboardComponent()} />
        <Route path="/profile" element={getDashboardComponent()} />
        <Route path="/settings" element={getDashboardComponent()} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-900">
        <AppRouter />
      </div>
    </AuthProvider>
  );
}

export default App;
