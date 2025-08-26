# 🚁 Drone Club Website

A comprehensive full-stack web application for a drone club featuring a modern React frontend, robust Node.js backend, and PostgreSQL database. Built with cutting-edge technologies and best practices for scalability, security, and user experience.

![Drone Club Website](https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&h=400&fit=crop)

## 🌟 Key Highlights

- **Modern Tech Stack**: React 18 + Vite, Node.js + Express, PostgreSQL + Sequelize
- **Security First**: JWT authentication, input validation, rate limiting, CORS protection
- **Responsive Design**: Mobile-first approach with dark theme and smooth animations
- **Developer Experience**: Hot reload, ESLint, comprehensive error handling
- **Production Ready**: Environment configurations, database migrations, deployment guides

## 🚀 Features Overview

### 🎨 Frontend Features
- **⚡ Modern React with Vite** - Lightning-fast development with Hot Module Replacement
- **🎨 Tailwind CSS** - Utility-first CSS with dark theme, responsive design, and custom animations
- **🧭 React Router v6** - Declarative client-side routing with protected routes
- **🔐 JWT Authentication** - Secure token-based authentication with auto-refresh
- **🪝 Custom Hooks** - Reusable data fetching hooks with caching and error handling
- **📱 Responsive Design** - Mobile-first approach with breakpoint-specific optimizations
- **🔔 Toast Notifications** - Real-time user feedback with react-hot-toast
- **♿ Accessibility** - WCAG 2.1 compliant with keyboard navigation support
- **🎭 Framer Motion** - Smooth page transitions and micro-interactions
- **🎯 Component Library** - Reusable UI components with consistent design system

### 🛠️ Backend Features
- **🚀 Express.js API** - RESTful API with middleware architecture
- **🐘 PostgreSQL + Sequelize** - Robust relational database with ORM
- **🔒 JWT Authentication** - Stateless authentication with role-based access control
- **✅ Input Validation** - Comprehensive Joi schema validation
- **📁 File Upload** - Multer integration with file type and size validation
- **🛡️ Security Suite** - Helmet headers, CORS, rate limiting, SQL injection protection
- **📊 Request Logging** - Morgan HTTP request logger with custom formats
- **🗜️ Compression** - Gzip compression for optimized response sizes
- **🔄 Database Migrations** - Version-controlled database schema changes
- **🌱 Database Seeding** - Automated sample data generation for development

### 📄 Pages & Functionality

#### 🏠 **Landing Page (Home)**
- **Hero Section**: Stunning gradient background with animated tagline "Innovate. Fly. Explore."
- **Statistics Counter**: Dynamic stats showing projects, members, events, and achievements
- **Latest Projects**: Preview cards with hover effects and technology tags
- **Upcoming Events**: Event cards with registration counts and date formatting
- **Recent Blogs**: Article previews with author information and publication dates
- **Featured Achievement**: Highlighted club accomplishments with visual indicators
- **Call-to-Action**: Prominent "Join the Club" section with smooth scrolling

#### 🛠️ **Projects Showcase**
- **Interactive Grid**: Responsive project cards with hover animations
- **Technology Stack**: Visual tags showing programming languages and tools used
- **Project Status**: Real-time status indicators (Planning, In Progress, Completed)
- **Detailed Views**: Modal overlays with comprehensive project information
- **GitHub Integration**: Direct links to repositories and live demos
- **Search & Filter**: Advanced filtering by technology, status, and categories

#### 📅 **Events Management**
- **Event Calendar**: Interactive calendar view with event scheduling
- **Registration System**: User registration with form validation and capacity limits
- **Event Details**: Expandable cards with full descriptions and requirements
- **RSVP Tracking**: Real-time registration counts and waiting lists
- **Event Categories**: Workshop, competition, meetup, and training classifications
- **Location Integration**: Maps and directions for event venues

#### 📝 **Blog System**
- **Rich Content**: Full-featured blog posts with markdown support
- **Author Profiles**: Contributor information and social media links
- **Tag System**: Categorization and topic-based filtering
- **Reading Time**: Estimated reading duration for each article
- **Social Sharing**: Integration with social media platforms
- **Comment System**: Community engagement features (future enhancement)

#### 👥 **Team Profiles**
- **Member Showcase**: Professional profile cards with photos and bios
- **Role Hierarchy**: Clear organizational structure and responsibilities
- **Social Links**: LinkedIn, GitHub, Twitter profile integration
- **Department Affiliation**: Team member categorization by specialization
- **Contact Information**: Direct communication channels
- **Alumni Section**: Recognition of past contributors

#### 🏢 **Departments**
- **Hardware Engineering**: Drone design, manufacturing, and component selection
- **Software Development**: Flight control, AI, autonomous navigation systems
- **Flight Operations**: Training, safety protocols, pilot certification
- **Research & Development**: Cutting-edge technology exploration and innovation
- **Department Heads**: Leadership profiles and contact information
- **Project Portfolio**: Department-specific project showcases

#### 🏆 **Achievements**
- **Competition Wins**: Tournament results and ranking displays
- **Awards & Recognition**: Industry awards and academic honors
- **Milestone Tracking**: Club growth and development markers
- **Certificate Gallery**: Digital certificates and achievement badges
- **Timeline View**: Chronological achievement history
- **Team Recognition**: Individual and group accomplishments

#### ℹ️ **About Us**
- **Mission Statement**: Club vision, values, and objectives
- **History Timeline**: Founding story and major milestones
- **Membership Benefits**: Perks and opportunities for members
- **Contact Form**: Multi-purpose inquiry and registration form
- **Location & Hours**: Meeting times and venue information
- **FAQ Section**: Common questions and detailed answers

#### 🔐 **Admin Dashboard**
- **Content Management**: CRUD operations for all content types
- **User Analytics**: Member statistics and engagement metrics
- **Event Management**: Registration oversight and capacity planning
- **Media Library**: Centralized file and image management
- **Role Management**: Admin permissions and access control
- **System Health**: Server status and performance monitoring

## 🛠️ Prerequisites & Requirements

### System Requirements
- **Node.js**: Version 18.0.0 or higher ([Download](https://nodejs.org/))
- **PostgreSQL**: Version 12.0 or higher ([Download](https://www.postgresql.org/download/))
- **Git**: Latest version ([Download](https://git-scm.com/downloads))
- **Package Manager**: npm (comes with Node.js) or yarn

### Recommended Development Tools
- **VS Code**: With recommended extensions (ESLint, Prettier, Tailwind CSS IntelliSense)
- **Postman**: For API testing ([Download](https://www.postman.com/downloads/))
- **pgAdmin**: PostgreSQL administration tool ([Download](https://www.pgadmin.org/download/))

### Hardware Requirements
- **RAM**: Minimum 8GB (16GB recommended for smooth development)
- **Storage**: At least 2GB free space for dependencies and database
- **CPU**: Modern multi-core processor for optimal build performance

## 🎯 Quick Start Guide

### 1. Repository Setup

```bash
# Clone the repository
git clone https://github.com/your-username/Drone-Club-Website.git
cd Drone-Club-Website

# Check Node.js version
node --version  # Should be 18.0.0+
npm --version   # Should be 8.0.0+
```

### 2. Frontend Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Install additional development tools (optional)
npm install -D @types/node  # For better IDE support
```

**Expected Dependencies:**
- React 18.2.0 with React DOM
- Vite 4.4.5 for build tooling
- Tailwind CSS 3.3.3 with plugins
- React Router DOM 6.15.0
- Axios for HTTP requests
- React Hot Toast for notifications
- Framer Motion for animations
- Lucide React for icons

### 3. Backend Installation

```bash
# Navigate to backend directory
cd ../backend

# Install dependencies
npm install

# Install global tools (optional)
npm install -g nodemon  # For automatic server restarts
npm install -g sequelize-cli  # For database operations
```

**Expected Dependencies:**
- Express 4.18.2 web framework
- Sequelize 6.32.1 ORM with PostgreSQL driver
- JWT for authentication
- Joi for validation
- Multer for file uploads
- Security middleware (Helmet, CORS, Rate limiting)

### 4. Database Configuration

#### PostgreSQL Installation & Setup

**Windows:**
1. Download PostgreSQL installer from official website
2. Run installer with default settings
3. Remember the superuser password you set
4. Add PostgreSQL bin directory to system PATH

**macOS (using Homebrew):**
```bash
brew install postgresql
brew services start postgresql
createdb drone_club_db
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo -u postgres createdb drone_club_db
```

#### Database Creation
```sql
-- Connect to PostgreSQL as superuser
psql -U postgres

-- Create database
CREATE DATABASE drone_club_db;

-- Create user (optional, for security)
CREATE USER drone_club_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE drone_club_db TO drone_club_user;

-- Exit PostgreSQL
\q
```

### 5. Environment Configuration

#### Backend Environment Setup

```bash
# In backend directory
cp .env.example .env
```

**Configure `.env` file:**
```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=drone_club_db
DB_USER=postgres  # or drone_club_user if created
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_key_min_32_characters
JWT_EXPIRE=7d

# File Upload Configuration
MAX_FILE_SIZE=5242880  # 5MB in bytes
UPLOAD_PATH=./uploads

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Security Configuration (optional)
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX=100  # requests per window
```

#### Frontend Environment Setup (Optional)

```bash
# In frontend directory
touch .env.local
```

**Configure `.env.local` file:**
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Drone Club
VITE_APP_VERSION=1.0.0
```

### 6. Database Seeding

```bash
# In backend directory
npm run seed
```

**What gets created:**
- **Admin User**: 
  - Email: `admin@droneclub.com`
  - Password: `password123`
  - Role: `super_admin`
- **Sample Projects**: 3 drone projects with different statuses
- **Sample Events**: 2 upcoming events with registration details
- **Sample Blogs**: 2 blog posts with rich content
- **Team Members**: 3 members with different roles
- **Departments**: 4 departments (Software, Hardware, Flight Ops, R&D)
- **Achievements**: 2 competition wins and awards

### 7. Development Server Startup

#### Option A: Concurrent Development (Recommended)

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
```
*Server starts on http://localhost:5000*

**Terminal 2 - Frontend Development:**
```bash
cd frontend
npm run dev
```
*Application starts on http://localhost:3000*

#### Option B: Single Terminal (Advanced)

Install concurrently for simultaneous startup:
```bash
# In root directory
npm install -g concurrently

# Create package.json in root
echo '{"scripts":{"dev":"concurrently \"cd backend && npm run dev\" \"cd frontend && npm run dev\""}}' > package.json

# Start both servers
npm run dev
```

### 8. Verification & Testing

#### Backend API Testing
```bash
# Test server health
curl http://localhost:5000/api/health

# Test public endpoints
curl http://localhost:5000/api/projects
curl http://localhost:5000/api/events
curl http://localhost:5000/api/blogs

# Test admin login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@droneclub.com","password":"password123"}'
```

#### Frontend Application Testing
1. **Navigate to http://localhost:3000**
2. **Test Navigation**: Click through all menu items
3. **Test Responsiveness**: Resize browser window
4. **Test Admin Login**: 
   - Go to `/admin/login`
   - Use credentials: `admin@droneclub.com` / `password123`
   - Verify dashboard access
5. **Test Dark Theme**: Ensure proper contrast and readability

### 9. Common Issues & Troubleshooting

#### Database Connection Issues
```bash
# Check PostgreSQL service status
# Windows
sc query postgresql-x64-13

# macOS
brew services list | grep postgresql

# Linux
sudo systemctl status postgresql

# Test database connection
psql -h localhost -p 5432 -U postgres -d drone_club_db
```

#### Port Conflicts
```bash
# Check what's running on ports 3000 and 5000
# Windows
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# macOS/Linux
lsof -i :3000
lsof -i :5000

# Kill processes if needed (use PID from above)
# Windows
taskkill /PID <PID> /F

# macOS/Linux
kill -9 <PID>
```

#### Node.js Version Issues
```bash
# Check and update Node.js
node --version
npm install -g npm@latest

# Using nvm (Node Version Manager)
nvm install 18
nvm use 18
```

#### Clear npm Cache
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📁 Detailed Project Structure

```
Drone-Club-Website/
├── 📁 frontend/                     # React + Vite Frontend Application
│   ├── 📁 public/                   # Static assets
│   │   ├── drone-icon.svg           # Favicon and logo
│   │   └── vite.svg                 # Vite logo
│   ├── 📁 src/                      # Source code
│   │   ├── 📁 components/           # Reusable React components
│   │   │   ├── 📁 ui/               # Generic UI primitives
│   │   │   │   ├── Button.jsx       # Customizable button component
│   │   │   │   ├── Card.jsx         # Container card component
│   │   │   │   ├── Modal.jsx        # Modal dialog component
│   │   │   │   ├── Badge.jsx        # Status badge component
│   │   │   │   └── Tag.jsx          # Removable tag component
│   │   │   ├── 📁 cards/            # Specialized card components
│   │   │   │   ├── ProjectCard.jsx  # Project display card
│   │   │   │   ├── EventCard.jsx    # Event information card
│   │   │   │   ├── BlogCard.jsx     # Blog post preview card
│   │   │   │   └── AchievementCard.jsx # Achievement showcase card
│   │   │   ├── 📁 layout/           # Layout components
│   │   │   │   ├── Navbar.jsx       # Navigation header
│   │   │   │   └── Footer.jsx       # Site footer
│   │   │   └── ProtectedRoute.jsx   # Route guard component
│   │   ├── 📁 pages/                # Page components (routes)
│   │   │   ├── Home.jsx             # Landing page with hero section
│   │   │   ├── Projects.jsx         # Projects showcase page
│   │   │   ├── Events.jsx           # Events listing page
│   │   │   ├── Blog.jsx             # Blog articles page
│   │   │   ├── Team.jsx             # Team members page
│   │   │   ├── Departments.jsx      # Department information page
│   │   │   ├── Achievements.jsx     # Achievements gallery page
│   │   │   ├── About.jsx            # About us page
│   │   │   ├── AdminLogin.jsx       # Admin authentication page
│   │   │   └── AdminDashboard.jsx   # Admin control panel
│   │   ├── 📁 hooks/                # Custom React hooks
│   │   │   ├── useProjects.js       # Projects data management
│   │   │   ├── useEvents.js         # Events data management (placeholder)
│   │   │   ├── useBlogs.js          # Blog posts data management
│   │   │   ├── useTeam.js           # Team members data management
│   │   │   ├── useDepartments.js    # Departments data management
│   │   │   └── useAchievements.js   # Achievements data management
│   │   ├── 📁 context/              # React context providers
│   │   │   └── AuthContext.jsx      # Authentication state management
│   │   ├── 📁 utils/                # Utility functions
│   │   │   ├── api.js               # Axios configuration
│   │   │   ├── constants.js         # Application constants
│   │   │   └── helpers.js           # Helper functions
│   │   ├── 📁 assets/               # Media assets
│   │   │   ├── images/              # Image files
│   │   │   └── icons/               # Icon files
│   │   ├── App.jsx                  # Main application component
│   │   ├── main.jsx                 # Application entry point
│   │   └── index.css                # Global styles and Tailwind imports
│   ├── .env.local                   # Environment variables (local)
│   ├── .env.example                 # Environment template
│   ├── .gitignore                   # Git ignore rules
│   ├── eslint.config.js             # ESLint configuration
│   ├── index.html                   # HTML template
│   ├── package.json                 # Dependencies and scripts
│   ├── postcss.config.js            # PostCSS configuration
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   └── vite.config.js               # Vite build configuration
├── 📁 backend/                      # Node.js + Express Backend API
│   ├── 📁 src/                      # Source code
│   │   ├── 📁 config/               # Configuration files
│   │   │   └── database.js          # Sequelize database configuration
│   │   ├── 📁 controllers/          # Request handlers
│   │   │   ├── authController.js    # Authentication logic
│   │   │   ├── projectController.js # Projects CRUD operations
│   │   │   ├── eventController.js   # Events management
│   │   │   ├── blogController.js    # Blog management
│   │   │   ├── teamController.js    # Team members management
│   │   │   ├── departmentController.js # Departments management
│   │   │   └── achievementController.js # Achievements management
│   │   ├── 📁 middleware/           # Express middleware
│   │   │   ├── auth.js              # JWT authentication middleware
│   │   │   ├── validation.js        # Input validation middleware
│   │   │   ├── upload.js            # File upload middleware
│   │   │   └── errorHandler.js      # Error handling middleware
│   │   ├── 📁 models/               # Sequelize models
│   │   │   ├── Admin.js             # Admin user model
│   │   │   ├── Project.js           # Project model
│   │   │   ├── Event.js             # Event model
│   │   │   ├── EventRegistration.js # Event registration model
│   │   │   ├── Blog.js              # Blog post model
│   │   │   ├── TeamMember.js        # Team member model
│   │   │   ├── Department.js        # Department model
│   │   │   ├── Achievement.js       # Achievement model
│   │   │   └── index.js             # Model associations and exports
│   │   ├── 📁 routes/               # API route definitions
│   │   │   ├── auth.js              # Authentication routes
│   │   │   ├── projects.js          # Projects API routes
│   │   │   ├── events.js            # Events API routes
│   │   │   ├── blogs.js             # Blog API routes
│   │   │   ├── team.js              # Team API routes
│   │   │   ├── departments.js       # Departments API routes
│   │   │   └── achievements.js      # Achievements API routes
│   │   └── 📁 utils/                # Utility functions
│   │       ├── logger.js            # Logging utilities
│   │       ├── validators.js        # Custom validation functions
│   │       └── helpers.js           # General helper functions
│   ├── 📁 uploads/                  # File upload directory
│   │   └── .gitkeep                 # Keep directory in git
│   ├── 📁 scripts/                  # Utility scripts
│   │   ├── seed.js                  # Database seeding script
│   │   ├── migrate.js               # Migration runner
│   │   └── backup.js                # Database backup script
│   ├── 📁 tests/                    # Test files
│   │   ├── 📁 unit/                 # Unit tests
│   │   ├── 📁 integration/          # Integration tests
│   │   └── setup.js                 # Test setup configuration
│   ├── .env                         # Environment variables (not in git)
│   ├── .env.example                 # Environment template
│   ├── .gitignore                   # Git ignore rules
│   ├── package.json                 # Dependencies and scripts
│   ├── server.js                    # Express server entry point
│   └── ecosystem.config.js          # PM2 process configuration
├── 📁 docs/                         # Documentation
│   ├── API.md                       # API documentation
│   ├── DEPLOYMENT.md                # Deployment guide
│   ├── CONTRIBUTING.md              # Contribution guidelines
│   └── CHANGELOG.md                 # Version history
├── 📁 .github/                      # GitHub specific files
│   ├── 📁 workflows/                # GitHub Actions
│   │   ├── ci.yml                   # Continuous integration
│   │   └── deploy.yml               # Deployment workflow
│   ├── ISSUE_TEMPLATE.md            # Issue template
│   └── PULL_REQUEST_TEMPLATE.md     # PR template
├── .gitignore                       # Root git ignore
├── README.md                        # Project documentation
├── LICENSE                          # Project license
└── docker-compose.yml               # Docker container orchestration
```

### 📋 File Descriptions

#### Frontend Key Files

| File | Purpose | Description |
|------|---------|-------------|
| `src/App.jsx` | Main App Component | Root component with routing and context providers |
| `src/main.jsx` | Entry Point | React application initialization and rendering |
| `src/index.css` | Global Styles | Tailwind imports and custom CSS classes |
| `tailwind.config.js` | Tailwind Config | Custom theme, colors, animations, and plugins |
| `vite.config.js` | Build Config | Vite configuration with proxy and path aliases |
| `package.json` | Dependencies | Project metadata, scripts, and dependency management |

#### Backend Key Files

| File | Purpose | Description |
|------|---------|-------------|
| `server.js` | Server Entry | Express server setup with middleware and routes |
| `src/config/database.js` | DB Config | Sequelize connection and configuration |
| `src/models/index.js` | Model Registry | Model associations and centralized exports |
| `scripts/seed.js` | Data Seeding | Sample data generation for development |
| `package.json` | Dependencies | Server dependencies and npm scripts |

#### Configuration Files

| File | Purpose | Technology |
|------|---------|------------|
| `.env` | Environment Variables | Sensitive configuration data |
| `tailwind.config.js` | Styling Framework | Tailwind CSS customization |
| `postcss.config.js` | CSS Processing | PostCSS plugins and configuration |
| `eslint.config.js` | Code Linting | JavaScript code quality rules |
| `vite.config.js` | Build Tool | Frontend build and development server |

## 🎨 Design System & UI Components

### 🎨 Color Palette

#### Primary Colors
```css
/* Primary Blue Gradient */
--primary-50: #f0f9ff    /* Very light blue */
--primary-100: #e0f2fe   /* Light blue */
--primary-200: #bae6fd   /* Lighter blue */
--primary-300: #7dd3fc   /* Light blue */
--primary-400: #38bdf8   /* Medium blue */
--primary-500: #0ea5e9   /* Primary blue */
--primary-600: #0284c7   /* Darker blue */
--primary-700: #0369a1   /* Dark blue */
--primary-800: #075985   /* Darker blue */
--primary-900: #0c4a6e   /* Very dark blue */
```

#### Dark Theme Colors
```css
/* Dark Background Shades */
--dark-50: #f8fafc      /* Almost white */
--dark-100: #f1f5f9     /* Very light gray */
--dark-200: #e2e8f0     /* Light gray */
--dark-300: #cbd5e1     /* Medium light gray */
--dark-400: #94a3b8     /* Medium gray */
--dark-500: #64748b     /* Gray */
--dark-600: #475569     /* Dark gray */
--dark-700: #334155     /* Darker gray */
--dark-800: #1e293b     /* Very dark gray */
--dark-900: #0f172a     /* Almost black */
```

#### Status Colors
```css
/* Success, Warning, Error States */
--success: #22c55e      /* Green */
--warning: #f59e0b      /* Amber */
--error: #ef4444        /* Red */
--info: #3b82f6         /* Blue */
```

### 🧩 Component Library

#### Button Component
```jsx
// Usage Examples
<Button variant="primary" size="lg">Primary Action</Button>
<Button variant="secondary" size="md">Secondary Action</Button>
<Button variant="outline" size="sm">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button loading={true}>Loading...</Button>
<Button disabled>Disabled Button</Button>
```

**Variants:**
- `primary` - Main action buttons (blue gradient)
- `secondary` - Secondary actions (dark gray)
- `outline` - Outlined buttons (transparent with border)
- `ghost` - Minimal buttons (transparent)
- `danger` - Destructive actions (red)

**Sizes:**
- `sm` - Small (px-3 py-1.5 text-sm)
- `md` - Medium (px-4 py-2 text-sm) - Default
- `lg` - Large (px-6 py-3 text-base)
- `xl` - Extra Large (px-8 py-4 text-lg)

#### Card Component
```jsx
// Usage Examples
<Card>Basic card content</Card>
<Card hover={false}>Card without hover effects</Card>
<Card padding="p-8">Card with custom padding</Card>
<Card className="border-primary-500">Custom styled card</Card>
```

#### Badge Component
```jsx
// Usage Examples
<Badge variant="default">Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge size="sm">Small Badge</Badge>
```

#### Modal Component
```jsx
// Usage Example
<Modal 
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)}
  title="Modal Title"
  size="md"
>
  <p>Modal content goes here</p>
</Modal>
```

### 🎭 Animation System

#### CSS Custom Classes
```css
/* Fade Animations */
.animate-fade-in         /* Fade in effect */
.animate-slide-up        /* Slide up from bottom */
.animate-slide-down      /* Slide down from top */
.animate-scale-in        /* Scale in from center */
.animate-float           /* Floating animation */

/* Transition Classes */
.transition-all          /* All properties transition */
.transition-colors       /* Color transitions only */
.transition-transform    /* Transform transitions only */
.duration-200           /* 200ms duration */
.duration-300           /* 300ms duration */
.duration-500           /* 500ms duration */

/* Hover Effects */
.hover:scale-105        /* Scale on hover */
.hover:translate-y-1    /* Move up on hover */
.hover:shadow-xl        /* Shadow on hover */
```

#### Framer Motion Variants
```jsx
// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
}

// Card hover variants
const cardVariants = {
  hover: { 
    y: -5, 
    transition: { duration: 0.2 } 
  }
}
```

### 📱 Responsive Design System

#### Breakpoints
```css
/* Tailwind CSS Breakpoints */
sm: 640px    /* Small screens and up */
md: 768px    /* Medium screens and up */
lg: 1024px   /* Large screens and up */
xl: 1280px   /* Extra large screens and up */
2xl: 1536px  /* 2X large screens and up */
```

#### Grid System
```jsx
// Responsive grid examples
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Auto-responsive grid */}
</div>

<div className="flex flex-col md:flex-row gap-4">
  {/* Responsive flex direction */}
</div>
```

#### Typography Scale
```css
/* Text Sizes */
.text-xs     /* 12px */
.text-sm     /* 14px */
.text-base   /* 16px */
.text-lg     /* 18px */
.text-xl     /* 20px */
.text-2xl    /* 24px */
.text-3xl    /* 30px */
.text-4xl    /* 36px */
.text-5xl    /* 48px */

/* Font Weights */
.font-light      /* 300 */
.font-normal     /* 400 */
.font-medium     /* 500 */
.font-semibold   /* 600 */
.font-bold       /* 700 */
```

### 🎯 Custom CSS Classes

#### Utility Classes
```css
/* Custom Button Styles */
.btn-primary {
  @apply bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-900;
}

.btn-secondary {
  @apply bg-dark-700 hover:bg-dark-600 text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-dark-500 focus:ring-offset-2 focus:ring-offset-dark-900;
}

/* Card Styles */
.card {
  @apply bg-dark-800 border border-dark-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300;
}

/* Form Elements */
.input-field {
  @apply bg-dark-800 border border-dark-600 text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200;
}

/* Navigation */
.navbar-link {
  @apply text-gray-300 hover:text-white transition-colors duration-200 font-medium;
}

/* Special Effects */
.hero-gradient {
  background: linear-gradient(135deg, #0c4a6e 0%, #075985 25%, #0369a1 50%, #0284c7 75%, #0ea5e9 100%);
}

.glass-effect {
  @apply backdrop-blur-md bg-dark-900/80 border border-dark-700/50;
}
```

### 🔤 Typography Guidelines

#### Headings Hierarchy
```jsx
// Page titles
<h1 className="text-4xl md:text-5xl font-bold text-white mb-6">

// Section titles  
<h2 className="text-3xl font-bold text-white mb-8">

// Subsection titles
<h3 className="text-xl font-semibold text-white mb-4">

// Card titles
<h4 className="text-lg font-semibold text-white mb-2">
```

#### Body Text Guidelines
```jsx
// Primary text
<p className="text-gray-100">

// Secondary text
<p className="text-gray-400">

// Caption text
<span className="text-sm text-gray-500">

// Link text
<a className="text-primary-400 hover:text-primary-300">
```

### 🎨 Icon System

#### Lucide React Icons
```jsx
import { 
  Home, User, Settings, Mail, Phone, 
  Github, Linkedin, Twitter, 
  Drone, Rocket, Target, Award,
  ChevronRight, ArrowRight, ExternalLink
} from 'lucide-react'

// Usage
<Home className="w-5 h-5 text-gray-400" />
<Drone className="w-8 h-8 text-primary-500" />
```

#### Icon Sizing Convention
```css
.w-3 h-3    /* 12px - Small icons */
.w-4 h-4    /* 16px - Regular icons */
.w-5 h-5    /* 20px - Medium icons */
.w-6 h-6    /* 24px - Large icons */
.w-8 h-8    /* 32px - Extra large icons */
```

## 🔐 Authentication

### Admin Login
- Route: `/admin/login`
- Demo: `admin@droneclub.com` / `password123`
- JWT tokens with 7-day expiration

### Protected Routes
- Admin Dashboard: `/admin/dashboard`
- All admin APIs require JWT authentication

## 📊 Database Schema

### Key Models
- **Admins**: Authentication and roles
- **Projects**: Title, description, technologies, status
- **Events**: Scheduling with registration system
- **Blogs**: Content management with tags
- **TeamMembers**: Profiles with social links
- **Departments**: Organizational structure
- **Achievements**: Awards and milestones

## 🚀 Deployment Guide

### 🌐 Frontend Deployment Options

#### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from frontend directory
cd frontend
vercel

# Follow prompts for configuration
# Set build command: npm run build
# Set output directory: dist
```

**Environment Variables in Vercel:**
```env
VITE_API_URL=https://your-backend-domain.com/api
VITE_APP_NAME=Drone Club
```

#### Option 2: Netlify
```bash
# Build the project
cd frontend
npm run build

# Deploy dist/ folder to Netlify
# Or connect GitHub repository for auto-deployment
```

**Netlify Configuration (`netlify.toml`):**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Option 3: Static Hosting (AWS S3, GitHub Pages)
```bash
# Build for production
npm run build

# Upload dist/ folder contents to your static hosting provider
```

### 🖥️ Backend Deployment Options

#### Option 1: Railway (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Deploy from backend directory
cd backend
railway create
railway up
```

**Railway Environment Variables:**
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your_production_jwt_secret
FRONTEND_URL=https://your-frontend-domain.com
MAX_FILE_SIZE=5242880
```

#### Option 2: Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create your-app-name

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set FRONTEND_URL=https://your-frontend.com

# Deploy
git push heroku main
```

**Heroku Procfile:**
```procfile
web: npm start
release: npm run seed
```

#### Option 3: DigitalOcean App Platform
```yaml
# .do/app.yaml
name: drone-club-backend
services:
- name: api
  source_dir: backend
  github:
    repo: your-username/drone-club-website
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: production
  - key: JWT_SECRET
    value: your_jwt_secret
databases:
- engine: PG
  name: drone-club-db
  num_nodes: 1
  size: db-s-dev-database
  version: "13"
```

### 🗄️ Database Deployment

#### PostgreSQL Options

**1. Heroku Postgres (Free Tier Available)**
```bash
# Add to existing Heroku app
heroku addons:create heroku-postgresql:hobby-dev

# Get database URL
heroku config:get DATABASE_URL
```

**2. Railway PostgreSQL**
```bash
# Add PostgreSQL service in Railway dashboard
# Automatically provides DATABASE_URL
```

**3. AWS RDS**
```bash
# Create RDS PostgreSQL instance
# Configure security groups
# Use connection string in environment variables
```

**4. DigitalOcean Managed Database**
```bash
# Create managed PostgreSQL cluster
# Configure firewall rules
# Use provided connection details
```

### 🔧 Production Configuration

#### Backend Production Setup

**Production Environment Variables:**
```env
# Server Configuration
NODE_ENV=production
PORT=5000

# Database (use provider's DATABASE_URL)
DATABASE_URL=postgresql://user:password@host:port/database

# Security
JWT_SECRET=complex_production_secret_minimum_32_characters
JWT_EXPIRE=7d

# CORS
FRONTEND_URL=https://your-production-domain.com

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

**Production Optimizations:**
```javascript
// Add to server.js for production
if (process.env.NODE_ENV === 'production') {
  // Trust proxy for accurate IP addresses
  app.set('trust proxy', 1)
  
  // Stricter security headers
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  }))
  
  // Production CORS settings
  app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200
  }))
}
```

#### Frontend Production Optimizations

**Vite Production Config:**
```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['framer-motion', 'lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
```

### 🔄 CI/CD Pipeline

#### GitHub Actions Workflow

**.github/workflows/deploy.yml:**
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies (Frontend)
      run: |
        cd frontend
        npm ci
        
    - name: Install dependencies (Backend)
      run: |
        cd backend
        npm ci
        
    - name: Run tests
      run: |
        cd backend
        npm test
        
    - name: Build frontend
      run: |
        cd frontend
        npm run build

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        working-directory: ./frontend

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to Railway
      uses: railway-deploy@v1
      with:
        railway-token: ${{ secrets.RAILWAY_TOKEN }}
        service: backend
```

### 🌍 Domain Configuration

#### Custom Domain Setup

**1. Frontend (Vercel):**
```bash
# Add domain in Vercel dashboard
# Configure DNS records:
# Type: CNAME, Name: www, Value: vercel-dns.com
# Type: A, Name: @, Value: 76.76.19.61
```

**2. Backend (Railway):**
```bash
# Add custom domain in Railway dashboard
# Configure DNS:
# Type: CNAME, Name: api, Value: your-app.railway.app
```

**3. SSL Certificates:**
- Most platforms (Vercel, Railway, Heroku) provide automatic SSL
- For custom hosting, use Let's Encrypt or Cloudflare

### 📊 Production Monitoring

#### Error Tracking
```bash
# Add Sentry for error monitoring
npm install @sentry/node @sentry/react

# Backend integration
import * as Sentry from "@sentry/node"
Sentry.init({ dsn: process.env.SENTRY_DSN })

# Frontend integration
import * as Sentry from "@sentry/react"
Sentry.init({ dsn: process.env.VITE_SENTRY_DSN })
```

#### Performance Monitoring
```bash
# Add analytics and monitoring
npm install @vercel/analytics

# Usage in React
import { Analytics } from '@vercel/analytics/react'
function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  )
}
```

### 🔒 Security Checklist

#### Pre-deployment Security
- [ ] Environment variables properly configured
- [ ] Database credentials secured
- [ ] JWT secret is complex and unique
- [ ] CORS configured for production domains only
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] SQL injection protection verified
- [ ] File upload restrictions in place
- [ ] HTTPS enforced
- [ ] Security headers configured

#### Post-deployment Verification
- [ ] All API endpoints responding correctly
- [ ] Authentication flow working
- [ ] File uploads functioning
- [ ] Database connections stable
- [ ] Error logging operational
- [ ] Performance metrics collecting
- [ ] Backup strategy implemented

## 🧪 Testing Guide

### 🔧 Testing Setup

#### Frontend Testing
```bash
# Install testing dependencies
cd frontend
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest jsdom

# Create test configuration
echo 'import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.js"],
  },
})' > vitest.config.js
```

#### Backend Testing
```bash
# Install testing dependencies
cd backend
npm install -D jest supertest

# Create test configuration
echo '{
  "testEnvironment": "node",
  "setupFilesAfterEnv": ["<rootDir>/tests/setup.js"],
  "testMatch": ["**/tests/**/*.test.js"]
}' > jest.config.json
```

### 🧪 Test Examples

#### Frontend Component Tests
```javascript
// src/components/__tests__/Button.test.jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '../ui/Button'

describe('Button Component', () => {
  test('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  test('handles click events', async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await userEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('shows loading state', () => {
    render(<Button loading>Submit</Button>)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
```

#### Backend API Tests
```javascript
// tests/auth.test.js
const request = require('supertest')
const app = require('../server')

describe('Authentication Endpoints', () => {
  test('POST /api/auth/login with valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@droneclub.com',
        password: 'password123'
      })

    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.token).toBeDefined()
  })

  test('POST /api/auth/login with invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@droneclub.com',
        password: 'wrongpassword'
      })

    expect(response.status).toBe(401)
    expect(response.body.success).toBe(false)
  })
})
```

### 🚀 Running Tests

#### Frontend Tests
```bash
cd frontend
npm run test          # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

#### Backend Tests
```bash
cd backend
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

## 🔍 Debugging & Troubleshooting

### 🐛 Common Issues

#### 1. Database Connection Errors
```bash
# Check PostgreSQL service
# Windows
sc query postgresql-x64-13

# macOS
brew services list | grep postgresql

# Linux
sudo systemctl status postgresql

# Test connection manually
psql -h localhost -p 5432 -U postgres -d drone_club_db
```

**Solutions:**
- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure database exists: `CREATE DATABASE drone_club_db;`
- Check firewall settings

#### 2. JWT Authentication Issues
```javascript
// Debug JWT in browser console
localStorage.getItem('authToken')

// Decode JWT (development only)
function parseJwt(token) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
  return JSON.parse(jsonPayload)
}
```

**Solutions:**
- Check JWT_SECRET in backend `.env`
- Verify token expiration
- Clear localStorage and re-login
- Check Authorization header format

#### 3. CORS Issues
```javascript
// Backend CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
```

**Solutions:**
- Verify FRONTEND_URL in backend `.env`
- Check browser network tab for CORS errors
- Ensure credentials: true in axios requests

#### 4. Build Errors
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version  # Should be 18+
```

### 🔧 Debugging Tools

#### Frontend Debugging
```bash
# React Developer Tools (Browser Extension)
# Redux DevTools (if using Redux)
# Vite dev server with source maps enabled
```

#### Backend Debugging
```bash
# Enable debug logging
DEBUG=express:* npm run dev

# Use nodemon for auto-restart
npm install -g nodemon
nodemon server.js

# Database query logging
# Set logging: console.log in database.js
```

#### VS Code Debugging Configuration
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Backend",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/backend/server.js",
      "env": {
        "NODE_ENV": "development"
      },
      "console": "integratedTerminal"
    }
  ]
}
```

## 📈 Performance Optimization

### ⚡ Frontend Optimizations

#### Code Splitting
```javascript
// Lazy load pages
import { lazy, Suspense } from 'react'

const Projects = lazy(() => import('./pages/Projects'))
const Events = lazy(() => import('./pages/Events'))

// Use with Suspense
<Suspense fallback={<div>Loading...</div>}>
  <Projects />
</Suspense>
```

#### Image Optimization
```javascript
// Use WebP format with fallbacks
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Description" loading="lazy" />
</picture>

// Implement lazy loading
const LazyImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onLoad={() => setIsLoaded(true)}
      style={{ opacity: isLoaded ? 1 : 0 }}
    />
  )
}
```

#### Bundle Analysis
```bash
# Analyze bundle size
cd frontend
npm run build
npx vite-bundle-analyzer dist
```

### 🚀 Backend Optimizations

#### Database Indexing
```sql
-- Add indexes for frequently queried fields
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_blogs_created_at ON blogs(created_at);
CREATE INDEX idx_team_members_department ON team_members(department);
```

#### Caching Strategy
```javascript
// Redis caching (optional)
const redis = require('redis')
const client = redis.createClient()

// Cache frequently accessed data
const cacheMiddleware = (duration) => {
  return async (req, res, next) => {
    const key = req.originalUrl
    const cached = await client.get(key)
    
    if (cached) {
      return res.json(JSON.parse(cached))
    }
    
    res.sendResponse = res.json
    res.json = (body) => {
      client.setex(key, duration, JSON.stringify(body))
      res.sendResponse(body)
    }
    
    next()
  }
}
```

#### Database Connection Pooling
```javascript
// Optimize Sequelize connection pool
const sequelize = new Sequelize(databaseUrl, {
  pool: {
    max: 10,        // Maximum connections
    min: 0,         // Minimum connections
    acquire: 30000, // Maximum time to get connection
    idle: 10000,    // Maximum time connection can be idle
  },
  logging: false    // Disable logging in production
})
```

## 🔒 Security Best Practices

### 🛡️ Implementation Checklist

#### Authentication & Authorization
- [x] JWT tokens with proper expiration
- [x] Password hashing with bcrypt
- [x] Protected route middleware
- [x] Role-based access control
- [ ] Two-factor authentication (future)
- [ ] Password reset functionality (future)

#### Input Validation & Sanitization
- [x] Joi schema validation
- [x] SQL injection prevention (Sequelize ORM)
- [x] XSS protection (React default escaping)
- [x] File upload restrictions
- [ ] Rate limiting per user (future)
- [ ] Input length limits (future)

#### Security Headers & CORS
- [x] Helmet.js security headers
- [x] CORS configuration
- [x] HTTPS enforcement (production)
- [ ] Content Security Policy (future)
- [ ] HSTS headers (future)

### 🔐 Security Configuration

#### Production Security Headers
```javascript
// Enhanced helmet configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
      fontSrc: ["'self'", "fonts.gstatic.com"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", process.env.FRONTEND_URL],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}))
```

#### Environment Security
```bash
# Use strong JWT secrets (32+ characters)
JWT_SECRET=$(openssl rand -base64 32)

# Database connection with SSL
DATABASE_URL=postgresql://user:password@host:5432/db?sslmode=require

# Restrict file uploads
MAX_FILE_SIZE=5242880  # 5MB
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp
```

## 📚 API Documentation

### 🔗 Base URLs
- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-api-domain.com/api`

### 🔐 Authentication
All admin endpoints require JWT token in Authorization header:
```
Authorization: Bearer <jwt_token>
```

### 📋 API Endpoints Reference

#### Authentication Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/login` | Admin login | No |
| GET | `/auth/me` | Get current admin | Yes |
| POST | `/auth/logout` | Logout admin | Yes |

#### Projects Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/projects` | List all projects | No |
| GET | `/projects/:id` | Get single project | No |
| POST | `/projects` | Create project | Yes |
| PUT | `/projects/:id` | Update project | Yes |
| DELETE | `/projects/:id` | Delete project | Yes |

#### Events Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/events` | List all events | No |
| GET | `/events/:id` | Get single event | No |
| POST | `/events` | Create event | Yes |
| PUT | `/events/:id` | Update event | Yes |
| DELETE | `/events/:id` | Delete event | Yes |
| POST | `/events/:id/register` | Register for event | No |

#### Blog Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/blogs` | List all blog posts | No |
| GET | `/blogs/:id` | Get single blog post | No |
| POST | `/blogs` | Create blog post | Yes |
| PUT | `/blogs/:id` | Update blog post | Yes |
| DELETE | `/blogs/:id` | Delete blog post | Yes |

### 📝 Request/Response Examples

#### Login Request
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@droneclub.com",
  "password": "password123"
}
```

#### Login Response
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "admin@droneclub.com",
    "role": "super_admin"
  }
}
```

#### Create Project Request
```bash
POST /api/projects
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Autonomous Navigation Drone",
  "description": "A drone capable of autonomous navigation using computer vision and AI.",
  "technologies": ["Python", "OpenCV", "TensorFlow", "ROS"],
  "status": "in-progress",
  "github_url": "https://github.com/droneclub/autonomous-drone"
}
```

#### Error Response Format
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Title is required",
    "Description must be at least 10 characters"
  ]
}
```

## 🎯 Features Implemented

✅ Dark-themed responsive UI  
✅ Hero section with animations  
✅ Project showcase with cards  
✅ JWT authentication system  
✅ PostgreSQL database with Sequelize  
✅ RESTful API with validation  
✅ File upload capability  
✅ Admin dashboard foundation  
✅ Navigation with React Router  
✅ Toast notifications  
✅ Mobile-responsive design  

## 🔮 Future Enhancements

### 🎯 Short-term Goals (Next 3 months)
- [ ] **Advanced Admin Dashboard**
  - Rich text editor for blog posts
  - Drag-and-drop file upload
  - Bulk operations for content management
  - Analytics dashboard with charts
  
- [ ] **User Authentication System**
  - Member registration and login
  - User profiles and preferences
  - Event registration system
  - Comment system for blogs

- [ ] **Enhanced Features**
  - Search functionality across all content
  - Advanced filtering and sorting
  - Email notifications for events
  - Social media integration

### 🚀 Long-term Vision (6-12 months)
- [ ] **Mobile Application**
  - React Native mobile app
  - Push notifications
  - Offline mode support
  - QR code integration

- [ ] **Advanced Functionality**
  - Real-time chat system
  - Video streaming for events
  - Project collaboration tools
  - Integration with drone simulators

- [ ] **Community Features**
  - Member forums and discussions
  - Project collaboration workspace
  - Mentorship program matching
  - Achievement gamification system

### 🔧 Technical Improvements
- [ ] **Performance & Scalability**
  - Redis caching implementation
  - CDN integration for media files
  - Database optimization and indexing
  - Microservices architecture migration

- [ ] **Developer Experience**
  - Automated testing pipeline
  - Code quality tools (ESLint, Prettier)
  - API documentation with Swagger
  - Storybook for component documentation

## 🤝 Contributing

### 🔄 Development Workflow

#### 1. Fork & Clone
```bash
# Fork the repository on GitHub
git clone https://github.com/YOUR_USERNAME/Drone-Club-Website.git
cd Drone-Club-Website
```

#### 2. Set Up Development Environment
```bash
# Install dependencies
npm run install:all

# Set up environment variables
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env

# Set up database
cd backend
npm run db:setup
npm run db:seed
```

#### 3. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
```

#### 4. Development Guidelines
- Follow existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

#### 5. Submit Pull Request
```bash
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name
```

### 📋 Code Style Guidelines

#### Frontend (React)
```javascript
// Use functional components with hooks
const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue)
  
  useEffect(() => {
    // Effect logic here
  }, [dependencies])
  
  return (
    <div className="container mx-auto">
      {/* Component JSX */}
    </div>
  )
}
```

#### Backend (Node.js)
```javascript
// Use async/await for asynchronous operations
const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [{ model: User, as: 'author' }]
    })
    
    res.json({
      success: true,
      data: projects
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    })
  }
}
```

### 🐛 Bug Reports & Feature Requests

When reporting bugs, please include:
1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Numbered list of steps
3. **Expected vs Actual Behavior**: What should vs. what does happen
4. **Environment**: Browser, OS, Node.js version
5. **Screenshots**: If applicable
6. **Console Errors**: Any error messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary
- ✅ Commercial use
- ✅ Modification  
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty

## 👥 Team & Acknowledgments

### 🏆 Core Development Team
- **Project Lead** - Full-stack development and architecture
- **Frontend Developer** - React components and UI/UX
- **Backend Developer** - API development and database design
- **DevOps Engineer** - Deployment and infrastructure

### 🙏 Special Thanks
- **Drone Club Members** - For feedback and testing
- **Open Source Community** - For the amazing tools and libraries
- **Contributors** - Everyone who has contributed to this project

## 📞 Support & Contact

### 🆘 Getting Help
1. **Documentation**: Check this README and inline code comments
2. **GitHub Issues**: Search existing issues or create a new one
3. **Discussions**: Use GitHub Discussions for questions
4. **Email**: contact@droneclub.com (replace with actual email)

### 🔗 Useful Links
- **Live Demo**: [https://droneclub-demo.vercel.app](https://droneclub-demo.vercel.app)
- **API Docs**: [https://api-docs.droneclub.com](https://api-docs.droneclub.com)
- **Design System**: [https://storybook.droneclub.com](https://storybook.droneclub.com)

---

<div align="center">

**Built with ❤️ by the Drone Club Development Team**

[⭐ Star this repo](https://github.com/droneclub/website) | [🐛 Report Bug](https://github.com/droneclub/website/issues) | [💡 Request Feature](https://github.com/droneclub/website/issues)

</div>

---

### 📊 Project Statistics

```
Frontend: 40+ files, 3,000+ lines of code
Backend: 20+ files, 2,000+ lines of code
Database: 8 models, 15+ relationships
UI Components: 15+ reusable components
Test Coverage: Target 80%+ (in development)
```

### 🔄 Changelog

#### Version 1.0.0 (Current)
- ✅ Initial project setup and structure
- ✅ Complete frontend React application
- ✅ Backend API with authentication
- ✅ Database models and relationships
- ✅ Admin dashboard (basic)
- ✅ Responsive design implementation
- ✅ Dark theme with custom styling

#### Version 1.1.0 (Planned)
- 📋 Enhanced admin dashboard
- 📋 User authentication system
- 📋 Advanced search and filtering
- 📋 Email notification system
- 📋 Performance optimizations

### 🆘 Demo Access

**Admin Dashboard**: Access the admin panel with these credentials:
- **Email**: `admin@droneclub.com`
- **Password**: `password123`

**Database**: Sample data is automatically seeded including:
- 3 sample projects with different statuses
- 2 upcoming events
- 1 sample blog post
- Team members across different departments
- Department information
- Achievement records

---

*Last updated: December 2024*