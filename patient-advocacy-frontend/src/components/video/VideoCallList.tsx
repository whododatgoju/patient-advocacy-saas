import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './VideoCallList.module.css';
import { FiVideo, FiClock, FiCalendar, FiCheck, FiX, FiPlus } from 'react-icons/fi';

interface VideoCall {
  id: string;
  participantName: string;
  participantRole: 'provider' | 'advocate';
  specialty?: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'canceled';
  notes?: string;
}

// Mock data for demonstration
const MOCK_CALLS: VideoCall[] = [
  {
    id: 'call1',
    participantName: 'Dr. James Wilson',
    participantRole: 'provider',
    specialty: 'Cardiology',
    date: 'Today',
    time: '3:00 PM - 3:30 PM',
    status: 'scheduled',
    notes: 'Follow-up on recent test results'
  },
  {
    id: 'call2',
    participantName: 'Sarah Johnson',
    participantRole: 'advocate',
    date: 'Tomorrow',
    time: '10:00 AM - 10:30 AM',
    status: 'scheduled',
    notes: 'Insurance claim assistance'
  },
  {
    id: 'call3',
    participantName: 'Dr. Emma Thompson',
    participantRole: 'provider',
    specialty: 'Oncology',
    date: 'April 2, 2025',
    time: '2:00 PM - 2:30 PM',
    status: 'completed'
  },
  {
    id: 'call4',
    participantName: 'Michael Chen',
    participantRole: 'advocate',
    date: 'March 30, 2025',
    time: '11:00 AM - 11:30 AM',
    status: 'canceled'
  }
];

const VideoCallList: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'completed' | 'canceled'>('all');

  const filteredCalls = filter === 'all' 
    ? MOCK_CALLS 
    : MOCK_CALLS.filter(call => call.status === filter);

  // Group calls by date for better organization
  const groupedCalls: Record<string, VideoCall[]> = {};
  filteredCalls.forEach(call => {
    if (!groupedCalls[call.date]) {
      groupedCalls[call.date] = [];
    }
    groupedCalls[call.date].push(call);
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <FiClock className={styles.statusIconScheduled} />;
      case 'completed':
        return <FiCheck className={styles.statusIconCompleted} />;
      case 'canceled':
        return <FiX className={styles.statusIconCanceled} />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'scheduled':
        return styles.statusScheduled;
      case 'completed':
        return styles.statusCompleted;
      case 'canceled':
        return styles.statusCanceled;
      default:
        return '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Video Calls</h2>
        <Link to="/schedule-call" className={styles.scheduleButton}>
          <FiPlus />
          Schedule Call
        </Link>
      </div>

      <div className={styles.filters}>
        <button 
          className={`${styles.filterButton} ${filter === 'all' ? styles.filterActive : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`${styles.filterButton} ${filter === 'scheduled' ? styles.filterActive : ''}`}
          onClick={() => setFilter('scheduled')}
        >
          Upcoming
        </button>
        <button 
          className={`${styles.filterButton} ${filter === 'completed' ? styles.filterActive : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button 
          className={`${styles.filterButton} ${filter === 'canceled' ? styles.filterActive : ''}`}
          onClick={() => setFilter('canceled')}
        >
          Canceled
        </button>
      </div>

      {Object.keys(groupedCalls).length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>
            <FiVideo size={48} />
          </div>
          <h3>No video calls found</h3>
          <p>Schedule a video call with your providers or advocates</p>
          <Link to="/schedule-call" className={styles.emptyStateButton}>
            Schedule Call
          </Link>
        </div>
      ) : (
        <div className={styles.callList}>
          {Object.entries(groupedCalls).map(([date, calls]) => (
            <div key={date} className={styles.dateGroup}>
              <div className={styles.dateHeader}>
                <FiCalendar />
                <span>{date}</span>
              </div>
              {calls.map(call => (
                <div key={call.id} className={styles.callCard}>
                  <div className={styles.callInfo}>
                    <div className={styles.participantAvatar}>
                      {call.participantName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className={styles.callDetails}>
                      <h3 className={styles.participantName}>{call.participantName}</h3>
                      <div className={styles.callType}>
                        {call.participantRole === 'provider' ? 'Healthcare Provider' : 'Patient Advocate'}
                        {call.specialty && ` • ${call.specialty}`}
                      </div>
                      <div className={styles.callTime}>
                        <FiClock />
                        <span>{call.time}</span>
                      </div>
                      {call.notes && (
                        <div className={styles.callNotes}>
                          Notes: {call.notes}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.callActions}>
                    <div className={`${styles.callStatus} ${getStatusClass(call.status)}`}>
                      {getStatusIcon(call.status)}
                      <span>{call.status.charAt(0).toUpperCase() + call.status.slice(1)}</span>
                    </div>
                    {call.status === 'scheduled' && (
                      <Link to={`/video-call/${call.id}`} className={styles.joinButton}>
                        <FiVideo />
                        Join Call
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoCallList;
