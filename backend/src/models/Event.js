import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Event = sequelize.define('Event', {
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
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  max_capacity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  registration_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  image_url: {
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
  tableName: 'events',
  indexes: [
    {
      fields: ['date'],
    },
    {
      fields: ['title'],
    },
  ],
})

export default Event
