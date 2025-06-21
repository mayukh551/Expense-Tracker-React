import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './QuickActions.css';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'add-expense',
      title: 'Add Expense',
      description: 'Record a new expense',
      icon: '💰',
      color: 'var(--primary-color)',
      action: () => navigate('/expenses')
    },
    {
      id: 'set-budget',
      title: 'Set Budget',
      description: 'Update monthly budget',
      icon: '🎯',
      color: 'var(--success-color)',
      action: () => navigate('/budget')
    },
    {
      id: 'view-reports',
      title: 'View Reports',
      description: 'Generate expense reports',
      icon: '📊',
      color: 'var(--accent-color)',
      action: () => navigate('/reports')
    },
    {
      id: 'export-data',
      title: 'Export Data',
      description: 'Download expense data',
      icon: '📥',
      color: 'var(--warning-color)',
      action: () => console.log('Export data')
    }
  ];

  return (
    <motion.div 
      className="quick-actions-widget dashboard-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      <div className="widget-header">
        <div>
          <h3>Quick Actions</h3>
          <p>Common tasks and shortcuts</p>
        </div>
      </div>
      
      <div className="actions-grid">
        {actions.map((action, index) => (
          <motion.button
            key={action.id}
            className="action-card"
            onClick={action.action}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.6 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div 
              className="action-icon"
              style={{ backgroundColor: `${action.color}15`, color: action.color }}
            >
              <span>{action.icon}</span>
            </div>
            <div className="action-content">
              <h4>{action.title}</h4>
              <p>{action.description}</p>
            </div>
            <div className="action-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </motion.button>
        ))}
      </div>
      
      <div className="widget-footer">
        <button className="customize-btn">
          <span>⚙️</span>
          Customize Actions
        </button>
      </div>
    </motion.div>
  );
};

export default QuickActions;