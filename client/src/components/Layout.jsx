import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import AddTask from './AddTask';
import FollowUp from './FollowUp';
import Settings from './Settings';
import Booking from './Booking';
import './Layout.css';

const Layout = () => {
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

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard tasks={tasks} setTasks={setTasks} onNavigate={setActiveSection} />;
      case 'add-task':
        return <AddTask tasks={tasks} setTasks={setTasks} />;
      case 'follow-up':
        return <FollowUp tasks={tasks} setTasks={setTasks} onNavigate={setActiveSection} />;
      case 'settings':
        return <Settings />;
      case 'booking':
        return <Booking />;
      default:
        return <Dashboard tasks={tasks} setTasks={setTasks} onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="layout">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
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
        {renderContent()}
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
