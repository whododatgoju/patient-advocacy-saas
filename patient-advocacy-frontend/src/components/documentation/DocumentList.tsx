import React, { useState, useEffect } from 'react';
import { DocumentItem, DocumentCategory, DocumentStatus } from '../../types/documentation';
import DocumentService from '../../services/DocumentService';
import Button from '../common/Button';
import styles from './DocumentList.module.css';

interface DocumentListProps {
  caseId?: string;
  onSelectDocument?: (doc: DocumentItem) => void;
  viewOnly?: boolean;
}

const DocumentList: React.FC<DocumentListProps> = ({ 
  caseId, 
  onSelectDocument,
  viewOnly = false
}) => {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<DocumentStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'category'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    loadDocuments();
  }, [caseId]);

  const loadDocuments = () => {
    setLoading(true);
    try {
      let docs: DocumentItem[];
      if (caseId) {
        docs = DocumentService.getDocumentsByCase(caseId);
      } else {
        docs = DocumentService.getAllDocuments();
      }
      setDocuments(docs);
      setError(null);
    } catch (err) {
      setError('Failed to load documents');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDocument = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      try {
        await DocumentService.deleteDocument(id);
        setDocuments(documents.filter(doc => doc.id !== id));
      } catch (err) {
        console.error('Failed to delete document:', err);
        setError('Failed to delete document');
      }
    }
  };

  const handleSort = (key: 'date' | 'title' | 'category') => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const filterAndSortDocuments = () => {
    return documents
      .filter(doc => {
        // Filter by search term
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          doc.title.toLowerCase().includes(searchLower) ||
          doc.description.toLowerCase().includes(searchLower) ||
          doc.tags.some(tag => tag.toLowerCase().includes(searchLower));
        
        // Filter by category
        const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
        
        // Filter by status
        const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus;
        
        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        let comparison = 0;
        
        switch (sortBy) {
          case 'date':
            comparison = new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
            break;
          case 'title':
            comparison = a.title.localeCompare(b.title);
            break;
          case 'category':
            comparison = a.category.localeCompare(b.category);
            break;
        }
        
        return sortOrder === 'asc' ? comparison : -comparison;
      });
  };

  const getStatusClass = (status: DocumentStatus) => {
    switch (status) {
      case 'complete': return styles.statusComplete;
      case 'pending_review': return styles.statusPending;
      case 'verified': return styles.statusVerified;
      case 'incomplete': return styles.statusIncomplete;
      case 'requires_action': return styles.statusAction;
      default: return '';
    }
  };

  const getStatusLabel = (status: DocumentStatus) => {
    switch (status) {
      case 'complete': return 'Complete';
      case 'pending_review': return 'Pending Review';
      case 'verified': return 'Verified';
      case 'incomplete': return 'Incomplete';
      case 'requires_action': return 'Action Required';
      default: return status;
    }
  };

  const getCategoryLabel = (category: DocumentCategory) => {
    switch (category) {
      case 'medical_records': return 'Medical Records';
      case 'correspondence': return 'Correspondence';
      case 'medication': return 'Medication';
      case 'insurance': return 'Insurance';
      case 'images': return 'Images';
      case 'audio_video': return 'Audio/Video';
      case 'personal_notes': return 'Personal Notes';
      case 'legal': return 'Legal Documents';
      case 'other': return 'Other';
      default: return category;
    }
  };

  const filteredDocs = filterAndSortDocuments();

  return (
    <div className={styles.documentList}>
      <div className={styles.listHeader}>
        <h3>Documents {caseId ? 'for this Case' : ''}</h3>
        {!viewOnly && (
          <Button onClick={() => loadDocuments()} className={styles.refreshButton}>
            Refresh
          </Button>
        )}
      </div>
      
      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className={styles.filterOptions}>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value as DocumentCategory | 'all')}
          >
            <option value="all">All Categories</option>
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
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as DocumentStatus | 'all')}
          >
            <option value="all">All Statuses</option>
            <option value="pending_review">Pending Review</option>
            <option value="verified">Verified</option>
            <option value="incomplete">Incomplete</option>
            <option value="requires_action">Action Required</option>
            <option value="complete">Complete</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className={styles.loading}>Loading documents...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : documents.length === 0 ? (
        <div className={styles.empty}>
          No documents found. Use the uploader to add new documents.
        </div>
      ) : filteredDocs.length === 0 ? (
        <div className={styles.empty}>
          No documents match your search criteria.
        </div>
      ) : (
        <div className={styles.documentTable}>
          <div className={styles.tableHeader}>
            <div 
              className={`${styles.cell} ${styles.titleCell}`} 
              onClick={() => handleSort('title')}
            >
              Title
              {sortBy === 'title' && (
                <span className={sortOrder === 'asc' ? styles.sortAsc : styles.sortDesc}>
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </div>
            <div 
              className={`${styles.cell} ${styles.categoryCell}`} 
              onClick={() => handleSort('category')}
            >
              Category
              {sortBy === 'category' && (
                <span className={sortOrder === 'asc' ? styles.sortAsc : styles.sortDesc}>
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </div>
            <div 
              className={`${styles.cell} ${styles.dateCell}`} 
              onClick={() => handleSort('date')}
            >
              Date Added
              {sortBy === 'date' && (
                <span className={sortOrder === 'asc' ? styles.sortAsc : styles.sortDesc}>
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </div>
            <div className={`${styles.cell} ${styles.statusCell}`}>Status</div>
            <div className={`${styles.cell} ${styles.actionsCell}`}>Actions</div>
          </div>
          
          <div className={styles.tableBody}>
            {filteredDocs.map((doc) => (
              <div key={doc.id} className={styles.documentRow}>
                <div 
                  className={`${styles.cell} ${styles.titleCell}`}
                  onClick={() => onSelectDocument && onSelectDocument(doc)}
                >
                  <div className={styles.documentTitle}>{doc.title}</div>
                  {doc.description && (
                    <div className={styles.documentDescription}>{doc.description}</div>
                  )}
                  {doc.tags.length > 0 && (
                    <div className={styles.tagList}>
                      {doc.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className={`${styles.cell} ${styles.categoryCell}`}>
                  {getCategoryLabel(doc.category)}
                </div>
                <div className={`${styles.cell} ${styles.dateCell}`}>
                  {new Date(doc.uploadDate).toLocaleDateString()}
                </div>
                <div className={`${styles.cell} ${styles.statusCell}`}>
                  <span className={`${styles.status} ${getStatusClass(doc.status)}`}>
                    {getStatusLabel(doc.status)}
                  </span>
                </div>
                <div className={`${styles.cell} ${styles.actionsCell}`}>
                  <div className={styles.actionButtons}>
                    <button 
                      className={styles.viewButton}
                      onClick={() => onSelectDocument && onSelectDocument(doc)}
                    >
                      View
                    </button>
                    {!viewOnly && (
                      <button 
                        className={styles.deleteButton}
                        onClick={() => handleDeleteDocument(doc.id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentList;
