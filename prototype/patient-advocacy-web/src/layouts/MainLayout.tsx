import { ReactNode, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store.ts'
import { logout } from '../store/authSlice.ts'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userRole } = useSelector((state: RootState) => state.auth)
  
  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar for larger screens and overlay for mobile when open */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-20 items-center justify-center border-b">
          <h1 className="text-xl font-semibold text-primary-600">Patient Advocacy</h1>
        </div>
        
        <nav className="mt-5 px-2">
          <Link 
            to="/dashboard" 
            className="group flex items-center rounded-md px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600"
          >
            <span className="material-icons mr-3 text-neutral-400 group-hover:text-primary-500">dashboard</span>
            Dashboard
          </Link>
          
          {userRole === 'patient' && (
            <>
              <Link 
                to="/advocate-match" 
                className="group mt-1 flex items-center rounded-md px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600"
              >
                <span className="material-icons mr-3 text-neutral-400 group-hover:text-primary-500">people</span>
                Find Advocate
              </Link>
              <Link 
                to="/resources" 
                className="group mt-1 flex items-center rounded-md px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600"
              >
                <span className="material-icons mr-3 text-neutral-400 group-hover:text-primary-500">library_books</span>
                Resources
              </Link>
            </>
          )}
          
          {userRole === 'advocate' && (
            <>
              <Link 
                to="/patients" 
                className="group mt-1 flex items-center rounded-md px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600"
              >
                <span className="material-icons mr-3 text-neutral-400 group-hover:text-primary-500">sick</span>
                My Patients
              </Link>
              <Link 
                to="/schedule" 
                className="group mt-1 flex items-center rounded-md px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600"
              >
                <span className="material-icons mr-3 text-neutral-400 group-hover:text-primary-500">calendar_today</span>
                Schedule
              </Link>
            </>
          )}
          
          {userRole === 'provider' && (
            <>
              <Link 
                to="/patients" 
                className="group mt-1 flex items-center rounded-md px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600"
              >
                <span className="material-icons mr-3 text-neutral-400 group-hover:text-primary-500">sick</span>
                Patients
              </Link>
              <Link 
                to="/referrals" 
                className="group mt-1 flex items-center rounded-md px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600"
              >
                <span className="material-icons mr-3 text-neutral-400 group-hover:text-primary-500">share</span>
                Referrals
              </Link>
            </>
          )}
          
          <Link 
            to="/profile" 
            className="group mt-1 flex items-center rounded-md px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600"
          >
            <span className="material-icons mr-3 text-neutral-400 group-hover:text-primary-500">person</span>
            Profile
          </Link>
          
          <button 
            onClick={handleLogout}
            className="group mt-1 flex w-full items-center rounded-md px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600"
          >
            <span className="material-icons mr-3 text-neutral-400 group-hover:text-primary-500">logout</span>
            Logout
          </button>
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="flex h-20 items-center justify-between border-b bg-white px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-neutral-500 focus:outline-none lg:hidden"
          >
            <span className="material-icons">menu</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-1 text-neutral-400 hover:text-neutral-500 focus:outline-none">
              <span className="material-icons">notifications</span>
              <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-error-500"></span>
            </button>
            
            <button className="flex items-center space-x-2 rounded-full border p-2 hover:bg-neutral-50">
              <div className="h-8 w-8 rounded-full bg-primary-500 text-white flex items-center justify-center">
                <span className="text-sm font-medium">JD</span>
              </div>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
      
      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-neutral-900 bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  )
}

export default MainLayout
