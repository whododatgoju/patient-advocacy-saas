import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store.ts'

const ProfilePage = () => {
  const { userRole } = useSelector((state: RootState) => state.auth)
  const { profile } = useSelector((state: RootState) => state.user)
  
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    bio: profile?.bio || '',
    preferences: profile?.preferences || {
      notifications: true,
      emailUpdates: true,
      dataSharing: false
    }
  })

  // Handle input change for form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    
    // Handle nested properties like preferences.notifications
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => {
        // Create a safe copy of the parent object
        const parentObject = prev[parent as keyof typeof prev] || {}
        if (typeof parentObject === 'object') {
          return {
            ...prev,
            [parent]: {
              ...parentObject,
              [child]: type === 'checkbox' ? checked : value
            }
          }
        }
        return prev
      })
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, dispatch an action to update the profile
    console.log('Profile update:', formData)
    setIsEditing(false)
  }
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">My Profile</h1>
        <p className="text-neutral-600">Manage your personal information and settings</p>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="btn-text flex items-center"
            >
              <span className="material-icons mr-1">{isEditing ? 'close' : 'edit'}</span>
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>
          
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="bio" className="block text-sm font-medium text-neutral-700 mb-1">
                    Bio / About
                  </label>
                  <textarea
                    name="bio"
                    id="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
                    className="input"
                    placeholder="Tell us a bit about yourself..."
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="preferences.notifications"
                      id="notifications"
                      checked={formData.preferences.notifications}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                    <label htmlFor="notifications" className="ml-2 block text-sm text-neutral-700">
                      Enable in-app notifications
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="preferences.emailUpdates"
                      id="emailUpdates"
                      checked={formData.preferences.emailUpdates}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                    <label htmlFor="emailUpdates" className="ml-2 block text-sm text-neutral-700">
                      Receive email updates
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="preferences.dataSharing"
                      id="dataSharing"
                      checked={formData.preferences.dataSharing}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                    <label htmlFor="dataSharing" className="ml-2 block text-sm text-neutral-700">
                      Allow anonymous data sharing for research
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-neutral-500">First Name</h3>
                  <p className="mt-1">{profile?.firstName || 'Not provided'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-neutral-500">Last Name</h3>
                  <p className="mt-1">{profile?.lastName || 'Not provided'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-neutral-500">Email</h3>
                  <p className="mt-1">{profile?.email || 'Not provided'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-neutral-500">Phone</h3>
                  <p className="mt-1">{profile?.phone || 'Not provided'}</p>
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-neutral-500">Bio</h3>
                  <p className="mt-1">{profile?.bio || 'No bio provided'}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-neutral-500 mb-2">Preferences</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>
                    In-app notifications: {profile?.preferences?.notifications ? 'Enabled' : 'Disabled'}
                  </li>
                  <li>
                    Email updates: {profile?.preferences?.emailUpdates ? 'Enabled' : 'Disabled'}
                  </li>
                  <li>
                    Data sharing for research: {profile?.preferences?.dataSharing ? 'Enabled' : 'Disabled'}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {userRole === 'patient' && (
        <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Medical Information</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-neutral-500">Medical Conditions</h3>
                <p className="mt-1">{profile?.medicalConditions || 'None listed'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-neutral-500">Medications</h3>
                <p className="mt-1">{profile?.medications || 'None listed'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-neutral-500">Insurance Provider</h3>
                <p className="mt-1">{profile?.insuranceProvider || 'Not provided'}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <button className="btn-text">
                Manage medical information
              </button>
            </div>
          </div>
        </div>
      )}
      
      {userRole === 'advocate' && (
        <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Professional Information</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-neutral-500">Specialization</h3>
                <p className="mt-1">{profile?.specialization || 'Not specified'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-neutral-500">Years of Experience</h3>
                <p className="mt-1">{profile?.yearsOfExperience || 'Not specified'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-neutral-500">Languages</h3>
                <p className="mt-1">{profile?.languages || 'Not specified'}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <button className="btn-text">
                Manage professional details
              </button>
            </div>
          </div>
        </div>
      )}
      
      {userRole === 'provider' && (
        <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Provider Information</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-neutral-500">Organization</h3>
                <p className="mt-1">{profile?.organization || 'Not specified'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-neutral-500">Specialty</h3>
                <p className="mt-1">{profile?.specialty || 'Not specified'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-neutral-500">NPI Number</h3>
                <p className="mt-1">{profile?.npi || 'Not provided'}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <button className="btn-text">
                Manage provider details
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Account Security</h2>
          
          <div className="space-y-4">
            <button className="btn btn-secondary">
              Change Password
            </button>
            
            <button className="btn btn-secondary">
              Enable Two-Factor Authentication
            </button>
            
            <button className="btn btn-secondary">
              View Login History
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
