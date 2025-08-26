import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import Home from './pages/Home'
import Projects from './pages/Projects'
import Events from './pages/Events'
import Blog from './pages/Blog'
import Team from './pages/Team'
import Departments from './pages/Departments'
import Achievements from './pages/Achievements'
import About from './pages/About'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  useEffect(() => {
    // Enable dark mode by default
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <AuthProvider>
      <Router 
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <div className="min-h-screen bg-dark-900 text-gray-100">
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/events" element={<Events />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/team" element={<Team />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#f1f5f9',
                border: '1px solid #334155',
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
