import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeSection, onSectionChange, isOpen, onClose }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'add-task', label: 'Add Task', icon: '➕' },
    { id: 'follow-up', label: "Don't Forget to Follow Up", icon: '🔁' },
    { id: 'booking', label: 'Booking', icon: '📅' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">📝</div>
          <div className="logo-text">
            <div className="logo-title">DONT FORGET</div>
            <div className="logo-subtitle">Task Manager</div>
          </div>
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
          <div className="user-avatar">👤</div>
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
