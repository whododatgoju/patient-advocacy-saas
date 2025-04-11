import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Button from '../components/common/Button';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Your Healthcare Journey, <span className={styles.heroTitleSpan}>Simplified</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Connect with dedicated advocates, manage your healthcare, and access personalized resources all in one place.
            </p>
            <div className={styles.heroButtons}>
              <Link to="/signup">
                <Button variant="primary" size="lg">Sign Up</Button>
              </Link>
              <Link to="/login" className={styles.loginLink}>
                <Button variant="secondary" size="lg">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className={styles.featuresSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Features Designed For You</h2>
          
          <div className={styles.featuresGrid}>
            {/* Feature 1 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIcon} style={{backgroundColor: 'var(--color-patient)', color: 'white'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Find Your Advocate</h3>
              <p className={styles.featureDescription}>Connect with experienced patient advocates who specialize in your specific health needs.</p>
              <Link to="/advocate-match" style={{color: 'var(--color-primary)', fontWeight: 500}}>
                Find an advocate →
              </Link>
            </div>

            {/* Feature 2 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIcon} style={{backgroundColor: 'var(--color-advocate)', color: 'white'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Manage Your Healthcare</h3>
              <p className={styles.featureDescription}>Track appointments, medications, and communications with your healthcare providers.</p>
              <Link to="/dashboard" style={{color: 'var(--color-primary)', fontWeight: 500}}>
                View your dashboard →
              </Link>
            </div>

            {/* Feature 3 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIcon} style={{backgroundColor: 'var(--color-provider)', color: 'white'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Access Resources</h3>
              <p className={styles.featureDescription}>Explore our comprehensive library of health resources, educational materials, and support groups.</p>
              <Link to="/resources" style={{color: 'var(--color-primary)', fontWeight: 500}}>
                Browse resources →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonialsSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Success Stories</h2>
          
          <div className={styles.testimonialGrid}>
            {/* Testimonial 1 */}
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>
                  <div style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-gray-300)', color: 'white', fontWeight: 'bold'}}>
                    MR
                  </div>
                </div>
                <div className={styles.testimonialInfo}>
                  <h4 className={styles.testimonialName}>Maria Rodriguez</h4>
                  <p className={styles.testimonialRole}>Patient</p>
                </div>
              </div>
              <p className={styles.testimonialContent}>"After my diabetes diagnosis, I felt overwhelmed by all the information. My advocate helped me understand my treatment options and coordinate between my different doctors. The platform made everything so much easier."</p>
            </div>

            {/* Testimonial 2 */}
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>
                  <div style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-gray-300)', color: 'white', fontWeight: 'bold'}}>
                    JW
                  </div>
                </div>
                <div className={styles.testimonialInfo}>
                  <h4 className={styles.testimonialName}>James Washington</h4>
                  <p className={styles.testimonialRole}>Caregiver</p>
                </div>
              </div>
              <p className={styles.testimonialContent}>"Managing my mother's care with early-stage Alzheimer's while working full-time was nearly impossible. The advocacy platform connected us with resources and support that made a world of difference."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-action */}
      <section className={styles.ctaSection}>
        <div className="container">
          <h2 className={styles.ctaTitle}>Ready to Take Control of Your Healthcare Journey?</h2>
          <p className={styles.ctaDescription}>Join thousands of patients who have transformed their healthcare experience with our advocacy platform.</p>
          <div className={styles.ctaButtons}>
            <Link to="/signup">
              <Button variant="primary" size="lg">Create Your Free Account</Button>
            </Link>
            <p className={styles.loginLink}>
              Already have an account? <Link to="/login" className={styles.linkTextCta}>Sign in</Link>
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;
