import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import DocumentUploader from '../components/documentation/DocumentUploader';
import DocumentList from '../components/documentation/DocumentList';
import { DocumentItem, Case, CaseType, DocumentCategory } from '../types/documentation';
import DocumentService from '../services/DocumentService';
import styles from './DocumentationPage.module.css';
import Button from '../components/common/Button';

const DocumentationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'documents' | 'cases'>('documents');
  const [showUploader, setShowUploader] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [cases, setCases] = useState<Case[]>([]);
  const [showNewCaseForm, setShowNewCaseForm] = useState(false);
  const [newCase, setNewCase] = useState<Partial<Case>>({
    title: '',
    description: '',
    type: 'general' as CaseType,
    status: 'active'
  });

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = () => {
    const cases = DocumentService.getAllCases();
    setCases(cases);
  };

  const handleDocumentSelect = (doc: DocumentItem) => {
    setSelectedDocument(doc);
  };

  const handleDocumentUploadComplete = (success: boolean) => {
    if (success) {
      setShowUploader(false);
      // Refresh document list
    }
  };

  const handleCreateCase = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdCase = await DocumentService.createCase(newCase);
      setCases([...cases, createdCase]);
      setShowNewCaseForm(false);
      setNewCase({
        title: '',
        description: '',
        type: 'general' as CaseType,
        status: 'active'
      });
    } catch (err) {
      console.error('Failed to create case:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewCase({
      ...newCase,
      [name]: value
    });
  };

  const handleSelectCase = (caseItem: Case) => {
    setSelectedCase(caseItem);
  };

  const getCaseTypeLabel = (type: CaseType) => {
    switch (type) {
      case 'adverse_medication_reaction': return 'Adverse Medication Reaction';
      case 'medical_malpractice': return 'Medical Malpractice';
      case 'insurance_dispute': return 'Insurance Dispute';
      case 'care_coordination': return 'Care Coordination';
      case 'general': return 'General';
      case 'other': return 'Other';
      default: return type;
    }
  };

  const renderCasesList = () => {
    return (
      <div className={styles.casesContainer}>
        <div className={styles.casesHeader}>
          <h3>Your Cases</h3>
          <Button onClick={() => setShowNewCaseForm(true)}>New Case</Button>
        </div>
        
        {cases.length === 0 ? (
          <div className={styles.emptyCases}>
            <p>You haven't created any cases yet. Cases help you organize documents related to specific health events or issues.</p>
            <Button onClick={() => setShowNewCaseForm(true)}>Create Your First Case</Button>
          </div>
        ) : (
          <div className={styles.casesList}>
            {cases.map(caseItem => (
              <div 
                key={caseItem.id} 
                className={`${styles.caseCard} ${selectedCase?.id === caseItem.id ? styles.selectedCase : ''}`}
                onClick={() => handleSelectCase(caseItem)}
              >
                <div className={styles.caseTitle}>{caseItem.title}</div>
                <div className={styles.caseType}>{getCaseTypeLabel(caseItem.type)}</div>
                <div className={styles.caseDate}>
                  Created: {new Date(caseItem.createdDate).toLocaleDateString()}
                </div>
                {caseItem.documents.length > 0 && (
                  <div className={styles.documentCount}>
                    {caseItem.documents.length} document{caseItem.documents.length !== 1 ? 's' : ''}
                  </div>
                )}
                <div className={`${styles.caseStatus} ${styles[`status${caseItem.status}`]}`}>
                  {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderCaseDetail = () => {
    if (!selectedCase) return null;
    
    return (
      <div className={styles.caseDetail}>
        <div className={styles.caseDetailHeader}>
          <button 
            className={styles.backButton} 
            onClick={() => setSelectedCase(null)}
          >
            ← Back to All Cases
          </button>
          <h2>{selectedCase.title}</h2>
          <div className={styles.caseDetailMeta}>
            <span className={`${styles.caseStatus} ${styles[`status${selectedCase.status}`]}`}>
              {selectedCase.status.charAt(0).toUpperCase() + selectedCase.status.slice(1)}
            </span>
            <span className={styles.caseType}>{getCaseTypeLabel(selectedCase.type)}</span>
          </div>
        </div>
        
        {selectedCase.description && (
          <div className={styles.caseDescription}>
            {selectedCase.description}
          </div>
        )}
        
        <div className={styles.caseActions}>
          <Button 
            onClick={() => setShowUploader(true)}
            className={styles.primaryButton}
          >
            Add Document to Case
          </Button>
        </div>
        
        <div className={styles.caseDocuments}>
          <h3>Case Documents</h3>
          <DocumentList 
            caseId={selectedCase.id}
            onSelectDocument={handleDocumentSelect}
          />
        </div>
        
        {/* Document checklist based on case type */}
        <div className={styles.documentChecklist}>
          <h3>Document Checklist</h3>
          <p>Based on your case type, the following documents are typically needed:</p>
          
          <div className={styles.checklistItems}>
            {selectedCase.type in DocumentService.REQUIRED_DOCUMENTS && 
              DocumentService.REQUIRED_DOCUMENTS[selectedCase.type].map((category: DocumentCategory) => (
                <div key={category} className={styles.checklistItem}>
                  <input 
                    type="checkbox" 
                    id={`checklist-${category}`} 
                    checked={selectedCase.documents.some(docId => {
                      const doc = DocumentService.getDocumentById(docId);
                      return doc && doc.category === category;
                    })}
                    readOnly
                  />
                  <label htmlFor={`checklist-${category}`}>{getCaseTypeLabel(category as any)}</label>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  };

  const renderDocumentViewer = () => {
    if (!selectedDocument) return null;
    
    return (
      <div className={styles.documentViewer}>
        <button 
          className={styles.closeButton} 
          onClick={() => setSelectedDocument(null)}
        >
          ×
        </button>
        
        <div className={styles.documentInfo}>
          <h2>{selectedDocument.title}</h2>
          <div className={styles.documentMeta}>
            <span>Added: {new Date(selectedDocument.uploadDate).toLocaleDateString()}</span>
            <span>Type: {selectedDocument.fileType}</span>
            <span>Category: {selectedDocument.category}</span>
          </div>
          {selectedDocument.description && (
            <p className={styles.documentDescription}>{selectedDocument.description}</p>
          )}
          
          {selectedDocument.tags.length > 0 && (
            <div className={styles.documentTags}>
              {selectedDocument.tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>
        
        <div className={styles.documentContent}>
          {selectedDocument.fileType.startsWith('image/') ? (
            <img 
              src={selectedDocument.fileUrl} 
              alt={selectedDocument.title} 
              className={styles.documentImage}
            />
          ) : selectedDocument.fileType.startsWith('application/pdf') ? (
            <iframe
              src={selectedDocument.fileUrl}
              title={selectedDocument.title}
              className={styles.documentPdf}
            ></iframe>
          ) : selectedDocument.fileType.startsWith('audio/') ? (
            <audio
              src={selectedDocument.fileUrl}
              controls
              className={styles.documentAudio}
            ></audio>
          ) : selectedDocument.fileType.startsWith('video/') ? (
            <video
              src={selectedDocument.fileUrl}
              controls
              className={styles.documentVideo}
            ></video>
          ) : (
            <div className={styles.unsupportedFormat}>
              This file format cannot be previewed directly. 
              <a href={selectedDocument.fileUrl} download={selectedDocument.title}>
                Download File
              </a>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderNewCaseForm = () => {
    return (
      <div className={styles.newCaseForm}>
        <h3>Create New Case</h3>
        <form onSubmit={handleCreateCase}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Case Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newCase.title}
              onChange={handleInputChange}
              required
              placeholder="E.g., Medication Reaction to Lisinopril"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={newCase.description}
              onChange={handleInputChange}
              placeholder="Describe the case - what happened, when it started, etc."
            ></textarea>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="type">Case Type*</label>
            <select
              id="type"
              name="type"
              value={newCase.type}
              onChange={handleInputChange}
              required
            >
              <option value="adverse_medication_reaction">Adverse Medication Reaction</option>
              <option value="medical_malpractice">Medical Malpractice</option>
              <option value="insurance_dispute">Insurance Dispute</option>
              <option value="care_coordination">Care Coordination</option>
              <option value="general">General</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className={styles.formActions}>
            <Button 
              type="button" 
              onClick={() => setShowNewCaseForm(false)}
              className={styles.cancelButton}
            >
              Cancel
            </Button>
            <Button type="submit">Create Case</Button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className={styles.documentationPage}>
        <div className={styles.pageHeader}>
          <h1>Patient Documentation Center</h1>
          <p>Securely store, organize, and access your medical documents.</p>
        </div>
        
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'documents' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            All Documents
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'cases' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('cases')}
          >
            Cases
          </button>
        </div>
        
        {activeTab === 'documents' && (
          <div className={styles.documentsTab}>
            {!selectedDocument && (
              <>
                <div className={styles.actions}>
                  <Button 
                    onClick={() => setShowUploader(!showUploader)}
                    className={styles.primaryButton}
                  >
                    {showUploader ? 'Cancel Upload' : 'Upload Documents'}
                  </Button>
                </div>
                
                {showUploader && (
                  <DocumentUploader onUploadComplete={handleDocumentUploadComplete} />
                )}
                
                <DocumentList onSelectDocument={handleDocumentSelect} />
              </>
            )}
            
            {selectedDocument && renderDocumentViewer()}
          </div>
        )}
        
        {activeTab === 'cases' && (
          <div className={styles.casesTab}>
            {showNewCaseForm ? (
              renderNewCaseForm()
            ) : selectedCase ? (
              renderCaseDetail()
            ) : (
              renderCasesList()
            )}
            
            {showUploader && selectedCase && (
              <DocumentUploader 
                caseId={selectedCase.id} 
                onUploadComplete={handleDocumentUploadComplete} 
              />
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DocumentationPage;
