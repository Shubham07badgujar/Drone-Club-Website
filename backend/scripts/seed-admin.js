import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { Admin } from '../src/models/mongodb/index.js'
import connectMongoDB from '../src/config/mongodb.js'

const seedAdmin = async () => {
  try {
    await connectMongoDB()
    console.log('Connected to MongoDB Atlas')

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'teamthirdaxis@gcoej.ac.in' })
    
    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin.email)
      // Update password if needed
      const hashedPassword = await bcrypt.hash('TeamThird@x!$07', 12)
      existingAdmin.password_hash = hashedPassword
      await existingAdmin.save()
      console.log('Admin password updated successfully')
    } else {
      // Create new admin
      const hashedPassword = await bcrypt.hash('TeamThird@x!$07', 12)
      
      const admin = new Admin({
        email: 'teamthirdaxis@gcoej.ac.in',
        username: 'TeamThirdAxis',
        password_hash: hashedPassword,
        role: 'super_admin'
      })

      await admin.save()
      console.log('Admin created successfully:', admin.email)
    }

    console.log('\n✅ Admin seeding completed successfully!')
    console.log('Admin credentials:')
    console.log('Email: teamthirdaxis@gcoej.ac.in')
    console.log('Password: TeamThird@x!$07')
    console.log('Role: super_admin')

  } catch (error) {
    console.error('❌ Error seeding admin:', error)
  } finally {
    await mongoose.connection.close()
    console.log('Database connection closed')
    process.exit(0)
  }
}

seedAdmin()
