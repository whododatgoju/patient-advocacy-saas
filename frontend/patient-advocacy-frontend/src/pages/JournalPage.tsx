import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import Button from '../components/common/Button';
import styles from './JournalPage.module.css';

// Mock data for journal entries
const MOCK_ENTRIES = [
  {
    id: 1,
    date: '2025-04-03',
    title: 'Started new medication',
    content: 'Started taking the new medication prescribed by Dr. Johnson. Feeling a bit tired but otherwise good.',
    mood: 'neutral',
    tags: ['medication', 'tiredness']
  },
  {
    id: 2,
    date: '2025-04-02',
    title: 'Great day with less pain',
    content: 'Had significantly less joint pain today. Was able to go for a 20-minute walk without discomfort.',
    mood: 'happy',
    tags: ['pain', 'exercise', 'improvement']
  },
  {
    id: 3,
    date: '2025-04-01',
    title: 'Increased headaches',
    content: 'Experiencing more frequent headaches, possibly related to the change in weather. Taking OTC pain relief as needed.',
    mood: 'sad',
    tags: ['headache', 'pain', 'weather']
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

const JournalPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [entries, setEntries] = useState(MOCK_ENTRIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  
  // New entry form state
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: '',
    tags: ''
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEntry({
      ...newEntry,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new entry
    const entry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      title: newEntry.title,
      content: newEntry.content,
      mood: newEntry.mood,
      tags: newEntry.tags.split(',').map(tag => tag.trim())
    };
    
    // Add to entries
    setEntries([entry, ...entries]);
    
    // Reset form
    setNewEntry({
      title: '',
      content: '',
      mood: '',
      tags: ''
    });
    
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

        {showForm && (
          <div className={styles.newEntryForm}>
            <h2 className={styles.formTitle}>New Journal Entry</h2>
            <form onSubmit={handleSubmit}>
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
                <textarea
                  id="content"
                  name="content"
                  className={styles.formTextarea}
                  value={newEntry.content}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="tags">Tags (comma separated)</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  className={styles.formInput}
                  value={newEntry.tags}
                  onChange={handleInputChange}
                  placeholder="e.g., headache, medication, exercise"
                />
              </div>

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
                {entry.tags.length > 0 && (
                  <div className={styles.entryTags}>
                    {entry.tags.map((tag, index) => (
                      <span key={index} className={styles.entryTag}>
                        {tag}
                      </span>
                    ))}
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
