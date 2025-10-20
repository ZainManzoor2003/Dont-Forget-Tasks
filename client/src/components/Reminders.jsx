import React, { useState, useMemo } from 'react';
import { FiBell, FiClock, FiCalendar, FiPlus, FiEdit2, FiTrash2, FiCheck } from 'react-icons/fi';
import './Reminders.css';

const Reminders = ({ tasks, setTasks }) => {
  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    priority: 'medium',
    type: 'task'
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterType, setFilterType] = useState('all');

  // Generate reminders from tasks
  const taskReminders = useMemo(() => {
    return tasks.map(task => ({
      id: `task-${task.id}`,
      title: task.name,
      description: task.description,
      date: task.dateTime.split('T')[0],
      time: task.dateTime.split('T')[1].substring(0, 5),
      priority: task.priority,
      type: 'task',
      status: task.status,
      originalTask: task
    }));
  }, [tasks]);

  // Custom reminders (user-created)
  const [customReminders, setCustomReminders] = useState([
    {
      id: 'reminder-1',
      title: 'Weekly Team Check-in',
      description: 'Schedule weekly team check-in meeting',
      date: '2024-01-20',
      time: '10:00',
      priority: 'high',
      type: 'custom',
      status: 'pending'
    },
    {
      id: 'reminder-2',
      title: 'Client Follow-up',
      description: 'Follow up with client about project proposal',
      date: '2024-01-18',
      time: '14:30',
      priority: 'urgent',
      type: 'custom',
      status: 'pending'
    }
  ]);

  const allReminders = [...taskReminders, ...customReminders];

  const filteredReminders = useMemo(() => {
    return allReminders.filter(reminder => {
      if (filterType === 'all') return true;
      if (filterType === 'task') return reminder.type === 'task';
      if (filterType === 'custom') return reminder.type === 'custom';
      return reminder.priority === filterType;
    });
  }, [allReminders, filterType]);

  const handleAddReminder = () => {
    if (!newReminder.title || !newReminder.date || !newReminder.time) return;
    
    const reminder = {
      id: `reminder-${Date.now()}`,
      ...newReminder,
      status: 'pending'
    };
    
    setCustomReminders([...customReminders, reminder]);
    setNewReminder({
      title: '',
      description: '',
      date: '',
      time: '',
      priority: 'medium',
      type: 'task'
    });
    setShowAddForm(false);
  };

  const handleDeleteReminder = (id) => {
    setCustomReminders(customReminders.filter(r => r.id !== id));
  };

  const handleMarkComplete = (id) => {
    setCustomReminders(customReminders.map(r => 
      r.id === id ? { ...r, status: 'completed' } : r
    ));
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'low': '#28A745',
      'medium': '#FFC107',
      'high': '#DC3545',
      'urgent': '#E83E8C'
    };
    return colors[priority] || '#28A745';
  };

  const getPriorityLabel = (priority) => {
    const labels = {
      'low': 'Low',
      'medium': 'Medium',
      'high': 'High',
      'urgent': 'Urgent'
    };
    return labels[priority] || 'Medium';
  };

  return (
    <div className="reminders-container">
      <div className="reminders-header">
        <div className="header-content">
          <div className="title-section">
            <span className="title-icon"><FiBell /></span>
            <h1>Reminders & Alerts</h1>
            <p>Manage your reminders and stay on top of important tasks</p>
          </div>
          <button 
            className="add-reminder-btn"
            onClick={() => setShowAddForm(true)}
          >
            <FiPlus />
            Add Reminder
          </button>
        </div>
      </div>

      <div className="reminders-controls">
        <div className="filter-section">
          <label>Filter by:</label>
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Reminders</option>
            <option value="task">Task Reminders</option>
            <option value="custom">Custom Reminders</option>
            <option value="urgent">Urgent</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      {showAddForm && (
        <div className="add-reminder-form">
          <h3>Add New Reminder</h3>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={newReminder.title}
              onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
              placeholder="Reminder title"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={newReminder.description}
              onChange={(e) => setNewReminder({...newReminder, description: e.target.value})}
              placeholder="Reminder description"
              rows="3"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={newReminder.date}
                onChange={(e) => setNewReminder({...newReminder, date: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                value={newReminder.time}
                onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select
                value={newReminder.priority}
                onChange={(e) => setNewReminder({...newReminder, priority: e.target.value})}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button className="cancel-btn" onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
            <button className="save-btn" onClick={handleAddReminder}>
              Add Reminder
            </button>
          </div>
        </div>
      )}

      <div className="reminders-grid">
        {filteredReminders.map(reminder => (
          <div key={reminder.id} className={`reminder-card ${reminder.priority} ${reminder.status}`}>
            <div className="reminder-header">
              <div className="reminder-type">
                <span className={`type-badge ${reminder.type}`}>
                  {reminder.type === 'task' ? 'Task' : 'Custom'}
                </span>
                <span 
                  className="priority-badge"
                  style={{ backgroundColor: getPriorityColor(reminder.priority) }}
                >
                  {getPriorityLabel(reminder.priority)}
                </span>
              </div>
              <div className="reminder-actions">
                {reminder.type === 'custom' && (
                  <>
                    <button 
                      className="action-btn complete-btn"
                      onClick={() => handleMarkComplete(reminder.id)}
                      title="Mark Complete"
                    >
                      <FiCheck />
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteReminder(reminder.id)}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </>
                )}
              </div>
            </div>
            
            <div className="reminder-content">
              <h3 className="reminder-title">{reminder.title}</h3>
              <p className="reminder-description">{reminder.description}</p>
            </div>
            
            <div className="reminder-footer">
              <div className="reminder-datetime">
                <span className="datetime-icon"><FiCalendar /></span>
                <span className="datetime-text">{reminder.date}</span>
                <span className="datetime-icon"><FiClock /></span>
                <span className="datetime-text">{reminder.time}</span>
              </div>
              <div className="reminder-status">
                <span className={`status-badge ${reminder.status}`}>
                  {reminder.status.charAt(0).toUpperCase() + reminder.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredReminders.length === 0 && (
        <div className="no-reminders">
          <div className="no-reminders-icon"><FiBell /></div>
          <h3>No reminders found</h3>
          <p>Try adjusting your filter or add a new reminder</p>
        </div>
      )}
    </div>
  );
};

export default Reminders;
