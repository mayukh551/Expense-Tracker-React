import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './NotificationCenter.css';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const notifications = [
    {
      id: 1,
      type: 'warning',
      title: 'Budget Alert',
      message: 'You\'ve spent 85% of your monthly budget',
      time: '2 minutes ago',
      unread: true
    },
    {
      id: 2,
      type: 'success',
      title: 'Goal Achieved',
      message: 'Congratulations! You\'ve saved ₹10,000 this month',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      type: 'info',
      title: 'Weekly Report',
      message: 'Your weekly expense report is ready',
      time: '2 hours ago',
      unread: false
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="notification-overlay" onClick={onClose} />
          <motion.div 
            className="notification-center"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="notification-header">
              <h3>Notifications</h3>
              <button className="mark-all-read">Mark all as read</button>
            </div>
            
            <div className="notification-list">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`notification-item ${notification.unread ? 'unread' : ''}`}
                >
                  <div className={`notification-icon ${notification.type}`}>
                    {notification.type === 'warning' && '⚠️'}
                    {notification.type === 'success' && '✅'}
                    {notification.type === 'info' && 'ℹ️'}
                  </div>
                  <div className="notification-content">
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                  {notification.unread && <div className="unread-indicator" />}
                </div>
              ))}
            </div>
            
            <div className="notification-footer">
              <button className="view-all">View all notifications</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationCenter;