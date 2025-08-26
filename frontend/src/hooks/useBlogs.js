import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { fallbackData } from '../utils/fallbackData'

export const useBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const fetchingRef = useRef(false)
  const abortControllerRef = useRef(null)

  const fetchBlogs = async () => {
    if (fetchingRef.current) return
    
    try {
      fetchingRef.current = true
      setLoading(true)
      
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      
      abortControllerRef.current = new AbortController()
      
      const response = await axios.get('/api/blogs', {
        signal: abortControllerRef.current.signal,
        timeout: 10000
      })
      
      setBlogs(response.data.blogs || [])
      setError(null)
    } catch (err) {
      if (err.name !== 'AbortError' && err.name !== 'CanceledError') {
        const message = err.response?.data?.message || 'Failed to fetch blogs'
        setError(message)
        console.error('Blogs fetch error:', err)
        
        // Use fallback data
        setBlogs(fallbackData.blogs)
        
        if (err.code !== 'ECONNREFUSED' && err.response?.status !== 429) {
          toast.error('Using offline data - ' + message)
        }
      }
    } finally {
      setLoading(false)
      fetchingRef.current = false
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
    const timer = setTimeout(() => {
      fetchBlogs()
    }, 200) // Different delay

    return () => {
      clearTimeout(timer)
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
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
