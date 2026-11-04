import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import StudentForm from './components/StudentForm';
import RolesDashboard from './components/RolesDashboard';
import Navbar from './components/Navbar';
import ShortlistModal from './components/ShortlistModal';
import AiChatbot from './components/AiChatbot';
import DatabaseModal from './components/DatabaseModal';
import ApplicationsModal from './components/ApplicationsModal';
import { initDatabase, getStudent, getApplications } from './utils/dbStorage';

export default function App() {
  // Screens: 'landing' | 'form' | 'dashboard'
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [student, setStudent] = useState(null);
  const [applications, setApplications] = useState([]);

  // Active Modals
  const [selectedRoleForShortlist, setSelectedRoleForShortlist] = useState(null);
  const [isAiBotOpen, setIsAiBotOpen] = useState(false);
  const [isDbOpen, setIsDbOpen] = useState(false);
  const [isAppsOpen, setIsAppsOpen] = useState(false);

  // Initialize simulated MySQL database on mount
  useEffect(() => {
    initDatabase();
    const storedStudent = getStudent();
    const storedApps = getApplications();
    setStudent(storedStudent);
    setApplications(storedApps);
  }, []);

  const refreshAppData = () => {
    setStudent(getStudent());
    setApplications(getApplications());
  };

  // 1. From Landing Page -> Enter Student Information Form
  const handleStartFromLanding = () => {
    setCurrentScreen('form');
  };

  // 2. From Student Form -> Enter Roles Dashboard
  const handleProfileComplete = (savedStudent) => {
    setStudent(savedStudent);
    refreshAppData();
    setCurrentScreen('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Landing Page Screen (NO Sign In, NO Sign Up, Center Title + Let's Get Started button) */}
      {currentScreen === 'landing' && (
        <LandingPage onStart={handleStartFromLanding} />
      )}

      {/* Student Details Form Screen */}
      {currentScreen === 'form' && (
        <StudentForm
          initialStudent={student}
          onComplete={handleProfileComplete}
          onCancel={() => setCurrentScreen('landing')}
        />
      )}

      {/* Main Dashboard Screen */}
      {currentScreen === 'dashboard' && (
        <div className="min-h-screen flex flex-col">
          {/* Top Sticky Navbar */}
          <Navbar
            student={student}
            applicationsCount={applications.length}
            onOpenAiBot={() => setIsAiBotOpen(true)}
            onOpenDb={() => setIsDbOpen(true)}
            onEditProfile={() => setCurrentScreen('form')}
            onBackToLanding={() => setCurrentScreen('landing')}
            onViewApplications={() => setIsAppsOpen(true)}
          />

          {/* Main Roles Catalog & Matching Interface */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <RolesDashboard
              student={student}
              onSelectRole={(role) => setSelectedRoleForShortlist(role)}
              onEditProfile={() => setCurrentScreen('form')}
              applications={applications}
            />
          </main>

          {/* Minimal Dashboard Footer */}
          <footer className="border-t border-slate-900 bg-slate-950/60 py-6 text-center text-xs text-slate-500">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
              <span>ROLE MATCH • AI-Driven Campus Placement Intelligence Engine</span>
              <span>100% Client-Side React • Zero Backend • Zero External API Required</span>
            </div>
          </footer>
        </div>
      )}

      {/* Modal 1: AI Shortlist Chance Probability Calculator */}
      {selectedRoleForShortlist && (
        <ShortlistModal
          role={selectedRoleForShortlist}
          student={student}
          onClose={() => setSelectedRoleForShortlist(null)}
          onApplied={() => {
            refreshAppData();
          }}
        />
      )}

      {/* Modal 2: AI Placement Mentor Chatbot */}
      <AiChatbot
        student={student}
        isOpen={isAiBotOpen}
        onClose={() => setIsAiBotOpen(false)}
      />

      {/* Modal 3: MySQL Relational Database Console & Inspector */}
      <DatabaseModal
        isOpen={isDbOpen}
        onClose={() => setIsDbOpen(false)}
      />

      {/* Modal 4: Submitted Applications Tracker */}
      <ApplicationsModal
        isOpen={isAppsOpen}
        onClose={() => setIsAppsOpen(false)}
        onExploreRoles={() => {
          setIsAppsOpen(false);
          setCurrentScreen('dashboard');
        }}
      />
    </div>
  );
}
