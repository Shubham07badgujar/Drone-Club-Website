import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectMongoDB from '../src/config/mongodb.js'
import Achievement from '../src/models/mongodb/Achievement.js'

// Load environment variables
dotenv.config()

const defaultAchievements = [
  {
    title: "SAE Aerothon 2024",
    description: "The team participated in SAE Aerothon India 2024, a national-level competition focused on UAS. Team Third Axis secured All India Rank (AIR) 5 in Phase 1.",
    year: 2024,
    category: "Competition",
    position: "AIR 5",
    level: "National",
    organizer: "SAE India",
    type: "competition",
    is_featured: true,
    display_order: 1,
    points: 100,
    team_members: ["Team Third Axis Members"],
    image: "/images/achievements/sae-aerothon-2024.jpg"
  },
  {
    title: "Smart India Hackathon 2024",
    description: "Team Third Axis secured 1st rank at the regional level in SIH 2024 with a drone-based UAV system for disaster management.",
    year: 2024,
    category: "Hackathon",
    position: "1st Place Regional",
    level: "Regional",
    organizer: "Government of India",
    type: "competition",
    is_featured: true,
    display_order: 2,
    points: 120,
    team_members: ["Team Third Axis SIH Squad"],
    image: "/images/achievements/sih-2024.jpg"
  },
  {
    title: "PIWOT 2025",
    description: "At PIWOT 2025, held at Jio Convention Centre, Team Third Axis demonstrated advanced drone technology for defense and engaged with industry leaders.",
    year: 2025,
    category: "Exhibition",
    position: "Participant",
    level: "National",
    organizer: "PIWOT",
    type: "recognition",
    is_featured: true,
    display_order: 3,
    points: 80,
    team_members: ["Team Third Axis Tech Team"],
    image: "/images/achievements/piwot-2025.jpg"
  },
  {
    title: "DIPEX 2025",
    description: "In DIPEX 2025, Team Third Axis qualified for the regional level round under the theme of 'Defense and Cyber Security'.",
    year: 2025,
    category: "Competition",
    position: "Regional Qualifier",
    level: "Regional",
    organizer: "DIPEX",
    type: "competition",
    is_featured: true,
    display_order: 4,
    points: 90,
    team_members: ["Team Third Axis Defense Squad"],
    image: "/images/achievements/dipex-2025.jpg"
  }
]

const seedAchievements = async () => {
  try {
    console.log('🚀 Starting achievements seeding process...')
    
    // Connect to MongoDB
    await connectMongoDB()
    console.log('✅ Connected to MongoDB Atlas')

    // Check if achievements already exist
    const existingCount = await Achievement.countDocuments()
    console.log(`📊 Found ${existingCount} existing achievements`)

    if (existingCount > 0) {
      console.log('⚠️  Achievements already exist. Do you want to:')
      console.log('   1. Skip seeding (recommended)')
      console.log('   2. Clear existing and reseed')
      console.log('   3. Add new achievements alongside existing ones')
      console.log('')
      console.log('🛑 Skipping seeding to prevent duplicates.')
      console.log('   To force reseed, manually clear the achievements collection first.')
      process.exit(0)
    }

    // Create default admin user reference (if needed)
    console.log('📝 Seeding default achievements...')

    const seededAchievements = []
    for (let i = 0; i < defaultAchievements.length; i++) {
      const achievementData = {
        ...defaultAchievements[i],
        is_active: true,
        // Note: created_by will be null for seeded data, or you can reference an admin
      }

      const achievement = new Achievement(achievementData)
      await achievement.save()
      seededAchievements.push(achievement)
      
      console.log(`✅ Created: ${achievement.title} (${achievement.year})`)
    }

    console.log('')
    console.log('🎉 Achievement seeding completed successfully!')
    console.log(`📊 Total achievements created: ${seededAchievements.length}`)
    console.log('')
    console.log('📋 Seeded Achievements Summary:')
    seededAchievements.forEach((achievement, index) => {
      console.log(`   ${index + 1}. ${achievement.title} (${achievement.year}) - ${achievement.position || 'N/A'}`)
    })
    
    console.log('')
    console.log('🔗 API Endpoints to test:')
    console.log('   GET /api/achievements - View all achievements')
    console.log('   GET /api/achievements/featured - View featured achievements')
    console.log('   GET /api/achievements/year/2024 - View 2024 achievements')
    console.log('   GET /api/achievements/year/2025 - View 2025 achievements')

  } catch (error) {
    console.error('❌ Error seeding achievements:', error)
    if (error.name === 'ValidationError') {
      console.error('Validation errors:')
      Object.values(error.errors).forEach(err => {
        console.error(`  - ${err.path}: ${err.message}`)
      })
    }
  } finally {
    console.log('🔌 Closing database connection...')
    await mongoose.connection.close()
    process.exit(0)
  }
}

// Additional function to clear existing achievements (use with caution)
const clearAchievements = async () => {
  try {
    console.log('🧹 Clearing existing achievements...')
    await connectMongoDB()
    
    const deleteResult = await Achievement.deleteMany({})
    console.log(`✅ Deleted ${deleteResult.deletedCount} achievements`)
    
    await mongoose.connection.close()
    console.log('🔌 Database connection closed')
  } catch (error) {
    console.error('❌ Error clearing achievements:', error)
    await mongoose.connection.close()
  }
}

// Check command line arguments
const args = process.argv.slice(2)

if (args.includes('--clear')) {
  console.log('⚠️  CLEARING ALL ACHIEVEMENTS...')
  clearAchievements()
} else if (args.includes('--force')) {
  console.log('🔄 Force seeding (will create duplicates if data exists)...')
  // Modify seedAchievements to skip the existing check
  seedAchievements()
} else {
  console.log('🌱 Starting safe seeding process...')
  seedAchievements()
}

// Instructions for manual usage
console.log('')
console.log('💡 Usage:')
console.log('   npm run seed-achievements          # Safe seeding (skips if data exists)')
console.log('   npm run seed-achievements --clear  # Clear all achievements')
console.log('   npm run seed-achievements --force  # Force seed (may create duplicates)')
