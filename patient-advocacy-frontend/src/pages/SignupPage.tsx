import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SignupPage.module.css';
import { FiUser, FiLock, FiMail, FiArrowRight, FiPhone, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup, isAuthenticated, error: authError, clearError } = useAuth();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'patient' | 'advocate' | 'provider'>('patient');
  const [formData, setFormData] = useState({
    // Common fields
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    
    // Patient specific fields
    medicalConditions: '',
    primaryConcerns: '',
    insuranceProvider: '',
    
    // Advocate specific fields
    specializations: '',
    yearsOfExperience: '',
    languages: '',
    
    // Provider specific fields
    organization: '',
    title: '',
    licensure: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Update form data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Move to role-specific info step
  const handleContinue = () => {
    // Validate basic info
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setStep(2);
  };

  // Submit the form and create a new account
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    // Perform validation
    const newErrors: Record<string, string> = {};
    
    // Common validations
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Role-specific validations
    if (role === 'patient') {
      if (!formData.medicalConditions) newErrors.medicalConditions = 'This field is required';
    } else if (role === 'advocate') {
      if (!formData.specializations) newErrors.specializations = 'This field is required';
      if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'This field is required';
    } else if (role === 'provider') {
      if (!formData.organization) newErrors.organization = 'This field is required';
      if (!formData.title) newErrors.title = 'This field is required';
      if (!formData.licensure) newErrors.licensure = 'This field is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Format data for API
      const signupData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        role,
        phone: formData.phone,
        location: formData.location,
        // Add role-specific fields to bio
        bio: role === 'patient' 
          ? `Medical Conditions: ${formData.medicalConditions}\nPrimary Concerns: ${formData.primaryConcerns}\nInsurance: ${formData.insuranceProvider}`
          : role === 'advocate'
          ? `Specializations: ${formData.specializations}\nExperience: ${formData.yearsOfExperience} years\nLanguages: ${formData.languages}`
          : `Organization: ${formData.organization}\nTitle: ${formData.title}\nLicensure: ${formData.licensure}`
      };
      
      await signup(signupData);
      // Navigate will happen automatically due to isAuthenticated change
    } catch (err) {
      setIsLoading(false);
      // Error will be set via authError
    }
  };

  // Go back to role selection
  const handleBack = () => {
    setStep(1);
  };

  // Render role-specific fields based on selected role
  const renderRoleSpecificFields = () => {
    switch (role) {
      case 'patient':
        return (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="medicalConditions" className={styles.formLabel}>
                Medical Conditions <span className={styles.requiredStar}>*</span>
              </label>
              <textarea
                id="medicalConditions"
                name="medicalConditions"
                className={`${styles.formTextarea} ${errors.medicalConditions ? styles.inputError : ''}`}
                placeholder="List any medical conditions or diagnoses"
                value={formData.medicalConditions}
                onChange={handleChange}
              />
              {errors.medicalConditions && <span className={styles.errorText}>{errors.medicalConditions}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="primaryConcerns" className={styles.formLabel}>
                Primary Health Concerns
              </label>
              <textarea
                id="primaryConcerns"
                name="primaryConcerns"
                className={styles.formTextarea}
                placeholder="What are your main health concerns or goals?"
                value={formData.primaryConcerns}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="insuranceProvider" className={styles.formLabel}>
                Insurance Provider
              </label>
              <input
                id="insuranceProvider"
                name="insuranceProvider"
                type="text"
                className={styles.formInput}
                placeholder="Your insurance provider name"
                value={formData.insuranceProvider}
                onChange={handleChange}
              />
            </div>
          </>
        );
      
      case 'advocate':
        return (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="specializations" className={styles.formLabel}>
                Specializations <span className={styles.requiredStar}>*</span>
              </label>
              <textarea
                id="specializations"
                name="specializations"
                className={`${styles.formTextarea} ${errors.specializations ? styles.inputError : ''}`}
                placeholder="Your areas of expertise (e.g., Chronic Illness, Insurance Navigation)"
                value={formData.specializations}
                onChange={handleChange}
              />
              {errors.specializations && <span className={styles.errorText}>{errors.specializations}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="yearsOfExperience" className={styles.formLabel}>
                Years of Experience <span className={styles.requiredStar}>*</span>
              </label>
              <input
                id="yearsOfExperience"
                name="yearsOfExperience"
                type="text"
                className={`${styles.formInput} ${errors.yearsOfExperience ? styles.inputError : ''}`}
                placeholder="How many years have you worked as an advocate?"
                value={formData.yearsOfExperience}
                onChange={handleChange}
              />
              {errors.yearsOfExperience && <span className={styles.errorText}>{errors.yearsOfExperience}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="languages" className={styles.formLabel}>
                Languages Spoken
              </label>
              <input
                id="languages"
                name="languages"
                type="text"
                className={styles.formInput}
                placeholder="Languages you speak fluently"
                value={formData.languages}
                onChange={handleChange}
              />
            </div>
          </>
        );
      
      case 'provider':
        return (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="organization" className={styles.formLabel}>
                Organization <span className={styles.requiredStar}>*</span>
              </label>
              <input
                id="organization"
                name="organization"
                type="text"
                className={`${styles.formInput} ${errors.organization ? styles.inputError : ''}`}
                placeholder="Hospital, clinic, or practice name"
                value={formData.organization}
                onChange={handleChange}
              />
              {errors.organization && <span className={styles.errorText}>{errors.organization}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.formLabel}>
                Professional Title <span className={styles.requiredStar}>*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className={`${styles.formInput} ${errors.title ? styles.inputError : ''}`}
                placeholder="Your professional title"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && <span className={styles.errorText}>{errors.title}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="licensure" className={styles.formLabel}>
                Licensure/Credentials <span className={styles.requiredStar}>*</span>
              </label>
              <input
                id="licensure"
                name="licensure"
                type="text"
                className={`${styles.formInput} ${errors.licensure ? styles.inputError : ''}`}
                placeholder="Your medical license or credentials"
                value={formData.licensure}
                onChange={handleChange}
              />
              {errors.licensure && <span className={styles.errorText}>{errors.licensure}</span>}
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Set error from auth context
  useEffect(() => {
    if (authError) {
      setErrors({ ...errors, general: authError });
    }
  }, [authError, errors]);

  return (
    <div className={styles.signupPage}>
      <div className={styles.signupContainer}>
        <div className={styles.signupHeader}>
          <div className={styles.logoContainer}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 5L5 12.5V27.5L20 35L35 27.5V12.5L20 5Z" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2"/>
                  <path d="M20 15C22.7614 15 25 17.2386 25 20C25 22.7614 22.7614 25 20 25C17.2386 25 15 22.7614 15 20C15 17.2386 17.2386 15 20 15Z" fill="#3B82F6"/>
                </svg>
              </span>
              <h1 className={styles.logoText}>Patient Advocacy Platform</h1>
            </div>
          </div>
          
          <h2 className={styles.welcomeText}>Create Your Account</h2>
          <p className={styles.subheading}>
            {step === 1 
              ? 'Select your role and provide your basic information'
              : `Complete your ${role} profile`}
          </p>
        </div>

        <div className={styles.progressSteps}>
          <div className={`${styles.progressStep} ${step >= 1 ? styles.activeStep : ''}`}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepLabel}>Basic Info</div>
          </div>
          <div className={styles.progressLine}></div>
          <div className={`${styles.progressStep} ${step >= 2 ? styles.activeStep : ''}`}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepLabel}>Role Details</div>
          </div>
        </div>

        <form className={styles.signupForm} onSubmit={handleSubmit}>
          {errors.general && <div className={styles.errorMessage}>{errors.general}</div>}
          
          {step === 1 ? (
            <>
              <div className={styles.roleSelector}>
                <button 
                  type="button"
                  className={`${styles.roleButton} ${role === 'patient' ? styles.activeRole : ''}`}
                  onClick={() => setRole('patient')}
                >
                  <div className={styles.roleIcon} style={{ backgroundColor: 'rgba(129, 140, 248, 0.1)' }}>
                    <FiUser color="#818cf8" />
                  </div>
                  <span>Patient</span>
                </button>
                <button 
                  type="button"
                  className={`${styles.roleButton} ${role === 'advocate' ? styles.activeRole : ''}`}
                  onClick={() => setRole('advocate')}
                >
                  <div className={styles.roleIcon} style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)' }}>
                    <FiUser color="#34d399" />
                  </div>
                  <span>Advocate</span>
                </button>
                <button 
                  type="button"
                  className={`${styles.roleButton} ${role === 'provider' ? styles.activeRole : ''}`}
                  onClick={() => setRole('provider')}
                >
                  <div className={styles.roleIcon} style={{ backgroundColor: 'rgba(96, 165, 250, 0.1)' }}>
                    <FiUser color="#60a5fa" />
                  </div>
                  <span>Provider</span>
                </button>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="firstName" className={styles.formLabel}>
                    First Name <span className={styles.requiredStar}>*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className={`${styles.formInput} ${errors.firstName ? styles.inputError : ''}`}
                    placeholder="Your first name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && <span className={styles.errorText}>{errors.firstName}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="lastName" className={styles.formLabel}>
                    Last Name <span className={styles.requiredStar}>*</span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    className={`${styles.formInput} ${errors.lastName ? styles.inputError : ''}`}
                    placeholder="Your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && <span className={styles.errorText}>{errors.lastName}</span>}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>
                  Email <span className={styles.requiredStar}>*</span>
                </label>
                <div className={styles.inputWithIcon}>
                  <FiMail className={styles.inputIcon} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`${styles.formInput} ${errors.email ? styles.inputError : ''}`}
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="password" className={styles.formLabel}>
                    Password <span className={styles.requiredStar}>*</span>
                  </label>
                  <div className={styles.inputWithIcon}>
                    <FiLock className={styles.inputIcon} />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className={`${styles.formInput} ${errors.password ? styles.inputError : ''}`}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.password && <span className={styles.errorText}>{errors.password}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="confirmPassword" className={styles.formLabel}>
                    Confirm Password <span className={styles.requiredStar}>*</span>
                  </label>
                  <div className={styles.inputWithIcon}>
                    <FiLock className={styles.inputIcon} />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className={`${styles.formInput} ${errors.confirmPassword ? styles.inputError : ''}`}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.formLabel}>Phone</label>
                  <div className={styles.inputWithIcon}>
                    <FiPhone className={styles.inputIcon} />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className={styles.formInput}
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="location" className={styles.formLabel}>Location</label>
                  <div className={styles.inputWithIcon}>
                    <FiMapPin className={styles.inputIcon} />
                    <input
                      id="location"
                      name="location"
                      type="text"
                      className={styles.formInput}
                      placeholder="City, State"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <button 
                type="button" 
                className={styles.continueButton}
                onClick={handleContinue}
              >
                Continue
                <FiArrowRight className={styles.buttonIcon} />
              </button>
            </>
          ) : (
            <>
              <div className={styles.roleSpecificForm}>
                <div className={styles.roleHeading}>
                  <div className={styles.roleIconLarge} style={{ 
                    backgroundColor: role === 'patient' 
                      ? 'rgba(129, 140, 248, 0.1)' 
                      : role === 'advocate' 
                        ? 'rgba(52, 211, 153, 0.1)' 
                        : 'rgba(96, 165, 250, 0.1)' 
                  }}>
                    <FiUser color={
                      role === 'patient' 
                        ? '#818cf8' 
                        : role === 'advocate' 
                          ? '#34d399' 
                          : '#60a5fa'
                    } size={24} />
                  </div>
                  <h3>{role.charAt(0).toUpperCase() + role.slice(1)} Information</h3>
                </div>

                {renderRoleSpecificFields()}

                <div className={styles.termsSection}>
                  <label className={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => {
                        setTermsAccepted(e.target.checked);
                        if (errors.terms) {
                          setErrors({ ...errors, terms: '' });
                        }
                      }}
                    />
                    <span className={styles.checkmark}></span>
                    <span>I agree to the <Link to="/terms" className={styles.termsLink}>Terms of Service</Link> and <Link to="/privacy" className={styles.termsLink}>Privacy Policy</Link></span>
                  </label>
                  {errors.terms && <span className={styles.errorText}>{errors.terms}</span>}
                </div>

                <div className={styles.formActions}>
                  <button 
                    type="button" 
                    className={styles.backButton}
                    onClick={handleBack}
                  >
                    Back
                  </button>
                  <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                    {!isLoading && <FiCheckCircle className={styles.buttonIcon} />}
                  </button>
                </div>
              </div>
            </>
          )}
        </form>

        <div className={styles.loginLink}>
          Already have an account? <Link to="/login" className={styles.linkText}>Sign in</Link>
        </div>
      </div>
      
      <div className={styles.signupImage}>
        <div className={styles.overlay}></div>
      </div>
    </div>
  );
};

export default SignupPage;
