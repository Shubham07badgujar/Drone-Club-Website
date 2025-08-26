import Admin from './Admin.js'
import Project from './Project.js'
import Event from './Event.js'
import EventRegistration from './EventRegistration.js'
import Blog from './Blog.js'
import TeamMember from './TeamMember.js'
import Department from './Department.js'
import Achievement from './Achievement.js'

// Define associations
Event.hasMany(EventRegistration, {
  foreignKey: 'event_id',
  as: 'registrations',
  onDelete: 'CASCADE',
})

EventRegistration.belongsTo(Event, {
  foreignKey: 'event_id',
  as: 'event',
})

Department.belongsTo(TeamMember, {
  foreignKey: 'head_id',
  as: 'head',
})

TeamMember.hasOne(Department, {
  foreignKey: 'head_id',
  as: 'headOfDepartment',
})

export {
  Admin,
  Project,
  Event,
  EventRegistration,
  Blog,
  TeamMember,
  Department,
  Achievement,
}
