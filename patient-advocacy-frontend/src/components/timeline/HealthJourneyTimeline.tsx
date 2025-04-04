import React, { useState } from 'react';
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

const HealthJourneyTimeline: React.FC<HealthJourneyTimelineProps> = ({ 
  events, 
  onAddEvent, 
  onEditEvent, 
  onDeleteEvent 
}) => {
  const [expandedEventId, setExpandedEventId] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<TimelineEventType | 'all'>('all');
  const [showImportantOnly, setShowImportantOnly] = useState(false);

  // Group events by month for easier visualization
  const groupEventsByMonth = (events: TimelineEvent[]) => {
    const filteredEvents = events.filter(event => {
      if (filterType !== 'all' && event.type !== filterType) return false;
      if (showImportantOnly && !event.important) return false;
      return true;
    });

    return filteredEvents.reduce((groups, event) => {
      const date = new Date(event.date);
      const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
      
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      
      groups[monthYear].push(event);
      return groups;
    }, {} as Record<string, TimelineEvent[]>);
  };

  const groupedEvents = groupEventsByMonth(events);
  
  // Sort groups by date (most recent first)
  const sortedMonths = Object.keys(groupedEvents).sort((a, b) => {
    const dateA = new Date(groupedEvents[a][0].date);
    const dateB = new Date(groupedEvents[b][0].date);
    return dateB.getTime() - dateA.getTime();
  });

  const getEventIcon = (type: TimelineEventType) => {
    switch (type) {
      case 'appointment':
        return '👨‍⚕️';
      case 'diagnosis':
        return '🔍';
      case 'medication':
        return '💊';
      case 'procedure':
        return '🏥';
      case 'test':
        return '🧪';
      case 'journal':
        return '📝';
      case 'rights-issue':
        return '⚠️';
      default:
        return '📌';
    }
  };

  const toggleEventExpand = (eventId: number) => {
    if (expandedEventId === eventId) {
      setExpandedEventId(null);
    } else {
      setExpandedEventId(eventId);
    }
  };

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timelineHeader}>
        <h2 className={styles.timelineTitle}>Healthcare Journey Timeline</h2>
        <div className={styles.timelineControls}>
          <div className={styles.filterContainer}>
            <select 
              className={styles.filterSelect}
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as TimelineEventType | 'all')}
              aria-label="Filter timeline by event type"
            >
              <option value="all">All Events</option>
              <option value="appointment">Appointments</option>
              <option value="diagnosis">Diagnoses</option>
              <option value="medication">Medications</option>
              <option value="procedure">Procedures</option>
              <option value="test">Tests</option>
              <option value="journal">Journal Entries</option>
              <option value="rights-issue">Rights Issues</option>
              <option value="other">Other</option>
            </select>
            
            <label className={styles.importantFilterLabel}>
              <input 
                type="checkbox" 
                checked={showImportantOnly}
                onChange={() => setShowImportantOnly(!showImportantOnly)}
              />
              <span>Important only</span>
            </label>
          </div>
          
          {onAddEvent && (
            <button 
              className={styles.addEventButton}
              onClick={onAddEvent}
              aria-label="Add new timeline event"
            >
              Add Event
            </button>
          )}
        </div>
      </div>
      
      {sortedMonths.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No events match your current filters.</p>
          {filterType !== 'all' || showImportantOnly ? (
            <button
              className={styles.resetButton}
              onClick={() => {
                setFilterType('all');
                setShowImportantOnly(false);
              }}
            >
              Reset filters
            </button>
          ) : (
            onAddEvent && (
              <button
                className={styles.addEventButton}
                onClick={onAddEvent}
              >
                Add your first event
              </button>
            )
          )}
        </div>
      ) : (
        <div className={styles.timelineContent}>
          {sortedMonths.map(month => (
            <div key={month} className={styles.timelineMonth}>
              <h3 className={styles.monthHeader}>{month}</h3>
              
              <div className={styles.eventsContainer}>
                {groupedEvents[month]
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map(event => (
                    <div 
                      key={event.id} 
                      className={`${styles.eventCard} ${event.important ? styles.importantEvent : ''} ${event.type === 'rights-issue' ? styles.rightsIssueEvent : ''}`}
                    >
                      <div 
                        className={styles.eventHeader}
                        onClick={() => toggleEventExpand(event.id)}
                      >
                        <div className={styles.eventIcon}>
                          {getEventIcon(event.type)}
                        </div>
                        
                        <div className={styles.eventSummary}>
                          <h4 className={styles.eventTitle}>{event.title}</h4>
                          <div className={styles.eventMeta}>
                            <time className={styles.eventDate}>
                              {new Date(event.date).toLocaleDateString()} {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </time>
                            {event.provider && (
                              <span className={styles.eventProvider}>{event.provider}</span>
                            )}
                          </div>
                        </div>
                        
                        <div className={styles.eventExpander}>
                          {expandedEventId === event.id ? '−' : '+'}
                        </div>
                      </div>
                      
                      {expandedEventId === event.id && (
                        <div className={styles.eventDetails}>
                          {event.description && (
                            <div className={styles.detailSection}>
                              <h5 className={styles.detailTitle}>Description</h5>
                              <p className={styles.eventDescription}>{event.description}</p>
                            </div>
                          )}
                          
                          {event.location && (
                            <div className={styles.detailSection}>
                              <h5 className={styles.detailTitle}>Location</h5>
                              <p>{event.location}</p>
                            </div>
                          )}
                          
                          {event.patientRightsRelevance && event.patientRightsRelevance.length > 0 && (
                            <div className={styles.detailSection}>
                              <h5 className={styles.detailTitle}>Related Patient Rights</h5>
                              <ul className={styles.rightsList}>
                                {event.patientRightsRelevance.map((right, idx) => (
                                  <li key={idx} className={styles.rightsItem}>
                                    {right}
                                  </li>
                                ))}
                              </ul>
                              <Link to="/resources/1" className={styles.resourceLink}>
                                View Patient Bill of Rights
                              </Link>
                            </div>
                          )}
                          
                          {event.relatedJournalEntries && event.relatedJournalEntries.length > 0 && (
                            <div className={styles.detailSection}>
                              <h5 className={styles.detailTitle}>Related Journal Entries</h5>
                              <ul className={styles.journalList}>
                                {event.relatedJournalEntries.map(entry => (
                                  <li key={entry.id} className={styles.journalItem}>
                                    <Link to={`/journal?entry=${entry.id}`} className={styles.journalLink}>
                                      {entry.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {event.relatedDocuments && event.relatedDocuments.length > 0 && (
                            <div className={styles.detailSection}>
                              <h5 className={styles.detailTitle}>Related Documents</h5>
                              <ul className={styles.documentList}>
                                {event.relatedDocuments.map(doc => (
                                  <li key={doc.id} className={styles.documentItem}>
                                    <Link to={`/documents/${doc.id}`} className={styles.documentLink}>
                                      {doc.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {event.followUpNeeded && (
                            <div className={styles.detailSection}>
                              <h5 className={styles.detailTitle}>Follow-up</h5>
                              <p className={styles.followUpInfo}>
                                {event.followUpDate 
                                  ? `Follow-up needed by ${new Date(event.followUpDate).toLocaleDateString()}`
                                  : 'Follow-up needed'
                                }
                              </p>
                            </div>
                          )}
                          
                          <div className={styles.eventActions}>
                            {onEditEvent && (
                              <button 
                                className={styles.actionButton}
                                onClick={() => onEditEvent(event.id)}
                              >
                                Edit
                              </button>
                            )}
                            
                            <Link 
                              to={`/journal/new?relatedEvent=${event.id}`} 
                              className={styles.actionButton}
                            >
                              Add Journal Entry
                            </Link>
                            
                            {onDeleteEvent && (
                              <button 
                                className={`${styles.actionButton} ${styles.deleteButton}`}
                                onClick={() => onDeleteEvent(event.id)}
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HealthJourneyTimeline;
