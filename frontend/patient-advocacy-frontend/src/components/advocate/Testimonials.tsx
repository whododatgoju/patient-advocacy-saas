import React from 'react';
import styles from '../../pages/AdvocateMatchPage.module.css';

interface Testimonial {
  id: number;
  text: string;
  name: string;
  role: string;
  avatar: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <div className={styles.testimonialSection}>
      <h2 className={styles.testimonialTitle}>What Our Patients Say</h2>
      <div className={styles.testimonialGrid}>
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className={styles.testimonialCard}>
            <p className={styles.testimonialText}>
              {testimonial.text}
            </p>
            <div className={styles.testimonialAuthor}>
              <img 
                src={testimonial.avatar} 
                alt={testimonial.name}
                className={styles.testimonialAvatar}
              />
              <div className={styles.testimonialInfo}>
                <span className={styles.testimonialName}>{testimonial.name}</span>
                <span className={styles.testimonialRole}>{testimonial.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
