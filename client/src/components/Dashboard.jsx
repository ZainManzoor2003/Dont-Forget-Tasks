import React, { useState } from 'react';
import TaskCard from './TaskCard';
import './Dashboard.css';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');

  // Sample task data
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
      status: 'pending'
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

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

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
      upcoming: tasks.filter(t => t.priority === 'upcoming').length,
      dueToday: tasks.filter(t => t.priority === 'due-today').length,
      late: tasks.filter(t => t.priority === 'late').length,
      followUp: tasks.filter(t => t.priority === 'follow-up').length,
      highPriority: tasks.filter(t => t.priority === 'high-priority').length
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
              🔔
            </button>
            <button className="profile-btn" title="Profile">
              👤
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-header">
          <div className="section-title">
            <span className="title-icon">📋</span>
            <h2>Tasks Management</h2>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card upcoming">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <div className="stat-number">{counts.upcoming}</div>
              <div className="stat-label">Upcoming Tasks</div>
            </div>
          </div>
          <div className="stat-card due-today">
            <div className="stat-icon">⏰</div>
            <div className="stat-content">
              <div className="stat-number">{counts.dueToday}</div>
              <div className="stat-label">Due Today</div>
            </div>
          </div>
          <div className="stat-card late">
            <div className="stat-icon">⚠️</div>
            <div className="stat-content">
              <div className="stat-number">{counts.late}</div>
              <div className="stat-label">Late Tasks</div>
            </div>
          </div>
          <div className="stat-card follow-up">
            <div className="stat-icon">🔄</div>
            <div className="stat-content">
              <div className="stat-number">{counts.followUp}</div>
              <div className="stat-label">Follow-ups</div>
            </div>
          </div>
          <div className="stat-card high-priority">
            <div className="stat-icon">🔥</div>
            <div className="stat-content">
              <div className="stat-number">{counts.highPriority}</div>
              <div className="stat-label">High Priority</div>
            </div>
          </div>
        </div>

        <div className="tasks-section">
          <div className="tasks-header">
            <h3>Tasks List</h3>
            <div className="tasks-controls">
              <div className="search-box">
                <span className="search-icon">🔍</span>
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
                <option value="upcoming">Upcoming</option>
                <option value="due-today">Due Today</option>
                <option value="late">Late</option>
                <option value="follow-up">Follow-up</option>
                <option value="high-priority">High Priority</option>
              </select>
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
              <div className="no-tasks-icon">📝</div>
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
