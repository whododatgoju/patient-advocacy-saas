import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store.ts'

interface Advocate {
  id: string
  name: string
  title: string
  specialization: string
  yearsExperience: number
  languages: string[]
  rating: number
  availability: string
  bio: string
  imageUrl: string
}

const AdvocateMatchPage = () => {
  const { userRole } = useSelector((state: RootState) => state.auth)
  const [selectedFilters, setSelectedFilters] = useState({
    specialization: '',
    language: '',
    availability: ''
  })
  const [searchQuery, setSearchQuery] = useState('')
  
  // Mock advocates data
  const advocates: Advocate[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      title: 'Senior Patient Advocate',
      specialization: 'Insurance Navigation',
      yearsExperience: 8,
      languages: ['English', 'Spanish'],
      rating: 4.9,
      availability: 'Available within 24 hours',
      bio: 'With over 8 years of experience in healthcare advocacy, I specialize in helping patients navigate complex insurance claims and appeals processes.',
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: '2',
      name: 'Michael Chen',
      title: 'Medical Care Advocate',
      specialization: 'Medical Advocacy',
      yearsExperience: 12,
      languages: ['English', 'Mandarin', 'Cantonese'],
      rating: 4.8,
      availability: 'Available within 48 hours',
      bio: 'Former nurse with 12+ years of experience working with patients with chronic conditions. I help patients understand treatment options and communicate effectively with healthcare providers.',
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: '3',
      name: 'Priya Patel',
      title: 'Healthcare Rights Advocate',
      specialization: 'Legal Rights',
      yearsExperience: 7,
      languages: ['English', 'Hindi', 'Gujarati'],
      rating: 4.7,
      availability: 'Available next week',
      bio: 'Background in healthcare law with a passion for ensuring patients understand their rights and receive fair treatment in the healthcare system.',
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: '4',
      name: 'Robert Martinez',
      title: 'Senior Care Advocate',
      specialization: 'Elder Care',
      yearsExperience: 15,
      languages: ['English', 'Spanish'],
      rating: 5.0,
      availability: 'Available within 24 hours',
      bio: 'Dedicated to helping seniors and their families navigate healthcare decisions, long-term care options, and insurance benefits.',
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: '5',
      name: 'Aisha Williams',
      title: 'Mental Health Advocate',
      specialization: 'Mental Health',
      yearsExperience: 6,
      languages: ['English'],
      rating: 4.9,
      availability: 'Available within 48 hours',
      bio: 'Passionate about breaking down barriers to mental health treatment and ensuring patients receive the support and resources they need.',
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: '6',
      name: 'David Kim',
      title: 'Pediatric Care Advocate',
      specialization: 'Pediatric Care',
      yearsExperience: 9,
      languages: ['English', 'Korean'],
      rating: 4.8,
      availability: 'Available next week',
      bio: 'Specialized in supporting families of children with complex medical needs, helping them access appropriate care and resources.',
      imageUrl: 'https://via.placeholder.com/150'
    }
  ]
  
  // Filter advocates based on search and filters
  const filteredAdvocates = advocates.filter(advocate => {
    const matchesQuery = searchQuery === '' || 
      advocate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      advocate.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      advocate.bio.toLowerCase().includes(searchQuery.toLowerCase())
      
    const matchesSpecialization = selectedFilters.specialization === '' || 
      advocate.specialization === selectedFilters.specialization
      
    const matchesLanguage = selectedFilters.language === '' || 
      advocate.languages.includes(selectedFilters.language)
      
    const matchesAvailability = selectedFilters.availability === '' || 
      advocate.availability.includes(selectedFilters.availability)
      
    return matchesQuery && matchesSpecialization && matchesLanguage && matchesAvailability
  })
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setSelectedFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const resetFilters = () => {
    setSelectedFilters({
      specialization: '',
      language: '',
      availability: ''
    })
    setSearchQuery('')
  }
  
  // Extract unique values for filter options
  const specializations = [...new Set(advocates.map(adv => adv.specialization))]
  const languages = [...new Set(advocates.flatMap(adv => adv.languages))]
  // We don't actually need this variable since we're using hardcoded options in the dropdown
  // const availabilities = [...new Set(advocates.map(adv => adv.availability))]
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Find an Advocate</h1>
        <p className="text-neutral-600">Connect with experienced patient advocates who can help navigate your healthcare journey</p>
      </div>
      
      {/* Search and filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-neutral-500 material-icons text-lg">search</span>
            </div>
            <input
              type="text"
              className="input pl-10"
              placeholder="Search advocates by name, specialization, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="specialization" className="block text-sm font-medium text-neutral-700 mb-1">
                Specialization
              </label>
              <select
                id="specialization"
                name="specialization"
                className="input"
                value={selectedFilters.specialization}
                onChange={handleFilterChange}
              >
                <option value="">All Specializations</option>
                {specializations.map((spec, index) => (
                  <option key={index} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-neutral-700 mb-1">
                Language
              </label>
              <select
                id="language"
                name="language"
                className="input"
                value={selectedFilters.language}
                onChange={handleFilterChange}
              >
                <option value="">All Languages</option>
                {languages.map((lang, index) => (
                  <option key={index} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-neutral-700 mb-1">
                Availability
              </label>
              <select
                id="availability"
                name="availability"
                className="input"
                value={selectedFilters.availability}
                onChange={handleFilterChange}
              >
                <option value="">Any Availability</option>
                <option value="within 24 hours">Within 24 hours</option>
                <option value="within 48 hours">Within 48 hours</option>
                <option value="next week">Next week</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={resetFilters}
              className="text-sm text-neutral-600 hover:text-neutral-900"
            >
              Reset filters
            </button>
          </div>
        </div>
      </div>
      
      {/* Results */}
      {filteredAdvocates.length > 0 ? (
        <div className="space-y-6">
          {filteredAdvocates.map(advocate => (
            <div 
              key={advocate.id} 
              className="bg-white rounded-lg shadow p-4 md:p-6 flex flex-col md:flex-row gap-6"
            >
              <div className="md:w-1/4 flex justify-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
                  <img 
                    src={advocate.imageUrl} 
                    alt={advocate.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="md:w-3/4">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">{advocate.name}</h2>
                    <p className="text-neutral-600">{advocate.title}</p>
                  </div>
                  <div className="flex items-center mt-2 md:mt-0">
                    <span className="material-icons text-warning-500">star</span>
                    <span className="ml-1 font-medium">{advocate.rating}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
                  <div className="flex items-center">
                    <span className="material-icons text-neutral-500 text-sm mr-2">badge</span>
                    <span className="text-sm">{advocate.specialization}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="material-icons text-neutral-500 text-sm mr-2">schedule</span>
                    <span className="text-sm">{advocate.availability}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="material-icons text-neutral-500 text-sm mr-2">history</span>
                    <span className="text-sm">{advocate.yearsExperience} years experience</span>
                  </div>
                </div>
                
                <p className="text-neutral-700 mb-4">{advocate.bio}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  <span className="text-sm font-medium text-neutral-600 mr-2">Languages:</span>
                  {advocate.languages.map((lang, index) => (
                    <span key={index} className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full">
                      {lang}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <button className="btn btn-primary">
                    Request Consultation
                  </button>
                  <button className="btn btn-secondary">
                    View Full Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <span className="material-icons text-4xl text-neutral-400">person_search</span>
          <h3 className="mt-2 text-xl font-medium text-neutral-700">No advocates found</h3>
          <p className="mt-1 text-neutral-500">Try adjusting your search criteria or filters</p>
          <button 
            onClick={resetFilters}
            className="mt-4 btn btn-secondary"
          >
            Reset All Filters
          </button>
        </div>
      )}
      
      {userRole === 'patient' && (
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Need help finding the right advocate?</h2>
          <p className="text-neutral-600 mb-4">
            Complete our brief questionnaire and we'll match you with advocates who specialize in your specific needs.
          </p>
          <button className="btn btn-primary">
            Start Matching Questionnaire
          </button>
        </div>
      )}
    </div>
  )
}

export default AdvocateMatchPage
