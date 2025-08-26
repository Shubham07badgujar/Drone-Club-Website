import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

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
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  status: {
    type: DataTypes.ENUM('planning', 'in-progress', 'completed', 'on-hold'),
    defaultValue: 'planning',
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
