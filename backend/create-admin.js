import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password_hash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'super_admin'], default: 'admin' },
  created_at: { type: Date, default: Date.now },
  last_login: { type: Date, default: null }
})

const Admin = mongoose.model('Admin', adminSchema)

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')
    
    const hashedPassword = await bcrypt.hash('TeamThird@x!$07', 12)
    
    const admin = new Admin({
      email: 'teamthirdaxis@gcoej.ac.in',
      username: 'TeamThirdAxis',
      password_hash: hashedPassword,
      role: 'super_admin'
    })
    
    await admin.save()
    console.log('✅ Admin created successfully!')
    console.log('📧 Email: teamthirdaxis@gcoej.ac.in')
    console.log('🔑 Password: TeamThird@x!$07')
    
  } catch (error) {
    if (error.code === 11000) {
      console.log('Admin already exists')
    } else {
      console.error('Error:', error.message)
    }
  } finally {
    mongoose.connection.close()
    process.exit(0)
  }
}

createAdmin()
