import React, { useState, useEffect } from 'react';
import { Appointment, Provider, APPOINTMENT_TYPES } from '../../types/appointment';
import { FiCalendar, FiClock, FiMapPin, FiFileText } from 'react-icons/fi';
import Button from '../common/Button';
import styles from './AppointmentForm.module.css';
import AppointmentService from '../../services/AppointmentService';

interface AppointmentFormProps {
  initialAppointment?: Partial<Appointment>;
  onSubmit: (appointment: Omit<Appointment, 'id'>) => void;
  onCancel: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  initialAppointment,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<Partial<Appointment>>({
    type: APPOINTMENT_TYPES[0],
    date: '',
    time: '',
    duration: 30,
    location: '',
    notes: '',
    isVideoCall: false,
    videoCallUrl: '',
    insuranceRequired: false,
    insuranceVerified: false,
    referralRequired: false,
    referralSubmitted: false,
    status: 'scheduled',
    ...initialAppointment
  });
  
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    // Load providers
    const loadProviders = async () => {
      try {
        const providerList = AppointmentService.getProviders();
        setProviders(providerList);
        
        // Set default provider if not already set
        if (!formData.provider && providerList.length > 0) {
          setFormData(prev => ({ ...prev, provider: providerList[0] }));
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading providers:', error);
        setLoading(false);
      }
    };
    
    loadProviders();
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'type') {
      const selectedType = APPOINTMENT_TYPES.find(type => type.id === value);
      setFormData(prev => ({ ...prev, type: selectedType }));
    } else if (name === 'provider') {
      const selectedProvider = providers.find(provider => provider.id === value);
      setFormData(prev => ({ ...prev, provider: selectedProvider }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.type) newErrors.type = 'Appointment type is required';
    if (!formData.provider) newErrors.provider = 'Healthcare provider is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';
    
    if (formData.isVideoCall && !formData.videoCallUrl) {
      newErrors.videoCallUrl = 'Video call URL is required for video appointments';
    }
    
    if (!formData.isVideoCall && !formData.location) {
      newErrors.location = 'Location is required for in-person appointments';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Need to assert here because we know from validation that these fields exist
      const appointment = {
        ...formData,
        type: formData.type!,
        provider: formData.provider!,
        date: formData.date!,
        time: formData.time!,
        duration: formData.duration!,
        location: formData.location || 'Video Call',
        status: formData.status || 'scheduled'
      } as Omit<Appointment, 'id'>;
      
      onSubmit(appointment);
    }
  };
  
  if (loading) {
    return <div className={styles.loading}>Loading form...</div>;
  }
  
  return (
    <form className={styles.appointmentForm} onSubmit={handleSubmit}>
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Appointment Details</h3>
        
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="appointmentType">Appointment Type</label>
            <div className={styles.appointmentTypeSelector}>
              <select
                id="appointmentType"
                name="type"
                value={formData.type?.id || ''}
                onChange={handleChange}
                className={errors.type ? styles.inputError : ''}
              >
                {APPOINTMENT_TYPES.map(type => (
                  <option key={type.id} value={type.id}>{type.title}</option>
                ))}
              </select>
              {errors.type && <span className={styles.error}>{errors.type}</span>}
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="provider">Healthcare Provider</label>
            <select
              id="provider"
              name="provider"
              value={formData.provider?.id || ''}
              onChange={handleChange}
              className={errors.provider ? styles.inputError : ''}
            >
              {providers.map(provider => (
                <option key={provider.id} value={provider.id}>
                  {provider.name} - {provider.specialty}
                </option>
              ))}
            </select>
            {errors.provider && <span className={styles.error}>{errors.provider}</span>}
          </div>
        </div>
        
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="date">
              <FiCalendar className={styles.inputIcon} /> Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date || ''}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]} // Today or later
              className={errors.date ? styles.inputError : ''}
            />
            {errors.date && <span className={styles.error}>{errors.date}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="time">
              <FiClock className={styles.inputIcon} /> Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time || ''}
              onChange={handleChange}
              className={errors.time ? styles.inputError : ''}
            />
            {errors.time && <span className={styles.error}>{errors.time}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="duration">Duration (minutes)</label>
            <select
              id="duration"
              name="duration"
              value={formData.duration || 30}
              onChange={handleChange}
              className={errors.duration ? styles.inputError : ''}
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>60 minutes</option>
              <option value={90}>90 minutes</option>
              <option value={120}>120 minutes</option>
            </select>
            {errors.duration && <span className={styles.error}>{errors.duration}</span>}
          </div>
        </div>
      </div>
      
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Location</h3>
        
        <div className={styles.formGroup}>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="isVideoCall"
              name="isVideoCall"
              checked={formData.isVideoCall || false}
              onChange={handleChange}
            />
            <label htmlFor="isVideoCall">This is a video appointment</label>
          </div>
        </div>
        
        {formData.isVideoCall ? (
          <div className={styles.formGroup}>
            <label htmlFor="videoCallUrl">Video Call URL</label>
            <input
              type="url"
              id="videoCallUrl"
              name="videoCallUrl"
              value={formData.videoCallUrl || ''}
              onChange={handleChange}
              placeholder="https://meet.example.com/appointment"
              className={errors.videoCallUrl ? styles.inputError : ''}
            />
            {errors.videoCallUrl && <span className={styles.error}>{errors.videoCallUrl}</span>}
          </div>
        ) : (
          <div className={styles.formGroup}>
            <label htmlFor="location">
              <FiMapPin className={styles.inputIcon} /> Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location || ''}
              onChange={handleChange}
              placeholder="Facility name, room number, etc."
              className={errors.location ? styles.inputError : ''}
            />
            {errors.location && <span className={styles.error}>{errors.location}</span>}
          </div>
        )}
      </div>
      
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Additional Information</h3>
        
        <div className={styles.formGroup}>
          <label htmlFor="notes">
            <FiFileText className={styles.inputIcon} /> Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes || ''}
            onChange={handleChange}
            placeholder="Special instructions, preparation requirements, etc."
            rows={3}
          />
        </div>
        
        <div className={styles.checkboxesGrid}>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="insuranceRequired"
              name="insuranceRequired"
              checked={formData.insuranceRequired || false}
              onChange={handleChange}
            />
            <label htmlFor="insuranceRequired">Insurance Required</label>
          </div>
          
          {formData.insuranceRequired && (
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="insuranceVerified"
                name="insuranceVerified"
                checked={formData.insuranceVerified || false}
                onChange={handleChange}
              />
              <label htmlFor="insuranceVerified">Insurance Verified</label>
            </div>
          )}
          
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="referralRequired"
              name="referralRequired"
              checked={formData.referralRequired || false}
              onChange={handleChange}
            />
            <label htmlFor="referralRequired">Referral Required</label>
          </div>
          
          {formData.referralRequired && (
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="referralSubmitted"
                name="referralSubmitted"
                checked={formData.referralSubmitted || false}
                onChange={handleChange}
              />
              <label htmlFor="referralSubmitted">Referral Submitted</label>
            </div>
          )}
          
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="reminderSet"
              name="reminderSet"
              checked={formData.reminderSet || false}
              onChange={handleChange}
            />
            <label htmlFor="reminderSet">Set Reminder</label>
          </div>
        </div>
      </div>
      
      <div className={styles.formActions}>
        <Button 
          variant="secondary" 
          size="md" 
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          variant="primary" 
          size="md" 
          type="submit"
        >
          {initialAppointment?.id ? 'Update Appointment' : 'Schedule Appointment'}
        </Button>
      </div>
    </form>
  );
};

export default AppointmentForm;
