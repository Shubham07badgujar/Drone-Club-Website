import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectMongoDB = async () => {
  try {
    // Primary URI from environment
    let mongoURI = process.env.MONGODB_URI || process.env.MONGODB_ATLAS_URI

    if (!mongoURI) {
      console.log('⚠️  MongoDB connection string not found.')
      console.log('📋 To use MongoDB Atlas:')
      console.log('   1. Set up your MongoDB Atlas cluster')
      console.log('   2. Add MONGODB_URI to your .env file')
      console.log('   3. Format: mongodb+srv://username:password@cluster.mongodb.net/dbname')
      console.log('   4. Restart the server')
      console.log('')
      console.log('💡 The application will continue with reduced functionality.')
      return null
    }

    // Validate URI format
    if (mongoURI.includes('USERNAME') || mongoURI.includes('PASSWORD')) {
      console.log('⚠️  MongoDB URI contains placeholder values.')
      console.log('📋 Please update your .env file with actual credentials:')
      console.log('   1. Replace USERNAME with your MongoDB Atlas username')
      console.log('   2. Replace PASSWORD with your MongoDB Atlas password')
      console.log('   3. Ensure special characters in password are URL-encoded')
      console.log('')
      console.log('💡 The application will continue with reduced functionality.')
      return null
    }

    // Ensure database name is present
    const dbName = process.env.DB_NAME || 'team-third-axis-db'
    if (/mongodb\.net\/?(\?|$)/.test(mongoURI) && !/mongodb\.net\/[A-Za-z0-9_-]+\?/.test(mongoURI)) {
      mongoURI = mongoURI.replace(/(mongodb\.net)(\/)?(?=\?|$)/, `$1/${dbName}`)
    }

    // MongoDB driver connection options
    const options = {
      maxPoolSize: 10, // Maximum connections in the pool
      serverSelectionTimeoutMS: 10000, // Server selection timeout
      socketTimeoutMS: 45000, // Socket timeout
      maxIdleTimeMS: 30000, // Max idle time for connections
      retryWrites: true, // Retry writes on failure
      connectTimeoutMS: 10000, // Connection timeout
      heartbeatFrequencyMS: 10000, // Heartbeat frequency
      bufferCommands: false, // Disable mongoose buffering for commands
    }

    // Log connection attempt (with redacted credentials)
    const redactedURI = mongoURI.replace(/:\w+@/, ':****@')
    console.log('🔄 Connecting to MongoDB Atlas...')
    console.log(`🔐 Using URI: ${redactedURI}`)
    console.log(`🏷️  Database: ${dbName}`)
    console.log(`🌍 Environment: ${process.env.NODE_ENV}`)

    // Establish connection
    const connection = await mongoose.connect(mongoURI, options)

    // Log successful connection
    console.log(`✅ MongoDB Atlas connected successfully!`)
    console.log(`📊 Host: ${connection.connection.host}`)
    console.log(`📊 Database: ${connection.connection.name}`)
    console.log(`📊 Ready State: ${connection.connection.readyState}`)
    console.log(`📊 Collections: ${Object.keys(connection.connection.collections).length || 0}`)
    
    return connection

  } catch (error) {
    console.error('❌ MongoDB Atlas connection failed:', error.message)
    
    // Enhanced error handling with specific guidance
    if (error.message.includes('bad auth') || error.message.includes('Authentication failed')) {
      console.log('🔐 Authentication Error - Check these:')
      console.log('   1. Verify username and password in MongoDB Atlas Dashboard')
      console.log('   2. Ensure database user exists in Database Access')
      console.log('   3. Check user has "Atlas admin" or "Read and write to any database" permissions')
      console.log('   4. Verify password doesn\'t contain special characters (or URL encode them)')
      console.log('   5. Try creating a new database user with simple password')
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.log('🌐 DNS/Network Error - Check these:')
      console.log('   1. Internet connection is stable')
      console.log('   2. DNS can resolve MongoDB Atlas hostnames')
      console.log('   3. Firewall/antivirus isn\'t blocking connections')
      console.log('   4. Try connecting from a different network')
    } else if (error.message.includes('timeout') || error.message.includes('ETIMEDOUT')) {
      console.log('⏱️  Timeout Error - Check these:')
      console.log('   1. Network connection is stable and fast enough')
      console.log('   2. IP address is whitelisted in Network Access (try 0.0.0.0/0 for testing)')
      console.log('   3. MongoDB Atlas cluster is running and accessible')
      console.log('   4. Increase timeout values if on slow connection')
    } else if (error.message.includes('MongoServerError')) {
      console.log('�️  MongoDB Server Error - Check these:')
      console.log('   1. MongoDB Atlas cluster status in dashboard')
      console.log('   2. Database and collection permissions')
      console.log('   3. MongoDB Atlas service status')
      console.log('   4. Connection string format and parameters')
    }
    
    console.log('')
    console.log('🔧 Debug steps:')
    console.log('   1. Run: npm run test:db')
    console.log('   2. Check MongoDB Atlas dashboard for cluster status')
    console.log('   3. Verify all environment variables are set correctly')
    console.log('   4. Test connection with MongoDB Compass using same URI')
    console.log('')
    console.log('⚠️  Application will continue with limited functionality')
    
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
