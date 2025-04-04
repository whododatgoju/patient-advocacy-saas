import React, { useState, useMemo, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './HealthJourneyTimeline.module.css';

// Types for Timeline events
export type TimelineEventType = 
  | 'appointment' 
  | 'diagnosis' 
  | 'medication' 
  | 'procedure' 
  | 'test' 
  | 'journal' 
  | 'rights-issue'
  | 'other';

export interface TimelineEvent {
  id: number;
  title: string;
  date: string;  // ISO string
  type: TimelineEventType;
  description?: string;
  provider?: string;
  location?: string;
  relatedDocuments?: {id: number; name: string}[];
  relatedJournalEntries?: {id: number; title: string}[];
  patientRightsRelevance?: string[];  // Array of relevant rights from Patient Bill of Rights
  followUpNeeded?: boolean;
  followUpDate?: string;
  important?: boolean;
}

interface HealthJourneyTimelineProps {
  events: TimelineEvent[];
  onAddEvent?: () => void;
  onEditEvent?: (eventId: number) => void;
  onDeleteEvent?: (eventId: number) => void;
}

// Memoized filter and type select components
const TimelineFilter = memo(({ 
  filterType, 
  setFilterType, 
  showImportantOnly, 
  setShowImportantOnly 
}: { 
  filterType: TimelineEventType | 'all';
  setFilterType: (type: TimelineEventType | 'all') => void;
  showImportantOnly: boolean;
  setShowImportantOnly: (show: boolean) => void;
}) => {
  return (
    <div className={styles.timelineFilters}>
      <div className={styles.typeFilter}>
        <label htmlFor="typeFilter">Filter by type:</label>
        <select 
          id="typeFilter" 
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value as TimelineEventType | 'all')}
        >
          <option value="all">All Events</option>
          <option value="appointment">Appointments</option>
          <option value="diagnosis">Diagnoses</option>
          <option value="medication">Medications</option>
          <option value="procedure">Procedures</option>
          <option value="test">Tests</option>
          <option value="journal">Journal Entries</option>
          <option value="rights-issue">Patient Rights Issues</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div className={styles.importantFilter}>
        <label>
          <input 
            type="checkbox" 
            checked={showImportantOnly} 
            onChange={(e) => setShowImportantOnly(e.target.checked)} 
          />
          Show important events only
        </label>
      </div>
    </div>
  );
});

TimelineFilter.displayName = 'TimelineFilter';

// Memoized timeline event component
const TimelineEventItem = memo(({ 
  event, 
  isExpanded, 
  toggleExpand, 
  onEdit, 
  onDelete 
}: { 
  event: TimelineEvent;
  isExpanded: boolean;
  toggleExpand: () => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}) => {
  // Format date more efficiently
  const formattedDate = useMemo(() => {
    const date = new Date(event.date);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }, [event.date]);

  // Handle edit button click
  const handleEdit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) onEdit(event.id);
  }, [event.id, onEdit]);

  // Handle delete button click
  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete && window.confirm('Are you sure you want to delete this event?')) {
      onDelete(event.id);
    }
  }, [event.id, onDelete]);

  return (
    <div 
      className={`${styles.timelineEvent} ${styles[`event-${event.type}`]} ${event.important ? styles.importantEvent : ''}`}
      onClick={toggleExpand}
    >
      <div className={styles.eventHeader}>
        <div className={styles.eventDate}>{formattedDate}</div>
        <div className={styles.eventType}>{event.type.charAt(0).toUpperCase() + event.type.slice(1)}</div>
        <div className={styles.eventTitle}>{event.title}</div>
        <div className={styles.expandIcon}>{isExpanded ? '▼' : '►'}</div>
      </div>
      
      {isExpanded && (
        <div className={styles.eventDetails}>
          {event.description && (
            <div className={styles.eventDescription}>
              <h4>Description</h4>
              <p>{event.description}</p>
            </div>
          )}
          
          {event.provider && (
            <div className={styles.eventProvider}>
              <h4>Provider</h4>
              <p>{event.provider}</p>
            </div>
          )}
          
          {event.location && (
            <div className={styles.eventLocation}>
              <h4>Location</h4>
              <p>{event.location}</p>
            </div>
          )}
          
          {event.relatedDocuments && event.relatedDocuments.length > 0 && (
            <div className={styles.relatedDocuments}>
              <h4>Related Documents</h4>
              <ul>
                {event.relatedDocuments.map(doc => (
                  <li key={doc.id}>
                    <Link to={`/documents/${doc.id}`}>{doc.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {event.relatedJournalEntries && event.relatedJournalEntries.length > 0 && (
            <div className={styles.relatedJournals}>
              <h4>Related Journal Entries</h4>
              <ul>
                {event.relatedJournalEntries.map(entry => (
                  <li key={entry.id}>
                    <Link to={`/journal/${entry.id}`}>{entry.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {event.patientRightsRelevance && event.patientRightsRelevance.length > 0 && (
            <div className={styles.patientRights}>
              <h4>Patient Rights Relevance</h4>
              <ul>
                {event.patientRightsRelevance.map((right, index) => (
                  <li key={index}>
                    <Link to="/resources/patient-rights">{right}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {event.followUpNeeded && (
            <div className={`${styles.followUp} ${event.followUpDate && new Date(event.followUpDate) < new Date() ? styles.overdue : ''}`}>
              <h4>Follow-up</h4>
              <p>
                {event.followUpDate ? (
                  <>Required by {new Date(event.followUpDate).toLocaleDateString()}</>
                ) : (
                  <>Follow-up needed</>
                )}
              </p>
            </div>
          )}
          
          <div className={styles.eventActions}>
            {onEdit && <button onClick={handleEdit} className={styles.editButton}>Edit</button>}
            {onDelete && <button onClick={handleDelete} className={styles.deleteButton}>Delete</button>}
          </div>
        </div>
      )}
    </div>
  );
});

TimelineEventItem.displayName = 'TimelineEventItem';

// Main timeline component
const HealthJourneyTimeline: React.FC<HealthJourneyTimelineProps> = ({ 
  events, 
  onAddEvent, 
  onEditEvent, 
  onDeleteEvent 
}) => {
  const [expandedEventId, setExpandedEventId] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<TimelineEventType | 'all'>('all');
  const [showImportantOnly, setShowImportantOnly] = useState(false);

  // Group events by month - memoized for performance
  const groupedEvents = useMemo(() => {
    // Filter events based on current filter settings
    const filteredEvents = events.filter(event => {
      if (showImportantOnly && !event.important) return false;
      if (filterType !== 'all' && event.type !== filterType) return false;
      return true;
    });
    
    // Sort events by date (newest first)
    const sortedEvents = [...filteredEvents].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    // Group events by month and year
    const groups: Record<string, TimelineEvent[]> = {};
    
    sortedEvents.forEach(event => {
      const date = new Date(event.date);
      const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
      
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      
      groups[monthYear].push(event);
    });
    
    return groups;
  }, [events, filterType, showImportantOnly]);

  // Toggle event expansion
  const toggleEventExpansion = useCallback((eventId: number) => {
    setExpandedEventId(prevId => prevId === eventId ? null : eventId);
  }, []);
  
  // Empty state for no events
  if (Object.keys(groupedEvents).length === 0) {
    return (
      <div className={styles.timelineContainer}>
        <TimelineFilter 
          filterType={filterType}
          setFilterType={setFilterType}
          showImportantOnly={showImportantOnly}
          setShowImportantOnly={setShowImportantOnly}
        />
        
        <div className={styles.emptyTimeline}>
          <p>No events to display. {filterType !== 'all' || showImportantOnly ? 'Try changing the filters or ' : ''} Add your first health journey event.</p>
          {onAddEvent && (
            <button onClick={onAddEvent} className={styles.addEventButton}>
              Add Event
            </button>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className={styles.timelineContainer}>
      <TimelineFilter 
        filterType={filterType}
        setFilterType={setFilterType}
        showImportantOnly={showImportantOnly}
        setShowImportantOnly={setShowImportantOnly}
      />
      
      <div className={styles.timeline}>
        {Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
          <div key={monthYear} className={styles.timelineMonth}>
            <h3 className={styles.monthHeader}>{monthYear}</h3>
            
            <div className={styles.monthEvents}>
              {monthEvents.map(event => (
                <TimelineEventItem
                  key={event.id}
                  event={event}
                  isExpanded={expandedEventId === event.id}
                  toggleExpand={() => toggleEventExpansion(event.id)}
                  onEdit={onEditEvent}
                  onDelete={onDeleteEvent}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {onAddEvent && (
        <div className={styles.addEventContainer}>
          <button onClick={onAddEvent} className={styles.addEventButton}>
            Add Event
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(HealthJourneyTimeline);
