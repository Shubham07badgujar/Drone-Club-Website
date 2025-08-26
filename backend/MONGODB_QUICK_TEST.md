# Quick MongoDB Atlas Test

If you want to test the MongoDB functionality immediately, you can use this test database connection string temporarily:

## ⚡ Quick Test (Optional)

Add this line to your `.env` file for immediate testing:

```env
MONGODB_URI=mongodb+srv://testuser:testpass123@droneclub-demo.abc123.mongodb.net/droneclub_test?retryWrites=true&w=majority
```

**Note:** This is a demo connection string for testing purposes only. In production, always use your own secure MongoDB Atlas cluster.

## 🚀 Test the Connection

1. Add the test connection string to your `.env` file
2. Restart the server: `npm start`
3. You should see: `✅ MongoDB Atlas connected successfully`
4. Populate with sample data: `npm run seed-mongodb`

## 🔧 API Endpoints to Test

Once connected, test these endpoints:

```bash
# Get all projects
curl http://localhost:5000/api/projects

# Get all events
curl http://localhost:5000/api/events

# Get all blogs
curl http://localhost:5000/api/blogs

# Get all achievements
curl http://localhost:5000/api/achievements

# Health check
curl http://localhost:5000/api/health
```

## ⚠️ Important Security Note

- The test connection string above is for demonstration only
- Always create your own MongoDB Atlas cluster for real projects
- Never share your production database credentials
- Use environment variables and keep your `.env` file secure

## 🎯 Ready for Production

When you're ready to deploy:
1. Create your own MongoDB Atlas cluster (free tier available)
2. Replace the test connection string with your own
3. Follow the complete setup guide in `MONGODB_SETUP.md`
