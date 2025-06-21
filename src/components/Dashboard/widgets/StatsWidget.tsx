import React from 'react';
import { motion } from 'framer-motion';
import './StatsWidget.css';

interface StatsWidgetProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
  isLoading?: boolean;
}

const StatsWidget: React.FC<StatsWidgetProps> = ({
  title,
  value,
  change,
  trend,
  icon,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="stats-widget loading">
        <div className="skeleton skeleton-icon"></div>
        <div className="skeleton-content">
          <div className="skeleton skeleton-text small"></div>
          <div className="skeleton skeleton-text large"></div>
          <div className="skeleton skeleton-text small"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="stats-widget"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="widget-header">
        <div className="widget-icon">
          <span>{icon}</span>
        </div>
        <div className={`trend-indicator ${trend}`}>
          {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
          <span>{change}</span>
        </div>
      </div>
      
      <div className="widget-content">
        <h3 className="widget-title">{title}</h3>
        <div className="widget-value">{value}</div>
      </div>
      
      <div className="widget-sparkline">
        <svg width="100%" height="40" viewBox="0 0 100 40">
          <path
            d="M0,30 Q25,10 50,20 T100,15"
            stroke="var(--primary-color)"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M0,30 Q25,10 50,20 T100,15 L100,40 L0,40 Z"
            fill="url(#gradient)"
            opacity="0.1"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--primary-color)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </motion.div>
  );
};

export default StatsWidget;