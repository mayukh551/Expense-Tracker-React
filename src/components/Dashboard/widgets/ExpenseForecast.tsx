import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import './ExpenseForecast.css';

interface ExpenseForecastProps {
  dateRange: string;
  isLoading?: boolean;
}

const ExpenseForecast: React.FC<ExpenseForecastProps> = ({ dateRange, isLoading = false }) => {
  const [forecastData, setForecastData] = useState<any>(null);

  useEffect(() => {
    const generateData = () => {
      const historicalData = Array.from({ length: 12 }, (_, i) => ({
        month: new Date(2024, i).toLocaleDateString('en-US', { month: 'short' }),
        actual: Math.floor(Math.random() * 20000) + 30000,
        forecast: i >= 9 ? Math.floor(Math.random() * 15000) + 35000 : null
      }));

      return {
        labels: historicalData.map(d => d.month),
        datasets: [
          {
            label: 'Actual Expenses',
            data: historicalData.map(d => d.actual),
            borderColor: 'rgb(37, 99, 235)',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            pointBackgroundColor: 'rgb(37, 99, 235)',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
          },
          {
            label: 'Forecast',
            data: historicalData.map(d => d.forecast),
            borderColor: 'rgb(14, 165, 233)',
            backgroundColor: 'rgba(14, 165, 233, 0.1)',
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false,
            tension: 0.4,
            pointBackgroundColor: 'rgb(14, 165, 233)',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
          }
        ],
        insights: {
          nextMonth: 42500,
          trend: 'increasing',
          confidence: 85,
          recommendation: 'Consider reducing discretionary spending'
        }
      };
    };

    const timer = setTimeout(() => {
      setForecastData(generateData());
    }, isLoading ? 1000 : 0);

    return () => clearTimeout(timer);
  }, [dateRange, isLoading]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            family: 'SF Pro Display'
          },
          color: 'var(--text-secondary)'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(37, 99, 235, 0.3)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ₹${context.parsed.y?.toLocaleString() || 'N/A'}`
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
            size: 11,
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
            size: 11,
          },
          callback: (value: any) => `₹${(value / 1000).toFixed(0)}K`
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  if (isLoading || !forecastData) {
    return (
      <div className="expense-forecast-widget loading">
        <div className="widget-header">
          <div className="skeleton skeleton-text large"></div>
          <div className="skeleton skeleton-text small"></div>
        </div>
        <div className="forecast-chart">
          <div className="skeleton chart-skeleton"></div>
        </div>
        <div className="forecast-insights">
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text small"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="expense-forecast-widget dashboard-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
    >
      <div className="widget-header">
        <div>
          <h3>Expense Forecast</h3>
          <p>Predicted spending based on historical data</p>
        </div>
        <div className="confidence-badge">
          {forecastData.insights.confidence}% confidence
        </div>
      </div>
      
      <div className="forecast-chart">
        <Line data={forecastData} options={options} />
      </div>
      
      <div className="forecast-insights">
        <div className="insight-item">
          <span className="insight-label">Next Month Prediction</span>
          <span className="insight-value">₹{forecastData.insights.nextMonth.toLocaleString()}</span>
        </div>
        
        <div className="insight-item">
          <span className="insight-label">Trend</span>
          <span className={`trend-badge ${forecastData.insights.trend}`}>
            {forecastData.insights.trend === 'increasing' ? '📈' : '📉'} 
            {forecastData.insights.trend}
          </span>
        </div>
        
        <div className="recommendation">
          <span className="recommendation-icon">💡</span>
          <span className="recommendation-text">{forecastData.insights.recommendation}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ExpenseForecast;