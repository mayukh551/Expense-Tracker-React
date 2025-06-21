import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './RecentTransactions.css';

interface RecentTransactionsProps {
  dateRange: string;
  isLoading?: boolean;
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ dateRange, isLoading = false }) => {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const generateTransactions = () => {
      const categories = [
        { name: 'Food & Dining', icon: '🍽️', color: '#ef4444' },
        { name: 'Transportation', icon: '🚗', color: '#f97316' },
        { name: 'Shopping', icon: '🛍️', color: '#eab308' },
        { name: 'Entertainment', icon: '🎬', color: '#22c55e' },
        { name: 'Bills & Utilities', icon: '⚡', color: '#3b82f6' },
        { name: 'Healthcare', icon: '🏥', color: '#8b5cf6' },
      ];

      const merchants = [
        'Starbucks', 'Uber', 'Amazon', 'Netflix', 'Spotify', 'McDonald\'s',
        'Target', 'Walmart', 'Apple Store', 'Gas Station', 'Pharmacy', 'Restaurant'
      ];

      return Array.from({ length: 8 }, (_, i) => {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const merchant = merchants[Math.floor(Math.random() * merchants.length)];
        const amount = Math.floor(Math.random() * 5000) + 100;
        const date = new Date();
        date.setDate(date.getDate() - i);

        return {
          id: `txn_${i}`,
          merchant,
          category: category.name,
          categoryIcon: category.icon,
          categoryColor: category.color,
          amount,
          date: date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          status: Math.random() > 0.1 ? 'completed' : 'pending'
        };
      });
    };

    const timer = setTimeout(() => {
      setTransactions(generateTransactions());
    }, isLoading ? 800 : 0);

    return () => clearTimeout(timer);
  }, [dateRange, isLoading]);

  if (isLoading || transactions.length === 0) {
    return (
      <div className="recent-transactions-widget loading">
        <div className="widget-header">
          <div className="skeleton skeleton-text large"></div>
          <div className="skeleton skeleton-text small"></div>
        </div>
        <div className="transactions-list">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="skeleton-transaction">
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
      className="recent-transactions-widget dashboard-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.6 }}
    >
      <div className="widget-header">
        <div>
          <h3>Recent Transactions</h3>
          <p>Latest expense activities</p>
        </div>
        <button className="view-all-btn">View All</button>
      </div>
      
      <div className="transactions-list">
        {transactions.map((transaction, index) => (
          <motion.div 
            key={transaction.id}
            className="transaction-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
            whileHover={{ x: 4 }}
          >
            <div 
              className="transaction-icon"
              style={{ backgroundColor: `${transaction.categoryColor}15` }}
            >
              <span>{transaction.categoryIcon}</span>
            </div>
            
            <div className="transaction-details">
              <div className="transaction-main">
                <span className="merchant-name">{transaction.merchant}</span>
                <span className="transaction-amount">-₹{transaction.amount.toLocaleString()}</span>
              </div>
              <div className="transaction-meta">
                <span className="transaction-category">{transaction.category}</span>
                <div className="transaction-status">
                  <span className={`status-indicator ${transaction.status}`}></span>
                  <span className="transaction-date">{transaction.date}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="widget-footer">
        <button className="add-transaction-btn">
          <span>+</span>
          Add Transaction
        </button>
      </div>
    </motion.div>
  );
};

export default RecentTransactions;