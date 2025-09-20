import React, { useState } from 'react';
import { FaCopy, FaChevronDown } from 'react-icons/fa';
import './MeetingTemplates.css';

const MeetingTemplates = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copySuccess, setCopySuccess] = useState('');

  const templateCategories = [
    { value: 'all', label: 'All Templates' },
    { value: 'greetings', label: 'Greetings' },
    { value: 'follow-up', label: 'Follow-up' },
    { value: 'scheduling', label: 'Scheduling' },
    { value: 'meeting-prep', label: 'Meeting Prep' },
    { value: 'closing', label: 'Closing' }
  ];

  const templates = [
    {
      id: 1,
      title: 'Touching Base Without Agenda',
      category: 'greetings',
      content: `Hi [Name],

I hope this message finds you well. I just wanted to take a moment to reconnect and check in—sometimes the best conversations happen without a specific agenda. If there's anything you're working on where an extra perspective or bit of support could help, please feel free to share.

It's always a pleasure to stay in touch, and I look forward to hearing what's new on your end whenever you have a moment.

Warm regards,
[Your Name]`
    },
    {
      id: 2,
      title: 'Reconnecting',
      category: 'greetings',
      content: `Hello [Name],

It's been a while since we last connected, and I wanted to check in and see how you've been doing. I hope everything is going well on your end.

I'd love to catch up and hear about any new developments or projects you're working on. Would you be available for a quick call sometime this week?

Looking forward to reconnecting!

Best regards,
[Your Name]`
    },
    {
      id: 3,
      title: 'Follow-up After Meeting',
      category: 'follow-up',
      content: `Hi [Name],

Thank you for taking the time to meet with me today. I really enjoyed our conversation about [topic] and found your insights very valuable.

As discussed, I'll be following up on:
- [Action item 1]
- [Action item 2]
- [Action item 3]

I'll keep you posted on the progress and reach out if I have any questions.

Thanks again for your time!

Best,
[Your Name]`
    },
    {
      id: 4,
      title: 'Meeting Reminder',
      category: 'scheduling',
      content: `Hi [Name],

This is a friendly reminder about our upcoming meeting:

📅 Date: [Date]
🕐 Time: [Time]
📍 Location: [Location/Platform]
📋 Agenda: [Brief agenda summary]

Please let me know if you need to reschedule or if you have any questions about the meeting.

Looking forward to our discussion!

Best regards,
[Your Name]`
    },
    {
      id: 5,
      title: 'Pre-Meeting Preparation',
      category: 'meeting-prep',
      content: `Hi [Name],

I wanted to send you some information ahead of our meeting tomorrow to help us make the most of our time together.

📋 Meeting Agenda:
- [Topic 1]
- [Topic 2]
- [Topic 3]

📄 Materials to Review:
- [Document/Resource 1]
- [Document/Resource 2]

Please come prepared with any questions or updates you'd like to discuss.

See you tomorrow!

Best,
[Your Name]`
    },
    {
      id: 6,
      title: 'Meeting Summary & Next Steps',
      category: 'closing',
      content: `Hi [Name],

Thank you for a productive meeting today. Here's a summary of what we discussed and the next steps:

📋 Meeting Summary:
- [Key point 1]
- [Key point 2]
- [Key point 3]

✅ Action Items:
- [Action item 1] - Due: [Date] - Owner: [Name]
- [Action item 2] - Due: [Date] - Owner: [Name]
- [Action item 3] - Due: [Date] - Owner: [Name]

📅 Next Meeting: [Date/Time]

Please let me know if I missed anything or if you have any questions.

Thanks for your time!

Best regards,
[Your Name]`
    }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const copyToClipboard = async (content, title) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopySuccess(`"${title}" copied to clipboard!`);
      setTimeout(() => setCopySuccess(''), 3000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="meeting-templates-page">
      <div className="templates-header">
        <h1>Meeting Templates</h1>
        <p>Quick templates you can copy for common meeting scenarios</p>
      </div>

      <div className="templates-content">
        <div className="templates-sidebar">
          <h3>Categories</h3>
          <div className="category-selector">
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              {templateCategories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <FaChevronDown className="select-icon" />
          </div>
        </div>

        <div className="templates-main">
          {copySuccess && (
            <div className="copy-success">
              {copySuccess}
            </div>
          )}
          
          <div className="templates-grid">
            {filteredTemplates.map(template => (
              <div key={template.id} className="template-card">
                <div className="template-header">
                  <h3>{template.title}</h3>
                  <button 
                    className="copy-btn"
                    onClick={() => copyToClipboard(template.content, template.title)}
                  >
                    <FaCopy className="copy-icon" />
                    Copy
                  </button>
                </div>
                <div className="template-content">
                  <p>{template.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingTemplates;
