import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

console.log('Testing MongoDB connection...')

const testConnection = async () => {
  try {
    console.log('Connecting to:', process.env.MONGODB_URI ? 'MongoDB URI loaded' : 'No MongoDB URI')
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout
    })
    
    console.log('✅ Connected successfully!')
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray()
    console.log('📋 Available collections:', collections.map(c => c.name))
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
  } finally {
    await mongoose.connection.close()
    console.log('📁 Connection closed')
    process.exit(0)
  }
}

testConnection()
