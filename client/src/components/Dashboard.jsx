import React, { useState, useMemo } from 'react';
import { FiBell, FiUser, FiClipboard, FiCalendar, FiClock, FiAlertTriangle, FiRefreshCw, FiAlertOctagon, FiSearch, FiFileText } from 'react-icons/fi';
import TaskCard from './TaskCard';
import './Dashboard.css';

const Dashboard = ({ tasks, setTasks, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');

  const filteredTasks = useMemo(() => tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesSearch && matchesPriority;
  }), [tasks, searchTerm, filterPriority]);

  const handleEditTask = (task) => {
    console.log('Edit task:', task);
    // Implement edit functionality
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleViewTask = (task) => {
    console.log('View task:', task);
    // Implement view functionality
  };

  const getTaskCounts = () => {
    return {
      total: tasks.length,
      low: tasks.filter(t => t.priority === 'low').length,
      medium: tasks.filter(t => t.priority === 'medium').length,
      high: tasks.filter(t => t.priority === 'high').length,
      urgent: tasks.filter(t => t.priority === 'urgent').length
    };
  };

  const counts = getTaskCounts();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="welcome-section">
            <h1 className="welcome-title">Welcome, Admin</h1>
            <p className="welcome-date">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="header-actions">
            <button className="notification-btn" title="Notifications">
              <FiBell />
            </button>
            <button className="profile-btn" title="Profile">
              <FiUser />
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-header">
          <div className="section-title">
            <span className="title-icon"><FiClipboard /></span>
            <h2>Review Your Dashboard</h2>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card upcoming">
            <div className="stat-icon"><FiCalendar /></div>
            <div className="stat-content">
              <div className="stat-number">{counts.low}</div>
              <div className="stat-label">Low</div>
            </div>
          </div>
          <div className="stat-card due-today">
            <div className="stat-icon"><FiClock /></div>
            <div className="stat-content">
              <div className="stat-number">{counts.medium}</div>
              <div className="stat-label">Medium</div>
            </div>
          </div>
          <div className="stat-card late">
            <div className="stat-icon"><FiAlertTriangle /></div>
            <div className="stat-content">
              <div className="stat-number">{counts.high}</div>
              <div className="stat-label">High</div>
            </div>
          </div>
          <div className="stat-card high-priority">
            <div className="stat-icon"><FiAlertOctagon /></div>
            <div className="stat-content">
              <div className="stat-number">{counts.urgent}</div>
              <div className="stat-label">Urgent</div>
            </div>
          </div>
        </div>


        <div className="tasks-section">
          <div className="tasks-header">
            <h3>Tasks List</h3>
            <div className="tasks-controls">
              <div className="search-box">
                <span className="search-icon"><FiSearch /></span>
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
              <button className="primary-btn" onClick={() => onNavigate && onNavigate('follow-up')}>
                Follow-ups
              </button>
            </div>
          </div>

          <div className="tasks-grid">
            {filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onView={handleViewTask}
              />
            ))}
          </div>

          {filteredTasks.length === 0 && (
            <div className="no-tasks">
              <div className="no-tasks-icon"><FiFileText /></div>
              <h3>No tasks found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
