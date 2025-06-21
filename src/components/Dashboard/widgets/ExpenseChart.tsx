import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import './ExpenseChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ExpenseChartProps {
  dateRange: string;
  isLoading?: boolean;
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ dateRange, isLoading = false }) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    // Simulate data fetching based on date range
    const generateData = () => {
      const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90;
      const labels = Array.from({ length: days }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (days - 1 - i));
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      });

      const data = Array.from({ length: days }, () => 
        Math.floor(Math.random() * 3000) + 500
      );

      return {
        labels,
        datasets: [
          {
            label: 'Daily Expenses',
            data,
            borderColor: 'rgb(37, 99, 235)',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: 'rgb(37, 99, 235)',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
          }
        ]
      };
    };

    const timer = setTimeout(() => {
      setChartData(generateData());
    }, isLoading ? 1000 : 0);

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
        borderColor: 'rgba(37, 99, 235, 0.3)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context: any) => `₹${context.parsed.y.toLocaleString()}`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: 'var(--text-secondary)',
          font: {
            size: 12,
          }
        }
      },
      y: {
        grid: {
          color: 'var(--border-color)',
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: 'var(--text-secondary)',
          font: {
            size: 12,
          },
          callback: (value: any) => `₹${value.toLocaleString()}`
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  if (isLoading || !chartData) {
    return (
      <div className="expense-chart-widget loading">
        <div className="widget-header">
          <div className="skeleton skeleton-text large"></div>
          <div className="skeleton skeleton-text small"></div>
        </div>
        <div className="chart-container">
          <div className="skeleton chart-skeleton"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="expense-chart-widget dashboard-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="widget-header">
        <div>
          <h3>Expense Trends</h3>
          <p>Daily spending patterns over time</p>
        </div>
        <div className="chart-stats">
          <div className="stat-item">
            <span className="stat-label">Avg Daily</span>
            <span className="stat-value">₹1,507</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Peak Day</span>
            <span className="stat-value">₹3,240</span>
          </div>
        </div>
      </div>
      
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
    </motion.div>
  );
};

export default ExpenseChart;