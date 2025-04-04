import React, { useState } from 'react';
import styles from './SymptomTracker.module.css';

export interface Symptom {
  id: number;
  name: string;
  severity: number; // 0-10
  location?: string[];
  timeOfDay?: string;
  duration?: string;
  triggers?: string[];
  notes?: string;
  timestamp: string; // ISO string date
}

export interface SymptomGroup {
  id: number;
  name: string;
  symptoms: string[]; // List of common symptoms in this group
}

export interface SymptomTrackerProps {
  onAddSymptom: (symptom: Symptom) => void;
  existingSymptoms?: Symptom[];
  className?: string;
}

// Common symptom groups
const SYMPTOM_GROUPS: SymptomGroup[] = [
  {
    id: 1,
    name: 'Pain',
    symptoms: ['Headache', 'Joint pain', 'Muscle pain', 'Back pain', 'Chest pain', 'Abdominal pain']
  },
  {
    id: 2,
    name: 'Digestive',
    symptoms: ['Nausea', 'Vomiting', 'Diarrhea', 'Constipation', 'Bloating', 'Acid reflux', 'Loss of appetite']
  },
  {
    id: 3,
    name: 'Respiratory',
    symptoms: ['Cough', 'Shortness of breath', 'Wheezing', 'Rapid breathing', 'Chest tightness']
  },
  {
    id: 4,
    name: 'Cardiovascular',
    symptoms: ['Heart palpitations', 'Irregular heartbeat', 'Dizziness', 'Fainting', 'Swelling (edema)']
  },
  {
    id: 5,
    name: 'Neurological',
    symptoms: ['Headache', 'Dizziness', 'Confusion', 'Memory issues', 'Numbness/tingling', 'Balance problems', 'Visual disturbances']
  },
  {
    id: 6,
    name: 'Mental Health',
    symptoms: ['Anxiety', 'Depression', 'Mood swings', 'Irritability', 'Difficulty concentrating', 'Insomnia']
  },
  {
    id: 7,
    name: 'Skin & Hair',
    symptoms: ['Rash', 'Itching', 'Dry skin', 'Hair loss', 'Excessive sweating', 'Skin discoloration']
  },
  {
    id: 8,
    name: 'Energy & Sleep',
    symptoms: ['Fatigue', 'Weakness', 'Insomnia', 'Excessive sleepiness', 'Sleep disturbances']
  }
];

// Common body locations
const BODY_LOCATIONS = [
  'Head', 'Face', 'Neck', 'Chest', 'Back (upper)', 'Back (lower)', 
  'Abdomen', 'Pelvis', 'Left arm', 'Right arm', 'Left hand', 'Right hand',
  'Left leg', 'Right leg', 'Left foot', 'Right foot', 'Joints', 'Generalized'
];

// Time of day options
const TIME_OF_DAY = [
  'Morning (wake-up)', 'Morning', 'Afternoon', 'Evening', 'Night', 'During sleep', 'After meals', 'After activity', 'Random/variable'
];

const SymptomTracker: React.FC<SymptomTrackerProps> = ({ 
  onAddSymptom, 
  existingSymptoms = [],
  className = ''
}) => {
  const [selectedGroup, setSelectedGroup] = useState<SymptomGroup | null>(null);
  const [customSymptom, setCustomSymptom] = useState('');
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [severity, setSeverity] = useState<number>(5);
  const [locations, setLocations] = useState<string[]>([]);
  const [timeOfDay, setTimeOfDay] = useState('');
  const [duration, setDuration] = useState('');
  const [triggers, setTriggers] = useState('');
  const [notes, setNotes] = useState('');

  const handleSelectGroup = (group: SymptomGroup) => {
    setSelectedGroup(group);
    setSelectedSymptom('');
  };

  const handleSelectSymptom = (symptom: string) => {
    setSelectedSymptom(symptom);
    setCustomSymptom('');
  };

  const handleLocationToggle = (location: string) => {
    if (locations.includes(location)) {
      setLocations(locations.filter(loc => loc !== location));
    } else {
      setLocations([...locations, location]);
    }
  };

  const handleAddSymptom = () => {
    const symptomName = selectedSymptom || customSymptom;
    
    if (!symptomName) {
      alert("Please select or enter a symptom");
      return;
    }

    const newSymptom: Symptom = {
      id: Date.now(),
      name: symptomName,
      severity,
      location: locations.length > 0 ? locations : undefined,
      timeOfDay: timeOfDay || undefined,
      duration: duration || undefined,
      triggers: triggers ? triggers.split(',').map(t => t.trim()) : undefined,
      notes: notes || undefined,
      timestamp: new Date().toISOString()
    };

    onAddSymptom(newSymptom);
    
    // Reset form for next entry
    setSelectedSymptom('');
    setCustomSymptom('');
    setSeverity(5);
    setLocations([]);
    setTimeOfDay('');
    setDuration('');
    setTriggers('');
    setNotes('');
  };

  return (
    <div className={`${styles.symptomTracker} ${className}`}>
      <h3 className={styles.trackerTitle}>Track Symptoms</h3>
      
      <div className={styles.symptomForm}>
        {/* Step 1: Select symptom group or enter custom */}
        <div className={styles.formSection}>
          <h4 className={styles.sectionTitle}>1. Select Symptom Category</h4>
          <div className={styles.symptomGroups}>
            {SYMPTOM_GROUPS.map(group => (
              <button
                key={group.id}
                className={`${styles.groupButton} ${selectedGroup?.id === group.id ? styles.groupButtonActive : ''}`}
                onClick={() => handleSelectGroup(group)}
                type="button"
              >
                {group.name}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Select specific symptom */}
        {selectedGroup && (
          <div className={styles.formSection}>
            <h4 className={styles.sectionTitle}>2. Select Specific Symptom</h4>
            <div className={styles.symptomList}>
              {selectedGroup.symptoms.map((symptom, index) => (
                <button
                  key={index}
                  className={`${styles.symptomButton} ${selectedSymptom === symptom ? styles.symptomButtonActive : ''}`}
                  onClick={() => handleSelectSymptom(symptom)}
                  type="button"
                >
                  {symptom}
                </button>
              ))}
            </div>
            <div className={styles.customSymptomContainer}>
              <span className={styles.orDivider}>OR</span>
              <input 
                type="text" 
                className={styles.customSymptomInput}
                placeholder="Enter a different symptom"
                value={customSymptom}
                onChange={(e) => {
                  setCustomSymptom(e.target.value);
                  setSelectedSymptom('');
                }}
              />
            </div>
          </div>
        )}

        {/* Step 3: Symptom details */}
        {(selectedSymptom || customSymptom) && (
          <div className={styles.formSection}>
            <h4 className={styles.sectionTitle}>3. Symptom Details</h4>
            
            {/* Severity slider */}
            <div className={styles.formGroup}>
              <label htmlFor="severity" className={styles.formLabel}>Severity (0-10)</label>
              <div className={styles.sliderContainer}>
                <input 
                  type="range" 
                  id="severity" 
                  className={styles.severitySlider}
                  min="0" 
                  max="10" 
                  step="1"
                  value={severity}
                  onChange={(e) => setSeverity(parseInt(e.target.value))} 
                />
                <div className={styles.sliderValue} style={{ left: `calc(${severity * 10}% - 12px)` }}>
                  {severity}
                </div>
                <div className={styles.sliderLabels}>
                  <span>None</span>
                  <span>Mild</span>
                  <span>Moderate</span>
                  <span>Severe</span>
                  <span>Extreme</span>
                </div>
              </div>
            </div>
            
            {/* Location(s) */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Location(s)</label>
              <div className={styles.locationSelector}>
                {BODY_LOCATIONS.map((location, index) => (
                  <div 
                    key={index} 
                    className={`${styles.locationTag} ${locations.includes(location) ? styles.locationTagSelected : ''}`}
                    onClick={() => handleLocationToggle(location)}
                  >
                    {location}
                  </div>
                ))}
              </div>
            </div>

            {/* Time of day */}
            <div className={styles.formGroup}>
              <label htmlFor="timeOfDay" className={styles.formLabel}>Time of Day / Pattern</label>
              <select 
                id="timeOfDay" 
                className={styles.formSelect}
                value={timeOfDay}
                onChange={(e) => setTimeOfDay(e.target.value)}
              >
                <option value="">Select when it occurs</option>
                {TIME_OF_DAY.map((time, index) => (
                  <option key={index} value={time}>{time}</option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div className={styles.formGroup}>
              <label htmlFor="duration" className={styles.formLabel}>Duration</label>
              <input 
                type="text" 
                id="duration" 
                className={styles.formInput}
                placeholder="e.g., 2 hours, all day, comes and goes"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            {/* Triggers */}
            <div className={styles.formGroup}>
              <label htmlFor="triggers" className={styles.formLabel}>Potential Triggers (comma separated)</label>
              <input 
                type="text" 
                id="triggers" 
                className={styles.formInput}
                placeholder="e.g., after meals, stress, medication"
                value={triggers}
                onChange={(e) => setTriggers(e.target.value)}
              />
            </div>

            {/* Additional notes */}
            <div className={styles.formGroup}>
              <label htmlFor="notes" className={styles.formLabel}>Additional Notes</label>
              <textarea 
                id="notes" 
                className={styles.formTextarea}
                placeholder="Any other observations or details about this symptom"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <button 
              type="button" 
              className={styles.addSymptomButton}
              onClick={handleAddSymptom}
            >
              Add Symptom to Journal
            </button>
          </div>
        )}
      </div>

      {/* Display existing symptoms */}
      {existingSymptoms.length > 0 && (
        <div className={styles.recordedSymptoms}>
          <h4 className={styles.sectionTitle}>Recorded Symptoms</h4>
          <div className={styles.symptomCards}>
            {existingSymptoms.map(symptom => (
              <div key={symptom.id} className={styles.symptomCard}>
                <div className={styles.symptomCardHeader}>
                  <h5 className={styles.symptomName}>{symptom.name}</h5>
                  <span className={`${styles.severityBadge} ${styles[`severity${Math.ceil(symptom.severity / 2)}`]}`}>
                    {symptom.severity}/10
                  </span>
                </div>
                <div className={styles.symptomCardBody}>
                  {symptom.location && (
                    <div className={styles.symptomDetail}>
                      <span className={styles.detailLabel}>Location:</span>
                      <span>{symptom.location.join(', ')}</span>
                    </div>
                  )}
                  {symptom.timeOfDay && (
                    <div className={styles.symptomDetail}>
                      <span className={styles.detailLabel}>Time:</span>
                      <span>{symptom.timeOfDay}</span>
                    </div>
                  )}
                  {symptom.duration && (
                    <div className={styles.symptomDetail}>
                      <span className={styles.detailLabel}>Duration:</span>
                      <span>{symptom.duration}</span>
                    </div>
                  )}
                  {symptom.triggers && symptom.triggers.length > 0 && (
                    <div className={styles.symptomDetail}>
                      <span className={styles.detailLabel}>Triggers:</span>
                      <span>{symptom.triggers.join(', ')}</span>
                    </div>
                  )}
                  {symptom.notes && (
                    <div className={styles.symptomNote}>
                      <span className={styles.detailLabel}>Notes:</span>
                      <p>{symptom.notes}</p>
                    </div>
                  )}
                </div>
                <div className={styles.symptomCardFooter}>
                  <span className={styles.symptomTimestamp}>
                    {new Date(symptom.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomTracker;
