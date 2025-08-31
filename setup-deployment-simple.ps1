# Render Deployment Setup Script (PowerShell)
# Generate secure secrets for production deployment

Write-Host "Team Third Axis Drone Club - Render Deployment Setup" -ForegroundColor Green
Write-Host "====================================================" -ForegroundColor Green
Write-Host ""

# Check if Node.js is available
try {
    $nodeVersion = node --version
    Write-Host "Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Error: Node.js is required but not installed." -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Generating secure secrets for production..." -ForegroundColor Cyan
Write-Host ""

# Generate JWT Secret
$JWT_SECRET = node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
Write-Host "JWT_SECRET: $JWT_SECRET" -ForegroundColor Yellow

# Generate Session Secret
$SESSION_SECRET = node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
Write-Host "SESSION_SECRET: $SESSION_SECRET" -ForegroundColor Yellow

Write-Host ""
Write-Host "Backend Environment Variables for Render:" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "NODE_ENV=production" -ForegroundColor White
Write-Host "PORT=5000" -ForegroundColor White
Write-Host "MONGODB_URI=mongodb+srv://teamthirdaxis:TeamThirdAxis2024@team-third-axis-cluster.diuqf0u.mongodb.net/team-third-axis-db?retryWrites=true&w=majority" -ForegroundColor White
Write-Host "JWT_SECRET=$JWT_SECRET" -ForegroundColor White
Write-Host "SESSION_SECRET=$SESSION_SECRET" -ForegroundColor White
Write-Host "DB_NAME=team-third-axis-db" -ForegroundColor White
Write-Host "ADMIN_EMAIL=teamthirdaxis@gcoej.ac.in" -ForegroundColor White
Write-Host "ADMIN_PASSWORD=TeamThird@x!$07" -ForegroundColor White
Write-Host "RATE_LIMIT_WINDOW_MS=900000" -ForegroundColor White
Write-Host "RATE_LIMIT_MAX_REQUESTS=100" -ForegroundColor White
Write-Host "FRONTEND_URL=https://your-frontend-app.onrender.com" -ForegroundColor White

Write-Host ""
Write-Host "Frontend Environment Variables for Render:" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "VITE_API_URL=https://your-backend-app.onrender.com" -ForegroundColor White
Write-Host "VITE_APP_TITLE=Team Third Axis - Drone Club" -ForegroundColor White
Write-Host "VITE_NODE_ENV=production" -ForegroundColor White
Write-Host "VITE_ENABLE_DEBUG_MODE=false" -ForegroundColor White

Write-Host ""
Write-Host "IMPORTANT NOTES:" -ForegroundColor Yellow
Write-Host "===============" -ForegroundColor Yellow
Write-Host "1. Replace 'your-backend-app' and 'your-frontend-app' with actual Render service names"
Write-Host "2. Update FRONTEND_URL in backend after frontend deployment"
Write-Host "3. Keep these secrets secure and never commit them to version control"
Write-Host "4. Copy-paste these values into Render's Environment Variables section"
Write-Host ""
Write-Host "Setup complete! Check RENDER_DEPLOYMENT_GUIDE.md for detailed instructions." -ForegroundColor Green
