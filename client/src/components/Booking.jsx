import React, { useMemo, useState } from 'react';
import { FiCalendar, FiChevronDown, FiRefreshCw, FiLink } from 'react-icons/fi';
import './Booking.css';

const defaultSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00',
  '11:30', '12:00', '14:00', '14:30', '15:00',
  '15:30', '16:00'
];

const Booking = () => {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [selectedSlot, setSelectedSlot] = useState('');
  const [guest, setGuest] = useState({ name: '', phone: '', comment: '' });
  const [step, setStep] = useState('select'); // select -> payment -> confirm
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [requirePayment, setRequirePayment] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [showLinkGenerator, setShowLinkGenerator] = useState(false);
  
  // Task details state
  const [selectedTaskType, setSelectedTaskType] = useState('all');
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [connectedTask, setConnectedTask] = useState(null);
  
  // Owner dashboard flow does not use services; payment is optional per booking

  // Sample tasks data (in real app, this would come from props or API)
  const tasks = [
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
      name: 'Client Follow-up Call',
      description: 'Schedule and conduct follow-up call with potential client',
      dateTime: '2024-01-17T11:00:00',
      priority: 'follow-up',
      status: 'pending'
    },
    {
      id: 4,
      name: 'Code Review Session',
      description: 'Review pull requests and provide feedback to development team',
      dateTime: '2024-01-14T16:00:00',
      priority: 'late',
      status: 'overdue'
    },
    {
      id: 5,
      name: 'Database Migration',
      description: 'Execute critical database migration for production environment',
      dateTime: '2024-01-15T09:00:00',
      priority: 'high-priority',
      status: 'in-progress'
    }
  ];

  const meetingLink = useMemo(() => {
    if (!selectedSlot) return '';
    const token = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `https://dontforget.app/meet/${date}-${selectedSlot}-${token}`;
  }, [date, selectedSlot]);

  const isGuestValid = guest.name.trim() && guest.phone.trim();

  // Task filtering logic (similar to FollowUp component)
  const tasksByRelevance = useMemo(() => {
    const priorityOrder = {
      'due-today': 1,
      'late': 2,
      'upcoming': 3,
      'follow-up': 4,
      'high-priority': 5,
      'other': 6
    };
    return [...tasks]
      .filter(t => selectedTaskType === 'all' || t.priority === selectedTaskType)
      .sort((a, b) => {
        const aKey = priorityOrder[a.priority] || priorityOrder.other;
        const bKey = priorityOrder[b.priority] || priorityOrder.other;
        if (aKey !== bKey) return aKey - bKey;
        return (a.dateTime || '').localeCompare(b.dateTime || '');
      });
  }, [tasks, selectedTaskType]);

  const taskTypes = useMemo(() => {
    const set = new Set(tasks.map(t => t.priority).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, [tasks]);

  const selectedTask = useMemo(() => {
    return tasks.find(t => String(t.id) === String(selectedTaskId));
  }, [tasks, selectedTaskId]);

  const handleConnectToBooking = () => {
    if (selectedTask) {
      setConnectedTask(selectedTask);
    }
  };

  const generateBookingLink = () => {
    const baseUrl = window.location.origin;
    const linkParams = new URLSearchParams({
      owner: 'true', // Indicates this is from the owner's dashboard
      payment: requirePayment ? 'required' : 'optional',
      task: connectedTask ? connectedTask.id : ''
    });
    
    const bookingLink = `${baseUrl}/book?${linkParams.toString()}`;
    setGeneratedLink(bookingLink);
    setShowLinkGenerator(true);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      alert('Booking link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const needsPayment = false; // Owners do not handle payment on this page

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!isGuestValid || !selectedSlot) return;
    setStep('confirm');
  };

  const resetBooking = () => {
    setSelectedSlot('');
    setGuest({ name: '', phone: '', comment: '' });
    setPaymentMethod('stripe');
    setStep('select');
  };

  return (
    <div className="booking-page">
      <div className="content-header">
        <div className="section-title">
          <span className="title-icon"><FiCalendar /></span>
          <h2>Public Booking Page</h2>
        </div>
        <p className="section-desc">This page works for both you (account owner) and your clients. Clients can book appointments easily without needing an account. Payment is optional - you can choose whether to require it for your services.</p>
      </div>

      {step !== 'confirm' && (
        <div className="booking-container">
          <div className="booking-main">
            <div className="booking-grid">
              <div className="calendar-card">
                <div className="card-title">Select Date</div>
                <input
                  type="date"
                  className="date-input"
                  value={date}
                  onChange={(e) => { setDate(e.target.value); setSelectedSlot(''); }}
                />
                <div className="card-title" style={{ marginTop: 12 }}>Available Slots</div>
                <div className="slots-grid">
                  {defaultSlots.map(t => (
                    <button
                      key={t}
                      className={`slot-btn ${selectedSlot === t ? 'selected' : ''}`}
                      onClick={() => setSelectedSlot(t)}
                    >{t}</button>
                  ))}
                </div>
              </div>

              <form className="details-card" onSubmit={handleConfirm}>
                <div className="card-title">Guest Details</div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Name</label>
                    <input value={guest.name} onChange={(e)=>setGuest({ ...guest, name: e.target.value })} placeholder="Your full name" required />
                  </div>
                  <div className="form-field">
                    <label>Phone</label>
                    <input value={guest.phone} onChange={(e)=>setGuest({ ...guest, phone: e.target.value })} placeholder="Your phone number" required />
                  </div>
                </div>
            <div className="form-row">
              <div className="form-field full">
                <label>Comment</label>
                <textarea value={guest.comment} onChange={(e)=>setGuest({ ...guest, comment: e.target.value })} placeholder="Anything we should know?" rows={4} />
              </div>
            </div>
              {/* No payment option on owner page */}

            {connectedTask && (
              <div className="connected-task-info">
                <div className="connected-task-header">
                  <span className="connected-task-label">Connected Task:</span>
                </div>
                <div className="connected-task-details">
                  <div className="connected-task-title">{connectedTask.name}</div>
                  {connectedTask.dateTime && (
                    <div className="connected-task-date">
                      {new Date(connectedTask.dateTime).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 'select' && (
              <div className="actions-row">
                <button type="submit" className="primary-btn" disabled={!isGuestValid || !selectedSlot}>
                  Confirm Booking
                </button>
              </div>
            )}

                {/* No payment step on owner page */}
              </form>
            </div>
          </div>

          <div className="task-details-section">
            <div className="booking-settings">
              <label className="picker-label">Share a booking link</label>

              <div className="link-generation-section">
                <button 
                  className="generate-link-btn" 
                  onClick={generateBookingLink}
                >
                  <FiLink className="btn-icon" />
                  Generate Shareable Link
                </button>
                <div className="settings-note">
                  <small>Generate a custom booking link to share with your clients. Payment is optional for clients.</small>
                </div>
              </div>
            </div>

            <div className="task-picker">
              <label className="picker-label">Connect this booking to a task</label>
              <div className="picker-row">
                <select
                  className="filter-select"
                  value={selectedTaskType}
                  onChange={(e) => { setSelectedTaskType(e.target.value); setSelectedTaskId(''); }}
                >
                  {taskTypes.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Task Types' : type.replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div className="picker-row">
                <select
                  className="filter-select"
                  value={selectedTaskId}
                  onChange={(e) => setSelectedTaskId(e.target.value)}
                >
                  <option value="">{selectedTaskType === 'all' ? 'Select a task...' : 'Select a task in this type...'}</option>
                  {tasksByRelevance.map(task => (
                    <option key={task.id} value={task.id}>
                      {task.name} {task.dateTime ? `— ${new Date(task.dateTime).toLocaleString()}` : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selectedTask && (
              <div className="task-summary">
                <div className="task-card-header">
                  <div className="task-title-row">
                    <h3 className="task-title">{selectedTask.name}</h3>
                    <span className={`status-badge ${selectedTask.status}`}>{selectedTask.status}</span>
                  </div>
                  {selectedTask.dateTime && (
                    <div className="task-datetime">{new Date(selectedTask.dateTime).toLocaleString()}</div>
                  )}
                </div>
                {selectedTask.description && (
                  <p className="task-description">{selectedTask.description}</p>
                )}
                <div className="connect-booking-actions">
                  <button className="connect-booking-btn" onClick={handleConnectToBooking}>
                    <FiLink className="btn-icon" />
                    Connect to Booking
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {step === 'confirm' && (
        <div className="confirmation-card">
          <div className="card-title">Booking Confirmed</div>
          <ul className="confirm-list">
            <li><strong>Date/Time:</strong> {date} at {selectedSlot}</li>
            <li><strong>Meeting link:</strong> <span className="mono">{meetingLink}</span></li>
            <li><strong>Payment:</strong> {payNow || requirePayment ? 'Collected' : 'Not collected'}</li>
            {guest.comment && (<li><strong>Notes:</strong> {guest.comment}</li>)}
          </ul>
          <div className="actions-row">
            <button className="secondary-btn" onClick={resetBooking}>Book Another</button>
            <a className="primary-btn" href="#" onClick={(e)=>e.preventDefault()}>Go to Custom URL</a>
          </div>
        </div>
      )}

      {/* Link Generator Modal */}
      {showLinkGenerator && (
        <div className="link-generator-modal">
          <div className="modal-overlay" onClick={() => setShowLinkGenerator(false)}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Shareable Booking Link</h3>
              <button 
                className="close-btn" 
                onClick={() => setShowLinkGenerator(false)}
              >×</button>
            </div>
            <div className="modal-body">
              <p>Share this link with your clients to let them book appointments:</p>
              <div className="link-display">
                <input 
                  type="text" 
                  value={generatedLink} 
                  readOnly 
                  className="link-input"
                />
                <button 
                  className="copy-btn" 
                  onClick={copyToClipboard}
                >
                  Copy
                </button>
              </div>
              <div className="link-info">
                <div className="info-item">
                  <strong>Payment:</strong> Optional
                </div>
                {connectedTask && (
                  <div className="info-item">
                    <strong>Connected Task:</strong> {connectedTask.name}
                  </div>
                )}
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="secondary-btn" 
                onClick={() => setShowLinkGenerator(false)}
              >
                Close
              </button>
              <button 
                className="primary-btn" 
                onClick={() => {
                  copyToClipboard();
                  setShowLinkGenerator(false);
                }}
              >
                Copy & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;



