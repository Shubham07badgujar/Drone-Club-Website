#!/usr/bin/env node
/**
 * MongoDB Atlas Connection Test Script
 * 
 * This script tests the MongoDB Atlas connection and provides detailed
 * diagnostic information to help troubleshoot connection issues.
 * 
 * Usage: npm run test:db
 * Or: node scripts/test-db-connection.js
 */

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { performance } from 'perf_hooks'

// Load environment variables
dotenv.config()

const testConnection = async () => {
  const startTime = performance.now()
  
  console.log('🧪 MongoDB Atlas Connection Test')
  console.log('=' .repeat(50))
  console.log('')

  // Check environment variables
  console.log('📋 Environment Check:')
  console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'not set'}`)
  console.log(`   DB_NAME: ${process.env.DB_NAME || 'not set'}`)
  console.log(`   MONGODB_URI: ${process.env.MONGODB_URI ? '✅ set' : '❌ not set'}`)
  
  if (process.env.MONGODB_URI) {
    const uri = process.env.MONGODB_URI
    const redactedURI = uri.replace(/:\w+@/, ':****@')
    console.log(`   URI Format: ${redactedURI}`)
    
    // Check URI format
    const isValidFormat = uri.startsWith('mongodb+srv://') || uri.startsWith('mongodb://')
    console.log(`   URI Valid: ${isValidFormat ? '✅ yes' : '❌ no'}`)
    
    // Check for placeholders
    const hasPlaceholders = uri.includes('USERNAME') || uri.includes('PASSWORD') || uri.includes('<') || uri.includes('>')
    console.log(`   No Placeholders: ${!hasPlaceholders ? '✅ yes' : '❌ contains placeholders'}`)
  }
  console.log('')

  if (!process.env.MONGODB_URI) {
    console.log('❌ MONGODB_URI not found in environment variables')
    console.log('📋 Please add MONGODB_URI to your .env file')
    process.exit(1)
  }

  try {
    console.log('🔄 Attempting connection to MongoDB Atlas...')
    
    // Enhanced connection options for testing
    const options = {
      serverSelectionTimeoutMS: 15000, // 15 seconds for server selection
      connectTimeoutMS: 15000, // 15 seconds for initial connection
      socketTimeoutMS: 30000, // 30 seconds for socket operations
      maxPoolSize: 5, // Smaller pool for testing
      retryWrites: true,
      authMechanism: 'SCRAM-SHA-1',
      authSource: 'admin',
    }

    const connection = await mongoose.connect(process.env.MONGODB_URI, options)
    const endTime = performance.now()
    const connectionTime = Math.round(endTime - startTime)

    console.log('')
    console.log('✅ CONNECTION SUCCESSFUL!')
    console.log('=' .repeat(30))
    console.log(`⏱️  Connection Time: ${connectionTime}ms`)
    console.log(`🏠 Host: ${connection.connection.host}`)
    console.log(`🗄️  Database: ${connection.connection.name}`)
    console.log(`📊 Ready State: ${connection.connection.readyState} (1 = connected)`)
    console.log(`🔗 Connection ID: ${connection.connection.id}`)
    console.log('')

    // Test basic operations
    console.log('🧪 Testing basic database operations...')
    
    // Test 1: List collections
    try {
      const collections = await connection.connection.db.listCollections().toArray()
      console.log(`📚 Collections found: ${collections.length}`)
      if (collections.length > 0) {
        console.log(`   Collections: ${collections.map(c => c.name).join(', ')}`)
      }
    } catch (error) {
      console.log(`⚠️  Could not list collections: ${error.message}`)
    }

    // Test 2: Create a test document
    try {
      const testSchema = new mongoose.Schema({
        testField: String,
        timestamp: { type: Date, default: Date.now }
      })
      const TestModel = mongoose.model('ConnectionTest', testSchema)
      
      const testDoc = new TestModel({
        testField: `Connection test at ${new Date().toISOString()}`
      })
      
      await testDoc.save()
      console.log('✅ Test document created successfully')
      
      // Clean up test document
      await TestModel.deleteMany({ testField: { $regex: /^Connection test/ } })
      console.log('🧹 Test document cleaned up')
      
    } catch (error) {
      console.log(`⚠️  Could not create test document: ${error.message}`)
    }

    // Test 3: Connection stats
    try {
      const stats = await connection.connection.db.stats()
      console.log(`📊 Database Stats:`)
      console.log(`   Data Size: ${(stats.dataSize / 1024 / 1024).toFixed(2)} MB`)
      console.log(`   Index Size: ${(stats.indexSize / 1024 / 1024).toFixed(2)} MB`)
      console.log(`   Collections: ${stats.collections}`)
      console.log(`   Indexes: ${stats.indexes}`)
      console.log(`   Objects: ${stats.objects}`)
    } catch (error) {
      console.log(`⚠️  Could not get database stats: ${error.message}`)
    }

    console.log('')
    console.log('🎉 All tests completed successfully!')
    console.log('💡 Your MongoDB Atlas connection is working perfectly!')

  } catch (error) {
    const endTime = performance.now()
    const attemptTime = Math.round(endTime - startTime)
    
    console.log('')
    console.log('❌ CONNECTION FAILED!')
    console.log('=' .repeat(25))
    console.log(`⏱️  Attempt Time: ${attemptTime}ms`)
    console.log(`🚫 Error: ${error.message}`)
    console.log('')

    // Detailed error analysis
    if (error.message.includes('bad auth') || error.message.includes('Authentication failed')) {
      console.log('🔐 AUTHENTICATION ERROR')
      console.log('   Possible causes:')
      console.log('   • Incorrect username or password')
      console.log('   • Database user doesn\'t exist')
      console.log('   • User lacks necessary permissions')
      console.log('   • Special characters in password need URL encoding')
      console.log('')
      console.log('   Solutions:')
      console.log('   1. Check Database Access in MongoDB Atlas')
      console.log('   2. Verify username and password')
      console.log('   3. Ensure user has "Atlas admin" role')
      console.log('   4. Try creating a new user with simple password')
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.log('🌐 DNS/NETWORK ERROR')
      console.log('   Possible causes:')
      console.log('   • No internet connection')
      console.log('   • DNS cannot resolve MongoDB Atlas hostname')
      console.log('   • Firewall blocking connection')
      console.log('   • Incorrect cluster URL')
      console.log('')
      console.log('   Solutions:')
      console.log('   1. Check internet connection')
      console.log('   2. Try: ping cluster0.xxxxx.mongodb.net')
      console.log('   3. Disable firewall/antivirus temporarily')
      console.log('   4. Verify cluster URL in MongoDB Atlas')
    } else if (error.message.includes('timeout') || error.message.includes('ETIMEDOUT')) {
      console.log('⏱️  TIMEOUT ERROR')
      console.log('   Possible causes:')
      console.log('   • Slow internet connection')
      console.log('   • IP address not whitelisted')
      console.log('   • MongoDB Atlas cluster overloaded')
      console.log('   • Network configuration issues')
      console.log('')
      console.log('   Solutions:')
      console.log('   1. Add 0.0.0.0/0 to Network Access (testing only)')
      console.log('   2. Check MongoDB Atlas cluster status')
      console.log('   3. Try from different network')
      console.log('   4. Increase timeout values')
    } else {
      console.log('🔧 GENERAL ERROR')
      console.log('   Review the error message above for specific details')
      console.log('   Check MongoDB Atlas dashboard for cluster status')
    }

    console.log('')
    console.log('📞 Additional Help:')
    console.log('   • MongoDB Atlas Documentation: https://docs.atlas.mongodb.com/')
    console.log('   • Connection Troubleshooting: https://docs.atlas.mongodb.com/troubleshoot-connection/')
    console.log('   • Community Forums: https://community.mongodb.com/')

    process.exit(1)
  } finally {
    // Always close the connection
    try {
      await mongoose.connection.close()
      console.log('🔐 Connection closed cleanly')
    } catch (closeError) {
      console.log(`⚠️  Error closing connection: ${closeError.message}`)
    }
    
    process.exit(0)
  }
}

// Handle unhandled errors
process.on('unhandledRejection', (error) => {
  console.error('💥 Unhandled rejection:', error.message)
  process.exit(1)
})

process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught exception:', error.message)
  process.exit(1)
})

// Run the test
testConnection()
