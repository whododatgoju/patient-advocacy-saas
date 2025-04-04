import React, { useMemo, memo } from 'react';
import { Symptom } from './SymptomTracker';
import styles from './SymptomPatternVisualizer.module.css';

interface PatternVisualizerProps {
  symptoms: Symptom[];
  timeRange?: 'week' | 'month' | '3months' | 'all';
  className?: string;
}

interface SymptomGroup {
  name: string;
  data: { date: Date; severity: number }[];
}

// Adjust these colors for different severities
const SEVERITY_COLORS = [
  '#E8F5E9', // 0-1: Very light green
  '#C8E6C9', // 2-3: Light green
  '#FFECB3', // 4-5: Light yellow
  '#FFCC80', // 6-7: Light orange
  '#FFAB91', // 8-9: Light red
  '#EF9A9A', // 10: Red
];

// Memoized helper function to get color based on severity
const getSeverityColor = (severity: number): string => {
  const colorIndex = Math.min(Math.floor(severity / 2), 5);
  return SEVERITY_COLORS[colorIndex];
};

// Memoized date formatter - reduces string creation costs
const formatDate = (date: Date): string => {
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
};

// Memoized TimeRangeSelector component
const TimeRangeSelector = memo(({ 
  timeRange, 
  onSelectTimeRange 
}: { 
  timeRange: 'week' | 'month' | '3months' | 'all',
  onSelectTimeRange: (range: 'week' | 'month' | '3months' | 'all') => void
}) => {
  return (
    <div className={styles.timeRangeSelector}>
      <button 
        className={`${styles.timeRangeButton} ${timeRange === 'week' ? styles.active : ''}`}
        onClick={() => onSelectTimeRange('week')}
      >
        Last Week
      </button>
      <button 
        className={`${styles.timeRangeButton} ${timeRange === 'month' ? styles.active : ''}`}
        onClick={() => onSelectTimeRange('month')}
      >
        Last Month
      </button>
      <button 
        className={`${styles.timeRangeButton} ${timeRange === '3months' ? styles.active : ''}`}
        onClick={() => onSelectTimeRange('3months')}
      >
        3 Months
      </button>
      <button 
        className={`${styles.timeRangeButton} ${timeRange === 'all' ? styles.active : ''}`}
        onClick={() => onSelectTimeRange('all')}
      >
        All Time
      </button>
    </div>
  );
});

TimeRangeSelector.displayName = 'TimeRangeSelector';

// Memoized PatternChart component
const PatternChart = memo(({ 
  symptomGroup, 
  startDate, 
  endDate,
  dateLabels
}: { 
  symptomGroup: SymptomGroup, 
  startDate: Date, 
  endDate: Date,
  dateLabels: string[] 
}) => {
  const totalTimeRange = endDate.getTime() - startDate.getTime();
  
  return (
    <div className={styles.symptomPattern} key={symptomGroup.name}>
      <div className={styles.symptomName}>{symptomGroup.name}</div>
      <div className={styles.symptomChart}>
        {symptomGroup.data.map((point, index) => {
          // Calculate position as percentage of total time range
          const position = ((point.date.getTime() - startDate.getTime()) / totalTimeRange) * 100;
          
          return (
            <div 
              key={index}
              className={styles.dataPoint}
              style={{ 
                left: `${position}%`, 
                backgroundColor: getSeverityColor(point.severity),
                width: `${Math.max(point.severity * 3, 10)}px`,
                height: `${Math.max(point.severity * 3, 10)}px`,
              }}
              title={`${symptomGroup.name}: ${point.severity}/10 on ${point.date.toLocaleDateString()}`}
            />
          );
        })}
        <div className={styles.timeline}>
          {dateLabels.map((label, index) => (
            <div 
              key={index} 
              className={styles.timeLabel}
              style={{ left: `${(index / (dateLabels.length - 1)) * 100}%` }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

PatternChart.displayName = 'PatternChart';

const SymptomPatternVisualizer: React.FC<PatternVisualizerProps> = ({ 
  symptoms, 
  timeRange = 'month',
  className = '' 
}) => {
  // Filter symptoms based on time range - memoized to prevent recalculation on re-renders
  const filteredSymptoms = useMemo(() => {
    if (timeRange === 'all') return symptoms;
    
    const now = new Date();
    const cutoffDate = new Date();
    
    switch (timeRange) {
      case 'week':
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case '3months':
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
    }
    
    return symptoms.filter(symptom => new Date(symptom.timestamp) >= cutoffDate);
  }, [symptoms, timeRange]);
  
  // Group symptoms by name - memoized for performance
  const groupedSymptoms = useMemo(() => {
    const groups: Record<string, SymptomGroup> = {};
    
    filteredSymptoms.forEach(symptom => {
      if (!groups[symptom.name]) {
        groups[symptom.name] = {
          name: symptom.name,
          data: []
        };
      }
      
      groups[symptom.name].data.push({
        date: new Date(symptom.timestamp),
        severity: symptom.severity
      });
    });
    
    // Sort data points by date
    Object.values(groups).forEach(group => {
      group.data.sort((a, b) => a.date.getTime() - b.date.getTime());
    });
    
    return Object.values(groups);
  }, [filteredSymptoms]);
  
  // Calculate date range for the chart - memoized
  const { startDate, endDate, dateLabels } = useMemo(() => {
    if (filteredSymptoms.length === 0) {
      const now = new Date();
      const start = new Date();
      
      switch (timeRange) {
        case 'week':
          start.setDate(now.getDate() - 7);
          break;
        case 'month':
          start.setMonth(now.getMonth() - 1);
          break;
        case '3months':
          start.setMonth(now.getMonth() - 3);
          break;
        case 'all':
          start.setMonth(now.getMonth() - 1); // Default to 1 month if no data
          break;
      }
      
      return { startDate: start, endDate: now, dateLabels: [] };
    }
    
    // Find min and max dates
    let minDate = new Date(filteredSymptoms[0].timestamp);
    let maxDate = new Date(filteredSymptoms[0].timestamp);
    
    filteredSymptoms.forEach(symptom => {
      const date = new Date(symptom.timestamp);
      if (date < minDate) minDate = date;
      if (date > maxDate) maxDate = date;
    });
    
    // Ensure min date is at least one day before to provide some padding
    minDate.setDate(minDate.getDate() - 1);
    // Add one day to max date for padding
    maxDate.setDate(maxDate.getDate() + 1);
    
    // Generate labels for the timeline based on the date range
    const labels: string[] = [];
    const range = maxDate.getTime() - minDate.getTime();
    const dayInMs = 24 * 60 * 60 * 1000;
    
    // Choose an appropriate interval for labels based on the time range
    let interval = dayInMs; // Default to daily
    
    if (range > 30 * dayInMs) {
      interval = 7 * dayInMs; // Weekly if range > 30 days
    }
    if (range > 90 * dayInMs) {
      interval = 15 * dayInMs; // Bi-weekly if range > 90 days
    }
    if (range > 180 * dayInMs) {
      interval = 30 * dayInMs; // Monthly if range > 180 days
    }
    
    const numLabels = Math.min(Math.floor(range / interval) + 1, 10);
    const labelInterval = range / (numLabels - 1);
    
    for (let i = 0; i < numLabels; i++) {
      const labelDate = new Date(minDate.getTime() + i * labelInterval);
      labels.push(formatDate(labelDate));
    }
    
    return { startDate: minDate, endDate: maxDate, dateLabels: labels };
  }, [filteredSymptoms, timeRange]);
  
  // No data visualization
  if (filteredSymptoms.length === 0) {
    return (
      <div className={`${styles.patternVisualizer} ${className}`}>
        <h3 className={styles.title}>Symptom Patterns</h3>
        <p className={styles.noData}>No symptom data available for the selected time range.</p>
      </div>
    );
  }
  
  return (
    <div className={`${styles.patternVisualizer} ${className}`}>
      <h3 className={styles.title}>Symptom Patterns</h3>
      
      {/* Time range selector */}
      <TimeRangeSelector timeRange={timeRange} onSelectTimeRange={(range) => window.location.search = `?timeRange=${range}`} />
      
      {/* Symptom patterns */}
      <div className={styles.patternsContainer}>
        {groupedSymptoms.map(group => (
          <PatternChart 
            key={group.name}
            symptomGroup={group}
            startDate={startDate}
            endDate={endDate}
            dateLabels={dateLabels}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(SymptomPatternVisualizer);
