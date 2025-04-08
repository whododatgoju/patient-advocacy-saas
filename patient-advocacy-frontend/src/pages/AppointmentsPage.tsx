import React, { useState, useEffect } from 'react';
import { FiCalendar, FiPlus, FiList, FiClock } from 'react-icons/fi';
import MainLayout from '../components/layout/MainLayout';
import AppointmentList from '../components/appointments/AppointmentList';
import AppointmentForm from '../components/appointments/AppointmentForm';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import AppointmentService from '../services/AppointmentService';
import { Appointment } from '../types/appointment';
import styles from './AppointmentsPage.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

const AppointmentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState<Appointment | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Load appointments
  useEffect(() => {
    loadAppointments();
  }, []);
  
  // Check for query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const action = params.get('action');
    
    if (action === 'add') {
      setShowAddModal(true);
    }
  }, [location]);
  
  const loadAppointments = () => {
    setLoading(true);
    try {
      const upcoming = AppointmentService.getUpcomingAppointments();
      const past = AppointmentService.getPastAppointments();
      
      setUpcomingAppointments(upcoming);
      setPastAppointments(past);
      setLoading(false);
    } catch (error) {
      console.error('Error loading appointments:', error);
      setLoading(false);
    }
  };
  
  const handleAddAppointment = (appointmentData: Omit<Appointment, 'id'>) => {
    try {
      AppointmentService.addAppointment(appointmentData);
      setShowAddModal(false);
      loadAppointments();
      
      // Clean up URL
      if (location.search) {
        navigate('/appointments', { replace: true });
      }
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };
  
  const handleUpdateAppointment = (appointmentData: Omit<Appointment, 'id'> & { id: string }) => {
    try {
      AppointmentService.updateAppointment(appointmentData as Appointment);
      setShowDetailsModal(false);
      setCurrentAppointment(null);
      loadAppointments();
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };
  
  const handleCancelAppointment = () => {
    if (currentAppointment) {
      try {
        AppointmentService.cancelAppointment(currentAppointment.id);
        setShowCancelConfirm(false);
        setShowDetailsModal(false);
        setCurrentAppointment(null);
        loadAppointments();
      } catch (error) {
        console.error('Error cancelling appointment:', error);
      }
    }
  };
  
  const handleReschedule = (appointmentId: string) => {
    const appointment = [...upcomingAppointments, ...pastAppointments].find(
      appt => appt.id === appointmentId
    );
    
    if (appointment) {
      setCurrentAppointment(appointment);
      setShowDetailsModal(true);
    }
  };
  
  const handleViewDetails = (appointmentId: string) => {
    const appointment = [...upcomingAppointments, ...pastAppointments].find(
      appt => appt.id === appointmentId
    );
    
    if (appointment) {
      setCurrentAppointment(appointment);
      setShowDetailsModal(true);
    }
  };
  
  const handleCancel = (appointmentId: string) => {
    const appointment = [...upcomingAppointments, ...pastAppointments].find(
      appt => appt.id === appointmentId
    );
    
    if (appointment) {
      setCurrentAppointment(appointment);
      setShowCancelConfirm(true);
    }
  };
  
  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h1 className={styles.pageTitle}>
              <FiCalendar className={styles.titleIcon} />
              Appointments
            </h1>
            <p className={styles.pageDescription}>
              Manage your healthcare appointments and track upcoming visits.
            </p>
          </div>
          
          <div className={styles.actions}>
            <Button
              variant="primary"
              size="md"
              onClick={() => setShowAddModal(true)}
            >
              <FiPlus /> Schedule Appointment
            </Button>
          </div>
        </div>
        
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'upcoming' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            <FiClock />
            Upcoming Appointments
            {upcomingAppointments.length > 0 && (
              <span className={styles.tabBadge}>
                {upcomingAppointments.length}
              </span>
            )}
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'past' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('past')}
          >
            <FiList />
            Past Appointments
          </button>
        </div>
        
        <div className={styles.content}>
          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading appointments...</p>
            </div>
          ) : (
            <>
              {activeTab === 'upcoming' && (
                <AppointmentList
                  appointments={upcomingAppointments}
                  onViewDetails={handleViewDetails}
                  onReschedule={handleReschedule}
                  onCancel={handleCancel}
                />
              )}
              
              {activeTab === 'past' && (
                <AppointmentList
                  appointments={pastAppointments}
                  onViewDetails={handleViewDetails}
                  onReschedule={handleReschedule}
                  onCancel={handleCancel}
                  isPastList
                />
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Add Appointment Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          // Clean up URL if needed
          if (location.search) {
            navigate('/appointments', { replace: true });
          }
        }}
        title="Schedule New Appointment"
        size="lg"
      >
        <AppointmentForm
          onSubmit={handleAddAppointment}
          onCancel={() => {
            setShowAddModal(false);
            // Clean up URL if needed
            if (location.search) {
              navigate('/appointments', { replace: true });
            }
          }}
        />
      </Modal>
      
      {/* View/Edit Appointment Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setCurrentAppointment(null);
        }}
        title={`Appointment with ${currentAppointment?.provider.name || ''}`}
        size="lg"
      >
        {currentAppointment && (
          <AppointmentForm
            initialAppointment={currentAppointment}
            onSubmit={handleUpdateAppointment}
            onCancel={() => {
              setShowDetailsModal(false);
              setCurrentAppointment(null);
            }}
          />
        )}
      </Modal>
      
      {/* Cancel Confirmation Modal */}
      <Modal
        isOpen={showCancelConfirm}
        onClose={() => setShowCancelConfirm(false)}
        title="Cancel Appointment"
        size="sm"
      >
        <div className={styles.confirmationModal}>
          <p>
            Are you sure you want to cancel your appointment with{' '}
            <strong>{currentAppointment?.provider.name}</strong> on{' '}
            <strong>
              {currentAppointment?.date
                ? new Date(currentAppointment.date).toLocaleDateString()
                : ''}{' '}
              at {currentAppointment?.time}
            </strong>?
          </p>
          <div className={styles.confirmationActions}>
            <Button 
              variant="tertiary" 
              size="md" 
              onClick={() => setShowCancelConfirm(false)}
            >
              Keep Appointment
            </Button>
            <Button 
              variant="danger" 
              size="md" 
              onClick={handleCancelAppointment}
            >
              Cancel Appointment
            </Button>
          </div>
        </div>
      </Modal>
    </MainLayout>
  );
};

export default AppointmentsPage;
