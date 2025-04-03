import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store.ts'

type ResourceCategory = 'all' | 'guides' | 'forms' | 'videos' | 'tools'

interface Resource {
  id: string
  title: string
  description: string
  category: ResourceCategory
  format: string
  url: string
  thumbnailUrl?: string
  tags: string[]
  date: string
}

const ResourcesPage = () => {
  const { userRole } = useSelector((state: RootState) => state.auth)
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  // Mock resources data
  const resources: Resource[] = [
    {
      id: '1',
      title: 'Understanding Your Insurance Rights',
      description: 'A comprehensive guide to navigating health insurance claims and appeals for patients.',
      category: 'guides',
      format: 'PDF',
      url: '#',
      thumbnailUrl: 'https://via.placeholder.com/100',
      tags: ['insurance', 'rights', 'claims'],
      date: '2025-03-15'
    },
    {
      id: '2',
      title: 'Medical Record Request Form',
      description: 'Standard form for requesting medical records from healthcare providers.',
      category: 'forms',
      format: 'PDF',
      url: '#',
      tags: ['medical records', 'forms'],
      date: '2025-02-28'
    },
    {
      id: '3',
      title: 'Patient Rights in Clinical Trials',
      description: 'Learn about your rights as a participant in clinical research studies.',
      category: 'guides',
      format: 'PDF',
      url: '#',
      thumbnailUrl: 'https://via.placeholder.com/100',
      tags: ['clinical trials', 'research', 'rights'],
      date: '2025-03-01'
    },
    {
      id: '4',
      title: 'How to Prepare for a Doctor Visit',
      description: 'Video guide with tips on maximizing your healthcare appointments.',
      category: 'videos',
      format: 'Video',
      url: '#',
      thumbnailUrl: 'https://via.placeholder.com/100',
      tags: ['appointments', 'preparation', 'communication'],
      date: '2025-01-20'
    },
    {
      id: '5',
      title: 'Medication Tracker App',
      description: 'Digital tool to help track medications, dosages, and schedules.',
      category: 'tools',
      format: 'Web App',
      url: '#',
      thumbnailUrl: 'https://via.placeholder.com/100',
      tags: ['medications', 'tracking', 'reminders'],
      date: '2025-03-10'
    },
    {
      id: '6',
      title: 'Healthcare Cost Calculator',
      description: 'Estimate your out-of-pocket costs for common medical procedures.',
      category: 'tools',
      format: 'Web App',
      url: '#',
      thumbnailUrl: 'https://via.placeholder.com/100',
      tags: ['costs', 'calculator', 'planning'],
      date: '2025-02-15'
    },
    {
      id: '7',
      title: 'Advance Directive Form',
      description: 'Legal document to specify your healthcare preferences if you become unable to make decisions.',
      category: 'forms',
      format: 'PDF',
      url: '#',
      tags: ['advance directive', 'legal', 'planning'],
      date: '2025-01-05'
    },
    {
      id: '8',
      title: 'Understanding Medical Billing Codes',
      description: 'Video tutorial on how to read and interpret medical bills and insurance statements.',
      category: 'videos',
      format: 'Video',
      url: '#',
      thumbnailUrl: 'https://via.placeholder.com/100',
      tags: ['billing', 'insurance', 'coding'],
      date: '2025-02-08'
    }
  ]
  
  // Filter resources based on selected category and search query
  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Resources</h1>
        <p className="text-neutral-600">Helpful guides, forms, and tools for patients and advocates</p>
      </div>
      
      {/* Search and filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-neutral-500 material-icons text-lg">search</span>
              </div>
              <input
                type="text"
                className="input pl-10"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-md ${
                selectedCategory === 'all'
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCategory('guides')}
              className={`px-4 py-2 rounded-md ${
                selectedCategory === 'guides'
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              Guides
            </button>
            <button
              onClick={() => setSelectedCategory('forms')}
              className={`px-4 py-2 rounded-md ${
                selectedCategory === 'forms'
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              Forms
            </button>
            <button
              onClick={() => setSelectedCategory('videos')}
              className={`px-4 py-2 rounded-md ${
                selectedCategory === 'videos'
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => setSelectedCategory('tools')}
              className={`px-4 py-2 rounded-md ${
                selectedCategory === 'tools'
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              Tools
            </button>
          </div>
        </div>
      </div>
      
      {/* Resources grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
              {resource.thumbnailUrl && (
                <div className="h-40 bg-neutral-200 overflow-hidden">
                  <img 
                    src={resource.thumbnailUrl} 
                    alt={resource.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium">{resource.title}</h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    resource.format === 'PDF' 
                      ? 'bg-error-100 text-error-700' 
                      : resource.format === 'Video'
                      ? 'bg-warning-100 text-warning-700'
                      : 'bg-success-100 text-success-700'
                  }`}>
                    {resource.format}
                  </span>
                </div>
                <p className="text-neutral-600 text-sm mb-3">{resource.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {resource.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-neutral-500">
                    Added: {new Date(resource.date).toLocaleDateString()}
                  </span>
                  <a
                    href={resource.url}
                    className="inline-flex items-center text-primary-600 hover:text-primary-500 text-sm font-medium"
                  >
                    View
                    <span className="material-icons text-sm ml-1">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <span className="material-icons text-4xl text-neutral-400">search_off</span>
            <h3 className="mt-2 text-xl font-medium text-neutral-700">No resources found</h3>
            <p className="mt-1 text-neutral-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
      
      {/* Upload resource button (for advocates and providers) */}
      {(userRole === 'advocate' || userRole === 'provider') && (
        <div className="mt-8 flex justify-center">
          <button className="btn btn-primary flex items-center">
            <span className="material-icons mr-2">upload_file</span>
            Upload New Resource
          </button>
        </div>
      )}
    </div>
  )
}

export default ResourcesPage
