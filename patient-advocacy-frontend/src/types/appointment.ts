export interface AppointmentType {
  id: string;
  title: string;
  description: string;
  color: string;
}

export interface Provider {
  id: string;
  name: string;
  specialty: string;
  imageUrl?: string;
  facilityName?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface Appointment {
  id: string;
  type: AppointmentType;
  provider: Provider;
  date: string; // ISO date string
  time: string; // formatted time (e.g., "10:00 AM")
  duration: number; // in minutes
  location: string;
  notes: string;
  isVideoCall?: boolean;
  videoCallUrl?: string;
  reminderSet?: boolean;
  insuranceRequired?: boolean;
  insuranceVerified?: boolean;
  referralRequired?: boolean;
  referralSubmitted?: boolean;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  documents?: string[]; // IDs of related documents
}

// Pre-defined appointment types
export const APPOINTMENT_TYPES: AppointmentType[] = [
  {
    id: '1',
    title: 'Follow-up',
    description: 'Regular follow-up appointment',
    color: '#4F46E5', // indigo
  },
  {
    id: '2',
    title: 'Annual Physical',
    description: 'Yearly comprehensive examination',
    color: '#10B981', // emerald
  },
  {
    id: '3',
    title: 'Specialist Consultation',
    description: 'Consultation with a specialist',
    color: '#F59E0B', // amber
  },
  {
    id: '4',
    title: 'Diagnostic Test',
    description: 'Medical test or procedure',
    color: '#6366F1', // violet
  },
  {
    id: '5',
    title: 'Therapy Session',
    description: 'Physical or mental health therapy',
    color: '#EC4899', // pink
  },
  {
    id: '6',
    title: 'Advocate Meeting',
    description: 'Meeting with patient advocate',
    color: '#3B82F6', // blue
  },
];
