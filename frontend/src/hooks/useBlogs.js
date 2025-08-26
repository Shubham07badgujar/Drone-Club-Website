import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export const useBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/blogs')
      setBlogs(response.data.blogs)
      setError(null)
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch blogs'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const createBlog = async (blogData) => {
    try {
      const response = await axios.post('/api/blogs', blogData)
      setBlogs(prev => [response.data.blog, ...prev])
      toast.success('Blog post created successfully')
      return { success: true, blog: response.data.blog }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create blog post'
      toast.error(message)
      return { success: false, message }
    }
  }

  const updateBlog = async (id, blogData) => {
    try {
      const response = await axios.put(`/api/blogs/${id}`, blogData)
      setBlogs(prev => 
        prev.map(blog => 
          blog.id === id ? response.data.blog : blog
        )
      )
      toast.success('Blog post updated successfully')
      return { success: true, blog: response.data.blog }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update blog post'
      toast.error(message)
      return { success: false, message }
    }
  }

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`/api/blogs/${id}`)
      setBlogs(prev => prev.filter(blog => blog.id !== id))
      toast.success('Blog post deleted successfully')
      return { success: true }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete blog post'
      toast.error(message)
      return { success: false, message }
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return {
    blogs,
    loading,
    error,
    refetch: fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
  }
}
