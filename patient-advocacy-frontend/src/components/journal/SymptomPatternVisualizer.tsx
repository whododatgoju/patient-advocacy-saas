import React, { useMemo } from 'react';
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

const SymptomPatternVisualizer: React.FC<PatternVisualizerProps> = ({ 
  symptoms, 
  timeRange = 'month',
  className = '' 
}) => {
  // Filter symptoms based on time range
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
  
  // Group symptoms by name
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
  
  // Calculate date range for the chart
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
    
    const dates = filteredSymptoms.map(s => new Date(s.timestamp));
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
    
    // Generate labels based on time range
    const labels: string[] = [];
    const labelDate = new Date(minDate);
    
    while (labelDate <= maxDate) {
      if (timeRange === 'week') {
        // For week, show each day
        labels.push(labelDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }));
        labelDate.setDate(labelDate.getDate() + 1);
      } else if (timeRange === 'month') {
        // For month, show every ~3 days
        labels.push(labelDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }));
        labelDate.setDate(labelDate.getDate() + 3);
      } else {
        // For 3months or all, show every week or two weeks
        labels.push(labelDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }));
        labelDate.setDate(labelDate.getDate() + (timeRange === '3months' ? 7 : 14));
      }
    }
    
    return { startDate: minDate, endDate: maxDate, dateLabels: labels };
  }, [filteredSymptoms, timeRange]);
  
  // Calculate total date range in milliseconds for positioning data points
  const totalDateRange = endDate.getTime() - startDate.getTime();
  
  if (filteredSymptoms.length === 0) {
    return (
      <div className={`${styles.noDataContainer} ${className}`}>
        <div className={styles.noDataMessage}>
          <p>No symptom data available for the selected time period.</p>
          <p>Start tracking symptoms to visualize patterns over time.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`${styles.patternVisualizerContainer} ${className}`}>
      <div className={styles.timeRangeSelector}>
        <button 
          className={`${styles.timeRangeButton} ${timeRange === 'week' ? styles.activeTimeRange : ''}`}
          aria-label="View past week"
        >
          Week
        </button>
        <button 
          className={`${styles.timeRangeButton} ${timeRange === 'month' ? styles.activeTimeRange : ''}`}
          aria-label="View past month"
        >
          Month
        </button>
        <button 
          className={`${styles.timeRangeButton} ${timeRange === '3months' ? styles.activeTimeRange : ''}`}
          aria-label="View past 3 months"
        >
          3 Months
        </button>
        <button 
          className={`${styles.timeRangeButton} ${timeRange === 'all' ? styles.activeTimeRange : ''}`}
          aria-label="View all data"
        >
          All
        </button>
      </div>
      
      <div className={styles.chartContainer}>
        <div className={styles.yAxisLabels}>
          <div>Severe</div>
          <div>Moderate</div>
          <div>Mild</div>
          <div>None</div>
        </div>
        
        <div className={styles.chartContent}>
          {/* Severity level grid lines */}
          <div className={styles.gridLines}>
            <div className={styles.gridLine} style={{ bottom: '75%' }}></div>
            <div className={styles.gridLine} style={{ bottom: '50%' }}></div>
            <div className={styles.gridLine} style={{ bottom: '25%' }}></div>
            <div className={styles.gridLine} style={{ bottom: '0%' }}></div>
          </div>
          
          {/* Date labels on x-axis */}
          <div className={styles.xAxisLabels}>
            {dateLabels.map((label, index) => (
              <div 
                key={index} 
                className={styles.xAxisLabel}
                style={{ 
                  left: `${(index / (dateLabels.length - 1)) * 100}%` 
                }}
              >
                {label}
              </div>
            ))}
          </div>
          
          {/* Symptom data visualization */}
          {groupedSymptoms.map((group) => (
            <div key={group.name} className={styles.symptomLine}>
              {group.data.map((point, pointIndex) => {
                // Calculate position based on date
                const position = totalDateRange === 0 ? 50 : 
                  ((point.date.getTime() - startDate.getTime()) / totalDateRange) * 100;
                
                // Calculate color based on severity
                const colorIndex = Math.floor(point.severity / 2);
                const color = SEVERITY_COLORS[colorIndex];
                
                return (
                  <div 
                    key={pointIndex}
                    className={styles.dataPoint}
                    style={{
                      left: `${position}%`,
                      bottom: `${(point.severity / 10) * 100}%`,
                      backgroundColor: color,
                      borderColor: SEVERITY_COLORS[Math.min(colorIndex + 1, SEVERITY_COLORS.length - 1)]
                    }}
                    title={`${group.name}: ${point.severity}/10 on ${point.date.toLocaleDateString()}`}
                  />
                );
              })}
              
              {/* Connect data points with lines if there are multiple points */}
              {group.data.length > 1 && group.data.map((point, pointIndex) => {
                if (pointIndex === group.data.length - 1) return null;
                
                const currentPosition = totalDateRange === 0 ? 50 : 
                  ((point.date.getTime() - startDate.getTime()) / totalDateRange) * 100;
                const nextPosition = totalDateRange === 0 ? 50 : 
                  ((group.data[pointIndex + 1].date.getTime() - startDate.getTime()) / totalDateRange) * 100;
                
                const currentHeight = (point.severity / 10) * 100;
                const nextHeight = (group.data[pointIndex + 1].severity / 10) * 100;
                
                // Calculate line length and angle
                const length = Math.sqrt(
                  Math.pow(nextPosition - currentPosition, 2) + 
                  Math.pow(nextHeight - currentHeight, 2)
                );
                
                const angle = Math.atan2(
                  nextHeight - currentHeight,
                  nextPosition - currentPosition
                ) * (180 / Math.PI);
                
                return (
                  <div 
                    key={`line-${pointIndex}`}
                    className={styles.connectionLine}
                    style={{
                      left: `${currentPosition}%`,
                      bottom: `${currentHeight}%`,
                      width: `${length}%`,
                      transform: `rotate(${angle}deg)`,
                      transformOrigin: 'left center',
                      borderColor: SEVERITY_COLORS[Math.floor(
                        (point.severity + group.data[pointIndex + 1].severity) / 4
                      )]
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.legendContainer}>
        <div className={styles.legendTitle}>Symptoms:</div>
        <div className={styles.legendItems}>
          {groupedSymptoms.map((group, index) => (
            <div key={index} className={styles.legendItem}>
              <div 
                className={styles.legendColor} 
                style={{ backgroundColor: SEVERITY_COLORS[Math.floor(
                  group.data.reduce((sum, point) => sum + point.severity, 0) / 
                  (group.data.length * 2)
                )] }}
              ></div>
              <div className={styles.legendLabel}>{group.name}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Severity legend */}
      <div className={styles.severityLegend}>
        <div className={styles.legendTitle}>Severity:</div>
        <div className={styles.severityScale}>
          {SEVERITY_COLORS.map((color, index) => (
            <div 
              key={index} 
              className={styles.severityItem}
              style={{ backgroundColor: color }}
              title={`Severity level ${index * 2}-${Math.min((index * 2) + 1, 10)}`}
            ></div>
          ))}
        </div>
        <div className={styles.severityLabels}>
          <span>0</span>
          <span>10</span>
        </div>
      </div>
    </div>
  );
};

export default SymptomPatternVisualizer;
