# 🚀 Render Deployment Guide - Team Third Axis Drone Club Website

This guide will walk you through deploying your full-stack drone club website to Render, including frontend (React), backend (Node.js/Express), and MongoDB Atlas integration.

## 📋 Prerequisites

- [Render account](https://render.com) (free tier available)
- [MongoDB Atlas account](https://cloud.mongodb.com) (free tier available)
- [GitHub account](https://github.com) with your project repository
- Git repository of your drone club website

## 🏗️ Project Architecture

```
📦 Deployment Architecture
├── 🌐 Frontend (React + Vite) → Render Static Site
├── 🖥️ Backend (Node.js + Express) → Render Web Service  
└── 🗄️ Database (MongoDB Atlas) → Cloud Database
```

## 📂 Environment Files Overview

Before deployment, ensure you have these environment configuration files:

```
├── backend/
│   ├── .env.render          # Production environment variables template
│   └── .env.example         # Development environment template
├── frontend/
│   ├── .env.render          # Frontend production variables template
│   └── .env.example         # Frontend development template
└── render.yaml              # Render infrastructure configuration
```

## 🚀 Step-by-Step Deployment

### Phase 1: Database Setup (MongoDB Atlas)

#### 1.1 Verify MongoDB Atlas Configuration

Your MongoDB Atlas should already be configured with:
- **Cluster**: `team-third-axis-cluster`
- **Database**: `team-third-axis-db`
- **Username**: `teamthirdaxis`
- **Password**: `TeamThirdAxis2024`

#### 1.2 Update Network Access

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Navigate to **Network Access** → **IP Access List**
3. Click **Add IP Address**
4. Select **Allow Access from Anywhere** (`0.0.0.0/0`)
5. Add comment: "Render deployment access"
6. Click **Confirm**

⚠️ **Note**: In production, consider restricting to Render's IP ranges for better security.

#### 1.3 Get Connection String

1. Go to **Database** → **Connect**
2. Choose **Connect your application**
3. Copy the connection string:
```
mongodb+srv://teamthirdaxis:TeamThirdAxis2024@team-third-axis-cluster.diuqf0u.mongodb.net/team-third-axis-db?retryWrites=true&w=majority
```

### Phase 2: Backend Deployment

#### 2.1 Create Backend Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure the service:

**Basic Settings:**
- **Name**: `drone-club-backend`
- **Root Directory**: `backend`
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main` (or your default branch)

**Build & Deploy:**
- **Build Command**: `npm ci`
- **Start Command**: `npm start`

#### 2.2 Configure Environment Variables

In the Render dashboard, go to **Environment** tab and add:

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGODB_URI` | `mongodb+srv://teamthirdaxis:TeamThirdAxis2024@team-third-axis-cluster.diuqf0u.mongodb.net/team-third-axis-db?retryWrites=true&w=majority` |
| `JWT_SECRET` | Generate a secure 256-bit secret* |
| `SESSION_SECRET` | Generate a secure session secret* |
| `DB_NAME` | `team-third-axis-db` |
| `ADMIN_EMAIL` | `teamthirdaxis@gcoej.ac.in` |
| `ADMIN_PASSWORD` | `TeamThird@x!$07` |
| `RATE_LIMIT_WINDOW_MS` | `900000` |
| `RATE_LIMIT_MAX_REQUESTS` | `100` |
| `FRONTEND_URL` | *Will update after frontend deployment* |

**Generate secure secrets:**
```bash
# Generate JWT_SECRET (run locally)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate SESSION_SECRET (run locally)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### 2.3 Deploy Backend

1. Click **Create Web Service**
2. Wait for the build to complete (5-10 minutes)
3. Your backend will be available at: `https://drone-club-backend.onrender.com`
4. Test the health endpoint: `https://drone-club-backend.onrender.com/api/health`

### Phase 3: Frontend Deployment

#### 3.1 Create Frontend Service on Render

1. In Render Dashboard, click **New** → **Static Site**
2. Connect the same GitHub repository
3. Configure the service:

**Basic Settings:**
- **Name**: `drone-club-frontend`
- **Root Directory**: `frontend`
- **Branch**: `main`

**Build Settings:**
- **Build Command**: `npm ci && npm run build`
- **Publish Directory**: `dist`

#### 3.2 Configure Frontend Environment Variables

In the **Environment** tab, add:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://drone-club-backend.onrender.com` |
| `VITE_APP_TITLE` | `Team Third Axis - Drone Club` |
| `VITE_NODE_ENV` | `production` |
| `VITE_ENABLE_DEBUG_MODE` | `false` |

#### 3.3 Deploy Frontend

1. Click **Create Static Site**
2. Wait for the build to complete (3-5 minutes)
3. Your frontend will be available at: `https://drone-club-frontend.onrender.com`

### Phase 4: Update CORS Configuration

#### 4.1 Update Backend CORS

1. Go to your backend service in Render
2. Update the `FRONTEND_URL` environment variable:
   - **Value**: `https://drone-club-frontend.onrender.com`
3. Trigger a new deployment

## 🔧 Advanced Configuration

### Custom Domains (Optional)

#### Backend Custom Domain
1. In your backend service, go to **Settings** → **Custom Domains**
2. Add your domain: `api.yoursite.com`
3. Update DNS records as instructed

#### Frontend Custom Domain
1. In your frontend service, go to **Settings** → **Custom Domains**  
2. Add your domain: `yoursite.com`
3. Update DNS records as instructed

### Database Seeding (Optional)

To seed your production database with initial data:

1. Go to your backend service in Render
2. Open the **Shell** tab
3. Run seeding commands:
```bash
# Seed all data
npm run seed-mongodb

# Or seed specific data
npm run seed-new-events
npm run seed-team
npm run seed-achievements
```

## 🧪 Post-Deployment Testing

### 1. Backend Health Check
Test your backend is running:
```bash
curl https://drone-club-backend.onrender.com/api/health
```

Expected response:
```json
{
  "status": "OK",
  "success": true,
  "timestamp": "2025-08-31T...",
  "environment": "production",
  "uptime": 123
}
```

### 2. API Endpoints Test
```bash
# Test events endpoint
curl https://drone-club-backend.onrender.com/api/events

# Test projects endpoint  
curl https://drone-club-backend.onrender.com/api/projects

# Test team endpoint
curl https://drone-club-backend.onrender.com/api/team
```

### 3. Frontend Application Test
1. Visit your frontend URL: `https://drone-club-frontend.onrender.com`
2. Check that all pages load correctly:
   - ✅ Home page
   - ✅ Events page (should show seeded events)
   - ✅ Projects page
   - ✅ Team page
   - ✅ Admin login page
3. Test admin functionality:
   - Login with admin credentials
   - Create/edit/delete content

### 4. Database Connection Test
```bash
# In your backend Render shell
npm run test:db
```

## 🔍 Debugging & Troubleshooting

### Common Issues

#### 1. Build Failures

**Frontend Build Fails:**
```bash
# Check build logs in Render dashboard
# Common issues:
# - Missing environment variables
# - Dependency conflicts
# - Vite build errors

# Solution: Check build command
npm ci && npm run build
```

**Backend Build Fails:**
```bash
# Common issues:
# - Node.js version mismatch
# - Missing dependencies
# - Environment variable errors

# Solution: Verify package.json and Node version
```

#### 2. CORS Errors

If you see CORS errors in browser console:
1. Verify `FRONTEND_URL` is set correctly in backend
2. Check that frontend is using correct `VITE_API_URL`
3. Redeploy backend after URL changes

#### 3. Database Connection Issues

```bash
# Check MongoDB Atlas network access
# Verify connection string format
# Test connection in backend shell:
npm run test:db
```

#### 4. Environment Variables Not Loading

1. Check variable names (case-sensitive)
2. Verify values are set correctly
3. Redeploy after environment changes

### Monitoring & Logs

#### View Application Logs
1. Go to your service in Render dashboard
2. Click **Logs** tab
3. Monitor real-time logs for errors

#### Key Log Patterns to Watch:
```bash
# Successful startup
✅ MongoDB Atlas connected successfully
✅ Server running on port 5000

# Database operations
🔗 Connected to MongoDB
📝 Inserting new events...

# Errors to investigate
❌ MongoDB connection failed
❌ JWT token verification failed
❌ CORS error
```

## 📊 Performance Optimization

### Backend Optimizations

1. **Enable Compression** (already configured)
2. **Rate Limiting** (already configured)
3. **Security Headers** (helmet middleware)
4. **Database Connection Pooling** (MongoDB driver default)

### Frontend Optimizations

1. **Code Splitting** (configured in Vite)
2. **Asset Optimization** (Vite handles automatically)
3. **Caching Headers** (Render handles for static sites)

## 🔒 Security Best Practices

### Implemented Security Measures

✅ **Environment Variables**: Secrets not in code  
✅ **CORS Configuration**: Restricted origins  
✅ **Rate Limiting**: API protection  
✅ **Helmet Security Headers**: XSS protection  
✅ **JWT Authentication**: Secure admin access  
✅ **Input Validation**: Joi schemas  
✅ **MongoDB Atlas**: Network restrictions  

### Additional Production Security

1. **Custom Domains**: Use HTTPS
2. **Database Access**: Restrict IP ranges
3. **API Keys**: Rotate regularly
4. **Monitoring**: Set up error tracking

## 🎯 Success Checklist

### Backend Deployment ✅
- [ ] Service deployed on Render
- [ ] Health check endpoint responding
- [ ] MongoDB Atlas connected
- [ ] Environment variables configured
- [ ] API endpoints working
- [ ] Admin authentication working

### Frontend Deployment ✅
- [ ] Static site deployed on Render
- [ ] All pages loading correctly
- [ ] API communication working
- [ ] Admin dashboard functional
- [ ] No console errors

### Database ✅
- [ ] MongoDB Atlas accessible
- [ ] Connection string working
- [ ] Data seeded (optional)
- [ ] CRUD operations working

## 🌐 Final URLs

After successful deployment, you'll have:

- **Frontend**: `https://drone-club-frontend.onrender.com`
- **Backend API**: `https://drone-club-backend.onrender.com`
- **Health Check**: `https://drone-club-backend.onrender.com/api/health`
- **Admin Panel**: `https://drone-club-frontend.onrender.com/admin-login`

## 🎉 Congratulations!

Your Team Third Axis Drone Club website is now live on Render! 

**Next Steps:**
1. Share the URLs with your team
2. Test all functionality thoroughly
3. Consider setting up custom domains
4. Monitor logs for any issues
5. Plan for regular updates and maintenance

---

**Need Help?**
- Check [Render Documentation](https://render.com/docs)
- Review application logs in Render dashboard
- Test API endpoints with tools like Postman
- Monitor MongoDB Atlas metrics
