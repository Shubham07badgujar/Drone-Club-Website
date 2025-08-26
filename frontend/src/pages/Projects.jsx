import React from 'react'
import { useProjects } from '../hooks/useProjects'
import ProjectCard from '../components/cards/ProjectCard'

const Projects = () => {
  const { projects, loading } = useProjects()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Our Projects</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore our innovative drone projects and cutting-edge research initiatives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onLearnMore={() => {}}
            />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No projects available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Projects
