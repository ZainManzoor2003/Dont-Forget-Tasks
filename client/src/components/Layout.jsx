import React, { useState, useMemo } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import AddTask from './AddTask';
import FollowUp from './FollowUp';
import Settings from './Settings';
import Booking from './Booking';
import Meetings from './Meetings';
import './Layout.css';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: 'Complete Project Proposal',
      description: 'Draft and finalize the quarterly project proposal for client presentation',
      dateTime: '2024-01-15T10:00:00',
      priority: 'due-today',
      status: 'in-progress'
    },
    {
      id: 2,
      name: 'Team Meeting Preparation',
      description: 'Prepare agenda and materials for the weekly team standup meeting',
      dateTime: '2024-01-16T14:30:00',
      priority: 'upcoming',
      status: 'pending'
    },
    {
      id: 3,
      name: 'Code Review Session',
      description: 'Review pull requests and provide feedback to development team',
      dateTime: '2024-01-14T16:00:00',
      priority: 'late',
      status: 'overdue'
    },
    {
      id: 4,
      name: 'Client Follow-up Call',
      description: 'Schedule and conduct follow-up call with potential client',
      dateTime: '2024-01-17T11:00:00',
      priority: 'follow-up',
      status: 'pending',
      followUps: [
        { id: '2024-03-01T10:00:00Z', text: 'Zoom call completed. Need to send proposal.', date: '2024-03-01T10:00:00Z' }
      ]
    },
    {
      id: 5,
      name: 'Database Migration',
      description: 'Execute critical database migration for production environment',
      dateTime: '2024-01-15T09:00:00',
      priority: 'high-priority',
      status: 'in-progress'
    },
    {
      id: 6,
      name: 'Documentation Update',
      description: 'Update API documentation and user guides',
      dateTime: '2024-01-18T15:00:00',
      priority: 'upcoming',
      status: 'pending'
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

  const handleSectionChange = (section) => {
    setActiveSection(section);
    navigate(`/dashboard/${section === 'dashboard' ? '' : section}`);
  };

  return (
    <div className="layout">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="main-content">
        <div className="mobile-header">
          <button 
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1>Dont Forget</h1>
        </div>
        <Routes>
          <Route index element={<Dashboard tasks={tasks} setTasks={setTasks} onNavigate={handleSectionChange} />} />
          <Route path="dashboard" element={<Navigate to="/dashboard" replace />} />
          <Route path="add-task" element={<AddTask tasks={tasks} setTasks={setTasks} />} />
          <Route path="follow-up" element={<FollowUp tasks={tasks} setTasks={setTasks} onNavigate={handleSectionChange} />} />
          <Route path="meetings" element={<Meetings />} />
          <Route path="settings" element={<Settings />} />
          <Route path="booking" element={<Booking />} />
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
