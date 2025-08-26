import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

// Helper function to handle array types for different dialects
const getArrayType = () => {
  if (sequelize.getDialect() === 'sqlite') {
    return DataTypes.TEXT // Store as JSON string in SQLite
  }
  return DataTypes.ARRAY(DataTypes.STRING) // Use native array for PostgreSQL
}

const Blog = sequelize.define('Blog', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  excerpt: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tags: {
    type: getArrayType(),
    defaultValue: sequelize.getDialect() === 'sqlite' ? '[]' : [],
    get() {
      const value = this.getDataValue('tags')
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
        this.setDataValue('tags', JSON.stringify(value || []))
      } else {
        this.setDataValue('tags', value || [])
      }
    }
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
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
  tableName: 'blogs',
  indexes: [
    {
      fields: ['title'],
    },
    {
      fields: ['author'],
    },
    {
      fields: ['created_at'],
    },
    {
      fields: ['published'],
    },
  ],
})

export default Blog
