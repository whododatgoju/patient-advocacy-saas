export interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'advocate' | 'provider' | 'admin';
  avatar?: string;
}
