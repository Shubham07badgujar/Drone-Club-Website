# 🔧 Environment Variables Guide

This document provides a comprehensive guide to all environment variables used in the Drone Club Website project.

## 📁 Environment Files Location

```
Drone-Club-Website/
├── backend/
│   ├── .env                 # Backend environment variables (not in git)
│   ├── .env.example         # Backend environment template
│   └── .env.production.example # Production environment template
└── frontend/
    ├── .env.local           # Frontend environment variables (not in git)
    └── .env.example         # Frontend environment template
```

## 🖥️ Backend Environment Variables

### **Required Variables**

#### MongoDB Configuration
```env
# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# Database name
DB_NAME=team-third-axis-db
```

**Example MongoDB URI formats:**
```env
# MongoDB Atlas (recommended for production)
MONGODB_URI=mongodb+srv://teamthirdaxis:TeamThirdAxis2024@team-third-axis-cluster.diuqf0u.mongodb.net/team-third-axis-db?retryWrites=true&w=majority

# Local MongoDB (development only)
MONGODB_URI=mongodb://localhost:27017/team-third-axis-db

# MongoDB with authentication
MONGODB_URI=mongodb://username:password@localhost:27017/team-third-axis-db
```

#### Server Configuration
```env
# Server port (default: 5000)
PORT=5000

# Environment mode
NODE_ENV=development  # or 'production'

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000
```

#### JWT Configuration
```env
# JWT secret key (MUST be changed in production)
JWT_SECRET=your-super-secure-jwt-secret-key-minimum-32-characters

# JWT token expiration (default: 7d)
JWT_EXPIRE=7d
```

**Strong JWT Secret Generation:**
```bash
# Generate a secure 256-bit secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use OpenSSL
openssl rand -base64 32
```

### **Optional Variables**

#### Admin Configuration
```env
# Default admin credentials (for seeding)
ADMIN_EMAIL=admin@droneclub.com
ADMIN_PASSWORD=AdminPassword123!
```

#### Security Configuration
```env
# Rate limiting configuration
RATE_LIMIT_WINDOW_MS=900000        # 15 minutes in milliseconds
RATE_LIMIT_MAX_REQUESTS=1000       # Maximum requests per window

# Session secret (if using sessions)
SESSION_SECRET=drone-club-session-secret-2024-change-in-production
```

#### File Upload Configuration
```env
# Maximum file upload size (5MB in bytes)
MAX_FILE_SIZE=5242880

# Upload directory path
UPLOAD_PATH=./uploads

# Allowed file types
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,application/pdf
```

### **Development vs Production**

#### Development `.env`
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://teamthirdaxis:TeamThirdAxis2024@team-third-axis-cluster.diuqf0u.mongodb.net/team-third-axis-db?retryWrites=true&w=majority
DB_NAME=team-third-axis-db
FRONTEND_URL=http://localhost:3000
JWT_SECRET=team-third-axis-drone-club-jwt-secret-2024-super-secure-key-change-in-production
JWT_EXPIRE=7d
ADMIN_EMAIL=admin@droneclub.com
ADMIN_PASSWORD=AdminPassword123!
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=1000
SESSION_SECRET=drone-club-session-secret-2024-change-in-production
```

#### Production `.env`
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://prod_user:COMPLEX_PASSWORD@production-cluster.mongodb.net/prod_database?retryWrites=true&w=majority
DB_NAME=drone_club_production
FRONTEND_URL=https://droneclub.yourdomain.com
JWT_SECRET=GENERATED_SECURE_256_BIT_SECRET_KEY_FOR_PRODUCTION
JWT_EXPIRE=24h
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🎨 Frontend Environment Variables

### **Development Variables**

#### Vite Configuration
```env
# API base URL
VITE_API_URL=http://localhost:5000/api

# Application metadata
VITE_APP_NAME=Drone Club Website
VITE_APP_VERSION=1.0.0

# Environment
VITE_NODE_ENV=development
```

#### Optional Configuration
```env
# Google Analytics ID (if using analytics)
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Sentry DSN (if using error tracking)
VITE_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx

# Feature flags
VITE_ENABLE_BETA_FEATURES=false
VITE_ENABLE_DEBUG_MODE=true
```

### **Production Variables**

```env
# Production API URL
VITE_API_URL=https://api.droneclub.yourdomain.com/api

# Application metadata
VITE_APP_NAME=Drone Club Website
VITE_APP_VERSION=1.0.0

# Environment
VITE_NODE_ENV=production

# Analytics and monitoring
VITE_GOOGLE_ANALYTICS_ID=G-REAL_ANALYTICS_ID
VITE_SENTRY_DSN=https://real@sentry.ingest.sentry.io/project

# Feature flags
VITE_ENABLE_BETA_FEATURES=false
VITE_ENABLE_DEBUG_MODE=false
```

## 🔧 Environment Setup Scripts

### **Backend Environment Setup**

**Create `.env` from template:**
```bash
#!/bin/bash
# setup-backend-env.sh

if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file from template"
    echo "⚠️  Please update the following variables:"
    echo "   - MONGODB_URI (your MongoDB Atlas connection string)"
    echo "   - JWT_SECRET (generate a secure secret)"
    echo "   - ADMIN_PASSWORD (set a secure admin password)"
else
    echo "⚠️  .env file already exists"
fi
```

**Validate environment variables:**
```javascript
// scripts/validate-env.js
import dotenv from 'dotenv'

dotenv.config()

const requiredVars = [
    'MONGODB_URI',
    'JWT_SECRET',
    'FRONTEND_URL'
]

const optionalVars = [
    'PORT',
    'NODE_ENV',
    'DB_NAME',
    'JWT_EXPIRE',
    'ADMIN_EMAIL',
    'ADMIN_PASSWORD'
]

console.log('🔍 Validating environment variables...\n')

// Check required variables
const missingRequired = requiredVars.filter(varName => !process.env[varName])

if (missingRequired.length > 0) {
    console.error('❌ Missing required environment variables:')
    missingRequired.forEach(varName => {
        console.error(`   - ${varName}`)
    })
    process.exit(1)
}

// Check optional variables
const missingOptional = optionalVars.filter(varName => !process.env[varName])

if (missingOptional.length > 0) {
    console.warn('⚠️  Missing optional environment variables (using defaults):')
    missingOptional.forEach(varName => {
        console.warn(`   - ${varName}`)
    })
}

// Validate MongoDB URI format
if (process.env.MONGODB_URI && !process.env.MONGODB_URI.startsWith('mongodb')) {
    console.error('❌ Invalid MONGODB_URI format')
    process.exit(1)
}

// Validate JWT secret strength
if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    console.error('❌ JWT_SECRET should be at least 32 characters long')
    process.exit(1)
}

console.log('✅ All environment variables are valid!\n')

// Display configuration summary
console.log('📋 Configuration Summary:')
console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`)
console.log(`   Port: ${process.env.PORT || 5000}`)
console.log(`   Database: ${process.env.DB_NAME || 'team-third-axis-db'}`)
console.log(`   Frontend URL: ${process.env.FRONTEND_URL}`)
console.log(`   JWT Expiration: ${process.env.JWT_EXPIRE || '7d'}`)
```

### **Frontend Environment Setup**

**Create `.env.local` for development:**
```bash
#!/bin/bash
# frontend/setup-env.sh

cat > .env.local << EOF
# Development environment variables
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Drone Club Website
VITE_APP_VERSION=1.0.0
VITE_NODE_ENV=development
VITE_ENABLE_DEBUG_MODE=true
VITE_ENABLE_BETA_FEATURES=false
EOF

echo "✅ Created .env.local for development"
```

## 🔒 Security Best Practices

### **1. Secret Management**

**Never commit secrets to git:**
```gitignore
# .gitignore
.env
.env.local
.env.production
.env.staging
*.key
*.pem
```

**Use different secrets for each environment:**
```bash
# Development
JWT_SECRET=dev_secret_32_characters_minimum

# Staging  
JWT_SECRET=staging_secret_different_from_dev

# Production
JWT_SECRET=production_secret_ultra_secure_256bit
```

### **2. MongoDB Security**

**Secure connection string:**
```env
# ✅ Good - Uses Atlas with strong password
MONGODB_URI=mongodb+srv://secure_user:Compl3x_P@ssw0rd_123@cluster.mongodb.net/db

# ❌ Bad - Weak password
MONGODB_URI=mongodb+srv://admin:password@cluster.mongodb.net/db

# ❌ Bad - Exposed in logs
MONGODB_URI=mongodb://localhost:27017/db
```

**IP Whitelisting:**
- Configure MongoDB Atlas to only allow connections from your server IPs
- Use `0.0.0.0/0` only for development/testing

### **3. JWT Security**

**Strong secret generation:**
```javascript
// Generate a cryptographically secure secret
const crypto = require('crypto')
const secret = crypto.randomBytes(64).toString('hex')
console.log('JWT_SECRET=' + secret)
```

**Appropriate expiration times:**
```env
# Development - longer for convenience
JWT_EXPIRE=7d

# Production - shorter for security
JWT_EXPIRE=1h
```

### **4. Rate Limiting**

**Production settings:**
```env
# More restrictive for production
RATE_LIMIT_WINDOW_MS=900000    # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100    # Lower limit

# Development settings
RATE_LIMIT_WINDOW_MS=900000    # 15 minutes
RATE_LIMIT_MAX_REQUESTS=1000   # Higher limit for testing
```

## 🧪 Testing Environment Variables

### **Test Configuration**

**`.env.test`:**
```env
NODE_ENV=test
MONGODB_URI=mongodb://localhost:27017/drone_club_test
JWT_SECRET=test_jwt_secret_for_testing_only
FRONTEND_URL=http://localhost:3000
PORT=5001
```

**Test environment setup:**
```javascript
// tests/setup.js
import dotenv from 'dotenv'

// Load test environment variables
dotenv.config({ path: '.env.test' })

// Override any production settings for testing
process.env.JWT_EXPIRE = '1h'
process.env.RATE_LIMIT_MAX_REQUESTS = '10000'
```

## 🚀 Deployment Environments

### **Staging Environment**

```env
NODE_ENV=staging
MONGODB_URI=mongodb+srv://staging_user:password@staging-cluster.mongodb.net/staging_db
JWT_SECRET=staging_jwt_secret_different_from_production
FRONTEND_URL=https://staging.droneclub.com
PORT=5000
```

### **Production Environment**

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://prod_user:ultra_secure_password@production-cluster.mongodb.net/production_db
JWT_SECRET=production_256_bit_secret_generated_securely
FRONTEND_URL=https://droneclub.com
PORT=5000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🔧 Environment Variable Loading

### **Backend Loading Order**

1. **System Environment Variables** (highest priority)
2. **`.env` file in backend directory**
3. **Default values in code** (lowest priority)

```javascript
// server.js
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Use with fallbacks
const PORT = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV || 'development'
```

### **Frontend Loading Order (Vite)**

1. **`.env.local`** (highest priority, not committed)
2. **`.env.[NODE_ENV].local`**
3. **`.env.[NODE_ENV]`**
4. **`.env`** (lowest priority)

**Important**: Only variables prefixed with `VITE_` are exposed to the frontend!

## 🛠️ Troubleshooting

### **Common Issues**

#### 1. Environment variables not loading
```bash
# Check if .env file exists
ls -la .env

# Verify file format (no spaces around =)
cat .env | grep "="

# Check for hidden characters
hexdump -C .env | head
```

#### 2. MongoDB connection issues
```bash
# Test connection string format
node -e "console.log(new URL(process.env.MONGODB_URI))"

# Verify Atlas IP whitelist
nslookup cluster.mongodb.net
```

#### 3. JWT issues
```bash
# Check secret length
node -e "console.log('JWT_SECRET length:', process.env.JWT_SECRET?.length)"

# Verify secret is loaded
node -e "console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET)"
```

### **Debug Commands**

```bash
# Show all environment variables
npm run env:check

# Validate environment setup
npm run env:validate

# Test database connection
npm run test:db

# Check server configuration
npm run config:show
```

## 📋 Environment Checklist

### **Before Development**
- [ ] `.env` file created from template
- [ ] MongoDB URI configured and tested
- [ ] JWT secret generated (32+ characters)
- [ ] Admin credentials set
- [ ] Frontend URL configured

### **Before Production Deployment**
- [ ] All secrets regenerated for production
- [ ] MongoDB Atlas IP whitelist configured
- [ ] Rate limiting enabled with appropriate limits
- [ ] JWT expiration set to secure duration
- [ ] Environment variables validated
- [ ] No development secrets in production

This comprehensive environment guide ensures secure and proper configuration across all deployment environments.
