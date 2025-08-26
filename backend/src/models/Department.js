import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Department = sequelize.define('Department', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  head_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'team_members',
      key: 'id',
    },
  },
  established_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'departments',
  indexes: [
    {
      unique: true,
      fields: ['name'],
    },
    {
      fields: ['is_active'],
    },
  ],
})

export default Department
