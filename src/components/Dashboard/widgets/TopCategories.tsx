import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './TopCategories.css';

interface TopCategoriesProps {
  dateRange: string;
  isLoading?: boolean;
}

const TopCategories: React.FC<TopCategoriesProps> = ({ dateRange, isLoading = false }) => {
  const [categoriesData, setCategoriesData] = useState<any>(null);

  useEffect(() => {
    const generateData = () => {
      return [
        { 
          name: 'Shopping', 
          amount: 15600, 
          change: 12.5, 
          trend: 'up',
          icon: '🛍️',
          transactions: 23
        },
        { 
          name: 'Food & Dining', 
          amount: 12500, 
          change: -5.2, 
          trend: 'down',
          icon: '🍽️',
          transactions: 45
        },
        { 
          name: 'Transportation', 
          amount: 8200, 
          change: 8.1, 
          trend: 'up',
          icon: '🚗',
          transactions: 18
        },
        { 
          name: 'Bills & Utilities', 
          amount: 6900, 
          change: 2.3, 
          trend: 'up',
          icon: '⚡',
          transactions: 8
        },
        { 
          name: 'Entertainment', 
          amount: 4800, 
          change: -15.6, 
          trend: 'down',
          icon: '🎬',
          transactions: 12
        }
      ];
    };

    const timer = setTimeout(() => {
      setCategoriesData(generateData());
    }, isLoading ? 600 : 0);

    return () => clearTimeout(timer);
  }, [dateRange, isLoading]);

  if (isLoading || !categoriesData) {
    return (
      <div className="top-categories-widget loading">
        <div className="widget-header">
          <div className="skeleton skeleton-text large"></div>
          <div className="skeleton skeleton-text small"></div>
        </div>
        <div className="categories-list">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="skeleton-category-item">
              <div className="skeleton skeleton-icon"></div>
              <div className="skeleton-content">
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text small"></div>
              </div>
              <div className="skeleton skeleton-text small"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="top-categories-widget dashboard-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <div className="widget-header">
        <div>
          <h3>Top Categories</h3>
          <p>Highest spending categories</p>
        </div>
        <button className="view-all-btn">View All</button>
      </div>
      
      <div className="categories-list">
        {categoriesData.map((category: any, index: number) => (
          <motion.div 
            key={category.name}
            className="category-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
            whileHover={{ x: 4 }}
          >
            <div className="category-icon">
              <span>{category.icon}</span>
            </div>
            
            <div className="category-details">
              <div className="category-main">
                <span className="category-name">{category.name}</span>
                <span className="category-amount">₹{category.amount.toLocaleString()}</span>
              </div>
              <div className="category-meta">
                <span className="transaction-count">{category.transactions} transactions</span>
                <div className={`change-indicator ${category.trend}`}>
                  <span className="change-icon">
                    {category.trend === 'up' ? '↗' : '↘'}
                  </span>
                  <span className="change-value">{Math.abs(category.change)}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TopCategories;