import { Appointment, Provider, APPOINTMENT_TYPES } from '../types/appointment';
import { v4 as uuidv4 } from 'uuid';

class AppointmentService {
  private static STORAGE_KEY = 'patient_advocacy_appointments';
  private static PROVIDERS_KEY = 'patient_advocacy_providers';

  // Get all appointments for the current user
  public static getAppointments(): Appointment[] {
    const storedAppointments = localStorage.getItem(this.STORAGE_KEY);
    if (!storedAppointments) {
      // Initialize with mock data if no appointments exist
      const mockAppointments = this.generateMockAppointments();
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mockAppointments));
      return mockAppointments;
    }
    return JSON.parse(storedAppointments);
  }

  // Get a single appointment by ID
  public static getAppointmentById(id: string): Appointment | null {
    const appointments = this.getAppointments();
    return appointments.find(appt => appt.id === id) || null;
  }

  // Get upcoming appointments (today and future)
  public static getUpcomingAppointments(): Appointment[] {
    const appointments = this.getAppointments();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to beginning of day for comparison
    
    return appointments.filter(appt => {
      const apptDate = new Date(appt.date);
      return apptDate >= today && appt.status !== 'cancelled';
    }).sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }

  // Get past appointments
  public static getPastAppointments(): Appointment[] {
    const appointments = this.getAppointments();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to beginning of day for comparison
    
    return appointments.filter(appt => {
      const apptDate = new Date(appt.date);
      return apptDate < today || appt.status === 'completed';
    }).sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime(); // Descending
    });
  }

  // Add a new appointment
  public static addAppointment(appointment: Omit<Appointment, 'id'>): Appointment {
    const newAppointment = {
      ...appointment,
      id: uuidv4(),
    };
    
    const appointments = this.getAppointments();
    appointments.push(newAppointment);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(appointments));
    
    return newAppointment;
  }

  // Update an existing appointment
  public static updateAppointment(updatedAppointment: Appointment): Appointment {
    const appointments = this.getAppointments();
    const index = appointments.findIndex(appt => appt.id === updatedAppointment.id);
    
    if (index !== -1) {
      appointments[index] = updatedAppointment;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(appointments));
      return updatedAppointment;
    }
    
    throw new Error(`Appointment with ID ${updatedAppointment.id} not found`);
  }

  // Cancel an appointment
  public static cancelAppointment(id: string): Appointment {
    const appointments = this.getAppointments();
    const index = appointments.findIndex(appt => appt.id === id);
    
    if (index !== -1) {
      appointments[index].status = 'cancelled';
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(appointments));
      return appointments[index];
    }
    
    throw new Error(`Appointment with ID ${id} not found`);
  }

  // Delete an appointment
  public static deleteAppointment(id: string): void {
    const appointments = this.getAppointments();
    const updatedAppointments = appointments.filter(appt => appt.id !== id);
    
    if (updatedAppointments.length < appointments.length) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedAppointments));
    } else {
      throw new Error(`Appointment with ID ${id} not found`);
    }
  }

  // Get all healthcare providers
  public static getProviders(): Provider[] {
    const storedProviders = localStorage.getItem(this.PROVIDERS_KEY);
    if (!storedProviders) {
      // Initialize with mock data if no providers exist
      const mockProviders = this.generateMockProviders();
      localStorage.setItem(this.PROVIDERS_KEY, JSON.stringify(mockProviders));
      return mockProviders;
    }
    return JSON.parse(storedProviders);
  }

  // Generate mock appointment data
  private static generateMockProviders(): Provider[] {
    return [
      {
        id: '1',
        name: 'Dr. Lakshmi Patel',
        specialty: 'Primary Care Physician',
        imageUrl: 'https://randomuser.me/api/portraits/women/55.jpg',
        facilityName: 'Community Health Center',
        address: '123 Healthcare Ave, Medical City, MC 12345',
        phone: '(555) 123-4567',
        email: 'lpatel@healthcenter.org',
      },
      {
        id: '2',
        name: 'Dr. Robert Chen',
        specialty: 'Endocrinologist',
        imageUrl: 'https://randomuser.me/api/portraits/men/42.jpg',
        facilityName: 'Diabetes & Endocrine Center',
        address: '456 Specialist Blvd, Medical City, MC 12345',
        phone: '(555) 234-5678',
        email: 'rchen@endocrine.org',
      },
      {
        id: '3',
        name: 'Sarah Johnson',
        specialty: 'Patient Advocate',
        imageUrl: 'https://randomuser.me/api/portraits/women/32.jpg',
        facilityName: 'Patient Advocacy Services',
        phone: '(555) 345-6789',
        email: 'sjohnson@advocacyservices.org',
      },
      {
        id: '4',
        name: 'Dr. Michael Torres',
        specialty: 'Cardiologist',
        imageUrl: 'https://randomuser.me/api/portraits/men/63.jpg',
        facilityName: 'Heart & Vascular Institute',
        address: '789 Cardiac Way, Medical City, MC 12345',
        phone: '(555) 456-7890',
        email: 'mtorres@heartcenter.org',
      },
      {
        id: '5',
        name: 'Dr. Amara Washington',
        specialty: 'Neurologist',
        imageUrl: 'https://randomuser.me/api/portraits/women/26.jpg',
        facilityName: 'Neuroscience Center',
        address: '321 Brain St, Medical City, MC 12345',
        phone: '(555) 567-8901',
        email: 'awashington@neuro.org',
      }
    ];
  }

  // Generate mock appointment data
  private static generateMockAppointments(): Appointment[] {
    const providers = this.generateMockProviders();
    const today = new Date();
    
    // Helper to generate a future date
    const futureDateString = (daysFromNow: number) => {
      const date = new Date();
      date.setDate(date.getDate() + daysFromNow);
      return date.toISOString().split('T')[0]; // YYYY-MM-DD
    };
    
    // Helper to format date for display
    const formatDateForDisplay = (dateString: string) => {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
      const date = new Date(dateString);
      return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    };
    
    return [
      {
        id: uuidv4(),
        type: APPOINTMENT_TYPES[0], // Follow-up
        provider: providers[0], // Dr. Lakshmi Patel
        date: futureDateString(3),
        time: '10:00 AM',
        duration: 30,
        location: 'Community Health Center, Room 302',
        notes: 'Follow-up on recent lab results. Bring medication list.',
        reminderSet: true,
        insuranceRequired: true,
        insuranceVerified: true,
        status: 'scheduled'
      },
      {
        id: uuidv4(),
        type: APPOINTMENT_TYPES[2], // Specialist Consultation
        provider: providers[1], // Dr. Robert Chen
        date: futureDateString(8),
        time: '2:30 PM',
        duration: 45,
        location: 'Diabetes & Endocrine Center, Suite 105',
        notes: 'Annual diabetes check-up. Fasting required for blood work.',
        reminderSet: true,
        insuranceRequired: true,
        insuranceVerified: false,
        referralRequired: true,
        referralSubmitted: true,
        status: 'scheduled'
      },
      {
        id: uuidv4(),
        type: APPOINTMENT_TYPES[5], // Advocate Meeting
        provider: providers[2], // Sarah Johnson
        date: futureDateString(13),
        time: '1:00 PM',
        duration: 60,
        location: 'Video Call',
        notes: 'Monthly check-in to review care plan and address any concerns.',
        isVideoCall: true,
        videoCallUrl: 'https://meet.example.com/patient-advocacy',
        reminderSet: true,
        status: 'scheduled'
      },
      {
        id: uuidv4(),
        type: APPOINTMENT_TYPES[3], // Diagnostic Test
        provider: providers[3], // Dr. Michael Torres
        date: futureDateString(-30), // Past appointment
        time: '9:15 AM',
        duration: 60,
        location: 'Heart & Vascular Institute, Imaging Department',
        notes: 'Echocardiogram. Wear comfortable clothing.',
        reminderSet: false,
        insuranceRequired: true,
        insuranceVerified: true,
        referralRequired: true,
        referralSubmitted: true,
        status: 'completed',
        documents: ['doc123', 'doc124'] // Reference to test results in document system
      },
      {
        id: uuidv4(),
        type: APPOINTMENT_TYPES[1], // Annual Physical
        provider: providers[0], // Dr. Lakshmi Patel
        date: futureDateString(-90), // Past appointment
        time: '2:00 PM',
        duration: 60,
        location: 'Community Health Center, Room 302',
        notes: 'Annual physical examination.',
        reminderSet: false,
        insuranceRequired: true,
        insuranceVerified: true,
        status: 'completed',
        documents: ['doc120'] // Reference to physical results in document system
      }
    ];
  }
}

export default AppointmentService;
