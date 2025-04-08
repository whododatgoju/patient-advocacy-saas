import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import styles from './ResourceDetailsPage.module.css';

// Resource details page component
const ResourceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Patient Bill of Rights (id: 1)
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
  
  // Adverse Medication Reactions & Medical Malpractice Guide (id: 13)
  if (id === '13') {
    return (
      <MainLayout>
        <div className={styles.detailsContainer}>
          <div className={styles.breadcrumbs}>
            <Link to="/resources">Resources</Link> &gt; Adverse Medication Reactions & Medical Malpractice Guide
          </div>
          
          <div className={styles.header}>
            <h1>Adverse Medication Reactions & Medical Malpractice Guide</h1>
            <p className={styles.subtitle}>
              Essential steps to take if you experience an adverse medication reaction and guidelines for addressing potential medical malpractice
            </p>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Introduction</h2>
            <p>
              Adverse medication reactions can range from mild side effects to severe, life-threatening conditions. 
              When these reactions occur due to healthcare provider negligence or error, it may constitute medical malpractice.
              This guide outlines the steps to take immediately after experiencing an adverse medication reaction, how to 
              document the incident, when and how to seek medical attention, how to report the incident, and what to consider 
              if you believe you may have been a victim of medical malpractice.
            </p>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Immediate Steps After an Adverse Medication Reaction</h2>
            
            <div className={styles.rightItem}>
              <h3>1. Assess the Situation</h3>
              <p>
                Begin by taking a deep breath and assessing your symptoms. Depending on the severity:
              </p>
              <ul>
                <li><strong>For severe reactions (difficulty breathing, severe rash, swelling of face/throat, rapid heartbeat):</strong> Call 911 or have someone take you to the emergency room immediately.</li>
                <li><strong>For moderate reactions:</strong> Contact your healthcare provider right away for guidance.</li>
                <li><strong>For mild reactions:</strong> Document your symptoms and contact your healthcare provider during regular hours.</li>
              </ul>
            </div>
            
            <div className={styles.rightItem}>
              <h3>2. Stop Taking the Medication (If Safe)</h3>
              <p>
                Unless advised otherwise by a healthcare professional, stop taking the medication that caused the reaction. 
                However, for certain medications (such as some psychiatric medications or steroids), abrupt discontinuation 
                can be dangerous. Consult a healthcare provider before stopping any medication if possible.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>3. Preserve the Evidence</h3>
              <p>
                Keep the medication bottle, packaging, remaining pills, and any related documents such as the prescription label 
                and information sheet. These items can be crucial if you need to pursue legal action later.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>4. Seek Medical Attention</h3>
              <p>
                Even if symptoms appear mild, seeking medical attention is essential. Visit your primary care 
                physician, an urgent care facility, or an emergency room depending on the severity of your reaction.
                A medical professional can:
              </p>
              <ul>
                <li>Provide appropriate treatment for your reaction</li>
                <li>Document the adverse event in your medical record</li>
                <li>Determine if the reaction was caused by the medication</li>
                <li>Advise on alternative treatments</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Thorough Documentation</h2>
            
            <div className={styles.rightItem}>
              <h3>1. Document Your Symptoms</h3>
              <p>
                Keep a detailed log of all symptoms, including:
              </p>
              <ul>
                <li>When you started taking the medication</li>
                <li>Dosage information</li>
                <li>When symptoms first appeared</li>
                <li>Description of all symptoms (photos can be helpful for visible symptoms)</li>
                <li>How symptoms progressed or changed over time</li>
                <li>Any actions you took to alleviate symptoms</li>
              </ul>
            </div>
            
            <div className={styles.rightItem}>
              <h3>2. Create a Timeline</h3>
              <p>
                Document all interactions with healthcare providers related to this medication, including:
              </p>
              <ul>
                <li>Date and time of the prescription</li>
                <li>Name of the prescribing healthcare provider</li>
                <li>Information you were given about the medication and potential side effects</li>
                <li>Pharmacy where the prescription was filled</li>
                <li>All follow-up appointments and conversations</li>
                <li>Names and contact information of all medical professionals involved</li>
              </ul>
            </div>
            
            <div className={styles.rightItem}>
              <h3>3. Gather Medical Records</h3>
              <p>
                Request copies of all relevant medical records, including:
              </p>
              <ul>
                <li>Visit notes from the prescribing provider</li>
                <li>Pharmacy records</li>
                <li>Emergency room or hospital records if applicable</li>
                <li>Test results related to diagnosing or treating the reaction</li>
              </ul>
              <p>
                Under HIPAA, you have the legal right to access your medical records. Most providers require a written
                request and may charge a reasonable fee for copying.
              </p>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Reporting Adverse Medication Reactions</h2>
            
            <div className={styles.rightItem}>
              <h3>1. Report to FDA MedWatch</h3>
              <p>
                The U.S. Food and Drug Administration (FDA) collects information about adverse drug reactions through 
                its MedWatch program. Reporting your experience can help protect other patients. You can report:
              </p>
              <ul>
                <li>Online: <a href="https://www.fda.gov/safety/medwatch-fda-safety-information-and-adverse-event-reporting-program" target="_blank" rel="noopener noreferrer">FDA MedWatch</a></li>
                <li>By phone: 1-800-FDA-1088</li>
                <li>By mail: Download and complete the <a href="https://www.fda.gov/media/76299/download" target="_blank" rel="noopener noreferrer">FDA Form 3500</a></li>
              </ul>
            </div>
            
            <div className={styles.rightItem}>
              <h3>2. Report to Your Healthcare Provider</h3>
              <p>
                Make sure your healthcare provider is aware of your reaction so they can:
              </p>
              <ul>
                <li>Document it in your medical record</li>
                <li>Adjust your treatment plan accordingly</li>
                <li>Report the reaction to relevant authorities if required</li>
              </ul>
            </div>
            
            <div className={styles.rightItem}>
              <h3>3. Report to the Pharmacy</h3>
              <p>
                Notify the pharmacy where you filled the prescription. Pharmacists can:
              </p>
              <ul>
                <li>Update your medication profile to prevent future incidents</li>
                <li>Provide additional information about the medication</li>
                <li>Help report the reaction to appropriate authorities</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Understanding Medical Malpractice</h2>
            
            <div className={styles.rightItem}>
              <h3>What Constitutes Medical Malpractice?</h3>
              <p>
                Not all adverse medication reactions constitute medical malpractice. For a case to be considered malpractice, 
                four elements must be established:
              </p>
              <ol>
                <li><strong>Duty:</strong> The healthcare provider had a duty to provide a standard level of care</li>
                <li><strong>Breach:</strong> The provider breached that duty by failing to provide standard care</li>
                <li><strong>Causation:</strong> The breach directly caused harm to the patient</li>
                <li><strong>Damages:</strong> The patient suffered quantifiable harm as a result</li>
              </ol>
              <p>
                Common examples of medication-related malpractice include:
              </p>
              <ul>
                <li>Prescribing a medication to which the patient has a documented allergy</li>
                <li>Prescribing an incorrect dosage</li>
                <li>Failing to warn about significant side effects</li>
                <li>Failing to consider dangerous drug interactions</li>
                <li>Pharmacy errors in dispensing the wrong medication or incorrect instructions</li>
              </ul>
            </div>
            
            <div className={styles.rightItem}>
              <h3>Statute of Limitations</h3>
              <p>
                Each state has its own statute of limitations (time limit) for filing medical malpractice claims, 
                typically ranging from 1-3 years from the date of injury or its discovery. It's important to consult 
                with a legal professional as soon as possible to ensure you don't miss these deadlines.
              </p>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Steps to Take if You Suspect Medical Malpractice</h2>
            
            <div className={styles.rightItem}>
              <h3>1. Consult with a Medical Malpractice Attorney</h3>
              <p>
                Medical malpractice cases are complex and require specialized legal expertise. A qualified attorney can:
              </p>
              <ul>
                <li>Evaluate the merits of your case</li>
                <li>Explain your legal options</li>
                <li>Help gather necessary evidence</li>
                <li>Consult with medical experts</li>
                <li>Handle all legal proceedings</li>
              </ul>
              <p>
                Most medical malpractice attorneys offer free initial consultations and work on a contingency fee basis, 
                meaning they only get paid if you receive compensation.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>2. Obtain a Medical Assessment</h3>
              <p>
                Medical malpractice cases typically require testimony from medical experts who can confirm that:
              </p>
              <ul>
                <li>The standard of care was not met</li>
                <li>The medication error caused your injuries</li>
                <li>The extent of damages you suffered</li>
              </ul>
              <p>
                Your attorney will typically arrange for appropriate medical experts to review your case.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>3. Consider Alternative Dispute Resolution</h3>
              <p>
                Many medical malpractice cases are resolved through:
              </p>
              <ul>
                <li><strong>Negotiation:</strong> Direct settlement discussions with the healthcare provider or their insurance company</li>
                <li><strong>Mediation:</strong> Using a neutral third party to facilitate a settlement</li>
                <li><strong>Arbitration:</strong> Presenting the case to an arbitrator who makes a binding decision</li>
              </ul>
              <p>
                These approaches can often resolve claims more quickly and with less expense than going to trial.
              </p>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Emotional and Psychological Support</h2>
            <p>
              Experiencing an adverse medication reaction and navigating potential medical malpractice can take a significant 
              emotional toll. Consider seeking support through:
            </p>
            <ul>
              <li>Mental health professionals (therapists, psychologists, psychiatrists)</li>
              <li>Support groups for medical error victims</li>
              <li>Patient advocacy organizations</li>
              <li>Family and friends</li>
            </ul>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Prevention Tips for the Future</h2>
            
            <div className={styles.rightItem}>
              <h3>1. Maintain an Updated Medication List</h3>
              <p>
                Keep a comprehensive list of all medications you take, including:
              </p>
              <ul>
                <li>Prescription medications</li>
                <li>Over-the-counter drugs</li>
                <li>Supplements and vitamins</li>
                <li>Herbal remedies</li>
              </ul>
              <p>
                Share this list with all healthcare providers at every visit.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>2. Ask Questions About New Medications</h3>
              <p>
                When prescribed a new medication, ask your healthcare provider:
              </p>
              <ul>
                <li>What is this medication for?</li>
                <li>What are the common side effects?</li>
                <li>What severe reactions should I watch for?</li>
                <li>How does this interact with my other medications?</li>
                <li>What should I do if I experience side effects?</li>
              </ul>
            </div>
            
            <div className={styles.rightItem}>
              <h3>3. Double-Check Your Prescriptions</h3>
              <p>
                Before leaving the pharmacy, verify:
              </p>
              <ul>
                <li>The medication name matches what was prescribed</li>
                <li>The dosage is correct</li>
                <li>The instructions match what your doctor told you</li>
                <li>Your name is on the label</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Frequently Asked Questions</h2>
            
            <div className={styles.faqItem}>
              <h3>How do I know if my reaction is severe enough to seek emergency care?</h3>
              <p>
                Seek emergency medical attention immediately if you experience:
              </p>
              <ul>
                <li>Difficulty breathing or shortness of breath</li>
                <li>Swelling of the face, lips, tongue, or throat</li>
                <li>Hives or severe rash spreading rapidly</li>
                <li>Rapid heartbeat or chest pain</li>
                <li>Dizziness, lightheadedness, or fainting</li>
                <li>Severe vomiting or diarrhea</li>
                <li>Confusion or altered mental status</li>
              </ul>
              <p>
                When in doubt, err on the side of caution and seek emergency care.
              </p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>Can I sue if I wasn't informed about a potential side effect?</h3>
              <p>
                Healthcare providers have a duty to inform patients about significant risks and side effects of medications. 
                If you weren't properly informed about a significant risk that then materialized and caused harm, you might 
                have grounds for a "failure to obtain informed consent" claim. However, medical professionals are not required 
                to disclose every possible side effect, particularly those that are extremely rare or minor.
              </p>
              <p>
                The standards for what constitutes adequate disclosure vary by state. Consult with a medical malpractice 
                attorney to evaluate your specific situation.
              </p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>What compensation might I receive in a successful medication error case?</h3>
              <p>
                Compensation in medication error cases may include:
              </p>
              <ul>
                <li><strong>Medical expenses:</strong> Past, current, and future costs related to treating the adverse reaction</li>
                <li><strong>Lost wages:</strong> Income lost due to missed work</li>
                <li><strong>Loss of earning capacity:</strong> If the reaction affects your ability to work in the future</li>
                <li><strong>Pain and suffering:</strong> Physical pain and emotional distress</li>
                <li><strong>Loss of enjoyment of life:</strong> If the reaction impacts your ability to enjoy daily activities</li>
              </ul>
              <p>
                The specific amounts vary widely based on the severity of the injury, long-term impacts, and other factors.
              </p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>What if I'm partly responsible for the medication error?</h3>
              <p>
                If you contributed to the error—for example, by not disclosing other medications you were taking or not 
                following dosage instructions—your compensation might be reduced under the legal principle of "comparative 
                negligence." The specific rules vary by state, with some following "pure comparative negligence" (where your 
                award is reduced by your percentage of fault) and others following "modified comparative negligence" (where 
                you cannot recover if you're more than 50% at fault).
              </p>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  // Default case, if no matching resource is found
  return (
    <MainLayout>
      <div className={styles.detailsContainer}>
        <h1>Resource Not Found</h1>
        <p>The resource you are looking for is not available or is under development.</p>
        <Link to="/resources">Back to Resources</Link>
      </div>
    </MainLayout>
  );
};

export default ResourceDetailsPage;
