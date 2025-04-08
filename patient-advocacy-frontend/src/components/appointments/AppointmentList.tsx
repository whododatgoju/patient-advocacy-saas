import React, { useState } from 'react';
import { Appointment } from '../../types/appointment';
import { formatDistanceToNow } from 'date-fns';
import { FiClock, FiMapPin, FiFileText, FiVideo, FiCheck, FiAlertCircle } from 'react-icons/fi';
import Button from '../common/Button';
import styles from './AppointmentList.module.css';
import { Link } from 'react-router-dom';

interface AppointmentListProps {
  appointments: Appointment[];
  onViewDetails: (appointmentId: string) => void;
  onReschedule: (appointmentId: string) => void;
  onCancel: (appointmentId: string) => void;
  isPastList?: boolean;
}

const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  onViewDetails,
  onReschedule,
  onCancel,
  isPastList = false
}) => {
  const [expandedAppointment, setExpandedAppointment] = useState<string | null>(null);
  
  const toggleExpand = (appointmentId: string) => {
    if (expandedAppointment === appointmentId) {
      setExpandedAppointment(null);
    } else {
      setExpandedAppointment(appointmentId);
    }
  };
  
  if (appointments.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyStateIcon}>
          <FiClock size={48} />
        </div>
        <h3>No {isPastList ? 'past' : 'upcoming'} appointments</h3>
        {!isPastList && (
          <p>Schedule your first appointment to get started.</p>
        )}
        {!isPastList && (
          <Link to="/schedule-appointment">
            <Button 
              variant="primary" 
              size="md"
            >
              Schedule Appointment
            </Button>
          </Link>
        )}
      </div>
    );
  }
  
  return (
    <div className={styles.appointmentList}>
      {appointments.map((appointment) => {
        const isExpanded = expandedAppointment === appointment.id;
        const appointmentDate = new Date(appointment.date);
        const formattedDate = new Intl.DateTimeFormat('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(appointmentDate);
        
        const timeUntil = formatDistanceToNow(appointmentDate, { addSuffix: true });
        
        return (
          <div 
            key={appointment.id} 
            className={`${styles.appointmentCard} ${isExpanded ? styles.expanded : ''} ${appointment.status === 'cancelled' ? styles.cancelled : ''}`}
          >
            <div 
              className={styles.appointmentHeader}
              onClick={() => toggleExpand(appointment.id)}
            >
              <div 
                className={styles.typeIndicator} 
                style={{ backgroundColor: appointment.type.color }}
              />
              <div className={styles.appointmentSummary}>
                <div className={styles.mainInfo}>
                  <h3 className={styles.providerName}>{appointment.provider.name}</h3>
                  <span className={styles.appointmentType}>{appointment.type.title}</span>
                </div>
                <div className={styles.dateTimeInfo}>
                  <div className={styles.dateTime}>
                    <span className={styles.date}>{formattedDate}</span>
                    <span className={styles.time}>{appointment.time} ({appointment.duration} min)</span>
                  </div>
                  {!isPastList && (
                    <span className={styles.timeUntil}>{timeUntil}</span>
                  )}
                </div>
              </div>
            </div>
            
            {isExpanded && (
              <div className={styles.appointmentDetails}>
                <div className={styles.detailSection}>
                  <div className={styles.detailItem}>
                    <FiMapPin className={styles.detailIcon} />
                    <span>
                      {appointment.isVideoCall ? 'Video Call' : appointment.location}
                    </span>
                  </div>
                  
                  {appointment.isVideoCall && (
                    <div className={styles.detailItem}>
                      <FiVideo className={styles.detailIcon} />
                      <a href={appointment.videoCallUrl} className={styles.videoLink}>
                        Join Video Call
                      </a>
                    </div>
                  )}
                  
                  {appointment.notes && (
                    <div className={styles.detailItem}>
                      <FiFileText className={styles.detailIcon} />
                      <span>{appointment.notes}</span>
                    </div>
                  )}
                  
                  <div className={styles.requirementsList}>
                    {appointment.insuranceRequired && (
                      <div className={`${styles.requirementItem} ${appointment.insuranceVerified ? styles.verified : styles.pending}`}>
                        {appointment.insuranceVerified ? 
                          <FiCheck className={styles.requirementIcon} /> : 
                          <FiAlertCircle className={styles.requirementIcon} />
                        }
                        <span>Insurance {appointment.insuranceVerified ? 'Verified' : 'Verification Pending'}</span>
                      </div>
                    )}
                    
                    {appointment.referralRequired && (
                      <div className={`${styles.requirementItem} ${appointment.referralSubmitted ? styles.verified : styles.pending}`}>
                        {appointment.referralSubmitted ? 
                          <FiCheck className={styles.requirementIcon} /> : 
                          <FiAlertCircle className={styles.requirementIcon} />
                        }
                        <span>Referral {appointment.referralSubmitted ? 'Submitted' : 'Required'}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className={styles.actionsContainer}>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => onViewDetails(appointment.id)}
                  >
                    View Details
                  </Button>
                  
                  {!isPastList && appointment.status !== 'cancelled' && (
                    <>
                      <Button 
                        variant="tertiary" 
                        size="sm" 
                        onClick={() => onReschedule(appointment.id)}
                      >
                        Reschedule
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={() => onCancel(appointment.id)}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  
                  {appointment.documents && appointment.documents.length > 0 && (
                    <Link to={`/documentation?appointmentId=${appointment.id}`}>
                      <Button 
                        variant="secondary" 
                        size="sm"
                      >
                        View Documents ({appointment.documents.length})
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentList;
