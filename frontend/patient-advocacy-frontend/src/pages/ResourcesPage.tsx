import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import styles from './ResourcesPage.module.css';

type Resource = {
  id: number;
  title: string;
  description: string;
  category: string;
  image?: string;
  url?: string;
  featured?: boolean;
};

type FAQ = {
  id: number;
  question: string;
  answer: string;
  category: string;
};

const ResourcesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  
  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'patient-rights', name: 'Patient Rights' },
    { id: 'insurance', name: 'Insurance & Billing' },
    { id: 'medical-records', name: 'Medical Records' },
    { id: 'legal', name: 'Legal Information' },
    { id: 'advocacy', name: 'Self-Advocacy' },
    { id: 'medications', name: 'Medications & Safety' },
  ];
  
  const resources: Resource[] = [
    {
      id: 1,
      title: "Patient Bill of Rights",
      description: "Comprehensive guide to understanding your legal rights as a patient in healthcare settings.",
      category: "patient-rights",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 2,
      title: "Insurance Claims Guide",
      description: "Step-by-step instructions for filing insurance claims and appealing denied claims.",
      category: "insurance",
      image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Accessing Your Medical Records",
      description: "Learn how to request, review, and understand your medical records.",
      category: "medical-records",
      image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "HIPAA Privacy Rights",
      description: "Overview of your privacy rights under the Health Insurance Portability and Accountability Act.",
      category: "legal",
      image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Informed Consent Explained",
      description: "Understanding what informed consent means and your right to make decisions about your care.",
      category: "patient-rights",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Speaking Up in Medical Settings",
      description: "Techniques and approaches for effective self-advocacy during medical appointments.",
      category: "advocacy",
      image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 7,
      title: "Medication Safety Guide",
      description: "Information on medication interactions, side effects, and how to address concerns with your provider.",
      category: "medications",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 8,
      title: "Second Opinion Rights",
      description: "Why and how to seek a second medical opinion for your diagnosis or treatment plan.",
      category: "patient-rights",
      image: "https://images.unsplash.com/photo-1543333995-a78aea2eee50?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 9,
      title: "Understanding Hospital Bills",
      description: "Decoding complex hospital billing statements and identifying potential errors.",
      category: "insurance",
      image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 10,
      title: "Healthcare Power of Attorney",
      description: "Information about designating someone to make healthcare decisions if you're unable to do so.",
      category: "legal",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 11,
      title: "Advance Directives Guide",
      description: "How to create and implement advance directives to ensure your care preferences are honored.",
      category: "legal",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 12,
      title: "FDA Medication Guides",
      description: "Access to FDA guides for commonly prescribed medications and their safety profiles.",
      category: "medications",
      image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];
  
  const faqs: FAQ[] = [
    {
      id: 1,
      question: "Do I have the right to see my medical records?",
      answer: "Yes, under HIPAA (Health Insurance Portability and Accountability Act), you have the legal right to access and obtain copies of your medical records. Healthcare providers must provide these records within 30 days of your request, though they may charge a reasonable fee for copying and mailing. Some providers offer electronic access through patient portals.",
      category: "medical-records"
    },
    {
      id: 2,
      question: "Can I refuse a treatment my doctor recommends?",
      answer: "Yes, as an adult with decision-making capacity, you have the right to refuse any medical treatment, even if it's life-saving. This is part of the principle of informed consent. Your healthcare provider should explain the risks and benefits of refusing treatment, but the final decision is yours. It's advisable to discuss your concerns thoroughly with your healthcare team before making such decisions.",
      category: "patient-rights"
    },
    {
      id: 3,
      question: "What should I do if my insurance claim is denied?",
      answer: "If your insurance claim is denied, you have the right to appeal the decision. Start by requesting a written explanation for the denial from your insurance company. Review your policy to understand your coverage. File a formal appeal within the timeframe specified by your insurer (usually 30-180 days). Include supporting documentation from your healthcare provider. If the appeal is denied, you may request an external review by an independent third party.",
      category: "insurance"
    },
    {
      id: 4,
      question: "How do I know if a medication is safe for me?",
      answer: "To determine if a medication is safe for you, discuss your complete medical history, current medications, allergies, and concerns with your healthcare provider. Read the medication guide and package insert for information on side effects, warnings, and contraindications. Ask your pharmacist about potential drug interactions. Use reliable sources like the FDA website to research the medication. Report any adverse effects to your healthcare provider immediately.",
      category: "medications"
    },
    {
      id: 5,
      question: "What's the difference between an advance directive and a healthcare power of attorney?",
      answer: "An advance directive is a written document that specifies your medical care preferences if you become unable to make decisions, particularly regarding end-of-life care. A healthcare power of attorney (or healthcare proxy) is a legal document that designates someone to make healthcare decisions on your behalf if you're incapacitated. Many people create both documents as part of comprehensive advance care planning.",
      category: "legal"
    },
    {
      id: 6,
      question: "How can I effectively communicate with my healthcare team?",
      answer: "To communicate effectively with your healthcare team, prepare a list of questions and concerns before appointments. Bring a summary of your medical history and current medications. Be honest and specific about your symptoms and concerns. Take notes or bring someone with you to help remember information. Ask for clarification on anything you don't understand. Follow up with questions that arise after your appointment. Consider using the teach-back method, where you repeat information in your own words to confirm understanding.",
      category: "advocacy"
    },
    {
      id: 7,
      question: "What rights do I have regarding my privacy in healthcare settings?",
      answer: "Under HIPAA, you have the right to privacy regarding your medical information. Healthcare providers can only share your information for treatment, payment, or healthcare operations without your explicit permission. You can request restrictions on how your information is used or disclosed, though providers aren't always required to agree. You're entitled to receive a notice of privacy practices from healthcare organizations. You can also request an accounting of disclosures of your medical information.",
      category: "patient-rights"
    },
    {
      id: 8,
      question: "How do I check if a doctor or hospital is in my insurance network?",
      answer: "To verify if a provider is in-network, check your insurance company's online directory or call their customer service. Contact the provider directly to confirm their current network status with your specific plan. When scheduling appointments, verify network status again and request the provider's NPI (National Provider Identifier) to document the confirmation. Be aware that network status can change, so it's best to check shortly before receiving services.",
      category: "insurance"
    }
  ];

  useEffect(() => {
    // Filter resources based on category and search term
    const filtered = resources.filter(resource => {
      const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    
    setFilteredResources(filtered);
  }, [searchTerm, activeCategory]);

  // Find featured resource
  const featuredResource = resources.find(resource => resource.featured);

  return (
    <MainLayout>
      <div className={styles.resourcesContainer}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Patient Resources</h1>
          <p className={styles.pageDescription}>
            Access comprehensive information about your rights as a patient, healthcare navigation tools, 
            and essential resources to help you make informed decisions about your care.
          </p>
        </div>

        {featuredResource && (
          <div className={styles.featuredSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Featured Resource</h2>
            </div>
            <div className={styles.featuredCard}>
              {featuredResource.image && (
                <img 
                  src={featuredResource.image} 
                  alt={featuredResource.title} 
                  className={styles.featuredCardImg} 
                />
              )}
              <div className={styles.featuredCardContent}>
                <h3 className={styles.featuredCardTitle}>{featuredResource.title}</h3>
                <p className={styles.featuredCardDescription}>{featuredResource.description}</p>
                <Link to={`/resources/${featuredResource.id}`} className="btn-primary">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search resources..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.categoriesContainer}>
          {categories.map(category => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${activeCategory === category.id ? styles.categoryButtonActive : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className={styles.resourcesGrid}>
          {filteredResources.map(resource => (
            <div key={resource.id} className={styles.resourceCard}>
              {resource.image && (
                <div className={styles.resourceCardHeader}>
                  <img 
                    src={resource.image} 
                    alt={resource.title} 
                    className={styles.resourceCardImg} 
                  />
                </div>
              )}
              <div className={styles.resourceCardBody}>
                <span className={styles.resourceCardTag}>
                  {categories.find(cat => cat.id === resource.category)?.name || resource.category}
                </span>
                <h3 className={styles.resourceCardTitle}>{resource.title}</h3>
                <p className={styles.resourceCardDescription}>{resource.description}</p>
                <div className={styles.resourceCardFooter}>
                  <Link to={`/resources/${resource.id}`} className="btn-secondary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.detailContainer}>
          <div className={styles.detailSection}>
            <h2 className={styles.detailSectionTitle}>Know Your Rights as a Patient</h2>
            <p>As a patient, you are entitled to certain rights that protect your well-being, privacy, and autonomy in healthcare settings. Understanding these rights empowers you to take an active role in your healthcare decisions.</p>
            
            <ul className={styles.detailList}>
              <li className={styles.detailListItem}>
                <strong>Right to Informed Consent:</strong> You have the right to receive clear information about your diagnosis, treatment options, risks, benefits, and alternatives before consenting to any procedure or treatment.
              </li>
              <li className={styles.detailListItem}>
                <strong>Right to Privacy and Confidentiality:</strong> Your medical information is protected under HIPAA. Healthcare providers must maintain the confidentiality of your records and obtain your permission before sharing information.
              </li>
              <li className={styles.detailListItem}>
                <strong>Right to Access Your Medical Records:</strong> You have the right to view, obtain copies of, and request corrections to your medical records.
              </li>
              <li className={styles.detailListItem}>
                <strong>Right to Refuse Treatment:</strong> You can decline any recommended treatment or procedure, even if it's life-saving, as long as you have decision-making capacity.
              </li>
              <li className={styles.detailListItem}>
                <strong>Right to Respect and Dignity:</strong> You deserve to be treated with respect and consideration, free from discrimination based on age, gender, race, ethnicity, religion, sexual orientation, or disability.
              </li>
              <li className={styles.detailListItem}>
                <strong>Right to Emergency Care:</strong> Under the Emergency Medical Treatment and Labor Act (EMTALA), you have the right to receive emergency medical screening and stabilization regardless of your ability to pay.
              </li>
              <li className={styles.detailListItem}>
                <strong>Right to Make Advance Directives:</strong> You can create legal documents that specify your healthcare preferences if you become unable to make decisions.
              </li>
              <li className={styles.detailListItem}>
                <strong>Right to Know Provider Credentials:</strong> You can request information about your healthcare provider's education, training, experience, and certifications.
              </li>
            </ul>
          </div>
          
          <div className={styles.detailSection}>
            <h2 className={styles.detailSectionTitle}>Essential Information for Medical Appointments</h2>
            <p>Being prepared for medical appointments helps ensure that you receive appropriate care and that your concerns are addressed. Consider the following recommendations:</p>
            
            <ul className={styles.detailList}>
              <li className={styles.detailListItem}>
                <strong>Bring a Complete Medication List:</strong> Include all prescription medications, over-the-counter drugs, supplements, and vitamins you take, along with dosages.
              </li>
              <li className={styles.detailListItem}>
                <strong>Document Your Symptoms:</strong> Keep a log of your symptoms, including when they occur, their severity, and what makes them better or worse.
              </li>
              <li className={styles.detailListItem}>
                <strong>Prepare Questions in Advance:</strong> Write down your most important questions to ensure you don't forget them during the appointment.
              </li>
              <li className={styles.detailListItem}>
                <strong>Bring a Support Person:</strong> Consider having a family member or friend accompany you to help remember information and provide support.
              </li>
              <li className={styles.detailListItem}>
                <strong>Take Notes:</strong> Record key information during your appointment or ask if you can record the conversation for personal use.
              </li>
              <li className={styles.detailListItem}>
                <strong>Request Clarification:</strong> If you don't understand something, ask your provider to explain it in different terms.
              </li>
              <li className={styles.detailListItem}>
                <strong>Know Your Insurance Coverage:</strong> Understand what services are covered by your insurance plan before receiving care.
              </li>
            </ul>
          </div>

          <div className={styles.faqContainer}>
            <h2 className={styles.detailSectionTitle}>Frequently Asked Questions</h2>
            
            {faqs.map(faq => (
              <div key={faq.id} className={styles.faqItem}>
                <div 
                  className={styles.faqQuestion}
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                >
                  {faq.question}
                  <span>{expandedFaq === faq.id ? '−' : '+'}</span>
                </div>
                {expandedFaq === faq.id && (
                  <div className={styles.faqAnswer}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className={styles.detailSection}>
            <h2 className={styles.detailSectionTitle}>External Resources</h2>
            <ul className={styles.detailList}>
              <li className={styles.detailListItem}>
                <a href="https://www.hhs.gov/hipaa/for-individuals/index.html" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                  U.S. Department of Health & Human Services - HIPAA Information
                </a>
              </li>
              <li className={styles.detailListItem}>
                <a href="https://www.medicare.gov/claims-appeals/your-medicare-rights" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                  Medicare Rights & Protections
                </a>
              </li>
              <li className={styles.detailListItem}>
                <a href="https://www.fda.gov/patients" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                  FDA Resources for Patients
                </a>
              </li>
              <li className={styles.detailListItem}>
                <a href="https://www.ama-assn.org/delivering-care/ethics/patient-rights" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                  American Medical Association - Patient Rights
                </a>
              </li>
              <li className={styles.detailListItem}>
                <a href="https://www.jointcommission.org/resources/patient-safety-topics/patient-rights/" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                  The Joint Commission - Patient Rights
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ResourcesPage;
