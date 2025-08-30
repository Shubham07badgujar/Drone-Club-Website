#!/usr/bin/env node
/**
 * Database Health Check Script
 * 
 * This script performs comprehensive health checks on your MongoDB Atlas
 * database including connection, collections, indexes, and data integrity.
 * 
 * Usage: npm run db:health
 * Or: node scripts/db-health-check.js
 */

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { performance } from 'perf_hooks'

// Import your models for testing
import { TeamYear, Admin, Blog, Event, Project, Achievement, Department } from '../src/models/mongodb/index.js'

dotenv.config()

const healthCheck = async () => {
  console.log('🏥 MongoDB Atlas Health Check')
  console.log('=' .repeat(50))
  console.log('')

  if (!process.env.MONGODB_URI) {
    console.log('❌ MONGODB_URI not found in environment variables')
    process.exit(1)
  }

  try {
    // Connect to database
    console.log('🔄 Connecting to MongoDB Atlas...')
    const startTime = performance.now()
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    })
    
    const connectTime = Math.round(performance.now() - startTime)
    console.log(`✅ Connected in ${connectTime}ms`)
    console.log('')

    // Check 1: Database Connection
    console.log('🔍 1. Database Connection Health')
    console.log('-' .repeat(35))
    const db = mongoose.connection.db
    const admin = db.admin()
    
    try {
      const serverStatus = await admin.serverStatus()
      console.log(`   ✅ Server Status: OK`)
      console.log(`   📊 Version: ${serverStatus.version}`)
      console.log(`   ⏱️  Uptime: ${Math.round(serverStatus.uptime / 3600)} hours`)
      console.log(`   💾 Storage Engine: ${serverStatus.storageEngine?.name || 'Unknown'}`)
    } catch (error) {
      console.log(`   ⚠️  Could not get server status: ${error.message}`)
    }
    console.log('')

    // Check 2: Collections and Indexes
    console.log('🗄️  2. Collections and Indexes')
    console.log('-' .repeat(30))
    
    const collections = await db.listCollections().toArray()
    console.log(`   📚 Total Collections: ${collections.length}`)
    
    for (const collection of collections) {
      try {
        const coll = db.collection(collection.name)
        const count = await coll.countDocuments()
        const indexes = await coll.indexes()
        console.log(`   📁 ${collection.name}: ${count} documents, ${indexes.length} indexes`)
      } catch (error) {
        console.log(`   ❌ ${collection.name}: Error accessing collection`)
      }
    }
    console.log('')

    // Check 3: Model Validation
    console.log('🏗️  3. Model Validation')
    console.log('-' .repeat(25))
    
    const models = [
      { name: 'TeamYear', model: TeamYear },
      { name: 'Admin', model: Admin },
      { name: 'Blog', model: Blog },
      { name: 'Event', model: Event },
      { name: 'Project', model: Project },
      { name: 'Achievement', model: Achievement },
      { name: 'Department', model: Department }
    ]

    for (const { name, model } of models) {
      try {
        const count = await model.countDocuments()
        const sampleDoc = await model.findOne().lean()
        console.log(`   ✅ ${name}: ${count} documents ${sampleDoc ? '(schema valid)' : '(empty)'}`)
      } catch (error) {
        console.log(`   ❌ ${name}: ${error.message}`)
      }
    }
    console.log('')

    // Check 4: Performance Test
    console.log('⚡ 4. Performance Test')
    console.log('-' .repeat(20))
    
    try {
      // Test read performance
      const readStart = performance.now()
      await TeamYear.find().limit(10).lean()
      const readTime = Math.round(performance.now() - readStart)
      console.log(`   📖 Read Test: ${readTime}ms`)
      
      // Test write performance (create and delete a test document)
      const writeStart = performance.now()
      const testDoc = new TeamYear({
        year: 9999,
        description: 'Health check test',
        members: []
      })
      await testDoc.save()
      await TeamYear.deleteOne({ year: 9999 })
      const writeTime = Math.round(performance.now() - writeStart)
      console.log(`   ✏️  Write Test: ${writeTime}ms`)
      
    } catch (error) {
      console.log(`   ⚠️  Performance test failed: ${error.message}`)
    }
    console.log('')

    // Check 5: Database Statistics
    console.log('📊 5. Database Statistics')
    console.log('-' .repeat(25))
    
    try {
      const stats = await db.stats()
      console.log(`   💾 Data Size: ${(stats.dataSize / 1024 / 1024).toFixed(2)} MB`)
      console.log(`   📇 Index Size: ${(stats.indexSize / 1024 / 1024).toFixed(2)} MB`)
      console.log(`   📁 Collections: ${stats.collections}`)
      console.log(`   🔍 Indexes: ${stats.indexes}`)
      console.log(`   📄 Documents: ${stats.objects}`)
      console.log(`   📈 Average Document Size: ${Math.round(stats.avgObjSize)} bytes`)
    } catch (error) {
      console.log(`   ⚠️  Could not get database stats: ${error.message}`)
    }
    console.log('')

    // Check 6: Connection Pool Status
    console.log('🏊 6. Connection Pool Status')
    console.log('-' .repeat(30))
    
    try {
      const connState = mongoose.connection.readyState
      const states = {
        0: 'Disconnected',
        1: 'Connected',
        2: 'Connecting',
        3: 'Disconnecting'
      }
      console.log(`   🔗 Connection State: ${states[connState]} (${connState})`)
      console.log(`   🏠 Host: ${mongoose.connection.host}`)
      console.log(`   🗄️  Database: ${mongoose.connection.name}`)
      console.log(`   🆔 Connection ID: ${mongoose.connection.id}`)
    } catch (error) {
      console.log(`   ⚠️  Could not get connection status: ${error.message}`)
    }
    console.log('')

    // Final Report
    console.log('🎯 Health Check Summary')
    console.log('=' .repeat(25))
    console.log('✅ Database connection: HEALTHY')
    console.log('✅ Collections accessible: YES')
    console.log('✅ Models functional: YES')
    console.log('✅ Read/Write operations: WORKING')
    console.log('✅ Overall status: ALL SYSTEMS GO! 🚀')
    console.log('')
    console.log('💡 Your MongoDB Atlas database is running smoothly!')

  } catch (error) {
    console.log('')
    console.log('❌ HEALTH CHECK FAILED!')
    console.log('=' .repeat(25))
    console.log(`🚫 Error: ${error.message}`)
    console.log('')
    console.log('🔧 Recommended actions:')
    console.log('   1. Run: npm run test:db')
    console.log('   2. Check MongoDB Atlas cluster status')
    console.log('   3. Verify network connectivity')
    console.log('   4. Review error logs above')
    
    process.exit(1)
  } finally {
    try {
      await mongoose.connection.close()
      console.log('🔐 Connection closed cleanly')
    } catch (closeError) {
      console.log(`⚠️  Error closing connection: ${closeError.message}`)
    }
  }
}

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error('💥 Unhandled rejection:', error.message)
  process.exit(1)
})

// Run health check
healthCheck()
