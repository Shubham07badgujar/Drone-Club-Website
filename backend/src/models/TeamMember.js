import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const TeamMember = sequelize.define('TeamMember', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  linkedin_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  github_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  twitter_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  department: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  join_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'team_members',
  indexes: [
    {
      fields: ['name'],
    },
    {
      fields: ['role'],
    },
    {
      fields: ['department'],
    },
    {
      fields: ['is_active'],
    },
  ],
})

export default TeamMember
