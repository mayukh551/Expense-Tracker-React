import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './DateRangeSelector.css';

interface DateRangeSelectorProps {
  selected: string;
  onChange: (range: string) => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const ranges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: '1y', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  const selectedRange = ranges.find(r => r.value === selected);

  return (
    <div className="date-range-selector">
      <button 
        className="range-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedRange?.label}</span>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none"
          className={`chevron ${isOpen ? 'open' : ''}`}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="dropdown-overlay" onClick={() => setIsOpen(false)} />
            <motion.div 
              className="range-dropdown"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {ranges.map((range) => (
                <button
                  key={range.value}
                  className={`range-option ${selected === range.value ? 'active' : ''}`}
                  onClick={() => {
                    onChange(range.value);
                    setIsOpen(false);
                  }}
                >
                  {range.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DateRangeSelector;