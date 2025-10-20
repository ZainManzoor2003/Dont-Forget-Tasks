import React from 'react';
import { FiEye, FiEdit2, FiTrash2, FiCalendar as FiCalendarIcon, FiClock, FiRefreshCw, FiRepeat } from 'react-icons/fi';
import './TaskCard.css';

const TaskCard = ({ task, category = 'due-today', onEdit, onDelete, onView }) => {
  const getPriorityColor = (priority) => {
    const colors = {
      'low': '#28A745',      // Green (#28A745)
      'medium': '#FFC107',   // Yellow/Orange (#FFC107)
      'high': '#DC3545',     // Red (#DC3545)
      'urgent': '#E83E8C'    // Pink/Magenta (#E83E8C)
    };
    return colors[priority] || '#28A745';
  };

  const getPriorityLabel = (priority) => {
    const labels = {
      'low': 'LOW PRIORITY',
      'medium': 'MEDIUM PRIORITY',
      'high': 'HIGH PRIORITY',
      'urgent': 'URGENT'
    };
    return labels[priority] || 'LOW PRIORITY';
  };

  const getCategoryLabel = (category) => {
    const labels = {
      'due-today': 'Due Today',
      'follow-up': 'Follow-Up',
      'late': 'Late',
      'upcoming': 'Upcoming',
      'high-priority': 'High Priority'
    };
    return labels[category] || 'Due Today';
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
  
  const formatRepeatInfo = (repeat, repeatDays, repeatMonths) => {
    if (repeat === 'None') return null;
    
    const dayNames = {
      monday: 'Mon', tuesday: 'Tue', wednesday: 'Wed', thursday: 'Thu',
      friday: 'Fri', saturday: 'Sat', sunday: 'Sun'
    };
    
    const monthNames = {
      january: 'Jan', february: 'Feb', march: 'Mar', april: 'Apr',
      may: 'May', june: 'Jun', july: 'Jul', august: 'Aug',
      september: 'Sep', october: 'Oct', november: 'Nov', december: 'Dec'
    };
    
    if (repeat === 'Daily') return 'Daily';
    if (repeat === 'Weekly') {
      const days = repeatDays.map(day => dayNames[day]).join(', ');
      return `Weekly (${days})`;
    }
    if (repeat === 'Monthly') {
      const months = repeatMonths.map(month => monthNames[month]).join(', ');
      return `Monthly (${months})`;
    }
    if (repeat === 'Yearly') {
      const days = repeatDays.length > 0 ? repeatDays.map(day => dayNames[day]).join(', ') : 'All days';
      const months = repeatMonths.length > 0 ? repeatMonths.map(month => monthNames[month]).join(', ') : 'All months';
      return `Yearly (${days}, ${months})`;
    }
    
    return repeat;
  };

  const { date, time } = formatDateTime(task.dateTime);
  const priorityColor = getPriorityColor(task.priority);
  const repeatInfo = formatRepeatInfo(task.repeat, task.repeatDays, task.repeatMonths);
  const categoryLabel = getCategoryLabel(category);

  return (
    <div className={`task-card ${category}`}>
      <div className="task-header">
        <div className="task-category">
          <span className={`category-badge ${category}`}>
            {categoryLabel}
          </span>
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
      
      <div className="task-footer">
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
        <div className="task-meta">
          <div className="task-status">
            <span className={`status-badge ${task.status}`}>
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
          </div>
          {repeatInfo && (
            <div className="task-repeat">
              <span className="repeat-icon"><FiRepeat size={14} /></span>
              <span className="repeat-text">{repeatInfo}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
