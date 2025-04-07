import React, { useState, useRef } from 'react';
import { DocumentCategory, DocumentStatus } from '../../types/documentation';
import DocumentService from '../../services/DocumentService';
import Button from '../common/Button';
import styles from './DocumentUploader.module.css';

interface DocumentUploaderProps {
  caseId?: string;
  onUploadComplete: (success: boolean) => void;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ caseId, onUploadComplete }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [documentMetadata, setDocumentMetadata] = useState({
    title: '',
    description: '',
    category: 'medical_records' as DocumentCategory,
    tags: [],
    provider: '',
    facility: '',
    date: '',
    confidential: false
  });
  const [newTag, setNewTag] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
      
      // Auto-populate title with filename if only one file
      if (e.target.files.length === 1) {
        const file = e.target.files[0];
        setDocumentMetadata({
          ...documentMetadata,
          title: file.name.split('.')[0]
        });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDocumentMetadata({
      ...documentMetadata,
      [name]: value
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setDocumentMetadata({
      ...documentMetadata,
      [name]: checked
    });
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!documentMetadata.tags.includes(newTag.trim())) {
        setDocumentMetadata({
          ...documentMetadata,
          tags: [...documentMetadata.tags, newTag.trim()]
        });
      }
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setDocumentMetadata({
      ...documentMetadata,
      tags: documentMetadata.tags.filter(t => t !== tag)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      setError('Please select at least one file to upload');
      return;
    }
    
    setUploading(true);
    setError(null);
    
    try {
      // Upload each file sequentially
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgress(Math.round((i / files.length) * 100));
        
        // For multiple files, adjust title to include file name
        const fileTitle = files.length > 1 
          ? `${documentMetadata.title} - ${file.name.split('.')[0]}` 
          : documentMetadata.title;
        
        await DocumentService.uploadDocument(file, {
          title: fileTitle,
          description: documentMetadata.description,
          category: documentMetadata.category,
          tags: documentMetadata.tags,
          caseId: caseId,
          metadata: {
            provider: documentMetadata.provider,
            facility: documentMetadata.facility,
            date: documentMetadata.date || new Date().toISOString(),
            confidential: documentMetadata.confidential,
            sharedWith: [],
            ocr_processed: false
          },
          status: 'pending_review' as DocumentStatus
        });
      }
      
      setUploadProgress(100);
      
      // Reset form
      setFiles([]);
      setDocumentMetadata({
        title: '',
        description: '',
        category: 'medical_records',
        tags: [],
        provider: '',
        facility: '',
        date: '',
        confidential: false
      });
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      onUploadComplete(true);
    } catch (err) {
      setError('Failed to upload documents. Please try again.');
      onUploadComplete(false);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.uploader}>
      <h3>Upload Documentation</h3>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.fileSelector}>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            ref={fileInputRef}
            className={styles.fileInput}
          />
          <div className={styles.fileInfo}>
            {files.length > 0 ? (
              <ul>
                {files.map((file, index) => (
                  <li key={index}>
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </li>
                ))}
              </ul>
            ) : (
              <p>Drag files here or click to select</p>
            )}
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="title">Document Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={documentMetadata.title}
            onChange={handleInputChange}
            required
            placeholder="Enter a descriptive title"
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={documentMetadata.description}
            onChange={handleInputChange}
            placeholder="Briefly describe this document"
          />
        </div>
        
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="category">Category*</label>
            <select
              id="category"
              name="category"
              value={documentMetadata.category}
              onChange={handleInputChange}
              required
            >
              <option value="medical_records">Medical Records</option>
              <option value="correspondence">Correspondence</option>
              <option value="medication">Medication</option>
              <option value="insurance">Insurance</option>
              <option value="images">Images</option>
              <option value="audio_video">Audio/Video</option>
              <option value="personal_notes">Personal Notes</option>
              <option value="legal">Legal Documents</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="date">Document Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={documentMetadata.date.split('T')[0]}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="provider">Healthcare Provider</label>
            <input
              type="text"
              id="provider"
              name="provider"
              value={documentMetadata.provider}
              onChange={handleInputChange}
              placeholder="Provider name"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="facility">Facility/Location</label>
            <input
              type="text"
              id="facility"
              name="facility"
              value={documentMetadata.facility}
              onChange={handleInputChange}
              placeholder="Facility or location"
            />
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="Type tag and press Enter"
          />
          
          {documentMetadata.tags.length > 0 && (
            <div className={styles.tagContainer}>
              {documentMetadata.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)}>×</button>
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="confidential"
              checked={documentMetadata.confidential}
              onChange={handleCheckboxChange}
            />
            Mark as confidential
          </label>
        </div>
        
        {error && <div className={styles.error}>{error}</div>}
        
        {uploading && (
          <div className={styles.progressContainer}>
            <div 
              className={styles.progressBar} 
              style={{ width: `${uploadProgress}%` }}
            ></div>
            <span>{uploadProgress}%</span>
          </div>
        )}
        
        <div className={styles.buttons}>
          <Button 
            type="submit" 
            disabled={uploading}
            className={styles.uploadButton}
          >
            {uploading ? 'Uploading...' : 'Upload Documents'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DocumentUploader;
