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
                reasonable fee for copying.
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
                typically ranging from 1-3 years from the date of injury or its discovery. It's essential to consult 
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
  
  // Informed Consent Explained (id: 5)
  if (id === '5') {
    return (
      <MainLayout>
        <div className={styles.detailsContainer}>
          <div className={styles.breadcrumbs}>
            <Link to="/resources">Resources</Link> &gt; Informed Consent Explained
          </div>
          
          <div className={styles.header}>
            <h1>Informed Consent Explained</h1>
            <p className={styles.subtitle}>
              Understanding the principles and process of informed consent in healthcare
            </p>
          </div>
          
          <div className={styles.contentSection}>
            <h2>What is Informed Consent?</h2>
            <p>
              Informed consent is a fundamental principle in healthcare that ensures patients are fully aware of and 
              agree to the treatment or procedure they are about to undergo. It involves a mutual exchange of information 
              between the patient and healthcare provider, where the patient is informed about the risks, benefits, and 
              alternatives of the proposed treatment.
            </p>
          </div>
          
          <div className={styles.contentSection}>
            <h2>The Process of Informed Consent</h2>
            
            <div className={styles.rightItem}>
              <h3>1. Disclosure of Information</h3>
              <p>
                The healthcare provider must disclose all relevant information about the treatment or procedure, 
                including:
              </p>
              <ul>
                <li>The nature and purpose of the treatment</li>
                <li>Any potential risks or side effects</li>
                <li>Alternative treatments or options</li>
                <li>The expected outcomes and benefits</li>
              </ul>
            </div>
            
            <div className={styles.rightItem}>
              <h3>2. Patient Understanding</h3>
              <p>
                The patient must demonstrate an understanding of the information provided, which can be assessed 
                through:
              </p>
              <ul>
                <li>Verbal or written confirmation</li>
                <li>Questions and answers</li>
                <li>Return demonstrations or quizzes</li>
              </ul>
            </div>
            
            <div className={styles.rightItem}>
              <h3>3. Voluntary Decision</h3>
              <p>
                The patient must make a voluntary decision to accept or refuse the treatment, free from coercion 
                or undue influence.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>4. Capacity to Consent</h3>
              <p>
                The patient must have the capacity to provide informed consent, which means they must be:
              </p>
              <ul>
                <li>Competent to make decisions</li>
                <li>Aware of the relevant information</li>
                <li>Able to understand the implications of their decision</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Importance of Informed Consent</h2>
            <p>
              Informed consent is essential in healthcare because it:
            </p>
            <ul>
              <li>Respects patient autonomy and decision-making</li>
              <li>Ensures patients are fully informed about their care</li>
              <li>Reduces the risk of medical errors and adverse events</li>
              <li>Improves patient satisfaction and trust in healthcare providers</li>
            </ul>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Challenges and Limitations of Informed Consent</h2>
            <p>
              While informed consent is a crucial aspect of healthcare, there are challenges and limitations to its 
              implementation, including:
            </p>
            <ul>
              <li>Language barriers and cultural differences</li>
              <li>Cognitive or intellectual impairments</li>
              <li>Time constraints and emergency situations</li>
              <li>Complexity of medical information</li>
            </ul>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Best Practices for Informed Consent</h2>
            
            <div className={styles.rightItem}>
              <h3>1. Use Clear and Simple Language</h3>
              <p>
                Avoid using technical jargon or complex medical terminology that patients may not understand.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>2. Provide Written Information</h3>
              <p>
                Offer written materials, such as brochures or pamphlets, to supplement verbal explanations and 
                provide patients with a reference.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>3. Allow Time for Questions and Discussion</h3>
              <p>
                Ensure patients have ample opportunity to ask questions and engage in a discussion about their care.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>4. Document the Consent Process</h3>
              <p>
                Keep a record of the informed consent process, including the information provided, the patient's 
                understanding, and their decision.
              </p>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  // Speaking Up in Medical Settings (id: 6)
  if (id === '6') {
    return (
      <MainLayout>
        <div className={styles.detailsContainer}>
          <div className={styles.breadcrumbs}>
            <Link to="/resources">Resources</Link> &gt; Speaking Up in Medical Settings
          </div>
          
          <div className={styles.header}>
            <h1>Speaking Up in Medical Settings</h1>
            <p className={styles.subtitle}>
              Techniques and approaches for effective self-advocacy during medical appointments
            </p>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Why Self-Advocacy Matters</h2>
            <p>
              Self-advocacy in healthcare involves speaking up for yourself, asking questions, and actively 
              participating in your medical care. It's essential because:
            </p>
            <ul>
              <li>You know your body and symptoms better than anyone else</li>
              <li>It ensures your concerns are heard and addressed</li>
              <li>It leads to more personalized and effective care</li>
              <li>It reduces medical errors and improves safety</li>
              <li>It empowers you to make informed decisions about your health</li>
            </ul>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Before Your Appointment</h2>
            
            <div className={styles.rightItem}>
              <h3>1. Prepare Your Health Information</h3>
              <p>
                Compile a concise summary of your:
              </p>
              <ul>
                <li>Current symptoms and when they started</li>
                <li>Medical history, including previous diagnoses</li>
                <li>Medications and supplements you're taking</li>
                <li>Allergies and adverse reactions</li>
                <li>Family health history</li>
              </ul>
            </div>
            
            <div className={styles.rightItem}>
              <h3>2. Create a List of Questions and Concerns</h3>
              <p>
                Write down specific questions about:
              </p>
              <ul>
                <li>Your symptoms or condition</li>
                <li>Treatment options and their risks/benefits</li>
                <li>Medication side effects</li>
                <li>Lifestyle changes that might help</li>
                <li>Follow-up care and next steps</li>
              </ul>
              <p>
                Prioritize your questions, putting the most important ones first in case time runs short.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>3. Consider Bringing Support</h3>
              <p>
                Ask a trusted friend or family member to accompany you to your appointment. They can:
              </p>
              <ul>
                <li>Take notes during the discussion</li>
                <li>Remember details you might forget</li>
                <li>Provide emotional support</li>
                <li>Help you advocate for your needs</li>
                <li>Offer a second perspective when making decisions</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>During Your Appointment</h2>
            
            <div className={styles.rightItem}>
              <h3>1. Communicate Clearly and Directly</h3>
              <p>
                When describing your symptoms or concerns:
              </p>
              <ul>
                <li>Be specific and detailed (e.g., "The pain is sharp and occurs when I bend over")</li>
                <li>Use concrete examples (e.g., "I can only walk for 10 minutes before needing to rest")</li>
                <li>Describe the impact on your daily life</li>
                <li>Use a pain scale (1-10) if discussing pain</li>
              </ul>
            </div>
            
            <div className={styles.rightItem}>
              <h3>2. Ask Questions for Clarification</h3>
              <p>
                Don't hesitate to ask for clarification when you don't understand something:
              </p>
              <ul>
                <li>"Could you explain that in simpler terms?"</li>
                <li>"What does that medical term mean?"</li>
                <li>"Why are you recommending this particular treatment?"</li>
                <li>"Are there alternatives I should consider?"</li>
              </ul>
            </div>
            
            <div className={styles.rightItem}>
              <h3>3. Take Notes</h3>
              <p>
                Keep track of important information during your appointment:
              </p>
              <ul>
                <li>Diagnosis and treatment recommendations</li>
                <li>Medication instructions</li>
                <li>Next steps and follow-up appointments</li>
                <li>Contact information for additional questions</li>
              </ul>
              <p>
                Consider asking your provider if you can record the conversation on your phone for later reference.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>4. Use the Teach-Back Method</h3>
              <p>
                Verify your understanding by repeating information back to your provider:
              </p>
              <ul>
                <li>"So, if I understand correctly..."</li>
                <li>"Let me make sure I got this right..."</li>
                <li>"You're recommending that I..."</li>
              </ul>
              <p>
                This helps identify any misunderstandings and ensures you have accurate information.
              </p>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>After Your Appointment</h2>
            
            <div className={styles.rightItem}>
              <h3>1. Follow Up on Test Results</h3>
              <p>
                Don't assume no news is good news. If you don't hear back about test results:
              </p>
              <ul>
                <li>Call the office to inquire about results</li>
                <li>Ask for explanations of results you don't understand</li>
                <li>Request copies of your test results for your records</li>
              </ul>
            </div>
            
            <div className={styles.rightItem}>
              <h3>2. Monitor Your Progress</h3>
              <p>
                Keep track of how you're responding to treatment:
              </p>
              <ul>
                <li>Note any improvement or worsening of symptoms</li>
                <li>Document any side effects from medications</li>
                <li>Record questions that arise during your treatment</li>
              </ul>
              <p>
                This information will be valuable at your next appointment.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>3. Seek Additional Information</h3>
              <p>
                Educate yourself about your condition from reliable sources:
              </p>
              <ul>
                <li>Medical journals and peer-reviewed publications</li>
                <li>Government health websites (CDC, NIH, etc.)</li>
                <li>Reputable patient advocacy organizations</li>
                <li>Medical libraries and healthcare provider resources</li>
              </ul>
              <p>
                Being informed helps you participate more actively in your healthcare decisions.
              </p>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Overcoming Common Challenges</h2>
            
            <div className={styles.faqItem}>
              <h3>What if I feel rushed during my appointment?</h3>
              <p>
                If you feel your provider is rushing you:
              </p>
              <ul>
                <li>Politely state that you have concerns that need addressing</li>
                <li>Focus on your most pressing issues first</li>
                <li>Ask if you should schedule a follow-up for remaining concerns</li>
                <li>Consider finding a provider who can give you more time if this is a recurring issue</li>
              </ul>
            </div>
            
            <div className={styles.faqItem}>
              <h3>What if my concerns aren't being taken seriously?</h3>
              <p>
                If you feel dismissed or not taken seriously:
              </p>
              <ul>
                <li>Be firm but respectful in communicating the impact of your symptoms</li>
                <li>Provide specific examples of how your condition affects your daily life</li>
                <li>Ask directly: "What might explain these symptoms?" or "What tests could help diagnose this?"</li>
                <li>Seek a second opinion if necessary</li>
                <li>Consider changing providers if you consistently feel unheard</li>
              </ul>
            </div>
            
            <div className={styles.faqItem}>
              <h3>How do I handle disagreements with my healthcare provider?</h3>
              <p>
                When you disagree with your provider's assessment or recommendations:
              </p>
              <ul>
                <li>Express your concerns respectfully</li>
                <li>Ask for the reasoning behind their recommendations</li>
                <li>Share your perspective and any information that might influence the decision</li>
                <li>Discuss alternatives that might address both your concerns</li>
                <li>Remember that you have the right to seek a second opinion</li>
              </ul>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  // Accessing Your Medical Records (id: 3)
  if (id === '3') {
    return (
      <MainLayout>
        <div className={styles.detailsContainer}>
          <div className={styles.breadcrumbs}>
            <Link to="/resources">Resources</Link> &gt; Accessing Your Medical Records
          </div>
          
          <div className={styles.header}>
            <h1>Accessing Your Medical Records</h1>
            <p className={styles.subtitle}>
              Learn how to request, review, and understand your medical records
            </p>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Understanding Medical Records</h2>
            <p>
              Medical records are detailed accounts of your healthcare history that include:
            </p>
            <ul>
              <li>Medical history and physical examination notes</li>
              <li>Laboratory and diagnostic test results</li>
              <li>Medication lists and prescription history</li>
              <li>Treatment plans and progress notes</li>
              <li>Diagnoses and procedure reports</li>
              <li>Immunization records</li>
              <li>Allergies and adverse reactions</li>
              <li>Radiology images and reports</li>
            </ul>
            <p>
              These records provide a comprehensive view of your health history and are essential 
              for coordinated, effective healthcare.
            </p>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Your Rights to Medical Records</h2>
            
            <div className={styles.rightItem}>
              <h3>HIPAA Rights</h3>
              <p>
                Under the Health Insurance Portability and Accountability Act (HIPAA), you have the legal right to:
              </p>
              <ul>
                <li>Access and obtain copies of your medical records</li>
                <li>Request corrections to your records if you identify errors</li>
                <li>Receive an accounting of disclosures (who has accessed your records)</li>
                <li>Specify how and where you want to receive communications about your health information</li>
                <li>File a complaint if you believe your privacy rights have been violated</li>
              </ul>
            </div>
            
            <div className={styles.rightItem}>
              <h3>State-Specific Rights</h3>
              <p>
                In addition to federal protections, many states have laws that provide additional rights 
                regarding medical records. These may include:
              </p>
              <ul>
                <li>Shorter timeframes for healthcare providers to respond to record requests</li>
                <li>Limits on the fees that can be charged for copies</li>
                <li>Extended retention requirements for certain types of records</li>
                <li>Special provisions for sensitive information (e.g., mental health, HIV status)</li>
              </ul>
              <p>
                Check with your state's health department or medical board for specific regulations in your area.
              </p>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>How to Request Your Medical Records</h2>
            
            <div className={styles.rightItem}>
              <h3>1. Identify Where Your Records Are Kept</h3>
              <p>
                Medical records may be stored at various locations:
              </p>
              <ul>
                <li>Your primary care physician's office</li>
                <li>Hospitals where you've received care</li>
                <li>Specialty clinics and providers</li>
                <li>Laboratories that performed testing</li>
                <li>Imaging centers for X-rays, MRIs, etc.</li>
                <li>Mental health providers</li>
                <li>Physical therapists and rehabilitation centers</li>
              </ul>
              <p>
                You'll need to contact each facility separately to request your complete medical history.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>2. Complete an Authorization Form</h3>
              <p>
                Most healthcare providers require a written request. The authorization form typically includes:
              </p>
              <ul>
                <li>Your full name, date of birth, and contact information</li>
                <li>The specific records you're requesting (or "all medical records")</li>
                <li>The date range for the records</li>
                <li>Where you want the records sent</li>
                <li>Your signature and the date</li>
                <li>Verification of your identity (may require ID)</li>
              </ul>
              <p>
                Many providers have their own forms available online or at their offices.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>3. Submit Your Request</h3>
              <p>
                You can typically submit your request through several methods:
              </p>
              <ul>
                <li>In person at the healthcare provider's office</li>
                <li>By mail or fax</li>
                <li>Through the provider's patient portal</li>
                <li>Via email (if the provider offers secure email options)</li>
              </ul>
              <p>
                Keep a copy of your request and make note of when it was submitted.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>4. Follow Up on Your Request</h3>
              <p>
                By law, healthcare providers must respond to your request within 30 days, though they 
                can request a 30-day extension if needed. If you haven't received a response within this 
                timeframe, follow up with the medical records department or office manager.
              </p>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Understanding Fees and Format Options</h2>
            
            <div className={styles.rightItem}>
              <h3>Reasonable Fees</h3>
              <p>
                Healthcare providers can charge "reasonable, cost-based fees" for copies of medical records, which may include:
              </p>
              <ul>
                <li>Cost of copying (labor and supplies)</li>
                <li>Postage if mailed</li>
                <li>Preparation of a summary or explanation (if requested)</li>
              </ul>
              <p>
                Providers cannot charge for searching for or retrieving records. Some states cap these fees, 
                and many providers waive fees when records are sent directly to another healthcare provider.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>Format Options</h3>
              <p>
                You have the right to request your records in a specific format:
              </p>
              <ul>
                <li>Paper copies</li>
                <li>Electronic copies (PDF, CD, flash drive)</li>
                <li>Access through a patient portal</li>
                <li>Direct transfer to another provider</li>
              </ul>
              <p>
                If the provider maintains electronic records, they must provide them in an electronic format if requested.
              </p>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Making Sense of Your Medical Records</h2>
            
            <div className={styles.rightItem}>
              <h3>Common Medical Abbreviations</h3>
              <p>
                Medical records often contain abbreviations that can be confusing. Some common ones include:
              </p>
              <ul>
                <li><strong>CC:</strong> Chief Complaint (main reason for visit)</li>
                <li><strong>Dx:</strong> Diagnosis</li>
                <li><strong>Hx:</strong> History</li>
                <li><strong>PMH:</strong> Past Medical History</li>
                <li><strong>Rx:</strong> Prescription</li>
                <li><strong>BP:</strong> Blood Pressure</li>
                <li><strong>WNL:</strong> Within Normal Limits</li>
                <li><strong>SOB:</strong> Shortness of Breath</li>
              </ul>
              <p>
                Ask your provider for explanations of terms you don't understand, or consult medical 
                abbreviation dictionaries available online.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>Reading Lab Results</h3>
              <p>
                Laboratory reports typically include:
              </p>
              <ul>
                <li>The test name and date performed</li>
                <li>Your result</li>
                <li>Reference range (normal values)</li>
                <li>Flags for abnormal results (H for high, L for low)</li>
                <li>Units of measurement</li>
              </ul>
              <p>
                Compare your results to the reference range to see if they're normal. Remember that "normal" 
                can vary based on age, gender, and other factors.
              </p>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Managing Your Medical Records</h2>
            
            <div className={styles.rightItem}>
              <h3>Organizing Your Records</h3>
              <p>
                Create a personal health record system to keep track of your medical information:
              </p>
              <ul>
                <li>Use a binder with dividers for different providers or conditions</li>
                <li>Maintain a digital archive of scanned documents</li>
                <li>Use a personal health record app or software</li>
                <li>Create a summary sheet with key information (diagnoses, medications, allergies)</li>
              </ul>
            </div>
            
            <div className={styles.rightItem}>
              <h3>Requesting Corrections</h3>
              <p>
                If you find errors in your medical records, you have the right to request corrections:
              </p>
              <ul>
                <li>Submit a written request specifying the error and the correction needed</li>
                <li>Provide documentation supporting your request when possible</li>
                <li>The provider must respond within 60 days (with a possible 30-day extension)</li>
                <li>If they deny your request, you have the right to submit a statement of disagreement</li>
              </ul>
              <p>
                Focus on factual errors rather than differences of opinion about diagnoses or treatments.
              </p>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Frequently Asked Questions</h2>
            
            <div className={styles.faqItem}>
              <h3>Can I be denied access to my medical records?</h3>
              <p>
                In limited circumstances, healthcare providers can deny access to your records, such as:
              </p>
              <ul>
                <li>Psychotherapy notes (which are kept separate from your main medical record)</li>
                <li>Information compiled for legal proceedings</li>
                <li>Information that could endanger your life or physical safety</li>
                <li>Information that references another person who could be harmed by its release</li>
              </ul>
              <p>
                If access is denied, you should receive a written explanation and information about how to file a complaint.
              </p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>How long are medical records kept?</h3>
              <p>
                Retention periods vary by:
              </p>
              <ul>
                <li>State laws (typically 5-10 years for adult records)</li>
                <li>Type of healthcare facility (hospitals often keep records longer than private practices)</li>
                <li>Type of record (some records, like vaccination histories or cancer treatments, may be kept longer)</li>
              </ul>
              <p>
                It's advisable to request copies of important records before they reach their retention limit.
              </p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>Can family members access my medical records?</h3>
              <p>
                Generally, access to your records by others is limited:
              </p>
              <ul>
                <li>Parents/guardians can usually access records for minor children (with some exceptions for sensitive services)</li>
                <li>Spouses do not automatically have access without your permission</li>
                <li>You can designate access through a HIPAA authorization form</li>
                <li>Legal representatives with healthcare power of attorney can access records if you're incapacitated</li>
              </ul>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  // Understanding Medical Bills & Insurance Claims (id: 7)
  if (id === '7') {
    return (
      <MainLayout>
        <div className={styles.detailsContainer}>
          <div className={styles.breadcrumbs}>
            <Link to="/resources">Resources</Link> &gt; Understanding Medical Bills & Insurance Claims
          </div>
          
          <div className={styles.header}>
            <h1>Understanding Medical Bills & Insurance Claims</h1>
            <p className={styles.subtitle}>
              Navigate the complex world of healthcare billing and insurance with confidence
            </p>
          </div>
          
          <div className={styles.contentSection}>
            <h2>The Basics of Healthcare Billing</h2>
            <p>
              Healthcare billing can be confusing, but understanding the key elements helps you become a more informed patient:
            </p>
            
            <div className={styles.rightItem}>
              <h3>The Billing Cycle</h3>
              <p>
                The typical healthcare billing process follows these steps:
              </p>
              <ol>
                <li><strong>Registration:</strong> You provide insurance and personal information</li>
                <li><strong>Medical coding:</strong> Your visit is translated into standardized codes</li>
                <li><strong>Claim creation:</strong> A claim is sent to your insurance company</li>
                <li><strong>Insurance processing:</strong> Your insurer reviews and processes the claim</li>
                <li><strong>Explanation of Benefits (EOB):</strong> Your insurer sends an EOB explaining coverage</li>
                <li><strong>Patient billing:</strong> You receive a bill for any remaining balance</li>
              </ol>
            </div>
            
            <div className={styles.rightItem}>
              <h3>Common Terms on Medical Bills</h3>
              <ul>
                <li><strong>Charge Amount:</strong> The full price billed for services</li>
                <li><strong>Allowed Amount:</strong> The amount your insurance has agreed to pay for services</li>
                <li><strong>Adjustment/Write-off:</strong> The difference between the charge and allowed amount</li>
                <li><strong>Copayment:</strong> Your fixed payment at the time of service</li>
                <li><strong>Coinsurance:</strong> Your percentage share of costs after deductible</li>
                <li><strong>Deductible:</strong> The amount you pay before insurance starts covering</li>
                <li><strong>Patient Responsibility:</strong> The amount you ultimately owe</li>
              </ul>
            </div>
            
            <div className={styles.rightItem}>
              <h3>Medical Codes Explained</h3>
              <p>
                Medical bills contain several types of codes:
              </p>
              <ul>
                <li><strong>CPT Codes:</strong> Current Procedural Terminology codes for services and procedures</li>
                <li><strong>ICD-10 Codes:</strong> Diagnostic codes that describe your condition</li>
                <li><strong>HCPCS Codes:</strong> Codes for supplies, equipment, and non-physician services</li>
                <li><strong>DRG Codes:</strong> Diagnosis-Related Group codes for hospital stays</li>
              </ul>
              <p>
                These codes determine how services are billed and how much your insurance will pay.
              </p>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Reading Your Explanation of Benefits (EOB)</h2>
            <p>
              The Explanation of Benefits is a document from your insurance company that explains how a claim was processed. It is NOT a bill.
            </p>
            
            <div className={styles.rightItem}>
              <h3>Key Sections of an EOB</h3>
              <ul>
                <li><strong>Patient and Provider Information:</strong> Identifies you and your healthcare provider</li>
                <li><strong>Claim Information:</strong> Includes the date of service and claim number</li>
                <li><strong>Service Description:</strong> Lists the services you received</li>
                <li><strong>Billed Amount:</strong> What your provider charged</li>
                <li><strong>Plan Discounts:</strong> Negotiated reductions to the billed amount</li>
                <li><strong>Amount Paid by Insurance:</strong> What your plan covered</li>
                <li><strong>Patient Responsibility:</strong> What you may need to pay</li>
                <li><strong>Remark Codes:</strong> Explains adjustments or coverage decisions</li>
              </ul>
            </div>
            
            <div className={styles.rightItem}>
              <h3>Understanding Coverage Decisions</h3>
              <p>
                Your EOB may contain explanations for why certain services weren't fully covered:
              </p>
              <ul>
                <li><strong>Not Covered:</strong> Service excluded from your plan</li>
                <li><strong>Out of Network:</strong> Provider isn't contracted with your insurance</li>
                <li><strong>Exceeds Benefit Maximum:</strong> You've reached your coverage limit</li>
                <li><strong>Non-Medically Necessary:</strong> Insurance deems service unnecessary</li>
                <li><strong>Prior Authorization Required:</strong> Approval was needed but not obtained</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Analyzing Your Medical Bill</h2>
            
            <div className={styles.rightItem}>
              <h3>Common Elements on a Medical Bill</h3>
              <ul>
                <li><strong>Patient and Provider Information:</strong> Your details and the billing facility</li>
                <li><strong>Account/Bill Number:</strong> Reference for your specific bill</li>
                <li><strong>Date of Service:</strong> When you received care</li>
                <li><strong>Service Description:</strong> Medical services provided</li>
                <li><strong>Service Codes:</strong> CPT, HCPCS, or other billing codes</li>
                <li><strong>Charges:</strong> Amount billed for each service</li>
                <li><strong>Adjustments:</strong> Discounts or write-offs</li>
                <li><strong>Insurance Payments:</strong> What your insurance paid</li>
                <li><strong>Patient Responsibility:</strong> Your remaining balance</li>
                <li><strong>Payment Due Date:</strong> When payment is expected</li>
              </ul>
            </div>
            
            <div className={styles.rightItem}>
              <h3>Identifying Potential Errors</h3>
              <p>
                Common medical billing errors to watch for:
              </p>
              <ul>
                <li><strong>Duplicate Billing:</strong> Same service billed twice</li>
                <li><strong>Incorrect Patient Information:</strong> Wrong name, insurance ID, etc.</li>
                <li><strong>Upcoding:</strong> Using a more expensive code than appropriate</li>
                <li><strong>Unbundling:</strong> Charging separately for services that should be grouped</li>
                <li><strong>Incorrect Dates:</strong> Wrong service dates that might affect coverage</li>
                <li><strong>Missing Insurance Adjustments:</strong> Network discounts not applied</li>
                <li><strong>Balance Billing:</strong> For in-network providers, billing beyond allowed amounts</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Filing Insurance Claims</h2>
            
            <div className={styles.rightItem}>
              <h3>When You Need to File a Claim</h3>
              <p>
                Typically, healthcare providers file claims for you, but you may need to file yourself if:
              </p>
              <ul>
                <li>You used an out-of-network provider who doesn't file insurance</li>
                <li>You paid upfront and need reimbursement</li>
                <li>You received care while traveling, especially internationally</li>
                <li>You're using secondary insurance or supplemental coverage</li>
              </ul>
            </div>
            
            <div className={styles.rightItem}>
              <h3>Steps for Filing a Claim</h3>
              <ol>
                <li><strong>Get the Right Form:</strong> Request a claim form from your insurance company</li>
                <li><strong>Gather Documentation:</strong> Collect itemized bills, receipts, and medical records</li>
                <li><strong>Complete the Form:</strong> Fill out all required information accurately</li>
                <li><strong>Attach Documentation:</strong> Include all relevant paperwork</li>
                <li><strong>Make Copies:</strong> Keep copies of everything you submit</li>
                <li><strong>Submit the Claim:</strong> Send by mail, online portal, or app as permitted</li>
                <li><strong>Follow Up:</strong> Note the date submitted and check status regularly</li>
              </ol>
            </div>
            
            <div className={styles.rightItem}>
              <h3>Claim Timelines</h3>
              <p>
                Important deadlines to be aware of:
              </p>
              <ul>
                <li>Most insurance companies require claims to be filed within 90-180 days of service</li>
                <li>Insurance must process claims within 30 days in most states</li>
                <li>You typically have 180 days to appeal a denied claim</li>
              </ul>
              <p>
                Check your specific plan documents for your insurer's deadlines.
              </p>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Resolving Billing and Insurance Issues</h2>
            
            <div className={styles.rightItem}>
              <h3>If You Think There's a Billing Error</h3>
              <ol>
                <li><strong>Review Your Bill:</strong> Compare it with your EOB and medical records</li>
                <li><strong>Contact the Billing Department:</strong> Call the number on your bill</li>
                <li><strong>Request an Itemized Bill:</strong> If you only received a summary</li>
                <li><strong>Document Everything:</strong> Note names, dates, and discussion points</li>
                <li><strong>Follow Up in Writing:</strong> Send a letter detailing the error</li>
                <li><strong>Escalate if Necessary:</strong> Ask to speak with a supervisor or patient advocate</li>
              </ol>
            </div>
            
            <div className={styles.rightItem}>
              <h3>Appealing Insurance Denials</h3>
              <p>
                If your insurance denies coverage, you have the right to appeal:
              </p>
              <ol>
                <li><strong>Understand the Denial:</strong> Review the reason on your EOB</li>
                <li><strong>Gather Evidence:</strong> Collect medical records, doctor's notes, and research supporting medical necessity</li>
                <li><strong>Request a Provider Letter:</strong> Ask your doctor to write a letter explaining why the service was necessary</li>
                <li><strong>Submit a Formal Appeal:</strong> Follow your insurer's appeal process</li>
                <li><strong>Consider External Review:</strong> If internal appeals fail, you may request an independent review</li>
              </ol>
            </div>
            
            <div className={styles.rightItem}>
              <h3>Negotiating Medical Bills</h3>
              <p>
                If you're struggling to pay a medical bill:
              </p>
              <ul>
                <li><strong>Ask About Financial Assistance:</strong> Many facilities have assistance programs</li>
                <li><strong>Request a Payment Plan:</strong> Most providers will work with you on manageable payments</li>
                <li><strong>Inquire About Discounts:</strong> Some offer prompt-pay or hardship discounts</li>
                <li><strong>Consider Hiring a Billing Advocate:</strong> For complex or large bills</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Frequently Asked Questions</h2>
            
            <div className={styles.faqItem}>
              <h3>Why did I receive multiple bills for one hospital stay?</h3>
              <p>
                Hospital care often generates separate bills from:
              </p>
              <ul>
                <li>The facility itself (room, nursing care, etc.)</li>
                <li>Individual physicians (surgeons, anesthesiologists, radiologists)</li>
                <li>Laboratory services</li>
                <li>Radiology departments</li>
                <li>Durable medical equipment</li>
              </ul>
              <p>
                These providers may be contracted separately with your insurance, resulting in different billing statements.
              </p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>What if I can't afford to pay my medical bill?</h3>
              <p>
                If you're unable to pay your medical bills:
              </p>
              <ul>
                <li>Contact the provider's billing office immediately</li>
                <li>Ask about financial assistance or charity care programs</li>
                <li>Negotiate a reasonable payment plan</li>
                <li>Inquire about discounts for financial hardship</li>
                <li>Consider seeking help from a hospital patient advocate or medical billing advocate</li>
                <li>Check if you qualify for Medicaid (applications can sometimes be retroactive)</li>
              </ul>
              <p>
                Never ignore medical bills, as this can lead to collections and credit damage.
              </p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>How do I know if a service is covered by my insurance?</h3>
              <p>
                To determine if a service is covered:
              </p>
              <ul>
                <li>Review your plan's Summary of Benefits and Coverage</li>
                <li>Call your insurance company's member services before receiving care</li>
                <li>Request a pre-determination or pre-authorization</li>
                <li>Ask your provider to check your benefits before providing service</li>
                <li>Check if the provider is in-network using your insurer's provider directory</li>
              </ul>
              <p>
                Get confirmation in writing whenever possible, especially for expensive procedures.
              </p>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  // Advance Directives & Healthcare Powers of Attorney (id: 8)
  if (id === '8') {
    return (
      <MainLayout>
        <div className={styles.detailsContainer}>
          <div className={styles.breadcrumbs}>
            <Link to="/resources">Resources</Link> &gt; Advance Directives & Healthcare Powers of Attorney
          </div>
          
          <div className={styles.header}>
            <h1>Advance Directives & Healthcare Powers of Attorney</h1>
            <p className={styles.subtitle}>
              Planning ahead for healthcare decisions when you cannot speak for yourself
            </p>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Understanding Advance Healthcare Planning</h2>
            <p>
              Advance healthcare planning involves making decisions about the care you would want to receive 
              if you become unable to speak for yourself. This planning includes creating legal documents 
              that specify your wishes and appointing someone you trust to make decisions on your behalf.
            </p>
            <p>
              These documents are important for everyone, regardless of age or current health status, 
              because unexpected situations can arise at any time where you might not be able to communicate 
              your healthcare preferences.
            </p>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Types of Advance Directives</h2>
            
            <div className={styles.rightItem}>
              <h3>Living Will</h3>
              <p>
                A living will is a written document that specifies what types of medical treatments you would or 
                would not want if you become seriously ill and cannot communicate your preferences. It typically covers:
              </p>
              <ul>
                <li>Use of life-sustaining treatments (ventilators, dialysis, etc.)</li>
                <li>Resuscitation preferences (DNR orders)</li>
                <li>Artificial nutrition and hydration</li>
                <li>Comfort care and pain management preferences</li>
                <li>Organ and tissue donation wishes</li>
              </ul>
              <p>
                Living wills become active only when you are unable to make decisions for yourself and have a 
                terminal illness or are permanently unconscious, as certified by doctors.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>Healthcare Power of Attorney (Healthcare Proxy)</h3>
              <p>
                A healthcare power of attorney is a legal document that names someone else (called a healthcare agent, 
                proxy, or surrogate) to make healthcare decisions for you when you cannot make them yourself. Your 
                healthcare agent should be:
              </p>
              <ul>
                <li>Someone you trust completely</li>
                <li>Familiar with your values and beliefs</li>
                <li>Willing to follow your wishes, even if they disagree personally</li>
                <li>Able to make difficult decisions in stressful situations</li>
                <li>Available to speak with your healthcare providers when needed</li>
              </ul>
              <p>
                Unlike a living will, a healthcare power of attorney covers any healthcare decision during any period 
                when you are unable to speak for yourself, not just end-of-life situations.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>POLST (Physician Orders for Life-Sustaining Treatment)</h3>
              <p>
                A POLST form is a medical order that indicates your specific preferences regarding treatments commonly 
                used in a medical crisis. Unlike other advance directives:
              </p>
              <ul>
                <li>It's signed by both you and your doctor, making it an actionable medical order</li>
                <li>It's typically bright pink or another distinctive color to ensure visibility</li>
                <li>It's primarily for people with serious illness or frailty</li>
                <li>It travels with you across different healthcare settings</li>
              </ul>
              <p>
                The form may be called different names in different states, such as MOLST, POST, or MOST.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>DNR (Do Not Resuscitate) Orders</h3>
              <p>
                A DNR order is a specific instruction to healthcare providers not to perform cardiopulmonary 
                resuscitation (CPR) if your heart stops or if you stop breathing. It does not affect other treatments.
              </p>
              <p>
                DNR orders can be part of advance directives or created separately. They must be signed by a 
                physician to be valid and should be prominently displayed or readily accessible in emergency situations.
              </p>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Creating Advance Directives</h2>
            
            <div className={styles.rightItem}>
              <h3>Legal Requirements</h3>
              <p>
                Requirements for advance directives vary by state but generally include:
              </p>
              <ul>
                <li>Being at least 18 years old and of sound mind when signing</li>
                <li>Having your signature witnessed by one or two adults</li>
                <li>In some states, having your documents notarized</li>
                <li>Witnesses typically cannot be your healthcare providers, the person you name as your agent, or anyone who could benefit financially from your death</li>
              </ul>
              <p>
                While lawyers can help create these documents, many states provide standard forms you can complete yourself.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>Steps to Create Advance Directives</h3>
              <ol>
                <li><strong>Consider Your Values and Preferences:</strong> Think about what matters most to you regarding quality of life and treatment options</li>
                <li><strong>Discuss With Loved Ones:</strong> Share your thoughts with family members to avoid future confusion or conflict</li>
                <li><strong>Choose Your Healthcare Agent:</strong> Select and ask someone to serve as your healthcare proxy</li>
                <li><strong>Obtain the Proper Forms:</strong> Get forms specific to your state from healthcare providers, elder law attorneys, or state health department websites</li>
                <li><strong>Complete the Forms:</strong> Fill out forms according to your state's requirements</li>
                <li><strong>Sign With Witnesses or Notary:</strong> Follow the legal formalities for your state</li>
                <li><strong>Distribute Copies:</strong> Give copies to your healthcare agents, family members, and healthcare providers</li>
                <li><strong>Store Original Documents:</strong> Keep originals in an accessible (not locked) location</li>
              </ol>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Making Your Wishes Known</h2>
            
            <div className={styles.rightItem}>
              <h3>Distributing Your Advance Directives</h3>
              <p>
                For your advance directives to be effective, the right people need to know about them:
              </p>
              <ul>
                <li>Give copies to your primary care physician and specialists</li>
                <li>Provide copies to your named healthcare agent and alternates</li>
                <li>Share with close family members who might be involved in your care</li>
                <li>Consider giving copies to your lawyer and spiritual advisor</li>
                <li>Take copies with you if you are hospitalized or undergoing surgery</li>
                <li>Upload to your electronic health record if your healthcare system allows this</li>
              </ul>
            </div>
            
            <div className={styles.rightItem}>
              <h3>Registering Your Directives</h3>
              <p>
                Many states offer advance directive registries that store your documents electronically 
                and make them available to healthcare providers when needed:
              </p>
              <ul>
                <li>Look for your state's registry on your state health department website</li>
                <li>Some registries provide wallet cards with registry information</li>
                <li>Consider private online registries if your state doesn't offer one</li>
                <li>Carry a wallet card indicating you have advance directives and where to find them</li>
              </ul>
            </div>
            
            <div className={styles.rightItem}>
              <h3>Having the Conversation With Your Doctor</h3>
              <p>
                Schedule time to discuss your advance directives with your healthcare provider:
              </p>
              <ul>
                <li>Bring copies of your documents to the appointment</li>
                <li>Ask questions about treatments mentioned in your directives</li>
                <li>Ensure your provider understands your values and goals</li>
                <li>Request that your advance directives be added to your medical record</li>
                <li>Update your provider if you make changes to your directives</li>
              </ul>
              <p>
                Medicare now covers advance care planning discussions with healthcare providers.
              </p>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Reviewing and Updating Your Directives</h2>
            
            <div className={styles.rightItem}>
              <h3>When to Review</h3>
              <p>
                Advance directives should be reviewed and potentially updated:
              </p>
              <ul>
                <li>Every few years, even if your situation hasn't changed</li>
                <li>When diagnosed with a serious illness</li>
                <li>When experiencing significant health changes</li>
                <li>After major life events (marriage, divorce, death of spouse)</li>
                <li>When your designated healthcare agent is no longer available</li>
                <li>If you move to another state (laws may differ)</li>
              </ul>
            </div>
            
            <div className={styles.rightItem}>
              <h3>How to Update</h3>
              <p>
                To change your advance directives:
              </p>
              <ol>
                <li>Create new documents rather than editing old ones</li>
                <li>Clearly date the new documents</li>
                <li>State in writing that previous versions are revoked</li>
                <li>Destroy outdated copies when possible</li>
                <li>Distribute the updated versions to everyone who had the old versions</li>
                <li>Inform your healthcare providers of the changes</li>
              </ol>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Frequently Asked Questions</h2>
            
            <div className={styles.faqItem}>
              <h3>Can I change my mind after creating advance directives?</h3>
              <p>
                Yes, you can change or revoke your advance directives at any time as long as you are 
                capable of making decisions. If you verbally revoke your directives in an emergency 
                situation, make sure your healthcare team documents this in your medical record, and 
                follow up with new written directives when possible.
              </p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>What happens if I don't have advance directives?</h3>
              <p>
                Without advance directives:
              </p>
              <ul>
                <li>State law determines who can make decisions for you (usually starting with spouse, then adult children)</li>
                <li>Family members may disagree about your care, causing delays and conflicts</li>
                <li>You might receive treatments you would not have wanted</li>
                <li>A court might appoint a guardian to make decisions for you</li>
              </ul>
            </div>
            
            <div className={styles.faqItem}>
              <h3>Are advance directives valid across all states?</h3>
              <p>
                Most states honor advance directives from other states, but laws vary. If you move or 
                spend significant time in another state, it's best to complete new documents that comply 
                with that state's laws. Some states have reciprocity provisions that specifically recognize 
                out-of-state advance directives.
              </p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>What's the difference between a living will and a regular will?</h3>
              <p>
                A living will only addresses healthcare decisions while you are still alive but unable to 
                communicate your wishes. A regular will (last will and testament) addresses what happens to 
                your property and assets after your death. They serve completely different purposes and do 
                not replace each other.
              </p>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Resources for Advance Directives</h2>
            <ul>
              <li><a href="https://www.caringinfo.org/" target="_blank" rel="noopener noreferrer">CaringInfo</a> - Free state-specific advance directive forms</li>
              <li><a href="https://www.prepareforyourcare.org/" target="_blank" rel="noopener noreferrer">PREPARE for Your Care</a> - Step-by-step instructions and videos</li>
              <li><a href="https://theconversationproject.org/" target="_blank" rel="noopener noreferrer">The Conversation Project</a> - Tools for talking about end-of-life care</li>
              <li><a href="https://polst.org/" target="_blank" rel="noopener noreferrer">National POLST</a> - Information about POLST programs by state</li>
              <li><a href="https://www.nia.nih.gov/health/advance-care-planning" target="_blank" rel="noopener noreferrer">National Institute on Aging</a> - Advance care planning resources</li>
            </ul>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  // Medication Safety & Management (id: 9)
  if (id === '9') {
    return (
      <MainLayout>
        <div className={styles.detailsContainer}>
          <div className={styles.breadcrumbs}>
            <Link to="/resources">Resources</Link> &gt; Medication Safety & Management
          </div>
          
          <div className={styles.header}>
            <h1>Medication Safety & Management</h1>
            <p className={styles.subtitle}>
              Essential information for safely managing your medications and preventing errors
            </p>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Understanding Your Medications</h2>
            <p>
              Taking medications correctly is a critical part of your healthcare. For each medication you take, 
              you should know:
            </p>
            <ul>
              <li>The brand and generic names</li>
              <li>Why you're taking it (the condition it treats)</li>
              <li>How it works in your body</li>
              <li>The correct dosage and timing</li>
              <li>How long you need to take it</li>
              <li>Common and serious side effects</li>
              <li>Potential interactions with other medications or foods</li>
              <li>What to do if you miss a dose</li>
            </ul>
            <p>
              Never hesitate to ask your healthcare provider or pharmacist about any medication questions.
              It's your right to understand what you're taking and why.
            </p>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Talking to Your Healthcare Providers About Medications</h2>
            
            <div className={styles.rightItem}>
              <h3>Questions to Ask Your Provider When Prescribed a New Medication</h3>
              <ul>
                <li>Why am I taking this medication? How will it help my condition?</li>
                <li>What is the name of the medication, and is there a generic version available?</li>
                <li>How and when should I take it? With or without food?</li>
                <li>What side effects might I experience? Which ones are serious?</li>
                <li>How will I know if the medication is working?</li>
                <li>Will this medication interact with my other medications or supplements?</li>
                <li>Are there any foods, drinks, or activities I should avoid?</li>
                <li>What should I do if I miss a dose?</li>
                <li>How long will I need to take this medication?</li>
                <li>Is there any written information I can take home?</li>
              </ul>
            </div>
            
            <div className={styles.rightItem}>
              <h3>Questions to Ask Your Pharmacist</h3>
              <ul>
                <li>Can you review how I should take this medication?</li>
                <li>Could this medication interact with my other prescriptions or over-the-counter products?</li>
                <li>What are the most common side effects?</li>
                <li>How should I store this medication?</li>
                <li>Is there a drug information sheet I can take home?</li>
                <li>Does this medication need any special handling or disposal?</li>
                <li>Is this pill splittable if I have trouble swallowing?</li>
                <li>Are there any automated refill programs I can enroll in?</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Creating a Safe Medication System at Home</h2>
            
            <div className={styles.rightItem}>
              <h3>Maintaining an Updated Medication List</h3>
              <p>
                Create and maintain a comprehensive list of all medications you take, including:
              </p>
              <ul>
                <li>Prescription medications</li>
                <li>Over-the-counter drugs</li>
                <li>Vitamins and supplements</li>
                <li>Herbal remedies</li>
              </ul>
              <p>
                For each item, record:
              </p>
              <ul>
                <li>Medication name (brand and generic)</li>
                <li>Dosage (strength and how many)</li>
                <li>How often you take it</li>
                <li>Why you take it</li>
                <li>Who prescribed it</li>
                <li>Start date and end date (if applicable)</li>
              </ul>
              <p>
                Carry a copy of this list with you to all medical appointments and in case of emergencies.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>Organizing Your Medications</h3>
              <p>
                Establish a system to help you take medications correctly:
              </p>
              <ul>
                <li>Use pill organizers labeled with days of the week</li>
                <li>Set up medication reminders on your phone or other devices</li>
                <li>Keep medications in their original labeled containers unless using a pill organizer</li>
                <li>Store medications according to instructions (some need refrigeration or protection from light)</li>
                <li>Keep medications away from children and pets</li>
                <li>Store medications in a cool, dry place (not the bathroom, where humidity can affect them)</li>
              </ul>
            </div>
            
            <div className={styles.rightItem}>
              <h3>Useful Medication Management Tools</h3>
              <p>
                Consider using these tools to help manage your medications:
              </p>
              <ul>
                <li><strong>Pill organizers:</strong> Sort your medications by day and time</li>
                <li><strong>Medication apps:</strong> Set reminders and track when you've taken doses</li>
                <li><strong>Alarm watches:</strong> Provide audible or vibrating medication reminders</li>
                <li><strong>Automatic pill dispensers:</strong> Release the correct medications at programmed times</li>
                <li><strong>Medication journals:</strong> Track effectiveness and side effects</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Preventing Medication Errors</h2>
            
            <div className={styles.rightItem}>
              <h3>Common Medication Errors</h3>
              <p>
                Be aware of these common mistakes and how to avoid them:
              </p>
              <ul>
                <li><strong>Taking the wrong dose:</strong> Always double-check instructions and use measuring tools for liquids</li>
                <li><strong>Taking medications at the wrong time:</strong> Establish a routine and use reminders</li>
                <li><strong>Mixing up medications:</strong> Keep medications in original containers; use pill organizers carefully</li>
                <li><strong>Stopping too soon:</strong> Complete prescribed courses of medication, even if you feel better</li>
                <li><strong>Failing to report side effects:</strong> Contact your provider about concerning symptoms</li>
                <li><strong>Using expired medications:</strong> Check expiration dates and dispose of outdated products</li>
                <li><strong>Taking someone else's medication:</strong> Never share prescription medications</li>
              </ul>
            </div>
            
            <div className={styles.rightItem}>
              <h3>Safety Strategies When Taking Multiple Medications</h3>
              <p>
                If you take multiple medications (polypharmacy), these tips can help reduce risks:
              </p>
              <ul>
                <li>Request medication reviews at least annually with your healthcare provider</li>
                <li>Use one pharmacy for all prescriptions when possible</li>
                <li>Ask if any medications can be discontinued or doses reduced</li>
                <li>Inquire about simplified dosing regimens (e.g., once-daily formulations)</li>
                <li>Bring all your medications (in their original containers) to provider appointments</li>
                <li>Ask about potential interactions before starting new medications or supplements</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Understanding Medication Interactions</h2>
            
            <div className={styles.rightItem}>
              <h3>Types of Medication Interactions</h3>
              <p>
                Medications can interact in several ways:
              </p>
              <ul>
                <li><strong>Drug-drug interactions:</strong> When one medication affects how another works</li>
                <li><strong>Drug-food interactions:</strong> When food affects how a medication works</li>
                <li><strong>Drug-disease interactions:</strong> When a medication worsens an existing condition</li>
                <li><strong>Drug-supplement interactions:</strong> When herbs or supplements affect medications</li>
              </ul>
            </div>
            
            <div className={styles.rightItem}>
              <h3>Common Food and Supplement Interactions</h3>
              <p>
                Be aware of these significant interactions:
              </p>
              <ul>
                <li><strong>Grapefruit juice:</strong> Can increase blood levels of many medications, including some statins, calcium channel blockers, and psychiatric drugs</li>
                <li><strong>Vitamin K-rich foods:</strong> Can reduce the effectiveness of blood thinners like warfarin</li>
                <li><strong>Dairy products:</strong> Can bind to certain antibiotics and prevent absorption</li>
                <li><strong>St. John's Wort:</strong> Can reduce the effectiveness of many medications, including birth control pills and antidepressants</li>
                <li><strong>Alcohol:</strong> Can interact dangerously with many medications, causing increased sedation or liver damage</li>
              </ul>
              <p>
                Always check with your healthcare provider or pharmacist about specific interaction concerns.
              </p>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Special Considerations</h2>
            
            <div className={styles.rightItem}>
              <h3>Medication Considerations for Older Adults</h3>
              <p>
                Older adults face unique medication challenges:
              </p>
              <ul>
                <li>Age-related changes in metabolism affect how medications are processed</li>
                <li>Multiple chronic conditions often require multiple medications</li>
                <li>Some medications that are safe for younger adults may be inappropriate for older adults</li>
                <li>Vision and memory issues can make medication management more difficult</li>
              </ul>
              <p>
                Ask your healthcare provider about medications on the Beers Criteria, a list of potentially 
                inappropriate medications for older adults.
              </p>
            </div>
            
            <div className={styles.rightItem}>
              <h3>Traveling With Medications</h3>
              <p>
                When traveling with medications:
              </p>
              <ul>
                <li>Keep medications in original, labeled containers</li>
                <li>Pack medications in carry-on luggage, not checked bags</li>
                <li>Bring extra doses in case of travel delays</li>
                <li>Carry a copy of your prescriptions or a letter from your doctor for controlled substances</li>
                <li>Research drug laws in countries you're visiting (some common U.S. medications are illegal elsewhere)</li>
                <li>Consider time zone changes when planning medication schedules</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Proper Medication Disposal</h2>
            <p>
              Disposing of unused or expired medications properly helps prevent misuse and environmental contamination:
            </p>
            <ul>
              <li><strong>Medication take-back programs:</strong> Many pharmacies and community organizations offer drop-off locations</li>
              <li><strong>DEA National Prescription Drug Take Back Day:</strong> Held twice a year in many communities</li>
              <li><strong>Household trash disposal:</strong> Mix medications (do not crush) with unpalatable substances like coffee grounds or cat litter, place in sealed container, and throw away</li>
              <li><strong>Flushing:</strong> Only flush medications on the FDA flush list; check the FDA website for current recommendations</li>
            </ul>
            <p>
              Remove personal information from prescription labels before disposing of containers.
            </p>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Frequently Asked Questions</h2>
            
            <div className={styles.faqItem}>
              <h3>How can I afford my medications?</h3>
              <p>
                If you're struggling with medication costs:
              </p>
              <ul>
                <li>Ask your doctor about generic alternatives</li>
                <li>Look into pharmaceutical company patient assistance programs</li>
                <li>Check eligibility for Medicare Extra Help or Medicaid</li>
                <li>Compare prices at different pharmacies (including mail order)</li>
                <li>Ask your pharmacist about discount programs or coupons</li>
                <li>Consider medication therapy management services to identify unnecessary medications</li>
              </ul>
            </div>
            
            <div className={styles.faqItem}>
              <h3>What should I do if I think I'm experiencing a side effect?</h3>
              <p>
                If you suspect a medication side effect:
              </p>
              <ul>
                <li>For severe or life-threatening reactions (difficulty breathing, severe rash, etc.), call 911</li>
                <li>For non-emergency concerns, contact your healthcare provider</li>
                <li>Don't stop taking a prescribed medication without consulting your provider</li>
                <li>Keep a journal of symptoms, including when they occur and their severity</li>
                <li>Report serious adverse events to the FDA's MedWatch program</li>
              </ul>
            </div>
            
            <div className={styles.faqItem}>
              <h3>Should I take medications exactly as prescribed if I'm feeling better?</h3>
              <p>
                Yes, you should complete the full course of medication as prescribed, even if your symptoms improve. This is especially important for antibiotics, where stopping early can lead to antibiotic resistance. If you think you no longer need a medication, discuss this with your healthcare provider rather than stopping on your own.
              </p>
            </div>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Helpful Resources</h2>
            <ul>
              <li><a href="https://www.fda.gov/drugs/safe-disposal-medicines/disposal-unused-medicines-what-you-should-know" target="_blank" rel="noopener noreferrer">FDA - Safe Disposal of Medications</a></li>
              <li><a href="https://www.medicare.gov/drug-coverage-part-d" target="_blank" rel="noopener noreferrer">Medicare Prescription Drug Coverage</a></li>
              <li><a href="https://www.needymeds.org/" target="_blank" rel="noopener noreferrer">NeedyMeds</a> - Information on medication assistance programs</li>
              <li><a href="https://www.bemedwise.org/" target="_blank" rel="noopener noreferrer">BeMedWise</a> - Consumer medication safety resources</li>
              <li><a href="https://www.medlineplus.gov/druginformation.html" target="_blank" rel="noopener noreferrer">MedlinePlus Drug Information</a> - Reliable information about medications</li>
            </ul>
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
