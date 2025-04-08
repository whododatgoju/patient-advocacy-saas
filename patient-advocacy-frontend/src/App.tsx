import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { AccessibilityProvider } from './contexts/AccessibilityContext'
import { ThemeProvider } from './contexts/ThemeContext'
import AccessibilityPanel from './components/common/AccessibilityPanel'
import KeyboardShortcutsGuide from './components/common/KeyboardShortcutsGuide'
import InstallPWAPrompt from './components/common/InstallPWAPrompt'
import './styles/accessibility.css'
import './styles/performance.css'
import './styles/designTokens.css'
import './styles/globalTheme.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isRunningStandalone } from './pwaUtils'

// Lazy load pages to improve initial loading performance
const HomePage = lazy(() => import('./pages/HomePage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const JournalPage = lazy(() => import('./pages/JournalPage'))
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'))
const ResourceDetailsPage = lazy(() => import('./pages/ResourceDetailsPage'))
const AdvocateMatchPage = lazy(() => import('./pages/AdvocateMatchPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const SignupPage = lazy(() => import('./pages/SignupPage'))
const VideoCallPage = lazy(() => import('./pages/VideoCallPage'))
const ScheduleCallPage = lazy(() => import('./pages/ScheduleCallPage'))
const DocumentationPage = lazy(() => import('./pages/DocumentationPage'))
const AppointmentsPage = lazy(() => import('./pages/AppointmentsPage'))

// Loading component for suspense fallback
const LoadingSpinner = () => (
  <div className="loading-container" aria-live="polite">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
)

// Protected Route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Display loading state while auth state is being determined
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Render children if authenticated
  return children;
};

// KeyboardNavigation component to handle keyboard shortcuts
const KeyboardNavigation: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger shortcuts when Alt key is pressed
      if (e.altKey) {
        switch (e.key) {
          case 'h':
            e.preventDefault();
            navigate('/');
            break;
          case 'd':
            e.preventDefault();
            navigate('/dashboard');
            break;
          case 'j':
            e.preventDefault();
            navigate('/journal');
            break;
          case 'r':
            e.preventDefault();
            navigate('/resources');
            break;
          case 'p':
            e.preventDefault();
            navigate('/profile');
            break;
          case 'a':
            e.preventDefault();
            // This will be handled by the AccessibilityPanel component
            document.querySelector('.accessibility-toggle-button')?.dispatchEvent(
              new MouseEvent('click', { bubbles: true })
            );
            break;
          default:
            break;
        }
      }
      
      // Focus search when / is pressed (without alt key)
      if (e.key === '/' && !e.altKey && !e.shiftKey && 
          !(e.target instanceof HTMLInputElement) && 
          !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);
  
  return null;
};

function App() {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  // Check if we should show the install prompt (only in browser mode, not when installed)
  useEffect(() => {
    // Only show install prompt if not already running as installed PWA
    const checkInstallState = async () => {
      if (!isRunningStandalone()) {
        // Wait a few seconds before showing the prompt for better UX
        setTimeout(() => {
          setShowInstallPrompt(true);
        }, 3000);
      }
    };
    
    checkInstallState();
  }, []);

  return (
    <AuthProvider>
      <AccessibilityProvider>
        <ThemeProvider>
          <Router>
            <div id="main-content">
              <KeyboardNavigation />
              <AccessibilityPanel />
              <KeyboardShortcutsGuide />
              {showInstallPrompt && <InstallPWAPrompt />}
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  
                  {/* Protected Routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/journal" element={
                    <ProtectedRoute>
                      <JournalPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/resources" element={
                    <ProtectedRoute>
                      <ResourcesPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/resources/:id" element={
                    <ProtectedRoute>
                      <ResourceDetailsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/advocate-match" element={
                    <ProtectedRoute>
                      <AdvocateMatchPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/video-call/:callId" element={
                    <ProtectedRoute>
                      <VideoCallPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/schedule-call" element={
                    <ProtectedRoute>
                      <ScheduleCallPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/documentation" element={
                    <ProtectedRoute>
                      <DocumentationPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/appointments" element={
                    <ProtectedRoute>
                      <AppointmentsPage />
                    </ProtectedRoute>
                  } />
                </Routes>
              </Suspense>
            </div>
          </Router>
        </ThemeProvider>
      </AccessibilityProvider>
    </AuthProvider>
  )
}

export default App
