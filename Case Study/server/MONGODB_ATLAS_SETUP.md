# MongoDB Atlas Setup Guide

This guide will help you set up MongoDB Atlas (cloud database) for the Student Workspace backend.

## Why MongoDB Atlas?

- ✅ **Free Tier Available**: 512MB storage free forever
- ✅ **No Local Installation**: No need to run MongoDB on your machine
- ✅ **Cloud Hosted**: Access from anywhere
- ✅ **Automatic Backups**: Built-in data protection
- ✅ **Production Ready**: Scales when you need it

---

## Step-by-Step Setup

### 1. Create MongoDB Atlas Account

1. Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up with your email or Google/GitHub account
3. Verify your email address

### 2. Create a New Cluster

1. After logging in, click **"Build a Database"**
2. Choose **"M0 FREE"** shared cluster
3. Select your cloud provider:
   - AWS, Google Cloud, or Azure
   - Choose one close to your location for better performance
4. Select a region (choose one nearest to you)
5. Cluster Name: `StudentWorkspace` (or any name you prefer)
6. Click **"Create"** and wait 1-3 minutes for deployment

### 3. Create Database User

1. A popup will appear, or go to **Security → Database Access**
2. Click **"Add New Database User"**
3. Authentication Method: **Password**
4. Username: `studentworkspace` (you can choose any username)
5. Password: Click **"Autogenerate Secure Password"** and **COPY IT**
   - ⚠️ **IMPORTANT**: Save this password - you'll need it for the connection string!
6. Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

### 4. Configure Network Access

1. Go to **Security → Network Access**
2. Click **"Add IP Address"**
3. For development:
   - Click **"Allow Access from Anywhere"**
   - This adds `0.0.0.0/0` (all IPs)
   - ⚠️ For production, restrict to specific IPs only
4. Add a description: "Development - All IPs"
5. Click **"Confirm"**
6. Wait for status to change to **"Active"**

### 5. Get Your Connection String

1. Go to **Database** (left sidebar)
2. Find your cluster and click **"Connect"**
3. Choose **"Connect your application"**
4. Driver: **Node.js**
5. Version: **5.5 or later**
6. Copy the connection string:

```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 6. Update Backend Configuration

1. Open `backend/.env` file
2. Replace the `MONGODB_URI` line with your Atlas connection string
3. Replace placeholders:
   - `<username>` → your database username (e.g., `studentworkspace`)
   - `<password>` → your database password (copied earlier)
   - `<cluster-url>` → your cluster URL (e.g., `cluster0.xxxxx.mongodb.net`)
4. Add `/student-workspace` before the `?` to specify database name

**Example:**
```env
MONGODB_URI=mongodb+srv://studentworkspace:MySecurePass123@cluster0.abcde.mongodb.net/student-workspace?retryWrites=true&w=majority
```

### 7. Test the Connection

1. Start your backend server:
   ```bash
   npm run dev
   ```

2. You should see:
   ```
   ✅ MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
   🚀 Server running in development mode on port 5000
   ```

3. If you see errors:
   - ❌ **"MongoServerError: bad auth"** → Wrong username/password
   - ❌ **"MongooseServerSelectionError"** → Check network access settings
   - ❌ **"ENOTFOUND"** → Check connection string format

---

## Connection String Format Explained

```
mongodb+srv://username:password@cluster-url/database-name?options
```

- `mongodb+srv://` - Protocol (SRV record, Atlas handles DNS)
- `username:password` - Your database user credentials
- `@cluster-url` - Your cluster's address
- `/database-name` - Database name (we use `student-workspace`)
- `?retryWrites=true&w=majority` - Connection options

---

## Security Best Practices

### For Development
✅ Allow access from anywhere (0.0.0.0/0)
✅ Use strong passwords
✅ Don't commit `.env` file to Git

### For Production
🔒 Restrict IP addresses to your server only
🔒 Use environment variables for credentials
🔒 Enable audit logs
🔒 Use VPC peering if available
🔒 Rotate passwords regularly

---

## Viewing Your Data

1. Go to **Database** in MongoDB Atlas
2. Click **"Browse Collections"** on your cluster
3. You'll see your databases and collections
4. View/edit documents directly in the browser

---

## Free Tier Limits

- **Storage**: 512 MB
- **RAM**: Shared
- **Connections**: 100 simultaneous
- **Backup**: Not included (use export/import)

This is perfect for development and small projects!

---

## Troubleshooting

### Cannot Connect

1. **Check Network Access**: Ensure your IP is whitelisted
2. **Verify Credentials**: Username and password must match exactly
3. **Check Connection String**: No spaces, correct format
4. **Firewall**: Some corporate networks block MongoDB connections

### Forgot Password

1. Go to **Database Access**
2. Click **"Edit"** on your user
3. Click **"Edit Password"**
4. Generate new password and update `.env`

### Need More Space

- Free tier gives 512MB
- Upgrade to M2 ($9/month) for 2GB
- Or create multiple free clusters

---

## Alternative: Local MongoDB (If Needed)

If you prefer local development:

1. Download MongoDB Community Server
2. Install and run `mongod`
3. Use connection string:
   ```env
   MONGODB_URI=mongodb://localhost:27017/student-workspace
   ```

---

## Support

- [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)
- [Connection String Guide](https://www.mongodb.com/docs/manual/reference/connection-string/)
- [MongoDB University (Free Courses)](https://university.mongodb.com/)

---

**Ready to go!** Once you've updated your `.env` file with the Atlas connection string, your backend will use the cloud database instead of a local one. No MongoDB installation required! 🎉
