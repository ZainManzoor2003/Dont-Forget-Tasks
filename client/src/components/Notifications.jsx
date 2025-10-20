import React, { useState, useMemo } from 'react';
import { FiBell, FiCheck, FiX, FiAlertTriangle, FiInfo, FiCheckCircle, FiClock } from 'react-icons/fi';
import './Notifications.css';

const Notifications = ({ tasks }) => {
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Generate notifications from tasks
  const taskNotifications = useMemo(() => {
    const notifications = [];
    const today = new Date();
    
    tasks.forEach(task => {
      const taskDate = new Date(task.dateTime);
      const isToday = taskDate.toDateString() === today.toDateString();
      const isOverdue = taskDate < today && task.status !== 'completed';
      const isUpcoming = taskDate > today && taskDate <= new Date(today.getTime() + 24 * 60 * 60 * 1000);
      
      if (isOverdue) {
        notifications.push({
          id: `overdue-${task.id}`,
          type: 'warning',
          title: 'Task Overdue',
          message: `${task.name} was due ${taskDate.toLocaleDateString()}`,
          timestamp: new Date().toISOString(),
          status: 'unread',
          taskId: task.id,
          priority: 'high'
        });
      }
      
      if (isToday) {
        notifications.push({
          id: `due-today-${task.id}`,
          type: 'info',
          title: 'Task Due Today',
          message: `${task.name} is due today at ${taskDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
          timestamp: new Date().toISOString(),
          status: 'unread',
          taskId: task.id,
          priority: 'medium'
        });
      }
      
      if (isUpcoming) {
        notifications.push({
          id: `upcoming-${task.id}`,
          type: 'info',
          title: 'Task Due Tomorrow',
          message: `${task.name} is due tomorrow`,
          timestamp: new Date().toISOString(),
          status: 'unread',
          taskId: task.id,
          priority: 'low'
        });
      }
    });
    
    return notifications;
  }, [tasks]);

  // Custom notifications
  const [customNotifications, setCustomNotifications] = useState([
    {
      id: 'custom-1',
      type: 'success',
      title: 'Task Completed',
      message: 'Weekly team standup has been completed successfully',
      timestamp: '2024-01-15T10:30:00Z',
      status: 'read',
      priority: 'low'
    },
    {
      id: 'custom-2',
      type: 'warning',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur tonight from 2 AM to 4 AM',
      timestamp: '2024-01-15T09:00:00Z',
      status: 'unread',
      priority: 'medium'
    },
    {
      id: 'custom-3',
      type: 'info',
      title: 'New Feature Available',
      message: 'Check out the new reminder system in the Reminders section',
      timestamp: '2024-01-14T16:45:00Z',
      status: 'read',
      priority: 'low'
    }
  ]);

  const allNotifications = [...taskNotifications, ...customNotifications];

  const filteredNotifications = useMemo(() => {
    return allNotifications.filter(notification => {
      const typeMatch = filterType === 'all' || notification.type === filterType;
      const statusMatch = filterStatus === 'all' || notification.status === filterStatus;
      return typeMatch && statusMatch;
    }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [allNotifications, filterType, filterStatus]);

  const handleMarkAsRead = (id) => {
    setCustomNotifications(customNotifications.map(n => 
      n.id === id ? { ...n, status: 'read' } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setCustomNotifications(customNotifications.map(n => ({ ...n, status: 'read' })));
  };

  const handleDeleteNotification = (id) => {
    setCustomNotifications(customNotifications.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type) => {
    const icons = {
      'info': <FiInfo />,
      'warning': <FiAlertTriangle />,
      'success': <FiCheckCircle />,
      'error': <FiX />
    };
    return icons[type] || <FiBell />;
  };

  const getNotificationColor = (type) => {
    const colors = {
      'info': '#3B82F6',
      'warning': '#F59E0B',
      'success': '#10B981',
      'error': '#EF4444'
    };
    return colors[type] || '#6B7280';
  };

  const unreadCount = allNotifications.filter(n => n.status === 'unread').length;

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <div className="header-content">
          <div className="title-section">
            <span className="title-icon"><FiBell /></span>
            <h1>Notifications</h1>
            <p>Stay updated with your task alerts and system notifications</p>
            {unreadCount > 0 && (
              <span className="unread-badge">{unreadCount} unread</span>
            )}
          </div>
          <div className="header-actions">
            <button 
              className="mark-all-read-btn"
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
            >
              <FiCheck />
              Mark All Read
            </button>
          </div>
        </div>
      </div>

      <div className="notifications-controls">
        <div className="filter-section">
          <div className="filter-group">
            <label>Type:</label>
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Types</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="success">Success</option>
              <option value="error">Error</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Status:</label>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>
      </div>

      <div className="notifications-list">
        {filteredNotifications.map(notification => (
          <div 
            key={notification.id} 
            className={`notification-item ${notification.status} ${notification.type}`}
          >
            <div className="notification-icon" style={{ color: getNotificationColor(notification.type) }}>
              {getNotificationIcon(notification.type)}
            </div>
            
            <div className="notification-content">
              <div className="notification-header">
                <h3 className="notification-title">{notification.title}</h3>
                <div className="notification-actions">
                  {notification.status === 'unread' && (
                    <button 
                      className="action-btn mark-read-btn"
                      onClick={() => handleMarkAsRead(notification.id)}
                      title="Mark as Read"
                    >
                      <FiCheck />
                    </button>
                  )}
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => handleDeleteNotification(notification.id)}
                    title="Delete"
                  >
                    <FiX />
                  </button>
                </div>
              </div>
              
              <p className="notification-message">{notification.message}</p>
              
              <div className="notification-footer">
                <div className="notification-time">
                  <span className="time-icon"><FiClock /></span>
                  <span className="time-text">
                    {new Date(notification.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="notification-priority">
                  <span className={`priority-badge ${notification.priority}`}>
                    {notification.priority}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="no-notifications">
          <div className="no-notifications-icon"><FiBell /></div>
          <h3>No notifications found</h3>
          <p>Try adjusting your filters or check back later</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
