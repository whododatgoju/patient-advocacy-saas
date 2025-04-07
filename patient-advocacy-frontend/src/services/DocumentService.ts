import { DocumentItem, Case, DocumentCategory, TimelineEvent, ChecklistItem, REQUIRED_DOCUMENTS } from '../types/documentation';
// We'll use axiosInstance later for API integration
// import { axiosInstance } from './api';

class DocumentService {
  // In a real implementation, these would call API endpoints
  // For now, we'll use localStorage for demonstration purposes
  
  private storageKey = 'patient_documents';
  private caseStorageKey = 'patient_cases';
  // Make REQUIRED_DOCUMENTS accessible as a property of the service
  public REQUIRED_DOCUMENTS = REQUIRED_DOCUMENTS;

  // Document Management
  async uploadDocument(file: File, metadata: Partial<DocumentItem>): Promise<DocumentItem> {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        // In a real implementation, this would upload to a server
        // Here we'll create a mock document
        const docId = `doc_${Date.now()}`;
        const newDoc: DocumentItem = {
          id: docId,
          title: metadata.title || file.name,
          description: metadata.description || '',
          fileUrl: URL.createObjectURL(file), // Local blob URL for demo
          fileType: file.type,
          fileSize: file.size,
          uploadDate: new Date().toISOString(),
          lastModified: new Date().toISOString(),
          tags: metadata.tags || [],
          category: metadata.category || 'other',
          caseId: metadata.caseId,
          metadata: {
            provider: metadata.metadata?.provider || '',
            facility: metadata.metadata?.facility || '',
            date: metadata.metadata?.date || new Date().toISOString(),
            relatedMedications: metadata.metadata?.relatedMedications || [],
            confidential: metadata.metadata?.confidential || false,
            sharedWith: metadata.metadata?.sharedWith || [],
            ocr_processed: false
          },
          status: metadata.status || 'pending_review'
        };
        
        // Save to localStorage
        const docs = this.getAllDocuments();
        docs.push(newDoc);
        localStorage.setItem(this.storageKey, JSON.stringify(docs));
        
        resolve(newDoc);
      }, 1000);
    });
  }

  getAllDocuments(): DocumentItem[] {
    const docsJson = localStorage.getItem(this.storageKey);
    return docsJson ? JSON.parse(docsJson) : [];
  }

  getDocumentById(id: string): DocumentItem | null {
    const docs = this.getAllDocuments();
    return docs.find(doc => doc.id === id) || null;
  }

  getDocumentsByCategory(category: DocumentCategory): DocumentItem[] {
    const docs = this.getAllDocuments();
    return docs.filter(doc => doc.category === category);
  }

  getDocumentsByCase(caseId: string): DocumentItem[] {
    const docs = this.getAllDocuments();
    return docs.filter(doc => doc.caseId === caseId);
  }

  async updateDocument(id: string, updates: Partial<DocumentItem>): Promise<DocumentItem> {
    return new Promise((resolve, reject) => {
      const docs = this.getAllDocuments();
      const index = docs.findIndex(doc => doc.id === id);
      
      if (index === -1) {
        reject(new Error('Document not found'));
        return;
      }
      
      const updatedDoc = { ...docs[index], ...updates, lastModified: new Date().toISOString() };
      docs[index] = updatedDoc;
      
      localStorage.setItem(this.storageKey, JSON.stringify(docs));
      resolve(updatedDoc);
    });
  }

  async deleteDocument(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const docs = this.getAllDocuments();
      const filteredDocs = docs.filter(doc => doc.id !== id);
      
      if (filteredDocs.length === docs.length) {
        reject(new Error('Document not found'));
        return;
      }
      
      localStorage.setItem(this.storageKey, JSON.stringify(filteredDocs));
      resolve();
    });
  }

  // Case Management
  getAllCases(): Case[] {
    const casesJson = localStorage.getItem(this.caseStorageKey);
    return casesJson ? JSON.parse(casesJson) : [];
  }

  getCaseById(id: string): Case | null {
    const cases = this.getAllCases();
    return cases.find(c => c.id === id) || null;
  }

  async createCase(caseData: Partial<Case>): Promise<Case> {
    return new Promise((resolve) => {
      const caseId = `case_${Date.now()}`;
      const newCase: Case = {
        id: caseId,
        title: caseData.title || 'New Case',
        description: caseData.description || '',
        status: caseData.status || 'active',
        createdDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        documents: caseData.documents || [],
        timeline: caseData.timeline || [],
        checklist: caseData.checklist || [],
        tags: caseData.tags || [],
        type: caseData.type || 'general'
      };
      
      const cases = this.getAllCases();
      cases.push(newCase);
      localStorage.setItem(this.caseStorageKey, JSON.stringify(cases));
      
      resolve(newCase);
    });
  }

  async updateCase(id: string, updates: Partial<Case>): Promise<Case> {
    return new Promise((resolve, reject) => {
      const cases = this.getAllCases();
      const index = cases.findIndex(c => c.id === id);
      
      if (index === -1) {
        reject(new Error('Case not found'));
        return;
      }
      
      const updatedCase = { 
        ...cases[index], 
        ...updates, 
        lastUpdated: new Date().toISOString() 
      };
      cases[index] = updatedCase;
      
      localStorage.setItem(this.caseStorageKey, JSON.stringify(cases));
      resolve(updatedCase);
    });
  }

  async deleteCase(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const cases = this.getAllCases();
      const filteredCases = cases.filter(c => c.id !== id);
      
      if (filteredCases.length === cases.length) {
        reject(new Error('Case not found'));
        return;
      }
      
      localStorage.setItem(this.caseStorageKey, JSON.stringify(filteredCases));
      
      // Also delete or update associated documents
      const docs = this.getAllDocuments();
      const updatedDocs = docs.map(doc => {
        if (doc.caseId === id) {
          return { ...doc, caseId: undefined };
        }
        return doc;
      });
      
      localStorage.setItem(this.storageKey, JSON.stringify(updatedDocs));
      resolve();
    });
  }

  // Timeline Management
  async addTimelineEvent(caseId: string, event: Partial<TimelineEvent>): Promise<TimelineEvent> {
    return new Promise((resolve, reject) => {
      const cases = this.getAllCases();
      const caseIndex = cases.findIndex(c => c.id === caseId);
      
      if (caseIndex === -1) {
        reject(new Error('Case not found'));
        return;
      }
      
      const eventId = `event_${Date.now()}`;
      const newEvent: TimelineEvent = {
        id: eventId,
        date: event.date || new Date().toISOString(),
        title: event.title || 'New Event',
        description: event.description || '',
        documentIds: event.documentIds || [],
        importance: event.importance || 'medium'
      };
      
      cases[caseIndex].timeline.push(newEvent);
      cases[caseIndex].lastUpdated = new Date().toISOString();
      
      localStorage.setItem(this.caseStorageKey, JSON.stringify(cases));
      resolve(newEvent);
    });
  }

  // Utility functions for document management
  generateDocumentChecklist(caseType: string): ChecklistItem[] {
    // This would be more sophisticated in a real implementation
    // Just a basic example to create checklist items based on case type
    return [];
  }
}

export default new DocumentService();
