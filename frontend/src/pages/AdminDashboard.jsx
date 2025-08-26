import React from 'react'
import { useAuth } from '../context/AuthContext'

const AdminDashboard = () => {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-dark-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">Admin Dashboard</h1>
            <p className="text-xl text-gray-400">Welcome back, {user?.email}</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Logout
          </button>
        </div>
        
        <div className="text-center py-12">
          <p className="text-gray-400">Admin dashboard functionality coming soon...</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
