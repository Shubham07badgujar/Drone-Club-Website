import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

// Admin Schema
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  password_hash: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'super_admin'],
    default: 'admin'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  last_login: {
    type: Date,
    default: null
  }
})

const Admin = mongoose.model('Admin', adminSchema)

const seedAdminQuick = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...')
    
    // Set connection timeout
    const connectionTimeout = setTimeout(() => {
      console.log('❌ Connection timeout - exiting')
      process.exit(1)
    }, 15000)

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000
    })
    
    clearTimeout(connectionTimeout)
    console.log('✅ Connected to MongoDB')

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email: 'teamthirdaxis@gcoej.ac.in' })
    
    if (existingAdmin) {
      console.log('👤 Admin already exists - updating password')
      const hashedPassword = await bcrypt.hash('TeamThird@x!$07', 12)
      existingAdmin.password_hash = hashedPassword
      existingAdmin.role = 'super_admin'
      await existingAdmin.save()
      console.log('✅ Admin password updated')
    } else {
      console.log('👤 Creating new admin user')
      const hashedPassword = await bcrypt.hash('TeamThird@x!$07', 12)
      
      const admin = new Admin({
        email: 'teamthirdaxis@gcoej.ac.in',
        username: 'TeamThirdAxis',
        password_hash: hashedPassword,
        role: 'super_admin'
      })

      await admin.save()
      console.log('✅ Admin created successfully')
    }

    console.log('\n🎉 Admin seeding completed!')
    console.log('📧 Email: teamthirdaxis@gcoej.ac.in')
    console.log('🔑 Password: TeamThird@x!$07')
    console.log('👑 Role: super_admin')

  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await mongoose.connection.close()
    console.log('🔌 Database connection closed')
    process.exit(0)
  }
}

seedAdminQuick()
