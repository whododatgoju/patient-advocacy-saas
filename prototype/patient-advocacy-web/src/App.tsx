import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store.ts'

// Layouts
import MainLayout from './layouts/MainLayout'

// Pages
import HomePage from './pages/HomePage.tsx'
import DashboardPage from './pages/DashboardPage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import ResourcesPage from './pages/ResourcesPage.tsx'
import AdvocateMatchPage from './pages/AdvocateMatchPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          } />
          <Route path="/profile" element={
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          } />
          <Route path="/resources" element={
            <MainLayout>
              <ResourcesPage />
            </MainLayout>
          } />
          <Route path="/advocate-match" element={
            <MainLayout>
              <AdvocateMatchPage />
            </MainLayout>
          } />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
