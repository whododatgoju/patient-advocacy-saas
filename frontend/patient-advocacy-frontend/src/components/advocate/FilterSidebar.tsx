import React from 'react';
import styles from '../../pages/AdvocateMatchPage.module.css';

interface FilterSidebarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedSpecialties: string[];
  onSpecialtyChange: (specialty: string) => void;
  selectedAvailability: string[];
  onAvailabilityChange: (availability: string) => void;
  selectedExperience: number;
  onExperienceChange: (value: number) => void;
  selectedRating: number;
  onRatingChange: (value: number) => void;
  onResetFilters: () => void;
  onShowQuiz: () => void;
}

interface AvailabilityOption {
  value: string;
  label: string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  searchTerm,
  onSearchChange,
  selectedSpecialties,
  onSpecialtyChange,
  selectedAvailability,
  onAvailabilityChange,
  selectedExperience,
  onExperienceChange,
  selectedRating,
  onRatingChange,
  onResetFilters,
  onShowQuiz
}) => {
  // Specialties for filter
  const specialties = [
    "Chronic Illness",
    "Rare Diseases",
    "Senior Care",
    "Mental Health",
    "Maternal Health",
    "Cancer Support",
    "Pediatric Advocacy",
    "Disability Rights",
    "LGBTQ+ Healthcare",
    "Veterans Affairs",
    "Chronic Pain",
    "Insurance Navigation"
  ];
  
  // Availability options
  const availabilityOptions: AvailabilityOption[] = [
    { value: "available-now", label: "Available Now" },
    { value: "available-soon", label: "Available Within 48 Hours" },
    { value: "available-later", label: "Available Next Week" }
  ];

  return (
    <div className={styles.filtersContainer}>
      <input
        type="text"
        placeholder="Search by name, specialty, or location..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      
      {/* Quiz button */}
      <button 
        className="btn-primary w-full mb-6"
        onClick={onShowQuiz}
      >
        Take Matching Quiz
      </button>
      
      {/* Specialties Filter */}
      <div className={styles.filterSection}>
        <h3 className={styles.filterSectionTitle}>
          Specialties
        </h3>
        <div className={styles.checkboxGroup}>
          {specialties.slice(0, 6).map((specialty) => (
            <div key={specialty} className={styles.checkboxItem}>
              <input
                type="checkbox"
                id={`specialty-${specialty}`}
                checked={selectedSpecialties.includes(specialty)}
                onChange={() => onSpecialtyChange(specialty)}
              />
              <label 
                htmlFor={`specialty-${specialty}`}
                className={styles.checkboxLabel}
              >
                {specialty}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Availability Filter */}
      <div className={styles.filterSection}>
        <h3 className={styles.filterSectionTitle}>
          Availability
        </h3>
        <div className={styles.checkboxGroup}>
          {availabilityOptions.map((option) => (
            <div key={option.value} className={styles.checkboxItem}>
              <input
                type="checkbox"
                id={`availability-${option.value}`}
                checked={selectedAvailability.includes(option.value)}
                onChange={() => onAvailabilityChange(option.value)}
              />
              <label 
                htmlFor={`availability-${option.value}`}
                className={styles.checkboxLabel}
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Experience Filter */}
      <div className={styles.filterSection}>
        <h3 className={styles.filterSectionTitle}>
          Experience
        </h3>
        <input
          type="range"
          min="0"
          max="15"
          value={selectedExperience}
          onChange={(e) => onExperienceChange(parseInt(e.target.value))}
          className={styles.rangeInput}
        />
        <div className={styles.rangeLabels}>
          <span>Any</span>
          <span>{selectedExperience > 0 ? `${selectedExperience}+ years` : 'Any'}</span>
        </div>
      </div>
      
      {/* Rating Filter */}
      <div className={styles.filterSection}>
        <h3 className={styles.filterSectionTitle}>
          Minimum Rating
        </h3>
        <input
          type="range"
          min="0"
          max="5"
          step="0.5"
          value={selectedRating}
          onChange={(e) => onRatingChange(parseFloat(e.target.value))}
          className={styles.rangeInput}
        />
        <div className={styles.rangeLabels}>
          <span>Any</span>
          <span>{selectedRating > 0 ? `${selectedRating}+` : 'Any'}</span>
        </div>
      </div>
      
      {/* Reset Filters */}
      <button 
        className={styles.resetFilters}
        onClick={onResetFilters}
      >
        Reset All Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
