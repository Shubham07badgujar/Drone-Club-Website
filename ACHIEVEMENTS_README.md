# Achievements System Documentation

## Overview

The Achievements System is a comprehensive feature that allows the Drone Club Website to showcase and manage achievements, awards, and accomplishments. The system includes both public-facing display functionality and admin management capabilities.

## Features

### Public Features
- 📋 **Achievement Listing**: Display all achievements with filtering options
- 🌟 **Featured Achievements**: Highlight important achievements  
- 📅 **Year-based Filtering**: Filter achievements by specific years
- 🏆 **Category Filtering**: Filter by achievement categories (competition, award, hackathon, exhibition)
- 📊 **Statistics Display**: Show achievement counts and metrics
- 📱 **Responsive Design**: Mobile-friendly layout with animations

### Admin Features
- ➕ **Create Achievements**: Add new achievements with all details
- ✏️ **Edit Achievements**: Update existing achievement information
- 🗑️ **Delete Achievements**: Remove achievements from the system
- ⭐ **Feature Toggle**: Mark achievements as featured or unfeatured
- 📈 **Dashboard View**: Admin statistics and management interface
- 🔐 **JWT Protection**: Secure admin-only operations

## Database Schema

### Achievement Model (MongoDB)

```javascript
{
  title: String,           // Achievement title (required)
  description: String,     // Detailed description (required)
  year: Number,           // Achievement year (required)
  category: String,       // Enum: ['competition', 'award', 'hackathon', 'exhibition']
  level: String,          // Enum: ['international', 'national', 'state', 'university']
  image: String,          // Image URL (optional)
  is_featured: Boolean,   // Featured status (default: false)
  display_order: Number,  // Display ordering (optional)
  created_by: ObjectId,   // Admin who created (optional)
  updated_by: ObjectId,   // Admin who last updated (optional)
  created_at: Date,       // Creation timestamp
  updated_at: Date        // Last update timestamp
}
```

## API Endpoints

### Public Endpoints

#### GET /api/achievements
Get all achievements with optional filtering
```
Query Parameters:
- filter: 'all' | 'featured' (default: 'all')
- year: specific year to filter by
- page: page number for pagination (default: 1)
- limit: items per page (default: 10)
```

#### GET /api/achievements/featured
Get only featured achievements

#### GET /api/achievements/year/:year
Get achievements for a specific year

### Protected Admin Endpoints

#### POST /api/achievements
Create a new achievement
```http
POST /api/achievements
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "title": "Achievement Title",
  "description": "Detailed description of the achievement",
  "year": 2024,
  "category": "Competition",
  "level": "National",
  "image": "https://example.com/image.jpg",
  "is_featured": true
}
```

**Required Fields:**
- `title` (string, max 200 chars): Achievement title
- `description` (string, max 2000 chars): Achievement description  
- `year` (number, 2020-current+5): Achievement year

**Optional Fields:**
- `category` (enum): One of "Competition", "Award", "Hackathon", "Exhibition", "Conference", "Certification", "Other"
- `level` (enum): One of "International", "National", "State", "University", "Local", "Regional"
- `image` (string): Valid URL to achievement image
- `is_featured` (boolean): Whether to feature the achievement

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Achievement created successfully",
  "achievement": {
    "_id": "64b3f...",
    "title": "Achievement Title",
    "description": "Detailed description...",
    "year": 2024,
    "category": "Competition",
    "level": "National",
    "image": "https://example.com/image.jpg",
    "is_featured": true,
    "created_by": "64a2e...",
    "created_at": "2024-08-31T09:00:00.000Z",
    "updated_at": "2024-08-31T09:00:00.000Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "title",
      "message": "Achievement title is required",
      "value": ""
    }
  ]
}
```

#### PUT /api/achievements/:id
Update an existing achievement

#### DELETE /api/achievements/:id
Delete an achievement

#### PATCH /api/achievements/:id/toggle-featured
Toggle the featured status of an achievement

## Frontend Components

### Public Components

#### `Achievements.jsx`
Main achievements page with:
- Filter controls (All, Featured, Year selection)
- Achievement statistics
- Grid layout of achievement cards
- Responsive design with animations

#### `AchievementCard.jsx`
Individual achievement display with:
- Achievement image
- Title and description
- Category and level badges
- Featured indicator
- Year display

### Admin Components

#### `AchievementManagement.jsx`
Admin dashboard for achievement management:
- Statistics dashboard
- Achievement table with actions
- Add/Edit modal
- Delete confirmation
- Feature toggle functionality

### React Hooks

#### `useAchievements.js`
Custom hook providing:
- Achievement data fetching
- CRUD operations
- Loading and error states
- JWT token handling
- Automatic refresh after operations

## Setup and Installation

### 1. Database Setup

Ensure MongoDB is configured and the Achievement model is imported:

```javascript
// In your models index file
export { default as Achievement } from './Achievement.js'
```

### 2. Seed Default Data

Run the seeding script to populate default achievements:

```bash
# Add default achievements (if none exist)
npm run seed:achievements

# Clear existing and re-add all achievements
npm run seed:achievements -- --reset

# Preview achievements without adding to database
npm run seed:achievements -- --dry-run
```

### 3. Environment Variables

Ensure these environment variables are set:
```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Authentication Middleware

The system uses JWT authentication for admin operations. Ensure your auth middleware is properly configured:

```javascript
// Routes use authenticateAdmin and requirePermission middleware
router.post('/', authenticateAdmin, requirePermission('admin'), createAchievement)
```

## Default Achievements

The system comes with 4 default achievements:

1. **SAE Aerothon 2024** (Competition, National, Featured)
2. **Smart India Hackathon 2024** (Hackathon, National, Featured)  
3. **PIWOT 2025** (Exhibition, State)
4. **DIPEX 2025** (Award, International, Featured)

## Usage Examples

### Public Access
```javascript
// Fetch all achievements
const { achievements, loading, error } = useAchievements()

// Fetch featured achievements only
const { fetchFeaturedAchievements } = useAchievements()
await fetchFeaturedAchievements()

// Fetch achievements by year
const { fetchAchievementsByYear } = useAchievements()
await fetchAchievementsByYear(2024)
```

### Admin Operations
```javascript
// Create new achievement
const newAchievement = {
  title: "New Achievement",
  description: "Description here",
  year: 2024,
  category: "competition",
  level: "national"
}
await createAchievement(newAchievement)

// Update achievement
await updateAchievement(achievementId, updatedData)

// Delete achievement
await deleteAchievement(achievementId)

// Toggle featured status
await toggleFeatured(achievementId)
```

## Error Handling

The system includes comprehensive error handling:

- **Client-side**: Toast notifications for user feedback
- **Server-side**: Detailed error logging and validation
- **Network**: Automatic retry logic for failed requests
- **Authentication**: Proper JWT validation and renewal

## File Structure

```
backend/
├── src/
│   ├── models/
│   │   └── mongodb/
│   │       └── Achievement.js          # Database model
│   ├── controllers/
│   │   └── achievementController.js    # API controllers
│   ├── routes/
│   │   └── achievements.js             # API routes
│   └── middleware/
│       └── auth.js                     # Authentication middleware
└── scripts/
    └── seed-achievements.js            # Seeding script

frontend/
├── src/
│   ├── components/
│   │   ├── cards/
│   │   │   └── AchievementCard.jsx     # Achievement card component
│   │   └── admin/
│   │       └── AchievementManagement.jsx # Admin management
│   ├── pages/
│   │   ├── Achievements.jsx            # Public achievements page
│   │   └── AdminDashboard.jsx          # Admin dashboard with tabs
│   └── hooks/
│       └── useAchievements.js          # React hook for API calls
```

## Security Features

- **JWT Authentication**: Secure admin-only operations
- **Input Validation**: Server-side validation for all inputs
- **Permission Checking**: Role-based access control
- **CORS Protection**: Configured for secure cross-origin requests
- **SQL Injection Prevention**: MongoDB ODM protection

## Performance Optimizations

- **Pagination**: Server-side pagination for large datasets
- **Caching**: Browser caching for static achievement data
- **Lazy Loading**: Images loaded on demand
- **Debounced Search**: Optimized filtering and search
- **Connection Pooling**: MongoDB connection optimization

## Troubleshooting

### Common API Issues

1. **400 Bad Request when creating achievements**
   ```
   POST http://localhost:5000/api/achievements 400 (Bad Request)
   ```
   **Causes:**
   - Missing required fields (title, description, year)
   - Invalid enum values (use "Competition" not "competition")
   - Year outside valid range (2020 to current+5)
   - Invalid image URL format
   
   **Solution:**
   ```javascript
   // Correct format
   const achievementData = {
     title: "SAE Aerothon 2024",
     description: "First place in competition...",
     year: 2024,
     category: "Competition",  // Not "competition"
     level: "National",        // Not "national"
     image: "https://example.com/image.jpg",
     is_featured: true
   }
   ```

2. **401 Authentication Errors**
   - Verify JWT_SECRET is set in environment variables
   - Check admin user permissions in database
   - Ensure token is not expired
   - Confirm Authorization header format: `Bearer <token>`

3. **Enum Validation Errors**
   **Valid category values:** "Competition", "Award", "Hackathon", "Exhibition", "Conference", "Certification", "Other"
   **Valid level values:** "International", "National", "State", "University", "Local", "Regional"

### Common Issues

1. **MongoDB Connection Failed**
   - Check MONGODB_URI environment variable
   - Verify MongoDB Atlas IP whitelist
   - Ensure database credentials are correct

2. **Authentication Errors**
   - Verify JWT_SECRET is set
   - Check admin user permissions
   - Ensure token is not expired

3. **Seeding Script Fails**
   - Run with `--dry-run` to test connection
   - Check MongoDB connection status
   - Verify Achievement model is properly imported

4. **Frontend Not Loading Achievements**
   - Check browser console for errors
   - Verify API endpoints are accessible
   - Check network tab for failed requests

### Debug Commands

```bash
# Test database connection
npm run test:db

# Run seeding in dry-run mode
npm run seed:achievements -- --dry-run

# Check seeding script help
npm run seed:achievements -- --help

# View backend logs
npm run dev # (backend)

# View frontend console
npm run dev # (frontend)
```

## Contributing

When contributing to the achievements system:

1. **Database Changes**: Update both the model and migration scripts
2. **API Changes**: Update both controller and route documentation
3. **Frontend Changes**: Ensure responsive design and accessibility
4. **Testing**: Test both admin and public functionality
5. **Documentation**: Update this README with any new features

## Future Enhancements

Potential improvements for the achievements system:

- 📸 **Image Upload**: Direct file upload instead of URLs
- 🔍 **Advanced Search**: Full-text search across achievements
- 📊 **Analytics**: Track achievement views and engagement
- 🏅 **Achievement Types**: Additional categorization options
- 🔔 **Notifications**: Alerts for new achievements
- 📤 **Export**: Export achievements to PDF/Excel
- 🌐 **Multilingual**: Support for multiple languages

---

For additional support or questions about the achievements system, please refer to the main project documentation or contact the development team.
