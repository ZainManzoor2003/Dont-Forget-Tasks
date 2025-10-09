import React, { useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import './AddTask.css';

const AddTask = () => {
  const [formData, setFormData] = useState({
    title: '',
    invitee: '',
    taskType: 'Regular',
    meetingLink: '',
    dateTime: '',
    keyPoints: '',
    repeat: 'None',
    priority: 'Medium',
    tags: '',
    followUpLink: '',
    guestAccess: false,
    redirectUrl: '',
    bookingLimit: '',
    reminder: '15 minutes'
  });

  const generateMeetingLink = () => {
    const token = Math.random().toString(36).slice(2, 6) + '-' + Math.random().toString(36).slice(2, 6) + '-' + Math.random().toString(36).slice(2, 6);
    // Placeholder auto-generated link (simulate Zoom/Google Meet integration)
    return `https://meet.dontforget.app/${token}`;
  };

  const [showKeyPointsPanel, setShowKeyPointsPanel] = useState(false);
  const [showKeyPointsPopup, setShowKeyPointsPopup] = useState(false);
  const [keyPointsList, setKeyPointsList] = useState([]);
  const [currentKeyPoint, setCurrentKeyPoint] = useState('');


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
      const next = { ...prev, [name]: type === 'checkbox' ? checked : value };
      if (name === 'taskType') {
        if (value === 'Video' && !prev.meetingLink) {
          next.meetingLink = generateMeetingLink();
        }
        if (value !== 'Video') {
          next.meetingLink = '';
        }
      }
      if (name === 'dateTime' && prev.taskType === 'Video' && !prev.meetingLink) {
        next.meetingLink = generateMeetingLink();
      }
      return next;
    });
  };

  const handleAddKeyPoint = () => {
    if (currentKeyPoint.trim()) {
      setKeyPointsList(prev => [...prev, currentKeyPoint.trim()]);
      setCurrentKeyPoint('');
    }
  };

  const handleKeyPointInputChange = (e) => {
    setCurrentKeyPoint(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyPoint();
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Task data:', formData);
    // Handle form submission
    alert('Task saved successfully!');
  };

  const taskTypes = ['Regular', 'Video', 'Phone', 'Note'];
  const repeatOptions = ['None', 'Daily', 'Weekly', 'Monthly', 'Yearly'];
  const priorityOptions = ['Low', 'Medium', 'High', 'Urgent'];
  const reminderOptions = ['5 minutes', '15 minutes', '30 minutes', '1 hour', '2 hours', '1 day'];

  return (
    <div className="add-task-container">
      <div className="add-task-header">
        <div className="header-left">
          <div className="add-icon"><FiPlus /></div>
          <h1>Don't Forget To Create a Task</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="add-task-form">
        {/* Title (required) */}
        <div className="form-group full">
          <label className="form-label required">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            placeholder="Task Title"
            required
          />
        </div>

        {/* Invitee (optional) */}
        <div className="form-group">
          <label className="form-label">Invitee</label>
          <input
            type="text"
            name="invitee"
            value={formData.invitee}
            onChange={handleChange}
            className="form-input"
            placeholder="Invitee Name or Email"
          />
        </div>

        {/* Task Type */}
        <div className="form-group">
          <label className="form-label">Task Type</label>
          <select
            name="taskType"
            value={formData.taskType}
            onChange={handleChange}
            className="form-select"
          >
            {taskTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Auto-generated meeting link for Video */}
        {formData.taskType === 'Video' && (
          <div className="form-group">
            <label className="form-label">Meeting Link (auto-generated)</label>
            <input
              type="text"
              name="meetingLink"
              value={formData.meetingLink || ''}
              readOnly
              className="form-input"
              placeholder="Generating link..."
            />
          </div>
        )}

        {/* Date/Time picker */}
        <div className="form-group">
          <label className="form-label">Date & Time</label>
          <input
            type="datetime-local"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        {/* Key Points (bullets) */}
        <div className="form-group">
          <label className="form-label">Key Points</label>
          <div className="key-points-container">
            <div className="key-points-input-container">
              <input
                type="text"
                value={currentKeyPoint}
                onChange={handleKeyPointInputChange}
                onKeyPress={handleKeyPress}
                className="form-input"
                placeholder="Enter a key point"
              />
              <button
                type="button"
                className="add-key-point-btn"
                onClick={handleAddKeyPoint}
              >
                Add Key Point
              </button>
            </div>
            <div className="key-points-actions">
              <button
                type="button"
                className="key-points-btn"
                onClick={() => setShowKeyPointsPanel(!showKeyPointsPanel)}
              >
                Show Key Points
              </button>
              <button
                type="button"
                className="key-points-btn popup"
                onClick={() => setShowKeyPointsPopup(!showKeyPointsPopup)}
              >
                Pop Out Key Points
              </button>
            </div>
          </div>
        </div>

        {/* Repeat */}
        <div className="form-group">
          <label className="form-label">Repeat</label>
          <select
            name="repeat"
            value={formData.repeat}
            onChange={handleChange}
            className="form-select"
          >
            {repeatOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div className="form-group">
          <label className="form-label">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="form-select"
          >
            {priorityOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div className="form-group">
          <label className="form-label">Tags</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter tags separated by commas"
          />
        </div>

        {/* Follow-Up link (optional) */}
        <div className="form-group">
          <label className="form-label">Follow-Up Link</label>
          <input
            type="url"
            name="followUpLink"
            value={formData.followUpLink}
            onChange={handleChange}
            className="form-input"
            placeholder="Optional follow-up link"
          />
        </div>

        {/* Guest Access toggle (video only) */}
        {formData.taskType === 'Video' && (
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="guestAccess"
                checked={formData.guestAccess}
                onChange={handleChange}
                className="checkbox-input"
              />
              <span className="checkbox-text">Guest Access (Video only)</span>
            </label>
          </div>
        )}

        {/* Redirect URL (optional) */}
        <div className="form-group">
          <label className="form-label">Redirect URL</label>
          <input
            type="url"
            name="redirectUrl"
            value={formData.redirectUrl}
            onChange={handleChange}
            className="form-input"
            placeholder="Optional redirect URL"
          />
        </div>

        {/* Booking Limit (optional) */}
        <div className="form-group">
          <label className="form-label">Booking Limit</label>
          <input
            type="number"
            name="bookingLimit"
            value={formData.bookingLimit}
            onChange={handleChange}
            className="form-input"
            placeholder="Maximum number of bookings"
          />
        </div>

        {/* Reminder */}
        <div className="form-group">
          <label className="form-label">Reminder</label>
          <select
            name="reminder"
            value={formData.reminder}
            onChange={handleChange}
            className="form-select"
          >
            {reminderOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Save Task button */}
        <div className="form-actions">
          <button type="submit" className="save-btn">Save Task</button>
          <button type="button" className="cancel-btn">Cancel</button>
        </div>
      </form>

      {/* Key Points Side Panel */}
      {showKeyPointsPanel && (
        <div className="key-points-side-panel">
          <div className="panel-header">
            <h3>Key Points</h3>
            <button 
              className="close-panel"
              onClick={() => setShowKeyPointsPanel(false)}
            >
              <FiX />
            </button>
          </div>
          <div className="panel-content">
            {keyPointsList.length > 0 ? (
              <ul className="key-points-list">
                {keyPointsList.map((point, index) => (
                  <li key={index}>• {point}</li>
                ))}
              </ul>
            ) : (
              <p className="no-points">No key points added yet</p>
            )}
          </div>
        </div>
      )}

      {/* Key Points Floating Window */}
      {showKeyPointsPopup && (
        <div className="popup-overlay" onClick={() => setShowKeyPointsPopup(false)}>
          <div className="key-points-popup" onClick={(e) => e.stopPropagation()}>
            <button 
              className="close-popup-top-right"
              onClick={() => setShowKeyPointsPopup(false)}
            >
              <FiX />
            </button>
            <div className="popup-header">
              <h3>Key Points</h3>
            </div>
            <div className="popup-content">
              {keyPointsList.length > 0 ? (
                <ul className="key-points-list">
                  {keyPointsList.map((point, index) => (
                    <li key={index}>• {point}</li>
                  ))}
                </ul>
              ) : (
                <p className="no-points">No key points added yet</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;