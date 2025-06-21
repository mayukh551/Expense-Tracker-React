import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './BudgetComparison.css';

interface BudgetComparisonProps {
  dateRange: string;
  isLoading?: boolean;
}

const BudgetComparison: React.FC<BudgetComparisonProps> = ({ dateRange, isLoading = false }) => {
  const [budgetData, setBudgetData] = useState<any>(null);

  useEffect(() => {
    const generateData = () => {
      return {
        monthly: {
          budget: 60000,
          spent: 45230,
          remaining: 14770,
          percentage: 75.4
        },
        categories: [
          { name: 'Food & Dining', budget: 15000, spent: 12500, percentage: 83.3 },
          { name: 'Transportation', budget: 10000, spent: 8200, percentage: 82.0 },
          { name: 'Shopping', budget: 20000, spent: 15600, percentage: 78.0 },
          { name: 'Entertainment', budget: 8000, spent: 4800, percentage: 60.0 },
          { name: 'Bills & Utilities', budget: 7000, spent: 6900, percentage: 98.6 },
        ]
      };
    };

    const timer = setTimeout(() => {
      setBudgetData(generateData());
    }, isLoading ? 800 : 0);

    return () => clearTimeout(timer);
  }, [dateRange, isLoading]);

  if (isLoading || !budgetData) {
    return (
      <div className="budget-comparison-widget loading">
        <div className="widget-header">
          <div className="skeleton skeleton-text large"></div>
          <div className="skeleton skeleton-text small"></div>
        </div>
        <div className="budget-overview">
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton progress-skeleton"></div>
        </div>
        <div className="category-budgets">
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton-budget-item">
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton progress-skeleton"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'var(--error-color)';
    if (percentage >= 75) return 'var(--warning-color)';
    return 'var(--success-color)';
  };

  return (
    <motion.div 
      className="budget-comparison-widget dashboard-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="widget-header">
        <div>
          <h3>Budget vs Actual</h3>
          <p>Monthly budget tracking</p>
        </div>
      </div>
      
      <div className="budget-overview">
        <div className="budget-summary">
          <div className="budget-amounts">
            <span className="spent-amount">₹{budgetData.monthly.spent.toLocaleString()}</span>
            <span className="budget-total">of ₹{budgetData.monthly.budget.toLocaleString()}</span>
          </div>
          <div className="budget-status">
            <span className={`status-text ${budgetData.monthly.percentage >= 90 ? 'danger' : budgetData.monthly.percentage >= 75 ? 'warning' : 'safe'}`}>
              {budgetData.monthly.percentage >= 90 ? 'Over Budget' : 
               budgetData.monthly.percentage >= 75 ? 'Close to Limit' : 'On Track'}
            </span>
            <span className="percentage">{budgetData.monthly.percentage}%</span>
          </div>
        </div>
        
        <div className="progress-container">
          <div className="progress-bar">
            <motion.div 
              className="progress-fill"
              style={{ backgroundColor: getProgressColor(budgetData.monthly.percentage) }}
              initial={{ width: 0 }}
              animate={{ width: `${budgetData.monthly.percentage}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </div>
      </div>
      
      <div className="category-budgets">
        <h4>Category Breakdown</h4>
        {budgetData.categories.map((category: any, index: number) => (
          <motion.div 
            key={category.name}
            className="budget-category"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
          >
            <div className="category-header">
              <span className="category-name">{category.name}</span>
              <span className="category-amounts">
                ₹{category.spent.toLocaleString()} / ₹{category.budget.toLocaleString()}
              </span>
            </div>
            <div className="category-progress">
              <div className="progress-bar small">
                <motion.div 
                  className="progress-fill"
                  style={{ backgroundColor: getProgressColor(category.percentage) }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(category.percentage, 100)}%` }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                />
              </div>
              <span className="category-percentage">{category.percentage}%</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BudgetComparison;