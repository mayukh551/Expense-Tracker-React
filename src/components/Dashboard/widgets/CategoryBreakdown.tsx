import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './CategoryBreakdown.css';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryBreakdownProps {
  dateRange: string;
  isLoading?: boolean;
}

const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({ dateRange, isLoading = false }) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const generateData = () => {
      const categories = [
        { name: 'Food & Dining', amount: 12500, color: '#ef4444' },
        { name: 'Transportation', amount: 8200, color: '#f97316' },
        { name: 'Shopping', amount: 15600, color: '#eab308' },
        { name: 'Entertainment', amount: 4800, color: '#22c55e' },
        { name: 'Bills & Utilities', amount: 6900, color: '#3b82f6' },
        { name: 'Healthcare', amount: 3200, color: '#8b5cf6' },
      ];

      const total = categories.reduce((sum, cat) => sum + cat.amount, 0);

      return {
        labels: categories.map(cat => cat.name),
        datasets: [{
          data: categories.map(cat => cat.amount),
          backgroundColor: categories.map(cat => cat.color),
          borderWidth: 0,
          hoverBorderWidth: 2,
          hoverBorderColor: '#ffffff',
        }],
        categories: categories.map(cat => ({
          ...cat,
          percentage: ((cat.amount / total) * 100).toFixed(1)
        }))
      };
    };

    const timer = setTimeout(() => {
      setChartData(generateData());
    }, isLoading ? 1200 : 0);

    return () => clearTimeout(timer);
  }, [dateRange, isLoading]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context: any) => {
            const percentage = ((context.parsed / context.dataset.data.reduce((a: number, b: number) => a + b, 0)) * 100).toFixed(1);
            return `₹${context.parsed.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '65%',
  };

  if (isLoading || !chartData) {
    return (
      <div className="category-breakdown-widget loading">
        <div className="widget-header">
          <div className="skeleton skeleton-text large"></div>
          <div className="skeleton skeleton-text small"></div>
        </div>
        <div className="breakdown-content">
          <div className="skeleton chart-skeleton-circle"></div>
          <div className="category-list">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="skeleton-category">
                <div className="skeleton skeleton-dot"></div>
                <div className="skeleton skeleton-text"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="category-breakdown-widget dashboard-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="widget-header">
        <div>
          <h3>Category Breakdown</h3>
          <p>Spending by category</p>
        </div>
      </div>
      
      <div className="breakdown-content">
        <div className="chart-container">
          <Doughnut data={chartData} options={options} />
          <div className="chart-center">
            <span className="total-label">Total</span>
            <span className="total-amount">₹51.2K</span>
          </div>
        </div>
        
        <div className="category-list">
          {chartData.categories.map((category: any, index: number) => (
            <motion.div 
              key={category.name}
              className="category-item"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
            >
              <div 
                className="category-color" 
                style={{ backgroundColor: category.color }}
              ></div>
              <div className="category-info">
                <span className="category-name">{category.name}</span>
                <span className="category-amount">₹{category.amount.toLocaleString()}</span>
              </div>
              <span className="category-percentage">{category.percentage}%</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryBreakdown;