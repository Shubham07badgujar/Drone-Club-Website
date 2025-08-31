# 🔧 Render Deployment Setup Script (PowerShell)
# This script helps generate secure secrets and prepare for Render deployment

Write-Host "🚀 Team Third Axis Drone Club - Render Deployment Setup" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
Write-Host ""

# Check if Node.js is available
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is required but not installed." -ForegroundColor Red
    Write-Host "   Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Generate secure secrets
Write-Host "🔐 Generating secure secrets for production..." -ForegroundColor Cyan
Write-Host ""

# Generate JWT Secret
$JWT_SECRET = node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
Write-Host "JWT_SECRET: $JWT_SECRET" -ForegroundColor Yellow

# Generate Session Secret
$SESSION_SECRET = node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
Write-Host "SESSION_SECRET: $SESSION_SECRET" -ForegroundColor Yellow

Write-Host ""
Write-Host "📋 Environment Variables for Render Backend Service:" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

$backendEnvVars = @"
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://teamthirdaxis:TeamThirdAxis2024@team-third-axis-cluster.diuqf0u.mongodb.net/team-third-axis-db?retryWrites=true&w=majority
JWT_SECRET=$JWT_SECRET
SESSION_SECRET=$SESSION_SECRET
DB_NAME=team-third-axis-db
ADMIN_EMAIL=teamthirdaxis@gcoej.ac.in
ADMIN_PASSWORD=TeamThird@x!$07
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
FRONTEND_URL=https://your-frontend-app.onrender.com
"@

Write-Host $backendEnvVars -ForegroundColor White

Write-Host ""
Write-Host "📋 Environment Variables for Render Frontend Service:" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host ""

$frontendEnvVars = @"
VITE_API_URL=https://your-backend-app.onrender.com
VITE_APP_TITLE=Team Third Axis - Drone Club
VITE_NODE_ENV=production
VITE_ENABLE_DEBUG_MODE=false
"@

Write-Host $frontendEnvVars -ForegroundColor White

Write-Host ""
Write-Host "⚠️  IMPORTANT NOTES:" -ForegroundColor Yellow
Write-Host "===================" -ForegroundColor Yellow
Write-Host "1. Replace 'your-backend-app' and 'your-frontend-app' with actual Render service names" -ForegroundColor White
Write-Host "2. Update FRONTEND_URL in backend after frontend deployment" -ForegroundColor White
Write-Host "3. Keep these secrets secure and never commit them to version control" -ForegroundColor White
Write-Host "4. Copy-paste these values into Render's Environment Variables section" -ForegroundColor White

Write-Host ""
Write-Host "📚 Next Steps:" -ForegroundColor Cyan
Write-Host "==============" -ForegroundColor Cyan
Write-Host "1. Create backend web service on Render" -ForegroundColor White
Write-Host "2. Set the backend environment variables above" -ForegroundColor White
Write-Host "3. Create frontend static site on Render" -ForegroundColor White
Write-Host "4. Set the frontend environment variables above" -ForegroundColor White
Write-Host "5. Update FRONTEND_URL in backend with actual frontend URL" -ForegroundColor White
Write-Host "6. Test all functionality" -ForegroundColor White

Write-Host ""
Write-Host "📖 For detailed instructions, see:" -ForegroundColor Cyan
Write-Host "   - RENDER_DEPLOYMENT_GUIDE.md" -ForegroundColor White
Write-Host "   - DEPLOYMENT_DOCUMENTATION.md" -ForegroundColor White

Write-Host ""
Write-Host "🎉 Setup complete! Happy deploying!" -ForegroundColor Green

# Option to copy to clipboard
Write-Host ""
$copyChoice = Read-Host "Would you like to copy the backend environment variables to clipboard? (y/n)"
if ($copyChoice -eq "y" -or $copyChoice -eq "Y") {
    $backendEnvVars | Set-Clipboard
    Write-Host "✅ Backend environment variables copied to clipboard!" -ForegroundColor Green
}
