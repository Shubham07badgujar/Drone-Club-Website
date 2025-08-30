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

async function fixAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')
    
    // Find the admin
    const admin = await Admin.findOne({ email: 'teamthirdaxis@gcoej.ac.in' })
    if (admin) {
      console.log('Found admin:', admin)
      
      // Update with password hash
      const hashedPassword = await bcrypt.hash('TeamThird@x!$07', 12)
      admin.password_hash = hashedPassword
      admin.role = 'super_admin'
      
      await admin.save()
      console.log('✅ Admin updated successfully!')
    } else {
      console.log('❌ Admin not found')
    }
    
  } catch (error) {
    console.error('Error:', error.message)
  } finally {
    mongoose.connection.close()
    process.exit(0)
  }
}

fixAdmin()
