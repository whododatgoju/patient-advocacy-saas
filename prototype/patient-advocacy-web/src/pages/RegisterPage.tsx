import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

type UserRole = 'patient' | 'advocate' | 'provider'

const RegisterPage = () => {
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<UserRole | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    // Patient specific
    dateOfBirth: '',
    medicalConditions: '',
    insuranceProvider: '',
    // Advocate specific
    specialization: '',
    yearsOfExperience: '',
    languages: '',
    // Provider specific
    organization: '',
    specialty: '',
    npi: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const navigate = useNavigate()
  
  const handleRoleSelection = (selectedRole: UserRole) => {
    setRole(selectedRole)
    setStep(2)
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    // Validate basic fields
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
    }
    
    // Role-specific validation
    if (role === 'patient') {
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
    } else if (role === 'advocate') {
      if (!formData.specialization) newErrors.specialization = 'Specialization is required'
      if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Years of experience is required'
    } else if (role === 'provider') {
      if (!formData.organization) newErrors.organization = 'Organization is required'
      if (!formData.specialty) newErrors.specialty = 'Specialty is required'
      if (!formData.npi) newErrors.npi = 'NPI number is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // This would be an API call in a real app
      console.log('Registration data:', { role, ...formData })
      
      // Simulate successful registration
      setTimeout(() => {
        // Redirect to login with success message
        navigate('/login', { state: { message: 'Registration successful! Please log in with your credentials.' } })
      }, 1500)
    }
  }
  
  const handleBack = () => {
    setStep(1)
  }
  
  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-neutral-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {step === 1 ? (
            <>
              <h3 className="text-lg font-medium text-neutral-900 mb-6">I am a...</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={() => handleRoleSelection('patient')}
                  className="relative rounded-lg border border-neutral-300 bg-white p-4 shadow-sm hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <span className="block text-center text-sm font-medium text-neutral-900">Patient</span>
                  <p className="mt-1 text-xs text-neutral-500">
                    I'm seeking healthcare advocacy support
                  </p>
                </button>
                
                <button
                  type="button"
                  onClick={() => handleRoleSelection('advocate')}
                  className="relative rounded-lg border border-neutral-300 bg-white p-4 shadow-sm hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <span className="block text-center text-sm font-medium text-neutral-900">Advocate</span>
                  <p className="mt-1 text-xs text-neutral-500">
                    I provide advocacy services to patients
                  </p>
                </button>
                
                <button
                  type="button"
                  onClick={() => handleRoleSelection('provider')}
                  className="relative rounded-lg border border-neutral-300 bg-white p-4 shadow-sm hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <span className="block text-center text-sm font-medium text-neutral-900">Provider</span>
                  <p className="mt-1 text-xs text-neutral-500">
                    I'm a healthcare provider or organization
                  </p>
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-neutral-900">
                    {role === 'patient' ? 'Patient Registration' : 
                     role === 'advocate' ? 'Advocate Registration' : 
                     'Provider Registration'}
                  </h3>
                  <button
                    type="button"
                    onClick={handleBack}
                    className="text-sm text-primary-600 hover:text-primary-500"
                  >
                    Change role
                  </button>
                </div>
                
                {/* Basic Information */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700">
                        First name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`mt-1 input ${errors.firstName ? 'border-error-500' : ''}`}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-error-600">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`mt-1 input ${errors.lastName ? 'border-error-500' : ''}`}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-error-600">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`mt-1 input ${errors.email ? 'border-error-500' : ''}`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-error-600">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`mt-1 input ${errors.password ? 'border-error-500' : ''}`}
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-error-600">{errors.password}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700">
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`mt-1 input ${errors.confirmPassword ? 'border-error-500' : ''}`}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-error-600">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>
                
                {/* Role-specific fields */}
                {role === 'patient' && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-neutral-800">Patient Information</h4>
                    <div>
                      <label htmlFor="dateOfBirth" className="block text-sm font-medium text-neutral-700">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className={`mt-1 input ${errors.dateOfBirth ? 'border-error-500' : ''}`}
                      />
                      {errors.dateOfBirth && (
                        <p className="mt-1 text-sm text-error-600">{errors.dateOfBirth}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="medicalConditions" className="block text-sm font-medium text-neutral-700">
                        Medical Conditions (optional)
                      </label>
                      <textarea
                        name="medicalConditions"
                        id="medicalConditions"
                        rows={3}
                        value={formData.medicalConditions}
                        onChange={handleChange}
                        className="mt-1 input"
                        placeholder="List any medical conditions you would like advocates to know about"
                      />
                    </div>
                    <div>
                      <label htmlFor="insuranceProvider" className="block text-sm font-medium text-neutral-700">
                        Insurance Provider (optional)
                      </label>
                      <input
                        type="text"
                        name="insuranceProvider"
                        id="insuranceProvider"
                        value={formData.insuranceProvider}
                        onChange={handleChange}
                        className="mt-1 input"
                      />
                    </div>
                  </div>
                )}
                
                {role === 'advocate' && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-neutral-800">Advocate Information</h4>
                    <div>
                      <label htmlFor="specialization" className="block text-sm font-medium text-neutral-700">
                        Specialization
                      </label>
                      <select
                        name="specialization"
                        id="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        className={`mt-1 input ${errors.specialization ? 'border-error-500' : ''}`}
                      >
                        <option value="">Select your specialization</option>
                        <option value="general">General Patient Advocacy</option>
                        <option value="insurance">Insurance Navigation</option>
                        <option value="medical">Medical Advocacy</option>
                        <option value="senior">Senior Care Advocacy</option>
                        <option value="mental">Mental Health Advocacy</option>
                      </select>
                      {errors.specialization && (
                        <p className="mt-1 text-sm text-error-600">{errors.specialization}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-neutral-700">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        name="yearsOfExperience"
                        id="yearsOfExperience"
                        min="0"
                        value={formData.yearsOfExperience}
                        onChange={handleChange}
                        className={`mt-1 input ${errors.yearsOfExperience ? 'border-error-500' : ''}`}
                      />
                      {errors.yearsOfExperience && (
                        <p className="mt-1 text-sm text-error-600">{errors.yearsOfExperience}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="languages" className="block text-sm font-medium text-neutral-700">
                        Languages Spoken (comma separated)
                      </label>
                      <input
                        type="text"
                        name="languages"
                        id="languages"
                        value={formData.languages}
                        onChange={handleChange}
                        className="mt-1 input"
                        placeholder="English, Spanish, etc."
                      />
                    </div>
                  </div>
                )}
                
                {role === 'provider' && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-neutral-800">Provider Information</h4>
                    <div>
                      <label htmlFor="organization" className="block text-sm font-medium text-neutral-700">
                        Organization / Practice Name
                      </label>
                      <input
                        type="text"
                        name="organization"
                        id="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        className={`mt-1 input ${errors.organization ? 'border-error-500' : ''}`}
                      />
                      {errors.organization && (
                        <p className="mt-1 text-sm text-error-600">{errors.organization}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="specialty" className="block text-sm font-medium text-neutral-700">
                        Medical Specialty
                      </label>
                      <input
                        type="text"
                        name="specialty"
                        id="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        className={`mt-1 input ${errors.specialty ? 'border-error-500' : ''}`}
                      />
                      {errors.specialty && (
                        <p className="mt-1 text-sm text-error-600">{errors.specialty}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="npi" className="block text-sm font-medium text-neutral-700">
                        NPI Number
                      </label>
                      <input
                        type="text"
                        name="npi"
                        id="npi"
                        value={formData.npi}
                        onChange={handleChange}
                        className={`mt-1 input ${errors.npi ? 'border-error-500' : ''}`}
                      />
                      {errors.npi && (
                        <p className="mt-1 text-sm text-error-600">{errors.npi}</p>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Terms and Conditions */}
                <div className="flex items-start">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded mt-1"
                  />
                  <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-neutral-700">
                    I agree to the{' '}
                    <a href="#" className="text-primary-600 hover:text-primary-500">
                      Terms and Conditions
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-primary-600 hover:text-primary-500">
                      Privacy Policy
                    </a>
                  </label>
                </div>
                {errors.agreeToTerms && (
                  <p className="text-sm text-error-600">{errors.agreeToTerms}</p>
                )}
                
                <div>
                  <button
                    type="submit"
                    className="btn btn-primary w-full py-2"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
