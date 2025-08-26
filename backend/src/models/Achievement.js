import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

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
    type: DataTypes.ENUM('award', 'competition', 'milestone', 'certification'),
    allowNull: false,
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
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
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
