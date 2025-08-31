import mongoose from 'mongoose'
import connectMongoDB from '../src/config/mongodb.js'
import Achievement from '../src/models/mongodb/Achievement.js'

// Default achievements data
const defaultAchievements = [
  {
    title: 'SAE Aerothon 2024',
    description: 'First place in the SAE Aerothon 2024 competition with our innovative drone design featuring advanced autonomous navigation capabilities.',
    year: 2024,
    category: 'Competition',
    level: 'National',
    is_featured: true,
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Smart India Hackathon 2024',
    description: 'Winner of the drone technology track at Smart India Hackathon 2024 for developing a search and rescue drone system.',
    year: 2024,
    category: 'Hackathon',
    level: 'National',
    is_featured: true,
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'PIWOT 2025',
    description: 'Participated in the Prototype and Innovation Workshop of Tomorrow (PIWOT) 2025, showcasing our latest agricultural drone technology.',
    year: 2025,
    category: 'Exhibition',
    level: 'State',
    is_featured: false,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'DIPEX 2025',
    description: 'Excellence award at the Drone Innovation and Product Exhibition (DIPEX) 2025 for our multi-rotor surveillance system.',
    year: 2025,
    category: 'Award',
    level: 'International',
    is_featured: true,
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
]

const seedAchievements = async () => {
  try {
    console.log('🚀 Starting Achievement Seeding Process...')
    console.log('=======================================')

    // Connect to MongoDB
    console.log('📡 Connecting to MongoDB...')
    const connection = await connectMongoDB()
    
    if (!connection) {
      console.error('❌ Failed to connect to MongoDB')
      console.log('💡 Please check your MongoDB connection settings')
      process.exit(1)
    }

    console.log('✅ Connected to MongoDB successfully')

    // Check if achievements already exist
    const existingCount = await Achievement.countDocuments()
    console.log(`📊 Found ${existingCount} existing achievements`)

    // Handle command line arguments
    const args = process.argv.slice(2)
    const forceReset = args.includes('--reset') || args.includes('-r')
    const dryRun = args.includes('--dry-run') || args.includes('-d')

    if (existingCount > 0 && !forceReset) {
      console.log('⚠️  Achievements already exist in the database')
      console.log('💡 Use --reset flag to clear existing data and reseed')
      console.log('💡 Use --dry-run flag to preview what would be added')
      
      if (!dryRun) {
        await mongoose.connection.close()
        process.exit(0)
      }
    }

    if (dryRun) {
      console.log('🔍 DRY RUN MODE - Preview of achievements to be added:')
      console.log('================================================')
      defaultAchievements.forEach((achievement, index) => {
        console.log(`${index + 1}. ${achievement.title} (${achievement.year})`)
        console.log(`   Category: ${achievement.category} | Level: ${achievement.level}`)
        console.log(`   Featured: ${achievement.is_featured ? '⭐ Yes' : '❌ No'}`)
        console.log(`   Description: ${achievement.description.substring(0, 100)}...`)
        console.log('')
      })
      await mongoose.connection.close()
      process.exit(0)
    }

    // Clear existing achievements if reset flag is used
    if (forceReset && existingCount > 0) {
      console.log('🗑️  Clearing existing achievements...')
      const deleteResult = await Achievement.deleteMany({})
      console.log(`✅ Deleted ${deleteResult.deletedCount} existing achievements`)
    }

    // Insert default achievements
    console.log('📝 Inserting default achievements...')
    const insertedAchievements = []

    for (let i = 0; i < defaultAchievements.length; i++) {
      const achievementData = defaultAchievements[i]
      
      try {
        console.log(`   Adding: ${achievementData.title}...`)
        
        // Create new achievement
        const achievement = new Achievement(achievementData)
        const savedAchievement = await achievement.save()
        
        insertedAchievements.push(savedAchievement)
        console.log(`   ✅ Added: ${savedAchievement.title}`)
        
      } catch (error) {
        console.error(`   ❌ Failed to add ${achievementData.title}:`, error.message)
      }
    }

    // Summary
    console.log('')
    console.log('📊 SEEDING SUMMARY')
    console.log('=================')
    console.log(`✅ Successfully added: ${insertedAchievements.length} achievements`)
    console.log(`❌ Failed to add: ${defaultAchievements.length - insertedAchievements.length} achievements`)
    console.log(`🌟 Featured achievements: ${insertedAchievements.filter(a => a.is_featured).length}`)
    
    // Display by category
    const categoryStats = {}
    insertedAchievements.forEach(achievement => {
      categoryStats[achievement.category] = (categoryStats[achievement.category] || 0) + 1
    })
    
    console.log('')
    console.log('📈 BY CATEGORY:')
    Object.entries(categoryStats).forEach(([category, count]) => {
      console.log(`   ${category}: ${count}`)
    })

    // Display by level
    const levelStats = {}
    insertedAchievements.forEach(achievement => {
      levelStats[achievement.level] = (levelStats[achievement.level] || 0) + 1
    })
    
    console.log('')
    console.log('🏆 BY LEVEL:')
    Object.entries(levelStats).forEach(([level, count]) => {
      console.log(`   ${level}: ${count}`)
    })

    console.log('')
    console.log('🎉 Achievement seeding completed successfully!')
    
    // Close connection
    await mongoose.connection.close()
    console.log('📡 Database connection closed')
    
  } catch (error) {
    console.error('❌ Error during seeding process:', error)
    console.error('Stack trace:', error.stack)
    
    // Close connection on error
    try {
      await mongoose.connection.close()
      console.log('📡 Database connection closed')
    } catch (closeError) {
      console.error('❌ Error closing database connection:', closeError)
    }
    
    process.exit(1)
  }
}

// Handle script termination
process.on('SIGINT', async () => {
  console.log('\n⚠️  Seeding process interrupted')
  try {
    await mongoose.connection.close()
    console.log('📡 Database connection closed')
  } catch (error) {
    console.error('❌ Error closing database connection:', error)
  }
  process.exit(0)
})

// Show usage information
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log('🔧 Achievement Seeding Script')
  console.log('============================')
  console.log('Usage: node scripts/seed-achievements.js [options]')
  console.log('')
  console.log('Options:')
  console.log('  --reset, -r     Clear existing achievements before seeding')
  console.log('  --dry-run, -d   Preview achievements without adding to database')
  console.log('  --help, -h      Show this help message')
  console.log('')
  console.log('Examples:')
  console.log('  node scripts/seed-achievements.js              # Add achievements (skip if exist)')
  console.log('  node scripts/seed-achievements.js --reset      # Clear and re-add all achievements')
  console.log('  node scripts/seed-achievements.js --dry-run    # Preview achievements only')
  process.exit(0)
}

// Run the seeding process
seedAchievements()
