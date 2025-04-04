import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './VideoCallScheduler.module.css';
import { FiCalendar, FiClock, FiUser, FiInfo, FiVideo, FiCheck } from 'react-icons/fi';

interface VideoCallParticipant {
  id: string;
  name: string;
  role: string;
  specialty?: string;
  available: boolean;
}

interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

const MOCK_ADVOCATES: VideoCallParticipant[] = [
  { id: 'adv1', name: 'Sarah Johnson', role: 'advocate', available: true },
  { id: 'adv2', name: 'Michael Chen', role: 'advocate', available: true },
  { id: 'adv3', name: 'Lisa Rodriguez', role: 'advocate', available: false },
];

const MOCK_PROVIDERS: VideoCallParticipant[] = [
  { id: 'prov1', name: 'Dr. James Wilson', role: 'provider', specialty: 'Cardiology', available: true },
  { id: 'prov2', name: 'Dr. Emma Thompson', role: 'provider', specialty: 'Oncology', available: true },
  { id: 'prov3', name: 'Dr. Robert Davis', role: 'provider', specialty: 'Neurology', available: false },
];

// Generate time slots for demo
const generateTimeSlots = (): TimeSlot[] => {
  const today = new Date();
  const timeSlots: TimeSlot[] = [];
  
  for (let day = 0; day < 7; day++) {
    const date = new Date(today);
    date.setDate(today.getDate() + day);
    
    const dateStr = date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const startHour = 9; // Start at 9 AM
    const endHour = 17; // End at 5 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      const startTime = `${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
      const endTime = `${(hour + 1) % 12 === 0 ? 12 : (hour + 1) % 12}:00 ${(hour + 1) < 12 ? 'AM' : 'PM'}`;
      
      timeSlots.push({
        id: `slot-${day}-${hour}`,
        date: dateStr,
        startTime,
        endTime,
        available: Math.random() > 0.3, // Randomly mark some slots as unavailable
      });
    }
  }
  
  return timeSlots;
};

const VideoCallScheduler: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedParticipantType, setSelectedParticipantType] = useState<'provider' | 'advocate' | ''>('');
  const [selectedParticipant, setSelectedParticipant] = useState<VideoCallParticipant | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [scheduleSummary, setScheduleSummary] = useState({
    participant: '',
    date: '',
    time: '',
    notes: '',
  });
  const [notes, setNotes] = useState('');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  
  // Initialize time slots
  useEffect(() => {
    const generatedSlots = generateTimeSlots();
    setTimeSlots(generatedSlots);
  }, []);
  
  const selectParticipantType = (type: 'provider' | 'advocate') => {
    setSelectedParticipantType(type);
    setSelectedParticipant(null);
    setStep(2);
  };
  
  const selectParticipant = (participant: VideoCallParticipant) => {
    setSelectedParticipant(participant);
    setStep(3);
  };
  
  const handleDateSelection = (date: string) => {
    setSelectedDate(date);
    // Reset the selected time slot when date changes
    setSelectedTimeSlot(null);
  };
  
  const selectTimeSlot = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setScheduleSummary({
      participant: selectedParticipant?.name || '',
      date: timeSlot.date,
      time: `${timeSlot.startTime} - ${timeSlot.endTime}`,
      notes: notes,
    });
    setStep(4);
  };
  
  const scheduleCall = () => {
    // In a real app, this would send the scheduling request to a backend
    // For demonstration, we'll generate a fake call ID and navigate to the dashboard
    const callId = `demo-${Date.now()}`;
    
    // Update upcoming calls (would be handled by backend in a real app)
    // This would be the place to use setTimeSlots to update availability
    if (selectedTimeSlot) {
      setTimeSlots(currentSlots => 
        currentSlots.map(slot => 
          slot.id === selectedTimeSlot.id 
            ? { ...slot, available: false } 
            : slot
        )
      );
    }
    
    // Navigate to dashboard with success message
    navigate('/dashboard', { 
      state: { 
        scheduledCall: {
          ...scheduleSummary,
          id: callId,
          participantId: selectedParticipant?.id,
          participantRole: selectedParticipant?.role
        } 
      } 
    });
  };
  
  const getAvailableDates = () => {
    return [...new Set(timeSlots.filter(slot => slot.available).map(slot => slot.date))];
  };
  
  const getTimeSlotsByDate = (date: string) => {
    return timeSlots.filter(slot => slot.date === date && slot.available);
  };
  
  // Function to display time slot status based on selection
  const getTimeSlotStatus = (slot: TimeSlot) => {
    if (selectedTimeSlot && selectedTimeSlot.id === slot.id) {
      return 'Selected';
    }
    return slot.available ? 'Available' : 'Unavailable';
  };
  
  return (
    <div className={styles.schedulerContainer}>
      <div className={styles.schedulerHeader}>
        <h2>Schedule a Video Call</h2>
        <p>Connect with your healthcare advocates and providers through secure video calls</p>
      </div>
      
      <div className={styles.stepIndicator}>
        <div className={`${styles.step} ${step >= 1 ? styles.stepActive : ''}`}>
          <div className={styles.stepNumber}>1</div>
          <div className={styles.stepLabel}>Select Participant</div>
        </div>
        <div className={styles.stepConnector} />
        <div className={`${styles.step} ${step >= 2 ? styles.stepActive : ''}`}>
          <div className={styles.stepNumber}>2</div>
          <div className={styles.stepLabel}>Choose Person</div>
        </div>
        <div className={styles.stepConnector} />
        <div className={`${styles.step} ${step >= 3 ? styles.stepActive : ''}`}>
          <div className={styles.stepNumber}>3</div>
          <div className={styles.stepLabel}>Select Time</div>
        </div>
        <div className={styles.stepConnector} />
        <div className={`${styles.step} ${step >= 4 ? styles.stepActive : ''}`}>
          <div className={styles.stepNumber}>4</div>
          <div className={styles.stepLabel}>Confirm</div>
        </div>
      </div>
      
      {/* Step 1: Select participant type */}
      {step === 1 && (
        <div className={styles.stepContent}>
          <h3>Who would you like to call?</h3>
          <div className={styles.participantTypeGrid}>
            <div 
              className={styles.participantTypeCard}
              onClick={() => selectParticipantType('provider')}
            >
              <div className={styles.participantTypeIcon}>
                <FiUser size={32} />
              </div>
              <h4>Healthcare Provider</h4>
              <p>Schedule a call with your doctor or specialist</p>
            </div>
            
            <div 
              className={styles.participantTypeCard}
              onClick={() => selectParticipantType('advocate')}
            >
              <div className={styles.participantTypeIcon}>
                <FiInfo size={32} />
              </div>
              <h4>Patient Advocate</h4>
              <p>Get help navigating your healthcare journey</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Step 2: Select specific person */}
      {step === 2 && (
        <div className={styles.stepContent}>
          <button className={styles.backButton} onClick={() => setStep(1)}>Back</button>
          <h3>{selectedParticipantType === 'provider' ? 'Select a Healthcare Provider' : 'Select a Patient Advocate'}</h3>
          <div className={styles.participantsGrid}>
            {(selectedParticipantType === 'provider' ? MOCK_PROVIDERS : MOCK_ADVOCATES).map(participant => (
              <div 
                key={participant.id}
                className={`${styles.participantCard} ${!participant.available ? styles.participantUnavailable : ''}`}
                onClick={() => participant.available && selectParticipant(participant)}
              >
                <div className={styles.participantAvatar}>
                  {participant.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className={styles.participantInfo}>
                  <h4>{participant.name}</h4>
                  {participant.specialty && <p>{participant.specialty}</p>}
                  {!participant.available && <span className={styles.unavailableTag}>Currently Unavailable</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Step 3: Select date and time */}
      {step === 3 && selectedParticipant && (
        <div className={styles.stepContent}>
          <button className={styles.backButton} onClick={() => setStep(2)}>Back</button>
          <h3>Select a Date and Time</h3>
          <p className={styles.selectedParticipant}>
            Call with: <span>{selectedParticipant.name}</span>
          </p>
          
          <div className={styles.dateTimeSelector}>
            <div className={styles.dateSelector}>
              <h4><FiCalendar /> Available Dates</h4>
              <div className={styles.dateList}>
                {getAvailableDates().map(date => (
                  <button
                    key={date}
                    className={`${styles.dateButton} ${selectedDate === date ? styles.dateButtonSelected : ''}`}
                    onClick={() => handleDateSelection(date)}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>
            
            {selectedDate && (
              <div className={styles.timeSelector}>
                <h4><FiClock /> Available Time Slots</h4>
                <div className={styles.timeSlotList}>
                  {getTimeSlotsByDate(selectedDate).map(slot => (
                    <button
                      key={slot.id}
                      className={`${styles.timeSlotButton} ${selectedTimeSlot?.id === slot.id ? styles.timeSlotSelected : ''}`}
                      onClick={() => selectTimeSlot(slot)}
                    >
                      {slot.startTime} - {slot.endTime}
                      <span className={styles.slotStatus}>{getTimeSlotStatus(slot)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className={styles.notesSection}>
            <h4>Notes for the call (optional)</h4>
            <textarea
              className={styles.notesInput}
              placeholder="Add any topics you'd like to discuss or questions you have..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>
        </div>
      )}
      
      {/* Step 4: Confirmation */}
      {step === 4 && selectedTimeSlot && (
        <div className={styles.stepContent}>
          <button className={styles.backButton} onClick={() => setStep(3)}>Back</button>
          <h3>Confirm Your Video Call</h3>
          
          <div className={styles.confirmationCard}>
            <div className={styles.confirmationIcon}>
              <FiVideo size={32} />
            </div>
            
            <div className={styles.confirmationDetails}>
              <div className={styles.confirmationItem}>
                <span className={styles.confirmationLabel}>With:</span>
                <span className={styles.confirmationValue}>{scheduleSummary.participant}</span>
              </div>
              
              <div className={styles.confirmationItem}>
                <span className={styles.confirmationLabel}>Date:</span>
                <span className={styles.confirmationValue}>{scheduleSummary.date}</span>
              </div>
              
              <div className={styles.confirmationItem}>
                <span className={styles.confirmationLabel}>Time:</span>
                <span className={styles.confirmationValue}>{scheduleSummary.time}</span>
              </div>
              
              {notes && (
                <div className={styles.confirmationItem}>
                  <span className={styles.confirmationLabel}>Notes:</span>
                  <span className={styles.confirmationValue}>{notes}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className={styles.confirmationInfo}>
            <p>
              <FiInfo size={16} />
              You will receive an email confirmation with a link to join this call. The link will also be available in your dashboard.
            </p>
          </div>
          
          <button className={styles.scheduleButton} onClick={scheduleCall}>
            <FiCheck size={20} />
            Schedule Call
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoCallScheduler;
