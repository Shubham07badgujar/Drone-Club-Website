import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

let sequelize

// Try PostgreSQL first, fallback to SQLite for development
if (process.env.DB_PASSWORD !== undefined && process.env.DB_PASSWORD !== '') {
  // PostgreSQL configuration
  sequelize = new Sequelize(
    process.env.DB_NAME || 'drone_club_db',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      dialect: 'postgres',
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      define: {
        timestamps: true,
        underscored: true,
      },
    }
  )
} else {
  // SQLite fallback for development
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.SQLITE_PATH || './database.sqlite',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      timestamps: true,
      underscored: true,
    },
  })
  
  console.log('Using SQLite database for development')
}

export default sequelize
