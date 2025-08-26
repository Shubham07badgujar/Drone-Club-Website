import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

// Helper function to handle array types for different dialects
const getArrayType = () => {
  if (sequelize.getDialect() === 'sqlite') {
    return DataTypes.TEXT // Store as JSON string in SQLite
  }
  return DataTypes.ARRAY(DataTypes.STRING) // Use native array for PostgreSQL
}

const Achievement = sequelize.define('Achievement', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  certificate_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['award', 'competition', 'milestone', 'certification']]
    }
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: true, // For competition rankings like "1st Place", "Runner-up"
  },
  organizer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  team_members: {
    type: getArrayType(),
    defaultValue: sequelize.getDialect() === 'sqlite' ? '[]' : [],
    get() {
      const value = this.getDataValue('team_members')
      if (sequelize.getDialect() === 'sqlite') {
        try {
          return JSON.parse(value || '[]')
        } catch {
          return []
        }
      }
      return value || []
    },
    set(value) {
      if (sequelize.getDialect() === 'sqlite') {
        this.setDataValue('team_members', JSON.stringify(value || []))
      } else {
        this.setDataValue('team_members', value || [])
      }
    }
  },
  is_featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'achievements',
  indexes: [
    {
      fields: ['title'],
    },
    {
      fields: ['type'],
    },
    {
      fields: ['date'],
    },
    {
      fields: ['is_featured'],
    },
  ],
})

export default Achievement
