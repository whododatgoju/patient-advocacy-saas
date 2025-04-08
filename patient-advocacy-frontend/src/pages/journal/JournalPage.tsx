import React, { useState, useEffect, useRef } from 'react';
import MainLayout from '../components/layout/MainLayout';
import Button from '../components/common/Button';
import styles from './JournalPage.module.css';
import SymptomTracker, { Symptom } from '../components/journal/SymptomTracker';
import BodyMap, { BodyRegion } from '../components/journal/BodyMap';
import SymptomPatternVisualizer from '../components/journal/SymptomPatternVisualizer';

// Mock data for journal entries
const MOCK_ENTRIES: JournalEntry[] = [
  {
    id: 1,
    date: '2023-12-01T10:30:00',
    title: 'First Appointment with Dr. Smith',
    content: 'Had my first appointment with Dr. Smith today. She was very thorough and listened to all my concerns. She recommended some tests and prescribed medication for my condition.',
    mood: 'Happy',
    tags: ['Doctor Visit', 'Medication'],
    videoBlob: null as Blob | null
  },
  {
    id: 2,
    date: '2023-12-05T14:45:00',
    title: 'Started New Medication',
    content: 'Started taking the new medication prescribed by Dr. Smith. Feeling a bit tired but no major side effects so far.',
    mood: 'Neutral',
    tags: ['Medication', 'Side Effects'],
    videoBlob: null as Blob | null
  },
  {
    id: 3,
    date: '2023-12-10T09:15:00',
    title: 'Follow-up Appointment',
    content: 'Had a follow-up appointment today. My test results came back normal, which is a relief. Dr. Smith recommended continuing the medication for another month.',
    mood: 'Happy',
    tags: ['Test Results', 'Doctor Visit'],
    videoBlob: null as Blob | null
  }
];

// Mood options
const MOOD_OPTIONS = [
  { value: 'happy', label: 'Happy', emoji: '😊' },
  { value: 'neutral', label: 'Neutral', emoji: '😐' },
  { value: 'sad', label: 'Sad', emoji: '😔' },
  { value: 'pain', label: 'Pain', emoji: '😣' },
  { value: 'anxious', label: 'Anxious', emoji: '😰' }
];

// Define the type for a journal entry
interface JournalEntry {
  id: number;
  date: string;
  title: string;
  content: string;
  mood: string;
  tags: string[];
  videoBlob: Blob | null;
  symptoms?: Symptom[];
  bodyRegions?: string[];
}

const JournalPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>(MOCK_ENTRIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [videoSupported, setVideoSupported] = useState(false);
  const [showVideoPreview, setShowVideoPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<'journal' | 'symptoms'>('journal');
  const [entrySymptoms, setEntrySymptoms] = useState<Symptom[]>([]);
  const [selectedBodyRegions, setSelectedBodyRegions] = useState<string[]>([]);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | '3months' | 'all'>('month');
  const [allSymptoms, setAllSymptoms] = useState<Symptom[]>([]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoChunksRef = useRef<Blob[]>([]);
  
  // New entry form state
  const [newEntry, setNewEntry] = useState<JournalEntry>({
    id: 0,
    date: '',
    title: '',
    content: '',
    mood: '',
    tags: [],
    videoBlob: null as Blob | null,
    symptoms: [],
    bodyRegions: []
  });

  // Check if speech recognition is supported
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      setSpeechSupported(true);
    } else {
      console.warn("Speech recognition is not supported in this browser.");
    }
    
    // Check if video recording is supported
    if (navigator.mediaDevices && 'getUserMedia' in navigator.mediaDevices) {
      setVideoSupported(true);
    } else {
      console.warn("Video recording is not supported in this browser.");
    }
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'tags') {
      setNewEntry({
        ...newEntry,
        tags: value ? value.split(',').map((tag: string) => tag.trim()) : []
      });
    } else {
      setNewEntry({
        ...newEntry,
        [name]: value
      });
    }
  };

  // Start speech recognition
  const toggleSpeechRecognition = () => {
    if (!speechSupported) return;

    // @ts-ignore: We've already checked if these APIs exist
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    if (!isListening) {
      // Start listening
      recognition.start();
      setIsListening(true);
      
      let finalTranscript = newEntry.content;
      
      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += ' ' + transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        setNewEntry({
          ...newEntry,
          content: finalTranscript.trim() + (interimTranscript ? ' ' + interimTranscript : '')
        });
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      
      recognition.onend = () => {
        // When speech recognition service disconnects
        if (isListening) {
          setIsListening(false);
        }
      };
    } else {
      // Stop listening
      recognition.stop();
      setIsListening(false);
    }
  };

  // Toggle video recording
  const toggleVideoRecording = async () => {
    if (!videoSupported) return;

    if (!isRecordingVideo) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        
        // Display live preview
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        
        // Start recording
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        videoChunksRef.current = [];
        
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            videoChunksRef.current.push(event.data);
          }
        };
        
        mediaRecorder.onstop = () => {
          const videoBlob = new Blob(videoChunksRef.current, { type: 'video/webm' });
          const url = URL.createObjectURL(videoBlob);
          
          setVideoURL(url);
          setShowVideoPreview(true);
          setNewEntry(prev => ({ ...prev, videoBlob }));
          
          // Stop all tracks in the stream
          if (videoRef.current && videoRef.current.srcObject) {
            const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
          }
        };
        
        mediaRecorder.start();
        setIsRecordingVideo(true);
      } catch (error) {
        console.error("Error accessing camera and microphone:", error);
      }
    } else {
      // Stop recording
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsRecordingVideo(false);
      }
    }
  };
  
  // Remove video from entry
  const removeVideo = () => {
    setVideoURL(null);
    setShowVideoPreview(false);
    setNewEntry(prev => ({ ...prev, videoBlob: null }));
  };

  // Handle adding a symptom to the current entry
  const handleAddSymptom = (symptom: Symptom) => {
    setEntrySymptoms([...entrySymptoms, symptom]);
    setNewEntry(prev => ({
      ...prev,
      symptoms: [...(prev.symptoms || []), symptom]
    }));
  };

  // Handle selecting a body region
  const handleSelectBodyRegion = (region: BodyRegion) => {
    const regionId = region.id;
    
    if (selectedBodyRegions.includes(regionId)) {
      // Remove if already selected
      const updatedRegions = selectedBodyRegions.filter(id => id !== regionId);
      setSelectedBodyRegions(updatedRegions);
      setNewEntry(prev => ({
        ...prev,
        bodyRegions: updatedRegions
      }));
    } else {
      // Add if not already selected
      const updatedRegions = [...selectedBodyRegions, regionId];
      setSelectedBodyRegions(updatedRegions);
      setNewEntry(prev => ({
        ...prev,
        bodyRegions: updatedRegions
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new entry
    const entry: JournalEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      title: newEntry.title,
      content: newEntry.content,
      mood: newEntry.mood,
      tags: newEntry.tags,
      videoBlob: newEntry.videoBlob,
      symptoms: entrySymptoms,
      bodyRegions: selectedBodyRegions
    };
    
    // Add to entries
    setEntries([entry, ...entries]);
    
    // Add symptoms to all symptoms for pattern tracking
    if (entrySymptoms.length > 0) {
      setAllSymptoms([...allSymptoms, ...entrySymptoms]);
    }
    
    // Reset form
    setNewEntry({
      id: 0,
      date: '',
      title: '',
      content: '',
      mood: '',
      tags: [],
      videoBlob: null,
      symptoms: [],
      bodyRegions: []
    });
    setEntrySymptoms([]);
    setSelectedBodyRegions([]);
    
    // Hide form
    setShowForm(false);
  };

  // Filter entries based on search term and selected mood
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = searchTerm === '' || 
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesMood = selectedMood === '' || entry.mood === selectedMood;
    
    return matchesSearch && matchesMood;
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <MainLayout>
      <div className={styles.journalContainer}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Health Journal</h1>
          {!showForm && (
            <Button variant="primary" onClick={() => setShowForm(true)}>
              New Entry
            </Button>
          )}
        </div>

        {!showForm && allSymptoms.length > 0 && (
          <div className={styles.patternSection}>
            <h2 className={styles.sectionTitle}>Symptom Patterns</h2>
            <div className={styles.timeRangeSelector}>
              <span className={styles.timeRangeLabel}>Time Range:</span>
              <div className={styles.timeRangeOptions}>
                <button 
                  className={`${styles.timeRangeOption} ${timeRange === 'week' ? styles.selectedRange : ''}`}
                  onClick={() => setTimeRange('week' as 'week' | 'month' | '3months' | 'all')}
                >
                  Week
                </button>
                <button 
                  className={`${styles.timeRangeOption} ${timeRange === 'month' ? styles.selectedRange : ''}`}
                  onClick={() => setTimeRange('month' as 'week' | 'month' | '3months' | 'all')}
                >
                  Month
                </button>
                <button 
                  className={`${styles.timeRangeOption} ${timeRange === '3months' ? styles.selectedRange : ''}`}
                  onClick={() => setTimeRange('3months' as 'week' | 'month' | '3months' | 'all')}
                >
                  3 Months
                </button>
                <button 
                  className={`${styles.timeRangeOption} ${timeRange === 'all' ? styles.selectedRange : ''}`}
                  onClick={() => setTimeRange('all' as 'week' | 'month' | '3months' | 'all')}
                >
                  All Time
                </button>
              </div>
            </div>
            <SymptomPatternVisualizer 
              symptoms={allSymptoms}
              timeRange={timeRange}
              className={styles.patternVisualizer}
            />
          </div>
        )}

        {showForm && (
          <div className={styles.newEntryForm}>
            <h2 className={styles.formTitle}>New Journal Entry</h2>
            
            <div className={styles.formTabs}>
              <button
                className={`${styles.formTab} ${activeTab === 'journal' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('journal')}
              >
                Journal Entry
              </button>
              <button
                className={`${styles.formTab} ${activeTab === 'symptoms' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('symptoms')}
              >
                Track Symptoms
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              {activeTab === 'journal' ? (
                <>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="title">Title</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className={styles.formInput}
                        value={newEntry.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>How are you feeling today?</label>
                    <div className={styles.moodSelector}>
                      {MOOD_OPTIONS.map(mood => (
                        <div 
                          key={mood.value}
                          className={styles.moodOption}
                          onClick={() => setNewEntry({...newEntry, mood: mood.value})}
                        >
                          <div 
                            className={`${styles.moodIcon} ${newEntry.mood === mood.value ? styles.moodIconSelected : ''}`}
                          >
                            <span style={{fontSize: '24px'}}>{mood.emoji}</span>
                          </div>
                          <span>{mood.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="content">Journal Entry</label>
                    <div className={styles.textareaContainer}>
                      <textarea
                        id="content"
                        name="content"
                        className={styles.formTextarea}
                        value={newEntry.content}
                        onChange={handleInputChange}
                        required
                      />
                      <div className={styles.mediaButtons}>
                        {speechSupported && (
                          <button 
                            type="button"
                            className={`${styles.speechButton} ${isListening ? styles.listening : ''}`}
                            onClick={toggleSpeechRecognition}
                            title={isListening ? "Stop dictation" : "Start dictation"}
                          >
                            <span role="img" aria-label="microphone">
                              {isListening ? '🔴' : '🎤'}
                            </span>
                          </button>
                        )}
                        
                        {videoSupported && (
                          <button 
                            type="button"
                            className={`${styles.videoButton} ${isRecordingVideo ? styles.recording : ''}`}
                            onClick={toggleVideoRecording}
                            title={isRecordingVideo ? "Stop recording" : "Record video"}
                          >
                            <span role="img" aria-label="video camera">
                              {isRecordingVideo ? '🔴' : '📹'}
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                    {isListening && (
                      <div className={styles.listeningIndicator}>
                        Listening... Speak clearly into your microphone
                      </div>
                    )}
                    {isRecordingVideo && (
                      <div className={styles.recordingIndicator}>
                        Recording video... Speak clearly and keep face in frame
                      </div>
                    )}
                    
                    {/* Video preview area */}
                    {showVideoPreview && videoURL && (
                      <div className={styles.videoPreviewContainer}>
                        <h4 className={styles.videoPreviewTitle}>Video Preview</h4>
                        <video 
                          className={styles.videoPreview} 
                          src={videoURL} 
                          controls
                        />
                        <button 
                          type="button" 
                          className={styles.removeVideoButton}
                          onClick={removeVideo}
                        >
                          Remove Video
                        </button>
                      </div>
                    )}
                    
                    {/* Video recording preview */}
                    {isRecordingVideo && (
                      <div className={styles.liveVideoContainer}>
                        <video 
                          ref={videoRef}
                          className={styles.liveVideo} 
                          muted
                        />
                      </div>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="tags">Tags (comma separated)</label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      className={styles.formInput}
                      value={newEntry.tags.join(', ')}
                      onChange={handleInputChange}
                      placeholder="e.g., headache, medication, exercise"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.symptomTrackingContainer}>
                    <SymptomTracker 
                      onAddSymptom={handleAddSymptom}
                      existingSymptoms={entrySymptoms}
                    />
                    
                    <div className={styles.bodyMapSection}>
                      <h3 className={styles.sectionTitle}>Mark Affected Body Areas</h3>
                      <BodyMap 
                        onSelectRegion={handleSelectBodyRegion}
                        selectedRegions={selectedBodyRegions}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className={styles.formActions}>
                <Button variant="secondary" type="button" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Save Entry
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className={styles.filterBar}>
          <span className={styles.filterLabel}>Filter entries:</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by title, content, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className={styles.formSelect}
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
          >
            <option value="">All moods</option>
            {MOOD_OPTIONS.map(mood => (
              <option key={mood.value} value={mood.value}>
                {mood.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.entriesContainer}>
          {filteredEntries.length === 0 ? (
            <div className={styles.noEntries}>
              <p>No journal entries found. Try adjusting your filters or create a new entry.</p>
            </div>
          ) : (
            filteredEntries.map(entry => (
              <div key={entry.id} className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <span className={styles.entryDate}>{formatDate(entry.date)}</span>
                  <div className={styles.entryMood}>
                    {MOOD_OPTIONS.find(mood => mood.value === entry.mood)?.emoji}
                  </div>
                </div>
                <h3 className={styles.entryTitle}>{entry.title}</h3>
                <p className={styles.entryContent}>{entry.content}</p>
                
                {/* Display symptoms */}
                {entry.symptoms && entry.symptoms.length > 0 && (
                  <div className={styles.entrySymptoms}>
                    <h4 className={styles.entrySubtitle}>Symptoms Tracked</h4>
                    <div className={styles.symptomCards}>
                      {entry.symptoms.map(symptom => (
                        <div key={symptom.id} className={styles.symptomCard}>
                          <div className={styles.symptomHeader}>
                            <span className={styles.symptomName}>{symptom.name}</span>
                            <span className={styles.symptomSeverity}>
                              Severity: {symptom.severity}/10
                            </span>
                          </div>
                          {(symptom.location && symptom.location.length > 0) && (
                            <div className={styles.symptomDetail}>
                              <span className={styles.detailLabel}>Location:</span>
                              <span>{symptom.location.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Display body regions */}
                {entry.bodyRegions && entry.bodyRegions.length > 0 && (
                  <div className={styles.entryBodyRegions}>
                    <div className={styles.bodyRegionLabel}>Affected areas:</div>
                    <div className={styles.bodyRegionTags}>
                      {entry.bodyRegions.map((regionId, index) => (
                        <span key={index} className={styles.bodyRegionTag}>
                          {regionId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {entry.tags.length > 0 && (
                  <div className={styles.entryTags}>
                    {entry.tags.map((tag, index) => (
                      <span key={index} className={styles.entryTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {entry.videoBlob && (
                  <div className={styles.entryVideo}>
                    <video 
                      className={styles.entryVideoPreview} 
                      src={URL.createObjectURL(entry.videoBlob)} 
                      controls
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {filteredEntries.length > 0 && (
          <div className={styles.paginationContainer}>
            <button className={`${styles.paginationButton} ${styles.paginationButtonActive}`}>1</button>
            <button className={styles.paginationButton}>2</button>
            <button className={styles.paginationButton}>3</button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default JournalPage;
