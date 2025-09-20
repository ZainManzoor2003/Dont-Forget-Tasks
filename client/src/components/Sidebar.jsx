import React from 'react';
import { FiBarChart2, FiPlus, FiRepeat, FiCalendar, FiSettings, FiEdit3, FiUser, FiVideo, FiClipboard, FiFileText } from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = ({ activeSection, onSectionChange, isOpen, onClose, onToggle }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiBarChart2 /> },
    { id: 'add-task', label: 'Add Task', icon: <FiPlus /> },
    { id: 'follow-up', label: 'Follow-ups', icon: <FiRepeat /> },
    { id: 'meetings', label: 'Meetings', icon: <FiVideo /> },
    { id: 'meeting-tasks', label: 'Meetings Tasks', icon: <FiClipboard /> },
    { id: 'meeting-templates', label: 'Meeting Templates', icon: <FiFileText /> },
    { id: 'booking', label: 'Booking', icon: <FiCalendar /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings /> }
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon"><FiEdit3 /></div>
          <div className="logo-text">
            <div className="logo-title">DONT FORGET</div>
            <div className="logo-subtitle">Task Manager</div>
          </div>
          <button
            aria-label="Toggle sidebar"
            className="sidebar-toggle"
            onClick={() => (onToggle ? onToggle() : onClose && onClose())}
            title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isOpen ? '❯' : '❮'}
          </button>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => {
                  onSectionChange(item.id);
                  if (onClose) onClose(); // Close sidebar on mobile after selection
                }}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar"><FiUser /></div>
          <div className="user-details">
            <div className="user-name">Admin User</div>
            <div className="user-role">Administrator</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
