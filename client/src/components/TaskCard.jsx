import React from 'react';
import { FiEye, FiEdit2, FiTrash2, FiCalendar as FiCalendarIcon, FiClock } from 'react-icons/fi';
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
    <div className={`task-card ${task.priority}`} style={{ borderLeftColor: priorityColor }}>
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
            <FiEye />
          </button>
          <button 
            className="action-btn edit-btn" 
            onClick={() => onEdit(task)}
            title="Edit Task"
          >
            <FiEdit2 />
          </button>
          <button 
            className="action-btn delete-btn" 
            onClick={() => onDelete(task.id)}
            title="Delete Task"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
      
      <div className="task-content">
        <h3 className="task-title">{task.name}</h3>
        <p className="task-description">{task.description}</p>
      </div>
      
      <div className="task-footer" style={{ borderTopColor: priorityColor }}>
        <div className="task-datetime">
          <div className="task-date">
            <span className="datetime-icon"><FiCalendarIcon size={16} /></span>
            <span className="datetime-text">{date}</span>
          </div>
          <div className="task-time">
            <span className="datetime-icon"><FiClock size={16} /></span>
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
