import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectMongoDB = async () => {
  try {
  let mongoURI = process.env.MONGODB_URI || process.env.MONGODB_ATLAS_URI

    if (!mongoURI) {
      console.log('⚠️  MongoDB connection string not found.')
      console.log('📋 To use MongoDB Atlas:')
      console.log('   1. Set up your MongoDB Atlas cluster')
      console.log('   2. Add MONGODB_URI to your .env file')
      console.log('   3. See MONGODB_AUTH_FIX.md for detailed instructions')
      console.log('   4. Restart the server')
      console.log('')
      console.log('💡 The application will continue with SQLite fallback.')
      return null
    }

    if (mongoURI.includes('USERNAME') || mongoURI.includes('PASSWORD')) {
      console.log('⚠️  MongoDB URI contains placeholder values.')
      console.log('📋 Please update your .env file with actual credentials:')
      console.log('   1. Replace USERNAME with your MongoDB Atlas username')
      console.log('   2. Replace PASSWORD with your MongoDB Atlas password')
      console.log('   3. See MONGODB_AUTH_FIX.md for detailed instructions')
      console.log('')
      console.log('💡 The application will continue with SQLite fallback.')
      return null
    }

    // Ensure DB name present
    const dbName = process.env.DB_NAME || 'team-third-axis-db'
    // If URI ends right after host (i.e., ...mongodb.net or has ? without /dbname), inject db name
    if (/mongodb\.net\/?(\?|$)/.test(mongoURI) && !/mongodb\.net\/[A-Za-z0-9_-]+\?/.test(mongoURI)) {
      // Insert /dbname before possible ?
      mongoURI = mongoURI.replace(/(mongodb\.net)(\/)?(?=\?|$)/, `$1/${dbName}`)
    }

    // Basic redaction for logging
    const redacted = mongoURI.replace(/:\w+@/, ':****@')
    console.log('🔄 Connecting to MongoDB Atlas...')
    console.log(`🔐 Using URI: ${redacted}`)

    // MongoDB connection options - compatible with latest Mongoose
    const options = {
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
      retryWrites: true, // Retry writes on replica set
    }

  const connection = await mongoose.connect(mongoURI, options)

    console.log(`✅ MongoDB Atlas connected successfully!`)
    console.log(`📊 Host: ${connection.connection.host}`)
    console.log(`📊 Database: ${connection.connection.name}`)
    console.log(`📊 Ready State: ${connection.connection.readyState}`)
    
    return connection

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message)
    
    // Provide specific troubleshooting based on error type
    if (error.message.includes('bad auth') || error.message.includes('Authentication failed')) {
      console.log('🔐 Authentication Error - Check these:')
      console.log('   1. Username and password are correct in MongoDB Atlas')
      console.log('   2. Database user exists in Database Access')
      console.log('   3. User has "Atlas admin" or "Read and write to any database" role')
      console.log('   4. Password doesn\'t contain special characters (use simple password)')
      console.log('   5. Run: node debug-mongodb.js for detailed diagnosis')
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('timeout')) {
      console.log('🌐 Network Error - Check these:')
      console.log('   1. Internet connection is working')
      console.log('   2. IP address is whitelisted in Network Access (try 0.0.0.0/0)')
      console.log('   3. Firewall isn\'t blocking MongoDB ports')
      console.log('   4. Cluster URL is correct')
    } else {
      console.log('🔧 General Error - Try these:')
      console.log('   1. Check MongoDB Atlas cluster status')
      console.log('   2. Verify connection string format')
      console.log('   3. Run: node debug-mongodb.js for detailed diagnosis')
    }
    
    console.log('')
    console.log('⚠️  Falling back to SQLite database for development')
    console.log('📋 See MONGODB_AUTH_FIX.md for step-by-step troubleshooting')
    return null
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
