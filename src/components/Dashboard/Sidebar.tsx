import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
    { id: 'expenses', label: 'Expenses', icon: '💰', path: '/expenses' },
    { id: 'budget', label: 'Budget', icon: '🎯', path: '/budget' },
    { id: 'analytics', label: 'Analytics', icon: '📈', path: '/analytics' },
    { id: 'categories', label: 'Categories', icon: '🏷️', path: '/categories' },
    { id: 'reports', label: 'Reports', icon: '📋', path: '/reports' },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' },
  ];

  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 }
  };

  const itemVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -20 }
  };

  return (
    <motion.aside 
      className="sidebar"
      variants={sidebarVariants}
      animate={collapsed ? 'collapsed' : 'expanded'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">💎</span>
          <motion.span 
            className="logo-text"
            variants={itemVariants}
            animate={collapsed ? 'collapsed' : 'expanded'}
            transition={{ duration: 0.2, delay: collapsed ? 0 : 0.1 }}
          >
            CoinWise
          </motion.span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => navigate(item.path)}
                title={collapsed ? item.label : undefined}
              >
                <span className="nav-icon">{item.icon}</span>
                <motion.span 
                  className="nav-label"
                  variants={itemVariants}
                  animate={collapsed ? 'collapsed' : 'expanded'}
                  transition={{ duration: 0.2, delay: collapsed ? 0 : 0.1 }}
                >
                  {item.label}
                </motion.span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="upgrade-card">
          <div className="upgrade-icon">✨</div>
          <motion.div 
            className="upgrade-content"
            variants={itemVariants}
            animate={collapsed ? 'collapsed' : 'expanded'}
            transition={{ duration: 0.2, delay: collapsed ? 0 : 0.1 }}
          >
            <h4>Upgrade to Pro</h4>
            <p>Unlock advanced features and insights</p>
            <button className="upgrade-btn">Upgrade</button>
          </motion.div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;