import React from 'react';
import './TaskCard.css';

const TaskCard = ({ task, onEdit, onDelete, onView }) => {
  const getPriorityColor = (priority) => {
    const colors = {
      'upcoming': '#81C784',
      'due-today': '#FFB74D',
      'late': '#E57373',
      'follow-up': '#64B5F6',
      'high-priority': '#F06292'
    };
    return colors[priority] || '#81C784';
  };

  const getPriorityLabel = (priority) => {
    const labels = {
      'upcoming': 'Upcoming Tasks',
      'due-today': 'Due Today Tasks',
      'late': 'Late Tasks',
      'follow-up': 'Follow-Up Tasks',
      'high-priority': 'High Priority Tasks'
    };
    return labels[priority] || 'Upcoming Tasks';
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  const { date, time } = formatDateTime(task.dateTime);
  const priorityColor = getPriorityColor(task.priority);

  return (
    <div className="task-card" style={{ borderLeftColor: priorityColor }}>
      <div className="task-header">
        <div className="task-priority">
          <div 
            className="priority-indicator" 
            style={{ backgroundColor: priorityColor }}
          ></div>
          <span className="priority-label">{getPriorityLabel(task.priority)}</span>
        </div>
        <div className="task-actions">
          <button 
            className="action-btn view-btn" 
            onClick={() => onView(task)}
            title="View Details"
          >
            👁️
          </button>
          <button 
            className="action-btn edit-btn" 
            onClick={() => onEdit(task)}
            title="Edit Task"
          >
            ✏️
          </button>
          <button 
            className="action-btn delete-btn" 
            onClick={() => onDelete(task.id)}
            title="Delete Task"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <div className="task-content">
        <h3 className="task-title">{task.name}</h3>
        <p className="task-description">{task.description}</p>
      </div>
      
      <div className="task-footer">
        <div className="task-datetime">
          <div className="task-date">
            <span className="datetime-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19Z" fill="#8b4513"/>
                <path d="M7 10H9V12H7V10Z" fill="#8b4513"/>
                <path d="M11 10H13V12H11V10Z" fill="#8b4513"/>
                <path d="M15 10H17V12H15V10Z" fill="#8b4513"/>
                <path d="M7 14H9V16H7V14Z" fill="#8b4513"/>
                <path d="M11 14H13V16H11V14Z" fill="#8b4513"/>
                <path d="M15 14H17V16H15V14Z" fill="#8b4513"/>
              </svg>
            </span>
            <span className="datetime-text">{date}</span>
          </div>
          <div className="task-time">
            <span className="datetime-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20Z" fill="#8b4513"/>
                <path d="M12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="#8b4513"/>
              </svg>
            </span>
            <span className="datetime-text">{time}</span>
          </div>
        </div>
        <div className="task-status">
          <span className={`status-badge ${task.status}`}>
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
