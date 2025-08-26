import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const EventRegistration = sequelize.define('EventRegistration', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  event_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'events',
      key: 'id',
    },
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  registered_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'event_registrations',
  indexes: [
    {
      fields: ['event_id'],
    },
    {
      fields: ['user_email'],
    },
    {
      unique: true,
      fields: ['event_id', 'user_email'], // Prevent duplicate registrations
    },
  ],
})

export default EventRegistration
