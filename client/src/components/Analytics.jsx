import React, { useMemo } from 'react';
import { FiBarChart3, FiTrendingUp, FiClock, FiCheckCircle, FiAlertTriangle, FiCalendar } from 'react-icons/fi';
import './Analytics.css';

const Analytics = ({ tasks }) => {
  const analytics = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    const overdue = tasks.filter(t => t.status === 'overdue').length;
    
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // Priority distribution
    const priorityStats = {
      low: tasks.filter(t => t.priority === 'low').length,
      medium: tasks.filter(t => t.priority === 'medium').length,
      high: tasks.filter(t => t.priority === 'high').length,
      urgent: tasks.filter(t => t.priority === 'urgent').length
    };
    
    // Due date analysis
    const today = new Date();
    const dueToday = tasks.filter(t => {
      const taskDate = new Date(t.dateTime);
      return taskDate.toDateString() === today.toDateString();
    }).length;
    
    const dueThisWeek = tasks.filter(t => {
      const taskDate = new Date(t.dateTime);
      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      return taskDate >= today && taskDate <= weekFromNow;
    }).length;
    
    const overdueTasks = tasks.filter(t => {
      const taskDate = new Date(t.dateTime);
      return taskDate < today && t.status !== 'completed';
    }).length;
    
    // Average completion time (mock data for demo)
    const avgCompletionTime = 2.5; // days
    
    return {
      total,
      completed,
      inProgress,
      pending,
      overdue,
      completionRate,
      priorityStats,
      dueToday,
      dueThisWeek,
      overdueTasks,
      avgCompletionTime
    };
  }, [tasks]);

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <div className="stat-card" style={{ borderLeftColor: color }}>
      <div className="stat-icon" style={{ backgroundColor: `${color}20` }}>
        {icon}
      </div>
      <div className="stat-content">
        <div className="stat-value">{value}</div>
        <div className="stat-title">{title}</div>
        {subtitle && <div className="stat-subtitle">{subtitle}</div>}
      </div>
    </div>
  );

  const ProgressBar = ({ label, value, max, color }) => (
    <div className="progress-item">
      <div className="progress-label">
        <span>{label}</span>
        <span>{value}/{max}</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ 
            width: `${(value / max) * 100}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <div className="header-content">
          <div className="title-section">
            <span className="title-icon"><FiBarChart3 /></span>
            <h1>Analytics & Reports</h1>
            <p>Track your productivity and task management performance</p>
          </div>
        </div>
      </div>

      <div className="analytics-grid">
        {/* Overview Stats */}
        <div className="analytics-section">
          <h2 className="section-title">Overview</h2>
          <div className="stats-grid">
            <StatCard
              title="Total Tasks"
              value={analytics.total}
              icon={<FiCalendar />}
              color="#3B82F6"
            />
            <StatCard
              title="Completed"
              value={analytics.completed}
              icon={<FiCheckCircle />}
              color="#10B981"
              subtitle={`${analytics.completionRate}% completion rate`}
            />
            <StatCard
              title="In Progress"
              value={analytics.inProgress}
              icon={<FiClock />}
              color="#F59E0B"
            />
            <StatCard
              title="Overdue"
              value={analytics.overdue}
              icon={<FiAlertTriangle />}
              color="#EF4444"
            />
          </div>
        </div>

        {/* Task Status Distribution */}
        <div className="analytics-section">
          <h2 className="section-title">Task Status Distribution</h2>
          <div className="progress-section">
            <ProgressBar
              label="Completed"
              value={analytics.completed}
              max={analytics.total}
              color="#10B981"
            />
            <ProgressBar
              label="In Progress"
              value={analytics.inProgress}
              max={analytics.total}
              color="#F59E0B"
            />
            <ProgressBar
              label="Pending"
              value={analytics.pending}
              max={analytics.total}
              color="#6B7280"
            />
            <ProgressBar
              label="Overdue"
              value={analytics.overdue}
              max={analytics.total}
              color="#EF4444"
            />
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="analytics-section">
          <h2 className="section-title">Priority Distribution</h2>
          <div className="priority-stats">
            <div className="priority-item">
              <div className="priority-label">
                <span className="priority-dot low"></span>
                <span>Low Priority</span>
              </div>
              <div className="priority-value">{analytics.priorityStats.low}</div>
            </div>
            <div className="priority-item">
              <div className="priority-label">
                <span className="priority-dot medium"></span>
                <span>Medium Priority</span>
              </div>
              <div className="priority-value">{analytics.priorityStats.medium}</div>
            </div>
            <div className="priority-item">
              <div className="priority-label">
                <span className="priority-dot high"></span>
                <span>High Priority</span>
              </div>
              <div className="priority-value">{analytics.priorityStats.high}</div>
            </div>
            <div className="priority-item">
              <div className="priority-label">
                <span className="priority-dot urgent"></span>
                <span>Urgent</span>
              </div>
              <div className="priority-value">{analytics.priorityStats.urgent}</div>
            </div>
          </div>
        </div>

        {/* Timeline Stats */}
        <div className="analytics-section">
          <h2 className="section-title">Timeline Analysis</h2>
          <div className="timeline-stats">
            <div className="timeline-item">
              <div className="timeline-icon">
                <FiCalendar />
              </div>
              <div className="timeline-content">
                <div className="timeline-value">{analytics.dueToday}</div>
                <div className="timeline-label">Due Today</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">
                <FiTrendingUp />
              </div>
              <div className="timeline-content">
                <div className="timeline-value">{analytics.dueThisWeek}</div>
                <div className="timeline-label">Due This Week</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">
                <FiAlertTriangle />
              </div>
              <div className="timeline-content">
                <div className="timeline-value">{analytics.overdueTasks}</div>
                <div className="timeline-label">Overdue</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">
                <FiClock />
              </div>
              <div className="timeline-content">
                <div className="timeline-value">{analytics.avgCompletionTime}</div>
                <div className="timeline-label">Avg Completion (days)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="analytics-section">
          <h2 className="section-title">Performance Metrics</h2>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon">
                <FiCheckCircle />
              </div>
              <div className="metric-content">
                <div className="metric-value">{analytics.completionRate}%</div>
                <div className="metric-label">Completion Rate</div>
                <div className="metric-description">
                  {analytics.completionRate >= 80 ? 'Excellent!' : 
                   analytics.completionRate >= 60 ? 'Good progress' : 
                   'Room for improvement'}
                </div>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">
                <FiTrendingUp />
              </div>
              <div className="metric-content">
                <div className="metric-value">{analytics.inProgress}</div>
                <div className="metric-label">Active Tasks</div>
                <div className="metric-description">
                  Currently in progress
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
