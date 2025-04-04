import React from 'react';
import styles from '../../pages/AdvocateMatchPage.module.css';

interface AdvocateCardProps {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  location: string;
  tags: string[];
  experience: number;
  availability: 'available-now' | 'available-soon' | 'available-later';
  image: string;
  matchPercentage?: number;
  onConnect: (advocateId: number) => void;
}

const AdvocateCard: React.FC<AdvocateCardProps> = ({
  id,
  name,
  specialty,
  rating,
  location,
  tags,
  experience,
  availability,
  image,
  matchPercentage,
  onConnect
}) => {
  return (
    <div className={styles.advocateCard}>
      <div className={styles.advocateCardHeader}>
        <img 
          src={image} 
          alt={name}
          className={styles.advocateCardImg}
        />
        <span className={styles.specialtyBadge}>{specialty}</span>
        {matchPercentage && (
          <span className={styles.skillMatchBadge}>
            {matchPercentage}% Match
          </span>
        )}
      </div>
      <div className={styles.advocateCardBody}>
        <div className={styles.advocateRating}>
          <span className={styles.starIcon}>★</span>
          <span>{rating}</span>
        </div>
        <h3 className={styles.advocateName}>{name}</h3>
        <div className={styles.advocateLocation}>
          <span className={styles.locationIcon}>📍</span>
          <span>{location}</span>
        </div>
        <div className={styles.advocateTags}>
          {tags.map((tag, index) => (
            <span key={index} className={styles.advocateTag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.advocateFooterInfo}>
          <div className={styles.advocateExperience}>
            <span className={styles.experienceLabel}>Experience</span>
            <span className={styles.experienceValue}>
              {experience} years
            </span>
          </div>
        </div>
      </div>
      <div className={styles.advocateCardFooter}>
        <div className={`${styles.advocateAvailability} ${
          availability === 'available-now'
            ? styles.availableNow
            : availability === 'available-soon'
            ? styles.availableSoon
            : styles.availableLater
        }`}>
          {availability === 'available-now'
            ? '● Available Now'
            : availability === 'available-soon'
            ? '● Available Soon'
            : '● Available Next Week'}
        </div>
        <button 
          className={styles.connectButton}
          onClick={() => onConnect(id)}
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default AdvocateCard;
