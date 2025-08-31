#!/bin/bash

# 🔧 Render Deployment Setup Script
# This script helps generate secure secrets and prepare for Render deployment

echo "🚀 Team Third Axis Drone Club - Render Deployment Setup"
echo "========================================================"
echo

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed."
    echo "   Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo

# Generate secure secrets
echo "🔐 Generating secure secrets for production..."
echo

# Generate JWT Secret
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
echo "JWT_SECRET: $JWT_SECRET"

# Generate Session Secret  
SESSION_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
echo "SESSION_SECRET: $SESSION_SECRET"

echo
echo "📋 Environment Variables for Render Backend Service:"
echo "=================================================="
echo
echo "NODE_ENV=production"
echo "PORT=5000"
echo "MONGODB_URI=mongodb+srv://teamthirdaxis:TeamThirdAxis2024@team-third-axis-cluster.diuqf0u.mongodb.net/team-third-axis-db?retryWrites=true&w=majority"
echo "JWT_SECRET=$JWT_SECRET"
echo "SESSION_SECRET=$SESSION_SECRET"
echo "DB_NAME=team-third-axis-db"
echo "ADMIN_EMAIL=teamthirdaxis@gcoej.ac.in"
echo "ADMIN_PASSWORD=TeamThird@x!$07"
echo "RATE_LIMIT_WINDOW_MS=900000"
echo "RATE_LIMIT_MAX_REQUESTS=100"
echo "FRONTEND_URL=https://your-frontend-app.onrender.com"
echo

echo "📋 Environment Variables for Render Frontend Service:"
echo "===================================================="
echo
echo "VITE_API_URL=https://your-backend-app.onrender.com"
echo "VITE_APP_TITLE=Team Third Axis - Drone Club"
echo "VITE_NODE_ENV=production"
echo "VITE_ENABLE_DEBUG_MODE=false"
echo

echo "⚠️  IMPORTANT NOTES:"
echo "==================="
echo "1. Replace 'your-backend-app' and 'your-frontend-app' with actual Render service names"
echo "2. Update FRONTEND_URL in backend after frontend deployment"
echo "3. Keep these secrets secure and never commit them to version control"
echo "4. Copy-paste these values into Render's Environment Variables section"
echo

echo "📚 Next Steps:"
echo "=============="
echo "1. Create backend web service on Render"
echo "2. Set the backend environment variables above"
echo "3. Create frontend static site on Render"
echo "4. Set the frontend environment variables above"
echo "5. Update FRONTEND_URL in backend with actual frontend URL"
echo "6. Test all functionality"
echo

echo "📖 For detailed instructions, see:"
echo "   - RENDER_DEPLOYMENT_GUIDE.md"
echo "   - DEPLOYMENT_DOCUMENTATION.md"
echo

echo "🎉 Setup complete! Happy deploying!"
