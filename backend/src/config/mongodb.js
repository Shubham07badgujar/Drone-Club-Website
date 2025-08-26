import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || process.env.MONGODB_ATLAS_URI

    if (!mongoURI) {
      console.log('⚠️  MongoDB connection string not found.')
      console.log('📋 To use MongoDB Atlas:')
      console.log('   1. Set up your MongoDB Atlas cluster')
      console.log('   2. Add MONGODB_URI to your .env file')
      console.log('   3. See MONGODB_SETUP.md for detailed instructions')
      console.log('   4. Restart the server')
      console.log('')
      console.log('💡 The application will continue without MongoDB.')
      console.log('   API endpoints will return empty arrays for now.')
      return null
    }

    // MongoDB connection options
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferMaxEntries: 0 // Disable mongoose buffering
    }

    const connection = await mongoose.connect(mongoURI, options)

    console.log(`MongoDB Connected: ${connection.connection.host}`)
    console.log(`Database: ${connection.connection.name}`)
    
    return connection

  } catch (error) {
    console.error('MongoDB connection error:', error.message)
    
    // Exit process with failure if we can't connect to MongoDB
    process.exit(1)
  }
}

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB Atlas')
})

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB Atlas')
})

// Close MongoDB connection on app termination
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close()
    console.log('MongoDB connection closed through app termination')
    process.exit(0)
  } catch (error) {
    console.error('Error closing MongoDB connection:', error)
    process.exit(1)
  }
})

export default connectMongoDB
