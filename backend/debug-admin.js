import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

async function debugAndCreateAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { 
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000 
    })
    console.log('✅ Connected to MongoDB')
    
    // Check current admins
    const admins = await mongoose.connection.db.collection('admins').find({}).toArray()
    console.log('📋 Current admins:', admins)
    
    // Delete all admins first
    await mongoose.connection.db.collection('admins').deleteMany({})
    console.log('🗑️  Cleared admins collection')
    
    // Create admin manually with proper hashed password
    const password = 'TeamThird@x!$07'
    const hashedPassword = await bcryptjs.hash(password, 12)
    console.log('🔐 Password hashed:', hashedPassword.substring(0, 20) + '...')
    
    const adminDoc = {
      name: 'Team Third Axis',
      email: 'teamthirdaxis@gcoej.ac.in',
      password: hashedPassword,
      role: 'super-admin',
      permissions: ['read', 'write', 'delete', 'manage-users', 'manage-content', 'manage-events', 'manage-projects'],
      is_active: true,
      failed_login_attempts: 0,
      locked_until: null,
      last_login: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await mongoose.connection.db.collection('admins').insertOne(adminDoc)
    console.log('✅ Admin inserted:', result.insertedId)
    
    // Verify by finding the admin
    const createdAdmin = await mongoose.connection.db.collection('admins').findOne({ email: 'teamthirdaxis@gcoej.ac.in' })
    console.log('🔍 Created admin verification:', {
      id: createdAdmin._id,
      email: createdAdmin.email,
      name: createdAdmin.name,
      role: createdAdmin.role,
      hasPassword: !!createdAdmin.password
    })
    
    // Test password comparison
    const passwordMatch = await bcryptjs.compare(password, createdAdmin.password)
    console.log('🔑 Password verification:', passwordMatch)
    
    console.log('\n🎉 Admin setup complete!')
    console.log('📧 Email: teamthirdaxis@gcoej.ac.in')
    console.log('🔑 Password: TeamThird@x!$07')
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await mongoose.disconnect()
    process.exit(0)
  }
}

debugAndCreateAdmin()
