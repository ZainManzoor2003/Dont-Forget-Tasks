import React from 'react';

const Meetings = () => {
  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px var(--shadow-light)' }}>
          <div style={{ padding: 12, borderBottom: '1px solid var(--border-color)', fontWeight: 700 }}>Google Meet</div>
          <iframe
            title="Google Meet"
            src="https://meet.google.com/"
            style={{ width: '100%', height: 380, border: '0' }}
            allow="camera; microphone; display-capture; clipboard-write;"
          />
        </div>
        <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px var(--shadow-light)' }}>
          <div style={{ padding: 12, borderBottom: '1px solid var(--border-color)', fontWeight: 700 }}>Zoom</div>
          <iframe
            title="Zoom"
            src="https://zoom.us/"
            style={{ width: '100%', height: 380, border: '0' }}
            allow="camera; microphone; display-capture; clipboard-write;"
          />
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: 12, boxShadow: '0 2px 8px var(--shadow-light)' }}>
        <div style={{ padding: 16, borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ margin: 0 }}>Meeting Tasks</h2>
        </div>
        <div style={{ padding: 16, lineHeight: 1.6, maxHeight: 300, overflowY: 'auto' }}>
          {`Don’t Forget What To Say Page
Hey friend—here are copy-and-paste templates you can use right away, so you don’t forget what to say.

1) Professional Follow-Up (4)

1.1 Gentle Check-In
Hello [Name], I’m circling back on my note regarding [topic] to be sure it reached you and to keep our momentum. If there’s context I can add or a different format that would be easier to review, I’m happy to provide it. I want this to be simple, clear, and useful for you, and I’m available to align on next steps whenever it suits your schedule.
When you have a moment, a quick reply or a suggested time works perfectly.
Sincerely,
[Your Name]

1.2 Polite Nudge With Help Offered
Hi [Name], just following up on [topic] in case it slipped down the inbox. I can resend the materials, summarize the decision points, or jump on a brief call—whichever helps you evaluate this efficiently. My aim is to support your process, not add to your workload.
Let me know what would make this easiest on your end.
Best regards,
[Your Name]

1.3 Clear Path Forward
Hello [Name], I wanted to reconnect on [topic] and confirm the best path forward. If the answer is yes, I’ll prepare [deliverable/next step]; if no, I’ll close the loop so nothing lingers. If you prefer to revisit later, I can set a reminder and follow up then.
A quick “yes,” “no,” or “later” is perfect.
Respectfully,
[Your Name]

1.4 Recap + Decision Prompt
Hi [Name], brief recap from my last message on [date]: we discussed [point A], [point B], and a possible timeline of [date range]. I’m ready to proceed exactly as outlined or adjust to fit your priorities. I value clarity and want to ensure this stays streamlined for you.
Shall we confirm the next step?
Kind regards,
[Your Name]


2) Meeting Request (4)

2.1 Formal Scheduling Request
Dear [Name], I’d like to schedule a brief meeting to discuss [topic] and align on [decision/outcome]. I propose [two date/time options] and can adapt to your availability if those don’t work. I’ll keep the agenda concise and share it in advance so we’re focused and efficient.
Please let me know your preferred time or suggest one that suits you.
Sincerely,
[Your Name]

2.2 Friendly, Efficient Ask
Hello [Name], I’d like to schedule a short meeting to review [topic] and ensure we’re aligned on the next steps. I’ll provide a clear agenda, outline key options, and share any supporting materials in advance so our time together is focused and productive. I’m happy to connect through [platform] or whichever method you prefer. Could you let me know a time this week that works best for you?
Best regards,
[Your Name]

2.3 Executive-Style Invite
Hi [Name], to accelerate [goal/outcome], I recommend a focused touchpoint on [topic]. I can meet [option A] or [option B], and I’ll circulate a one-page brief beforehand to maximize the value of our time.
Kindly share the slot that aligns with your calendar.
Respectfully,
[Your Name]`
            .split('\n')
            .map((line, idx) => {
              const trimmed = line.trim();
              const isTitle = idx === 0;
              const isIntro = idx === 1 && trimmed.length > 0;
              const isSectionHeader = /^\d\)/.test(trimmed);
              const isSubHeader = /^\d+\.\d/.test(trimmed);
              const isEmpty = trimmed === '';
              if (isEmpty) return <div key={idx} style={{ height: 8 }} />;
              return (
                <div key={idx} style={{
                  fontWeight: isTitle || isSectionHeader || isSubHeader ? 700 : 400,
                  whiteSpace: 'pre-wrap',
                  textAlign: isTitle || isIntro ? 'center' : 'left',
                  marginTop: isSectionHeader ? 12 : isSubHeader ? 8 : 0
                }}>
                  {line}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Meetings;


