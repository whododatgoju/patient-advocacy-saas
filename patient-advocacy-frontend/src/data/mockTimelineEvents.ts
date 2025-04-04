import { TimelineEvent } from '../components/timeline/HealthJourneyTimeline';

export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: 1,
    title: 'Initial Diagnosis Appointment',
    date: '2025-03-28T14:30:00',
    type: 'diagnosis',
    description: 'Received initial diagnosis of Type 2 Diabetes from Dr. Patel.',
    provider: 'Dr. Lakshmi Patel',
    location: 'Cityview Medical Center',
    patientRightsRelevance: [
      'Right to Information', 
      'Right to Participate in Decisions'
    ],
    relatedDocuments: [
      { id: 101, name: 'Diagnosis Report' },
      { id: 102, name: 'Lab Results - A1C' }
    ],
    relatedJournalEntries: [
      { id: 201, title: 'My Diagnosis Experience' }
    ],
    important: true
  },
  {
    id: 2,
    title: 'Started Metformin Medication',
    date: '2025-03-30T09:15:00',
    type: 'medication',
    description: 'Started taking Metformin 500mg twice daily as prescribed by Dr. Patel.',
    patientRightsRelevance: [
      'Right to Information',
      'Right to Informed Consent'
    ],
    relatedDocuments: [
      { id: 103, name: 'Prescription Details' }
    ]
  },
  {
    id: 3,
    title: 'Follow-up with Endocrinologist',
    date: '2025-04-15T14:00:00',
    type: 'appointment',
    description: 'Scheduled follow-up appointment with Dr. Chen to review medication effectiveness and discuss treatment plan.',
    provider: 'Dr. Robert Chen',
    location: 'Diabetes Care Specialists',
    followUpNeeded: true,
    followUpDate: '2025-05-15T00:00:00'
  },
  {
    id: 4,
    title: 'Insurance Denied Coverage for CGM',
    date: '2025-04-02T11:20:00',
    type: 'rights-issue',
    description: 'Insurance company denied coverage for Continuous Glucose Monitor despite doctor recommendation.',
    patientRightsRelevance: [
      'Right to Access Medical Records',
      'Right to Participate in Decisions'
    ],
    relatedJournalEntries: [
      { id: 202, title: 'Dealing with Insurance Denial' }
    ],
    important: true
  },
  {
    id: 5,
    title: 'Journal Entry about Side Effects',
    date: '2025-04-03T19:45:00',
    type: 'journal',
    description: 'Documented digestive side effects from Metformin and questions to ask at next appointment.',
    relatedJournalEntries: [
      { id: 203, title: 'Medication Side Effects' }
    ]
  },
  {
    id: 6,
    title: 'Nutrition Consultation',
    date: '2025-04-05T10:00:00',
    type: 'appointment',
    description: 'Met with Sarah Williams, Registered Dietitian, to develop a nutrition plan for diabetes management.',
    provider: 'Sarah Williams, RD',
    location: 'Cityview Medical Center',
    relatedDocuments: [
      { id: 104, name: 'Nutrition Plan' }
    ]
  },
  {
    id: 7,
    title: 'Weekly Blood Tests',
    date: '2025-04-08T08:30:00',
    type: 'test',
    description: 'Comprehensive blood panel to monitor glucose levels and kidney function.',
    location: 'Cityview Lab Services',
    relatedDocuments: [
      { id: 105, name: 'Blood Test Results' }
    ]
  },
  {
    id: 8,
    title: 'Diabetes Education Class',
    date: '2025-03-20T13:00:00',
    type: 'appointment',
    description: 'Group education session on diabetes management, including diet, exercise, and monitoring.',
    location: 'Community Health Center',
    provider: 'Maria Rodriguez, CDE'
  },
  {
    id: 9,
    title: 'Eye Examination',
    date: '2025-03-12T09:30:00',
    type: 'appointment',
    description: 'Annual diabetic retinopathy screening with Dr. Wilson.',
    provider: 'Dr. James Wilson',
    location: 'Vision Care Specialists',
    relatedDocuments: [
      { id: 106, name: 'Eye Exam Results' }
    ]
  },
  {
    id: 10,
    title: 'Medication Dosage Adjusted',
    date: '2025-03-05T16:15:00',
    type: 'medication',
    description: 'Metformin dosage increased to 1000mg twice daily based on blood glucose monitoring results.',
    provider: 'Dr. Lakshmi Patel',
    patientRightsRelevance: [
      'Right to Participate in Decisions',
      'Right to Information'
    ]
  },
  {
    id: 11,
    title: 'Provider Refused to Share Full Test Results',
    date: '2025-02-20T11:00:00',
    type: 'rights-issue',
    description: 'Lab technician refused to provide copies of all test results, stating they needed to go through my doctor.',
    location: 'Cityview Lab Services',
    patientRightsRelevance: [
      'Right to Access Medical Records'
    ],
    relatedJournalEntries: [
      { id: 204, title: 'Challenges Accessing My Test Results' }
    ],
    important: true
  },
  {
    id: 12,
    title: 'Initial Consultation',
    date: '2025-02-10T09:00:00',
    type: 'appointment',
    description: 'First appointment with Dr. Patel after referral for elevated blood glucose levels.',
    provider: 'Dr. Lakshmi Patel',
    location: 'Cityview Medical Center'
  }
];

export default mockTimelineEvents;
