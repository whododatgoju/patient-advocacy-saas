import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import styles from './ResourceDetailsPage.module.css';

// Resource details page component
const ResourceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // For now, we're focusing on the Patient Bill of Rights (id: 1)
  if (id === '1') {
    return (
      <MainLayout>
        <div className={styles.detailsContainer}>
          <div className={styles.breadcrumbs}>
            <Link to="/resources">Resources</Link> &gt; Patient Bill of Rights
          </div>
          
          <div className={styles.header}>
            <h1>Patient Bill of Rights</h1>
            <p className={styles.subtitle}>
              A comprehensive guide to your legal and ethical rights as a patient in any healthcare setting
            </p>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Introduction</h2>
            <p>
              The Patient Bill of Rights is a comprehensive document that outlines the rights and responsibilities
              you have as a patient in any healthcare setting, including hospitals, clinics, emergency rooms, and
              long-term care facilities. Understanding these rights empowers you to actively participate in your
              healthcare decisions and ensure you receive appropriate, respectful care.
            </p>
            <p>
              These rights apply to patients of all ages, backgrounds, and medical conditions, and are
              designed to promote dignity, respect, and quality care. Healthcare providers have a responsibility
              to honor these rights and address any concerns you may have regarding your care.
            </p>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Your Rights as a Patient</h2>
            
            <div className={styles.rightItem}>
              <h3>1. Right to Respectful Care</h3>
              <p>
                You have the right to considerate, respectful care that recognizes your personal dignity and 
                values at all times. Healthcare providers should treat you with courtesy and respect regardless 
                of your age, race, ethnicity, religion, culture, language, physical or mental disability, 
                socioeconomic status, sex, sexual orientation, gender identity or expression.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>2. Right to Information</h3>
              <p>
                You have the right to receive accurate, clear information about your diagnosis, treatment options, 
                risks, and prognosis in terms you can understand. Healthcare providers should explain your medical 
                condition and any proposed procedures without using excessive technical jargon.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>3. Right to Informed Consent</h3>
              <p>
                You have the right to be fully informed about any proposed procedure or treatment before giving consent. 
                This includes information about potential risks, benefits, alternatives, and the consequences of refusing treatment. 
                You can withhold or withdraw consent at any time.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>4. Right to Participate in Decisions</h3>
              <p>
                You have the right to participate in decisions about your healthcare and treatment plan. 
                Your healthcare provider should involve you in discussions about your care and respect your preferences.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>5. Right to Privacy and Confidentiality</h3>
              <p>
                You have the right to privacy during medical examinations and discussions. Your medical information, 
                including records and conversations about your health, should be kept confidential in accordance with HIPAA regulations.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>6. Right to Access Medical Records</h3>
              <p>
                You have the right to access, review, and obtain copies of your medical records. You can also request 
                corrections to your records if you believe there are errors.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>7. Right to Refuse Treatment</h3>
              <p>
                You have the right to refuse any treatment, medication, or procedure, even if it is life-saving, 
                as long as you are competent to make such decisions. Your healthcare providers should inform 
                you of the potential consequences of your refusal.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>8. Right to Advance Directives</h3>
              <p>
                You have the right to create advance directives, such as a living will or healthcare power of attorney, 
                that specify your wishes for medical care if you become unable to make decisions. Healthcare providers 
                must honor these directives to the extent permitted by law.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>9. Right to Emergency Care</h3>
              <p>
                You have the right to receive screening and stabilizing treatment in an emergency, regardless of your 
                ability to pay or insurance status, as required by the Emergency Medical Treatment and Active Labor Act (EMTALA).
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>10. Right to Pain Management</h3>
              <p>
                You have the right to appropriate assessment and management of pain. Your healthcare providers should 
                respond promptly to reports of pain and provide information about pain relief measures.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>11. Right to Know Provider Credentials</h3>
              <p>
                You have the right to know the identity and professional status of individuals providing your care, 
                including their experience, qualifications, and whether they are students, residents, or trainees.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>12. Right to Non-Discrimination</h3>
              <p>
                You have the right to receive care without discrimination based on race, ethnicity, national origin, 
                religion, sex, age, mental or physical disability, sexual orientation, gender identity, or source of payment.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>13. Right to Visitors</h3>
              <p>
                You have the right to receive visitors of your choosing, including a spouse, domestic partner, family member, 
                or friend, and the right to withdraw or deny consent to visitors at any time.
              </p>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Frequently Asked Questions</h2>
            
            <div className={styles.faqItem}>
              <h3>How do I access my medical records?</h3>
              <p>
                Under HIPAA, you have the right to access and obtain copies of your medical records. Most healthcare 
                providers require a written request. You can typically obtain your records by:
              </p>
              <ul>
                <li>Submitting a written request to your healthcare provider's medical records department</li>
                <li>Using your healthcare provider's patient portal if available</li>
                <li>Completing a medical record release form</li>
              </ul>
              <p>
                Providers must provide these records within 30 days of your request, though they may charge a 
                reasonable fee for copying and mailing. You also have the right to request corrections if you 
                believe there are errors.
              </p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>Can I refuse treatment recommended by my doctor?</h3>
              <p>
                Yes, as an adult with decision-making capacity, you have the right to refuse any medical treatment, 
                even if it's life-saving. This is part of the principle of informed consent. Your healthcare provider 
                should explain the risks and benefits of refusing treatment, but the final decision is yours.
              </p>
              <p>
                Healthcare facilities should provide you with information about potential outcomes of your decision 
                to help you make an informed choice. It's advisable to discuss your concerns thoroughly with your 
                healthcare team before making such decisions.
              </p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>What privacy rights do I have regarding my medical information?</h3>
              <p>
                Under HIPAA, you have the right to privacy regarding your medical information. Healthcare providers 
                can only share your information for treatment, payment, or healthcare operations without your explicit 
                permission. Your rights include:
              </p>
              <ul>
                <li>Requesting restrictions on how your information is used or disclosed</li>
                <li>Receiving a notice of privacy practices from healthcare organizations</li>
                <li>Accessing your own records and requesting corrections</li>
                <li>Receiving an accounting of disclosures of your medical information</li>
                <li>Filing a complaint if you believe your privacy rights have been violated</li>
              </ul>
            </div>
            
            <div className={styles.faqItem}>
              <h3>What are advance directives and why do I need them?</h3>
              <p>
                Advance directives are legal documents that outline your healthcare preferences if you become unable 
                to make decisions for yourself. They include:
              </p>
              <ul>
                <li><strong>Living wills</strong>: Specify your wishes for end-of-life care</li>
                <li><strong>Healthcare powers of attorney</strong>: Designate someone to make decisions on your behalf</li>
              </ul>
              <p>
                These documents ensure your wishes are honored even if you can't communicate them, reduce family 
                conflicts about your care, and provide clear guidance to healthcare providers. You have the right 
                to create advance directives, and healthcare facilities are required to ask if you have them and 
                to honor them within legal limits.
              </p>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>External Resources</h2>
            <div className={styles.resourceLinks}>
              <a href="https://www.aha.org/advocacy/current-topics/patient-rights" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                American Hospital Association - Patient Bill of Rights
              </a>
              <a href="https://www.medicare.gov/what-medicare-covers/what-part-a-covers/hospital-discharge-planning" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                CMS Hospital Discharge Rights
              </a>
              <a href="https://www.caringinfo.org/planning/advance-directives/" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                CaringInfo - Understanding Advance Directives
              </a>
              <a href="https://www.hhs.gov/hipaa/for-individuals/index.html" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                U.S. Department of Health & Human Services - HIPAA
              </a>
            </div>
          </div>
          
          <div className={styles.actionSection}>
            <Link to="/journal" className={styles.actionButton}>
              Record a Journal Entry About Your Experience
            </Link>
            <Link to="/resources" className={styles.secondaryButton}>
              Back to All Resources
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  // For other resource IDs, we'll display a generic message for now
  return (
    <MainLayout>
      <div className={styles.detailsContainer}>
        <div className={styles.breadcrumbs}>
          <Link to="/resources">Resources</Link> &gt; Resource Details
        </div>
        
        <div className={styles.header}>
          <h1>Resource Details</h1>
          <p>Details for resource ID: {id}</p>
        </div>
        
        <div className={styles.actionSection}>
          <Link to="/resources" className={styles.secondaryButton}>
            Back to All Resources
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default ResourceDetailsPage;
