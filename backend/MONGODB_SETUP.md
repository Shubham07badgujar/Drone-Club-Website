# MongoDB Atlas Setup Guide

This guide will help you set up MongoDB Atlas for the Drone Club Website.

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Sign up for a free account or sign in if you already have one
3. Create a new organization (optional) or use the default one

## Step 2: Create a New Cluster

1. Click "Create" or "Build a Database"
2. Choose "M0 Sandbox" (Free tier)
3. Select a cloud provider and region (closest to your location)
4. Give your cluster a name (e.g., "droneclub-cluster")
5. Click "Create Cluster"

## Step 3: Configure Database Access

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and secure password
5. Set user privileges to "Read and write to any database"
6. Click "Add User"

## Step 4: Configure Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development, you can click "Allow Access from Anywhere" (0.0.0.0/0)
   - **Note:** For production, restrict to specific IP addresses
4. Click "Confirm"

## Step 5: Get Connection String

1. Go to "Clusters" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" as the driver and version 4.1 or later
5. Copy the connection string

## Step 6: Configure Environment Variables

1. Create a `.env` file in your backend directory (if not already exists)
2. Add your MongoDB connection string:

```env
# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>?retryWrites=true&w=majority

# Replace the following in your connection string:
# <username> - Your database username
# <password> - Your database password  
# <cluster-name> - Your cluster name
# <database-name> - Your database name (e.g., droneclub_db)

# Example:
# MONGODB_URI=mongodb+srv://droneclub:mypassword123@droneclub-cluster.abc123.mongodb.net/droneclub_db?retryWrites=true&w=majority
```

## Step 7: Update Your .env File

Your complete `.env` file should look like this:

```env
# Environment Configuration
NODE_ENV=development
PORT=5000

# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/droneclub_db?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_very_secure_jwt_secret_key_here
JWT_EXPIRE=7d

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

## Step 8: Test the Connection

1. Make sure your `.env` file is saved
2. Start your backend server:
   ```bash
   cd backend
   npm start
   ```
3. Check the console for "MongoDB Connected" message

## Step 9: Seed the Database (Optional)

To populate your database with sample data:

```bash
cd backend
npm run seed-mongodb
```

## Troubleshooting

### Common Issues:

1. **"MongoNetworkError: failed to connect"**
   - Check your network access settings
   - Verify your IP address is whitelisted
   - Ensure your internet connection is stable

2. **"Authentication failed"**
   - Verify your username and password are correct
   - Make sure the user has proper permissions
   - Check for special characters that need URL encoding

3. **"Database name not found"**
   - The database will be created automatically when you first insert data
   - Make sure the database name in your connection string is correct

4. **"Connection string format error"**
   - Ensure there are no extra spaces in your connection string
   - Verify all placeholders are replaced with actual values

### URL Encoding Special Characters

If your password contains special characters, they need to be URL encoded:

- `@` becomes `%40`
- `#` becomes `%23`
- `$` becomes `%24`
- `%` becomes `%25`
- `^` becomes `%5E`

Example: If your password is `myPass@123`, use `myPass%40123` in the connection string.

## Security Best Practices

1. **Never commit your `.env` file** - Add it to `.gitignore`
2. **Use strong passwords** - Include uppercase, lowercase, numbers, and symbols
3. **Restrict IP access** - Only allow specific IP addresses in production
4. **Rotate credentials regularly** - Change passwords periodically
5. **Use least privilege** - Give users only the permissions they need

## Monitoring

MongoDB Atlas provides built-in monitoring tools:

1. Go to your cluster dashboard
2. Check "Metrics" tab for performance data
3. Set up alerts for important events
4. Review "Activity Feed" for recent operations

## Support

If you need help:
- Check MongoDB Atlas documentation: https://docs.atlas.mongodb.com/
- Contact MongoDB support through the Atlas dashboard
- Ask for help in the MongoDB community forums
