import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import VideoCallScheduler from '../components/video/VideoCallScheduler';
import styles from './ScheduleCallPage.module.css';

const ScheduleCallPage: React.FC = () => {
  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.headerSection}>
          <h1 className={styles.pageTitle}>Schedule a Video Call</h1>
          <p className={styles.pageDescription}>
            Connect with your healthcare providers and patient advocates through secure, HIPAA-compliant video calls.
          </p>
        </div>
        <VideoCallScheduler />
      </div>
    </MainLayout>
  );
};

export default ScheduleCallPage;
