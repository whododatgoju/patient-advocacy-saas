import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import JournalPage from './pages/JournalPage'
import ResourcesPage from './pages/ResourcesPage'
import AdvocateMatchPage from './pages/AdvocateMatchPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import VideoCallPage from './pages/VideoCallPage'
import ScheduleCallPage from './pages/ScheduleCallPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/advocate-match" element={<AdvocateMatchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/video-call/:callId" element={<VideoCallPage />} />
        <Route path="/schedule-call" element={<ScheduleCallPage />} />
      </Routes>
    </Router>
  );
}

export default App
