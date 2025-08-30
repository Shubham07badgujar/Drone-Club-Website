import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

async function quickCreateAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
    console.log('Connected to MongoDB')
    
    // Hash password manually
    const hashedPassword = await bcryptjs.hash('TeamThird@x!$07', 12)
    
    // Direct database insertion
    const result = await mongoose.connection.db.collection('admins').replaceOne(
      { email: 'teamthirdaxis@gcoej.ac.in' },
      {
        name: 'Team Third Axis',
        email: 'teamthirdaxis@gcoej.ac.in',
        password: hashedPassword,
        role: 'super-admin',
        permissions: ['read', 'write', 'delete', 'manage-users', 'manage-content', 'manage-events', 'manage-projects'],
        is_active: true,
        failed_login_attempts: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { upsert: true }
    )
    
    console.log('✅ Admin created/updated successfully!')
    console.log('Result:', result)
    
  } catch (error) {
    console.error('Error:', error.message)
  } finally {
    await mongoose.disconnect()
    process.exit(0)
  }
}

quickCreateAdmin()
