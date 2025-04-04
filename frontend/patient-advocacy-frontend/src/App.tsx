import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import JournalPage from './pages/JournalPage'
import ResourcesPage from './pages/ResourcesPage'
import AdvocateMatchPage from './pages/AdvocateMatchPage'

// We'll add these pages as placeholders for now
const ProfilePage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
    <p>This page will contain user profile management with editable fields.</p>
  </div>
);

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
      </Routes>
    </Router>
  );
}

export default App
