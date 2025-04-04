import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import Button from '../components/common/Button';
import { Link, useLocation } from 'react-router-dom';
import styles from './DashboardPage.module.css';
import VideoCallList from '../components/video/VideoCallList';
import HealthJourneyTimeline from '../components/timeline/HealthJourneyTimeline';
import mockTimelineEvents from '../data/mockTimelineEvents';

const DashboardPage: React.FC = () => {
  const location = useLocation();
  // This would come from the Redux store in a real application
  const [userRole, setUserRole] = useState<'patient' | 'advocate' | 'provider'>('patient');
  const [showCallNotification, setShowCallNotification] = useState(false);
  
  // For demonstration, allow toggling between roles
  const toggleRole = () => {
    if (userRole === 'patient') setUserRole('advocate');
    else if (userRole === 'advocate') setUserRole('provider');
    else setUserRole('patient');
  };

  // Check if we have a newly scheduled call notification from the state
  useEffect(() => {
    if (location.state?.scheduledCall) {
      setShowCallNotification(true);
      
      // Auto-hide notification after 5 seconds
      const timer = setTimeout(() => {
        setShowCallNotification(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <MainLayout role={userRole}>
      <div className={styles.dashboardContainer}>
        {showCallNotification && (
          <div className={styles.callNotification}>
            <div className={styles.callNotificationContent}>
              <span className={styles.notificationIcon}>✓</span>
              <p>Video call successfully scheduled with {location.state?.scheduledCall?.participant} on {location.state?.scheduledCall?.date} at {location.state?.scheduledCall?.time}</p>
            </div>
            <button 
              className={styles.dismissButton} 
              onClick={() => setShowCallNotification(false)}
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </div>
        )}
      
        <div className={styles.dashboardHeader}>
          <div>
            <h1 className={styles.headerTitle}>Dashboard</h1>
            <p className={styles.headerSubtitle}>Welcome back! Here's an overview of your activities.</p>
          </div>
          
          {/* This button is for demonstration only */}
          <Button onClick={toggleRole} variant="secondary">
            Switch to {userRole === 'patient' ? 'Advocate' : userRole === 'advocate' ? 'Provider' : 'Patient'} View
          </Button>
        </div>

        {/* Patient Dashboard */}
        {userRole === 'patient' && (
          <div>
            {/* Quick Stats */}
            <div className={styles.statsGrid}>
              <div className={`${styles.statCard} ${styles.statCardPatient}`}>
                <h3 className={styles.statTitle}>Upcoming Appointments</h3>
                <p className={`${styles.statValue} ${styles.statPatient}`}>3</p>
                <Link to="/appointments" className={styles.statLink}>
                  View all appointments →
                </Link>
              </div>
              
              <div className={`${styles.statCard} ${styles.statCardPatient}`}>
                <h3 className={styles.statTitle}>Medication Adherence</h3>
                <p className={`${styles.statValue} ${styles.statPatient}`}>92%</p>
                <Link to="/medications" className={styles.statLink}>
                  Manage medications →
                </Link>
              </div>
              
              <div className={`${styles.statCard} ${styles.statCardPatient}`}>
                <h3 className={styles.statTitle}>Support Messages</h3>
                <p className={`${styles.statValue} ${styles.statPatient}`}>5</p>
                <Link to="/messages" className={styles.statLink}>
                  Read messages →
                </Link>
              </div>
            </div>
            
            {/* Healthcare Journey Timeline */}
            <div className={styles.sectionCard}>
              <HealthJourneyTimeline 
                events={mockTimelineEvents} 
                onAddEvent={() => alert('Add event functionality to be implemented')}
                onEditEvent={(id) => alert(`Edit event ${id} functionality to be implemented`)}
                onDeleteEvent={(id) => alert(`Delete event ${id} functionality to be implemented`)}
              />
            </div>
            
            {/* Video Calls Section */}
            <div className={styles.sectionCard}>
              <VideoCallList />
            </div>
            
            {/* Recent Activity */}
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Recent Activity</h2>
                <Button variant="tertiary" size="sm">View All</Button>
              </div>
              
              <div className={styles.recentActivity}>
                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityTitle}>Added new health journal entry</p>
                    <p className={styles.activityTime}>Today, 8:15 AM</p>
                  </div>
                </div>
                
                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityTitle}>Scheduled appointment with Dr. Lakshmi Patel</p>
                    <p className={styles.activityTime}>Yesterday, 2:30 PM</p>
                  </div>
                </div>
                
                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityTitle}>Message from Sarah Johnson (Advocate)</p>
                    <p className={styles.activityTime}>April 2, 2025, 10:45 AM</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Upcoming Appointments */}
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Upcoming Appointments</h2>
                <Button variant="tertiary" size="sm">View All</Button>
              </div>
              
              <div>
                <div className={styles.appointmentItem}>
                  <div className={styles.appointmentHeader}>
                    <div className={styles.appointmentInfo}>
                      <h3 className={styles.appointmentTitle}>Dr. Lakshmi Patel</h3>
                      <p className={styles.appointmentSubtitle}>Primary Care Physician</p>
                      <p className={styles.appointmentDate}>April 10, 2025 • 10:00 AM</p>
                    </div>
                    <div className={styles.appointmentActions}>
                      <Button variant="secondary" size="sm">Reschedule</Button>
                      <Button variant="primary" size="sm">Prepare</Button>
                    </div>
                  </div>
                </div>
                
                <div className={styles.appointmentItem}>
                  <div className={styles.appointmentHeader}>
                    <div className={styles.appointmentInfo}>
                      <h3 className={styles.appointmentTitle}>Dr. Robert Chen</h3>
                      <p className={styles.appointmentSubtitle}>Endocrinologist</p>
                      <p className={styles.appointmentDate}>April 15, 2025 • 2:30 PM</p>
                      <div className={styles.badgeContainer}>
                        <span className={`${styles.badge} ${styles.patientBadge}`}>Review Needed</span>
                      </div>
                    </div>
                    <div className={styles.appointmentActions}>
                      <Button variant="secondary" size="sm">Reschedule</Button>
                      <Button variant="primary" size="sm">Prepare</Button>
                    </div>
                  </div>
                </div>
                
                <div className={styles.appointmentItem}>
                  <div className={styles.appointmentHeader}>
                    <div className={styles.appointmentInfo}>
                      <h3 className={styles.appointmentTitle}>Sarah Johnson</h3>
                      <p className={styles.appointmentSubtitle}>Patient Advocate - Monthly Check-in</p>
                      <p className={styles.appointmentDate}>April 20, 2025 • 1:00 PM</p>
                    </div>
                    <div className={styles.appointmentActions}>
                      <Button variant="secondary" size="sm">Reschedule</Button>
                      <Button variant="primary" size="sm">Prepare</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Health Metrics */}
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Health Metrics</h2>
                <Button variant="tertiary" size="sm">View All</Button>
              </div>
              
              <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                  <h3 className={styles.metricLabel}>Blood Glucose</h3>
                  <p className={styles.metricValue}>126 mg/dL</p>
                  <p className={`${styles.metricStatus} ${styles.statusWarning}`}>Slightly elevated</p>
                </div>
                
                <div className={styles.metricCard}>
                  <h3 className={styles.metricLabel}>Blood Pressure</h3>
                  <p className={styles.metricValue}>128/82 mmHg</p>
                  <p className={`${styles.metricStatus} ${styles.statusNormal}`}>Normal</p>
                </div>
                
                <div className={styles.metricCard}>
                  <h3 className={styles.metricLabel}>Weight</h3>
                  <p className={styles.metricValue}>168 lbs</p>
                  <p className={`${styles.metricStatus} ${styles.statusNormal}`}>Stable (vs. last month)</p>
                </div>
                
                <div className={styles.metricCard}>
                  <h3 className={styles.metricLabel}>Sleep</h3>
                  <p className={styles.metricValue}>6.5 hrs/night</p>
                  <p className={`${styles.metricStatus} ${styles.statusWarning}`}>Below target (7-8 hrs)</p>
                </div>
              </div>
            </div>
            
            {/* Recent Resources */}
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Recommended Resources</h2>
                <Button variant="tertiary" size="sm">View All</Button>
              </div>
              
              <div className={styles.metricsGrid}>
                <div className={styles.resourceCard}>
                  <h3 className={styles.resourceTitle}>Managing Type 2 Diabetes</h3>
                  <p className={styles.resourceDescription}>Educational guide with practical tips for daily management and blood sugar monitoring.</p>
                  <Button variant="tertiary" size="sm">Read Now</Button>
                </div>
                
                <div className={styles.resourceCard}>
                  <h3 className={styles.resourceTitle}>Local Support Groups</h3>
                  <p className={styles.resourceDescription}>Connect with others managing similar health conditions in your area.</p>
                  <Button variant="tertiary" size="sm">Explore</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Advocate Dashboard */}
        {userRole === 'advocate' && (
          <div>
            {/* Quick Stats */}
            <div className={styles.statsGrid}>
              <div className={`${styles.statCard} ${styles.statCardAdvocate}`}>
                <h3 className={styles.statTitle}>Active Clients</h3>
                <p className={`${styles.statValue} ${styles.statAdvocate}`}>18</p>
                <Link to="/clients" className={styles.statLink}>
                  View all clients →
                </Link>
              </div>
              
              <div className={`${styles.statCard} ${styles.statCardAdvocate}`}>
                <h3 className={styles.statTitle}>Pending Tasks</h3>
                <p className={`${styles.statValue} ${styles.statAdvocate}`}>12</p>
                <Link to="/tasks" className={styles.statLink}>
                  Manage tasks →
                </Link>
              </div>
              
              <div className={`${styles.statCard} ${styles.statCardAdvocate}`}>
                <h3 className={styles.statTitle}>Client Messages</h3>
                <p className={`${styles.statValue} ${styles.statAdvocate}`}>7</p>
                <Link to="/messages" className={styles.statLink}>
                  View messages →
                </Link>
              </div>
            </div>
            
            {/* Client Cases */}
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Priority Client Cases</h2>
                <Button variant="tertiary" size="sm">View All Clients</Button>
              </div>
              
              <div>
                <div className={styles.clientItem}>
                  <div className={styles.appointmentHeader}>
                    <div className={styles.appointmentInfo}>
                      <h3 className={styles.appointmentTitle}>Maria Rodriguez</h3>
                      <p className={styles.appointmentSubtitle}>Type 2 Diabetes • Care Coordination</p>
                      <p className={styles.priorityUrgent}>Urgent: Insurance authorization needed</p>
                    </div>
                    <div className={styles.appointmentActions}>
                      <Button variant="primary" size="sm">Take Action</Button>
                    </div>
                  </div>
                </div>
                
                <div className={styles.clientItem}>
                  <div className={styles.appointmentHeader}>
                    <div className={styles.appointmentInfo}>
                      <h3 className={styles.appointmentTitle}>James Washington</h3>
                      <p className={styles.appointmentSubtitle}>Caregiver Support • Elder Care</p>
                      <p className={styles.priorityHigh}>Follow-up: Care plan review</p>
                    </div>
                    <div className={styles.appointmentActions}>
                      <Button variant="primary" size="sm">Review</Button>
                    </div>
                  </div>
                </div>
                
                <div className={styles.clientItem}>
                  <div className={styles.appointmentHeader}>
                    <div className={styles.appointmentInfo}>
                      <h3 className={styles.appointmentTitle}>Elena Kim</h3>
                      <p className={styles.appointmentSubtitle}>Post-Surgery • Recovery Support</p>
                      <p className={styles.priorityHigh}>New client onboarding</p>
                    </div>
                    <div className={styles.appointmentActions}>
                      <Button variant="primary" size="sm">Start Onboarding</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tasks */}
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Upcoming Tasks</h2>
                <Button variant="tertiary" size="sm">View All Tasks</Button>
              </div>
              
              <div className={styles.taskList}>
                <div className={`${styles.taskItem} ${styles.urgent}`}>
                  <div className={styles.taskInfo}>
                    <p className={styles.taskTitle}>Call insurance company re: authorization for Maria Rodriguez</p>
                    <p className={styles.taskDate}>Due Today, 5:00 PM</p>
                  </div>
                  <Button variant="secondary" size="sm">Complete</Button>
                </div>
                
                <div className={`${styles.taskItem} ${styles.high}`}>
                  <div className={styles.taskInfo}>
                    <p className={styles.taskTitle}>Prepare care plan documentation for James Washington</p>
                    <p className={styles.taskDate}>Due Tomorrow, 12:00 PM</p>
                  </div>
                  <Button variant="secondary" size="sm">Complete</Button>
                </div>
                
                <div className={`${styles.taskItem} ${styles.normal}`}>
                  <div className={styles.taskInfo}>
                    <p className={styles.taskTitle}>Schedule initial consultation with Elena Kim</p>
                    <p className={styles.taskDate}>Due Apr 6, 2025</p>
                  </div>
                  <Button variant="secondary" size="sm">Complete</Button>
                </div>
                
                <div className={`${styles.taskItem} ${styles.normal}`}>
                  <div className={styles.taskInfo}>
                    <p className={styles.taskTitle}>Send follow-up resources to Thomas Garcia</p>
                    <p className={styles.taskDate}>Due Apr 7, 2025</p>
                  </div>
                  <Button variant="secondary" size="sm">Complete</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Provider Dashboard */}
        {userRole === 'provider' && (
          <div>
            {/* Quick Stats */}
            <div className={styles.statsGrid}>
              <div className={`${styles.statCard} ${styles.statCardProvider}`}>
                <h3 className={styles.statTitle}>Today's Appointments</h3>
                <p className={`${styles.statValue} ${styles.statProvider}`}>8</p>
                <Link to="/schedule" className={styles.statLink}>
                  View schedule →
                </Link>
              </div>
              
              <div className={`${styles.statCard} ${styles.statCardProvider}`}>
                <h3 className={styles.statTitle}>Pending Reviews</h3>
                <p className={`${styles.statValue} ${styles.statProvider}`}>5</p>
                <Link to="/reviews" className={styles.statLink}>
                  Review documents →
                </Link>
              </div>
              
              <div className={`${styles.statCard} ${styles.statCardProvider}`}>
                <h3 className={styles.statTitle}>Patient Messages</h3>
                <p className={`${styles.statValue} ${styles.statProvider}`}>3</p>
                <Link to="/messages" className={styles.statLink}>
                  View messages →
                </Link>
              </div>
            </div>
            
            {/* Today's Schedule */}
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Today's Schedule</h2>
                <Button variant="tertiary" size="sm">Full Schedule</Button>
              </div>
              
              <div>
                <div className={styles.appointmentItem}>
                  <div className={styles.appointmentHeader}>
                    <div className={styles.appointmentInfo}>
                      <h3 className={styles.appointmentTitle}>John Smith</h3>
                      <p className={styles.appointmentSubtitle}>Annual Physical</p>
                      <p className={styles.appointmentDate}>9:00 AM - 9:30 AM</p>
                      <div className={styles.badgeContainer}>
                        <span className={`${styles.badge} ${styles.providerBadge}`}>Bloodwork needed</span>
                      </div>
                    </div>
                    <div className={styles.appointmentActions}>
                      <Button variant="primary" size="sm">View Record</Button>
                    </div>
                  </div>
                </div>
                
                <div className={styles.appointmentItem}>
                  <div className={styles.appointmentHeader}>
                    <div className={styles.appointmentInfo}>
                      <h3 className={styles.appointmentTitle}>Emily Chen</h3>
                      <p className={styles.appointmentSubtitle}>Follow-up: Medication Review</p>
                      <p className={styles.appointmentDate}>10:00 AM - 10:30 AM</p>
                    </div>
                    <div className={styles.appointmentActions}>
                      <Button variant="primary" size="sm">View Record</Button>
                    </div>
                  </div>
                </div>
                
                <div className={styles.appointmentItem}>
                  <div className={styles.appointmentHeader}>
                    <div className={styles.appointmentInfo}>
                      <h3 className={styles.appointmentTitle}>Break</h3>
                      <p className={styles.appointmentDate}>10:30 AM - 11:00 AM</p>
                    </div>
                  </div>
                </div>
                
                <div className={styles.appointmentItem}>
                  <div className={styles.appointmentHeader}>
                    <div className={styles.appointmentInfo}>
                      <h3 className={styles.appointmentTitle}>Michael Johnson</h3>
                      <p className={styles.appointmentSubtitle}>New Patient Consultation</p>
                      <p className={styles.appointmentDate}>11:00 AM - 11:45 AM</p>
                    </div>
                    <div className={styles.appointmentActions}>
                      <Button variant="primary" size="sm">View Record</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
