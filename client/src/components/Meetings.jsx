import React, { useMemo, useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';
import './Meetings.css';

const Meetings = ({ tasks = [], setTasks = () => { } }) => {
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [selectedMeeting, setSelectedMeeting] = useState('google');
  const [selectedType, setSelectedType] = useState('all');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const selectedTask = useMemo(() => tasks.find(t => String(t.id) === String(selectedTaskId)), [tasks, selectedTaskId]);

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
      .filter(t => selectedType === 'all' || t.priority === selectedType)
      .sort((a, b) => {
        const aKey = priorityOrder[a.priority] || priorityOrder.other;
        const bKey = priorityOrder[b.priority] || priorityOrder.other;
        if (aKey !== bKey) return aKey - bKey;
        return (a.dateTime || '').localeCompare(b.dateTime || '');
      });
  }, [tasks, selectedType]);

  const taskTypes = useMemo(() => {
    const set = new Set(tasks.map(t => t.priority).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, [tasks]);

  const copyTemplate = async (index, title, desc) => {
    try {
      await navigator.clipboard.writeText(desc);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const fallbackNotes = [
    { id: 'n1', date: new Date().toISOString(), text: 'Prepared agenda and materials.' },
    { id: 'n2', date: new Date().toISOString(), text: 'Confirmed attendee availability.' }
  ];

  const meetingTemplates = [
    { title: 'Touching Base Without Agenda', desc: 'Hi [Name], I hope this message finds you well. I just wanted to take a moment to reconnect and check in—sometimes the best conversations happen without a specific agenda. If there’s anything you’re working on where an extra perspective or bit of support could help, please feel free to share.It’s always a pleasure to stay in touch, and I look forward to hearing what’s new on your end whenever you have a moment.Warm regards,[Your Name]' },
    { title: 'Reconnecting', desc: 'Hello [Name], it’s been a while since we last connected, and I wanted to check back in. I’ve been working on [project/initiative] and thought of you given your expertise. I’d enjoy hearing what you’ve been up to and sharing some updates as well. Would you be open to a quick catch-up? Kind regards, [Your Name]' },
    { title: 'New Connection Outreach', desc: 'Hi [Name], I recently came across your work in [field/industry], and it resonated strongly with my interests. I’d like to connect and learn more about your perspective on [topic]. Building relationships with thoughtful professionals is always rewarding.Hope we can connect soon.Sincerely, [Your Name]' },
    { title: 'After Event Connection', desc: 'SHello [Name], it was a pleasure meeting you at [event]. Our conversation about [topic] really stood out, and I’d love to continue building on it. I believe there could be opportunities for us to exchange insights or even collaborate down the line.Looking forward to staying connected.Best regards, [Your Name]' },
    { title: 'De-Escalation', desc: 'Hello [Name], I’d like to revisit our recent exchange regarding [issue] and ensure we’re both aligned moving forward. My goal is to understand your perspective fully and work together toward a solution that feels fair and constructive for both of us. A calm, focused conversation would give us the chance to reset and clear up any misunderstandings.Would you be open to scheduling a short discussion?Warm regards,[Your Name]' },
    { title: 'Addressing Missed Deadline', desc: 'Hi [Name], I noticed that [deliverable/task] hasn’t been completed by the expected date. I completely understand that unexpected challenges can arise, and my main priority is to help us stay on track without added pressure. If there are obstacles you’re facing, let’s review them together and identify the best way forward. Your input is important, and I appreciate your effort in keeping things moving smoothly. A quick update will help us realign and avoid further delays.Best regards,[Your Name]' },
    { title: 'Reconnecting', desc: 'Hello [Name], it’s been a while since we last connected, and I wanted to check back in. I’ve been working on [project/initiative] and thought of you given your expertise. I’d enjoy hearing what you’ve been up to and sharing some updates as well. Would you be open to a quick catch-up? Kind regards, [Your Name]' },
    { title: 'New Connection Outreach', desc: 'Hi [Name], I recently came across your work in [field/industry], and it resonated strongly with my interests. I’d like to connect and learn more about your perspective on [topic]. Building relationships with thoughtful professionals is always rewarding.Hope we can connect soon.Sincerely, [Your Name]' },
    { title: 'After Event Connection', desc: 'SHello [Name], it was a pleasure meeting you at [event]. Our conversation about [topic] really stood out, and I’d love to continue building on it. I believe there could be opportunities for us to exchange insights or even collaborate down the line.Looking forward to staying connected.Best regards, [Your Name]' },
  ];

  return (
    <div className="meetings-page">
      <div className="meetings-grid">
        <div className="meetings-left">
          <div className="meet-card">
            <div className="meet-card-head head-with-actions">
              <div className="head-title">{selectedMeeting === 'google' ? 'Google Meet' : 'Zoom'}</div>
              <div className="head-actions">
                <button
                  className={`meeting-btn ${selectedMeeting === 'google' ? 'active' : ''}`}
                  onClick={() => setSelectedMeeting('google')}
                >
                  Google Meet
                </button>
                <button
                  className={`meeting-btn ${selectedMeeting === 'zoom' ? 'active' : ''}`}
                  onClick={() => setSelectedMeeting('zoom')}
                >
                  Zoom
                </button>
              </div>
        </div>
          <iframe
              title={selectedMeeting === 'google' ? 'Google Meet' : 'Zoom'}
              src={selectedMeeting === 'google' ? 'https://meet.google.com/' : 'https://zoom.us/'}
              className="meet-iframe"
            allow="camera; microphone; display-capture; clipboard-write;"
          />
        </div>
      </div>

        <div className="meetings-right">
          <div className="tasks-card">
            <div className="tasks-head">
              <h2 className="tasks-title">Meeting Notes</h2>
              <p className="tasks-desc">Quick templates you can copy for common meeting scenarios.</p>
            </div>
            <div className="meeting-tasks-scroll">
              <div className="template-cards">
                {meetingTemplates.map((card, index) => (
                  <div className="template-card" key={card.title}>
                    <div className="template-card-row">
                      <div>
                        <h3 className="template-title">{card.title}</h3>
                        <p className="template-desc">{card.desc}</p>
                      </div>
                      <button
                        className={`copy-btn ${copiedIndex === index ? 'copied' : ''}`}
                        onClick={() => copyTemplate(index, card.title, card.desc)}
                      >
                        {copiedIndex === index ? (
                          <>
                            <FiCheck className="copy-icon" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <FiCopy className="copy-icon" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>

          <div className="notes-card">
            <div className="notes-head">
              <h3 className="notes-title">Task Notes</h3>
              <div className="selection-row top">
                <select
                  className="filter-select"
                  value={selectedType}
                  onChange={(e) => { setSelectedType(e.target.value); setSelectedTaskId(''); }}
                >
                  {taskTypes.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Task Types' : type.replace('-', ' ')}
                    </option>
                  ))}
                </select>
                <select className="tasks-select" value={selectedTaskId} onChange={(e) => setSelectedTaskId(e.target.value)}>
                  <option value="">Select a task...</option>
                  {tasksByRelevance.map(task => (
                    <option key={task.id} value={task.id}>
                      {task.name} {task.dateTime ? `— ${new Date(task.dateTime).toLocaleString()}` : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {selectedTask && (
              <div className="notes-body">
                <div className="notes-timeline">
                  {((selectedTask.followUps && selectedTask.followUps.length > 0) ? selectedTask.followUps : fallbackNotes).map(note => (
                    <div key={note.id} className="note-row">
                      <div className="note-date">{note.date ? new Date(note.date).toLocaleString() : ''}</div>
                      <div className="note-text">{note.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
                </div>
        </div>
      </div>
    </div>
  );
};

export default Meetings;


