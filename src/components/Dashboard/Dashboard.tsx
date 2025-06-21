import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import StatsWidget from './widgets/StatsWidget';
import ExpenseChart from './widgets/ExpenseChart';
import CategoryBreakdown from './widgets/CategoryBreakdown';
import BudgetComparison from './widgets/BudgetComparison';
import TopCategories from './widgets/TopCategories';
import ExpenseForecast from './widgets/ExpenseForecast';
import QuickActions from './widgets/QuickActions';
import RecentTransactions from './widgets/RecentTransactions';
import { useTheme } from '../contexts/ThemeContext';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('30d');
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  return (
    <div className={`dashboard-container ${theme}`}>
      <DashboardHeader 
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        selectedDateRange={selectedDateRange}
        onDateRangeChange={setSelectedDateRange}
      />
      
      <div className="dashboard-layout">
        <Sidebar collapsed={sidebarCollapsed} />
        
        <motion.main 
          className={`dashboard-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="dashboard-grid">
            {/* Top Row - Key Stats */}
            <motion.div className="stats-row" variants={cardVariants}>
              <StatsWidget
                title="Total Spent"
                value="₹45,230"
                change="+12.5%"
                trend="up"
                icon="💰"
                isLoading={isLoading}
              />
              <StatsWidget
                title="Budget Remaining"
                value="₹14,770"
                change="-8.2%"
                trend="down"
                icon="🎯"
                isLoading={isLoading}
              />
              <StatsWidget
                title="Transactions"
                value="127"
                change="+5.1%"
                trend="up"
                icon="📊"
                isLoading={isLoading}
              />
              <StatsWidget
                title="Avg. Daily"
                value="₹1,507"
                change="+2.3%"
                trend="up"
                icon="📈"
                isLoading={isLoading}
              />
            </motion.div>

            {/* Second Row - Charts */}
            <motion.div className="charts-row" variants={cardVariants}>
              <ExpenseChart 
                dateRange={selectedDateRange}
                isLoading={isLoading}
              />
              <CategoryBreakdown 
                dateRange={selectedDateRange}
                isLoading={isLoading}
              />
            </motion.div>

            {/* Third Row - Insights */}
            <motion.div className="insights-row" variants={cardVariants}>
              <BudgetComparison 
                dateRange={selectedDateRange}
                isLoading={isLoading}
              />
              <TopCategories 
                dateRange={selectedDateRange}
                isLoading={isLoading}
              />
              <ExpenseForecast 
                dateRange={selectedDateRange}
                isLoading={isLoading}
              />
            </motion.div>

            {/* Fourth Row - Actions & Transactions */}
            <motion.div className="actions-row" variants={cardVariants}>
              <QuickActions />
              <RecentTransactions 
                dateRange={selectedDateRange}
                isLoading={isLoading}
              />
            </motion.div>
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default Dashboard;