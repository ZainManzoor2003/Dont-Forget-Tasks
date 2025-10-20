import React, { useState, useMemo } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import AddTask from './AddTask';
import FollowUp from './FollowUp';
// import Reminders from './Reminders';
// import Notifications from './Notifications';
// import Analytics from './Analytics';
import Settings from './Settings';
import MeetingTasksManager from './MeetingTasksManager';
import MeetingTemplates from './MeetingTemplates';
import Booking from './Booking';
import Meetings from './Meetings';
import './Layout.css';
import FAQ from './FAQ';
import Contact from './Contact';
import Blog from './Blog';
import PrivacyPolicy from './PrivacyPolicy';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 500);
  const [tasks, setTasks] = useState([
    // LATE TASKS (past dates)
    {
      id: 1,
      name: 'Code Review Session',
      description: 'Review pull requests and provide feedback to development team',
      dateTime: '2024-01-10T16:00:00',
      priority: 'high',
      status: 'overdue',
      repeat: 'None',
      repeatDays: [],
      repeatMonths: []
    },
    {
      id: 2,
      name: 'Database Migration',
      description: 'Execute critical database migration for production environment',
      dateTime: '2024-01-12T09:00:00',
      priority: 'medium',
      status: 'in-progress',
      repeat: 'None',
      repeatDays: [],
      repeatMonths: []
    },
    
    // DUE TODAY TASKS (today's date)
    {
      id: 3,
      name: 'Complete Project Proposal',
      description: 'Draft and finalize the quarterly project proposal for client presentation',
      dateTime: new Date().toISOString().split('T')[0] + 'T10:00:00',
      priority: 'low',
      status: 'in-progress',
      repeat: 'None',
      repeatDays: [],
      repeatMonths: []
    },
    {
      id: 4,
      name: 'Weekly Team Standup',
      description: 'Prepare agenda and materials for the weekly team standup meeting',
      dateTime: new Date().toISOString().split('T')[0] + 'T14:30:00',
      priority: 'low',
      status: 'pending',
      repeat: 'Weekly',
      repeatDays: ['monday', 'wednesday', 'friday'],
      repeatMonths: []
    },
    
    // FOLLOW-UP TASKS (medium priority, future dates)
    {
      id: 5,
      name: 'Client Follow-up Call',
      description: 'Follow up with ABC Corp about the Q1 marketing proposal and next steps',
      dateTime: '2024-01-20T14:00:00',
      priority: 'medium',
      status: 'pending',
      repeat: 'None',
      repeatDays: [],
      repeatMonths: []
    },
    {
      id: 6,
      name: 'Project Status Update',
      description: 'Send weekly project status update to stakeholders and team members',
      dateTime: '2024-01-22T10:30:00',
      priority: 'medium',
      status: 'pending',
      repeat: 'Weekly',
      repeatDays: ['monday'],
      repeatMonths: []
    },
    
    // HIGH PRIORITY TASKS (urgent priority)
    {
      id: 7,
      name: 'Monthly Client Check-in',
      description: 'Schedule and conduct follow-up call with potential client',
      dateTime: '2024-01-17T11:00:00',
      priority: 'urgent',
      status: 'pending',
      repeat: 'Monthly',
      repeatDays: [],
      repeatMonths: ['january', 'march', 'may', 'july', 'september', 'november'],
      followUps: [
        { id: '2024-03-01T10:00:00Z', text: 'Zoom call completed. Need to send proposal.', date: '2024-03-01T10:00:00Z' }
      ]
    },
    
    // UPCOMING TASKS (upcoming priority, future dates)
    {
      id: 8,
      name: 'Annual Review Meeting',
      description: 'Conduct yearly performance review with team members',
      dateTime: '2024-01-25T15:00:00',
      priority: 'upcoming',
      status: 'pending',
      repeat: 'Yearly',
      repeatDays: ['monday', 'tuesday', 'wednesday'],
      repeatMonths: ['january', 'june', 'december']
    },
    {
      id: 9,
      name: 'Vendor Contract Review',
      description: 'Review and follow up on pending vendor contracts for Q1 services',
      dateTime: '2024-01-28T16:00:00',
      priority: 'upcoming',
      status: 'pending',
      repeat: 'None',
      repeatDays: [],
      repeatMonths: []
    }
  ]);

  const sectionFromPath = useMemo(() => {
    const parts = location.pathname.split('/').filter(Boolean);
    // path: /dashboard/:section?
    return parts[1] || 'dashboard';
  }, [location.pathname]);

  // Keep state in sync with URL
  React.useEffect(() => {
    if (activeSection !== sectionFromPath) {
      setActiveSection(sectionFromPath);
    }
  }, [sectionFromPath]);

  // Handle window resize to manage sidebar state
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    navigate(`/dashboard/${section === 'dashboard' ? '' : section}`);
    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 500) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className={`layout${sidebarOpen ? '' : ' sidebar-closed'}`}>
      {/* Mobile Top Bar with Burger - visible at 500px and below */}
      <div className="mobile-topbar">
        <button 
          className="mobile-menu-toggle"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>
      
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onToggle={() => setSidebarOpen(prev => !prev)}
      />
      <div className="main-content">
        <Routes>
          <Route index element={<Dashboard tasks={tasks} setTasks={setTasks} onNavigate={handleSectionChange} />} />
          <Route path="dashboard" element={<Navigate to="/dashboard" replace />} />
          <Route path="add-task" element={<AddTask tasks={tasks} setTasks={setTasks} />} />
          <Route path="follow-up" element={<FollowUp tasks={tasks} setTasks={setTasks} onNavigate={handleSectionChange} />} />
          {/* <Route path="reminders" element={<Reminders tasks={tasks} setTasks={setTasks} />} />
          <Route path="notifications" element={<Notifications tasks={tasks} />} />
          <Route path="analytics" element={<Analytics tasks={tasks} />} /> */}
          <Route path="meetings" element={<Meetings tasks={tasks} setTasks={setTasks} />} />
          <Route path="meeting-tasks" element={<MeetingTasksManager />} />
          <Route path="meeting-templates" element={<MeetingTemplates />} />
          <Route path="settings" element={<Settings />} />
          <Route path="booking" element={<Booking />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog />} />
          {/* Temporarily route Privacy & Terms to PrivacyPolicy until separate Terms page exists */}
          <Route path="privacy-terms" element={<PrivacyPolicy />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
      {sidebarOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
