export interface DocumentItem {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  uploadDate: string;
  lastModified: string;
  tags: string[];
  category: DocumentCategory;
  caseId?: string;
  metadata: DocumentMetadata;
  status: DocumentStatus;
}

export type DocumentCategory = 
  | 'medical_records' 
  | 'correspondence' 
  | 'medication' 
  | 'insurance' 
  | 'images' 
  | 'audio_video' 
  | 'personal_notes'
  | 'legal'
  | 'other';

export type DocumentStatus = 'pending_review' | 'verified' | 'incomplete' | 'requires_action' | 'complete';

export interface DocumentMetadata {
  provider?: string;
  facility?: string;
  date?: string;
  relatedMedications?: string[];
  confidential: boolean;
  sharedWith: string[]; // User IDs
  ocr_processed: boolean;
  extracted_text?: string;
  important_dates?: {date: string, description: string}[];
}

export interface Case {
  id: string;
  title: string;
  description: string;
  status: CaseStatus;
  createdDate: string;
  lastUpdated: string;
  documents: string[]; // DocumentItem IDs
  timeline: TimelineEvent[];
  checklist: ChecklistItem[];
  tags: string[];
  type: CaseType;
}

export type CaseStatus = 'active' | 'inactive' | 'resolved' | 'pending';

export type CaseType = 
  | 'adverse_medication_reaction' 
  | 'medical_malpractice' 
  | 'insurance_dispute' 
  | 'care_coordination' 
  | 'general'
  | 'other';

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  documentIds: string[]; // Related DocumentItem IDs
  importance: 'low' | 'medium' | 'high' | 'critical';
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  required: boolean;
  completed: boolean;
  documentIds: string[]; // Associated DocumentItem IDs
  category: DocumentCategory;
}

// Mock document types that are typically needed per case type
export const REQUIRED_DOCUMENTS: Record<CaseType, DocumentCategory[]> = {
  adverse_medication_reaction: [
    'medical_records',
    'medication',
    'images',
    'correspondence'
  ],
  medical_malpractice: [
    'medical_records',
    'correspondence',
    'legal',
    'images',
    'audio_video'
  ],
  insurance_dispute: [
    'insurance',
    'medical_records',
    'correspondence'
  ],
  care_coordination: [
    'medical_records',
    'correspondence'
  ],
  general: [],
  other: []
};
