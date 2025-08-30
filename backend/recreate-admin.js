import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

async function recreateAdmin() {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log('✅ Connected')
    
    // Delete any existing admin
    await mongoose.connection.db.collection('admins').deleteMany({ email: 'teamthirdaxis@gcoej.ac.in' })
    console.log('🗑️  Deleted existing admin')
    
    // Create new admin
    const hashedPassword = await bcrypt.hash('TeamThird@x!$07', 12)
    console.log('🔐 Password hashed')
    
    await mongoose.connection.db.collection('admins').insertOne({
      email: 'teamthirdaxis@gcoej.ac.in',
      username: 'TeamThirdAxis',
      password_hash: hashedPassword,
      role: 'super_admin',
      created_at: new Date(),
      last_login: null
    })
    
    console.log('✅ Admin created successfully!')
    console.log('📧 Email: teamthirdaxis@gcoej.ac.in')
    console.log('🔑 Password: TeamThird@x!$07')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await mongoose.connection.close()
    console.log('🔌 Connection closed')
    process.exit(0)
  }
}

recreateAdmin()
