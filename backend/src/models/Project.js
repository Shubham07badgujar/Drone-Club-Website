import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

// Helper function to handle array types for different dialects
const getArrayType = () => {
  if (sequelize.getDialect() === 'sqlite') {
    return DataTypes.TEXT // Store as JSON string in SQLite
  }
  return DataTypes.ARRAY(DataTypes.STRING) // Use native array for PostgreSQL
}

const Project = sequelize.define('Project', {
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
  media_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  technologies: {
    type: getArrayType(),
    defaultValue: sequelize.getDialect() === 'sqlite' ? '[]' : [],
    get() {
      const value = this.getDataValue('technologies')
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
        this.setDataValue('technologies', JSON.stringify(value || []))
      } else {
        this.setDataValue('technologies', value || [])
      }
    }
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'planning',
    validate: {
      isIn: [['planning', 'in-progress', 'completed', 'on-hold']]
    }
  },
  github_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  demo_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'projects',
  indexes: [
    {
      fields: ['title'],
    },
    {
      fields: ['status'],
    },
    {
      fields: ['created_at'],
    },
  ],
})

export default Project
