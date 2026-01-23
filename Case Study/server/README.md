# Student Workspace Backend

Backend API for the Student Workspace academic management application. Built with Node.js, Express, MongoDB, and JWT authentication.

## Features

- 🔐 JWT-based authentication
- 📚 Hierarchical component management (courses, parts, subjects, notes, assignments, tests)
- 📁 File upload and storage
- 🔄 Workspace import/export
- 🛡️ Security with helmet and rate limiting
- ✅ Input validation
- 🚀 RESTful API design

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Clone the repository and navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

4. Configure your `.env` file with your settings:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/student-workspace
JWT_SECRET=your-super-secret-key
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
```

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` (or your configured PORT).

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Components

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/components` | Get all components | Yes |
| POST | `/api/components` | Create component | Yes |
| GET | `/api/components/:id` | Get single component | Yes |
| PUT | `/api/components/:id` | Update component | Yes |
| DELETE | `/api/components/:id` | Delete component | Yes |
| GET | `/api/components/:id/children` | Get children | Yes |

### Files

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/components/:componentId/files` | Upload files | Yes |
| GET | `/api/components/:componentId/files` | Get all files | Yes |
| GET | `/api/files/:fileId` | Download file | Yes |
| DELETE | `/api/files/:fileId` | Delete file | Yes |

### Workspace

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/workspace/export` | Export workspace | Yes |
| POST | `/api/workspace/import` | Import workspace | Yes |
| DELETE | `/api/workspace/clear` | Clear workspace | Yes |

## Project Structure

```
backend/
├── controllers/         # Request handlers
│   ├── authController.js
│   ├── componentController.js
│   ├── fileController.js
│   └── workspaceController.js
├── middleware/          # Custom middleware
│   ├── auth.js
│   ├── errorHandler.js
│   ├── upload.js
│   └── validate.js
├── models/             # Database models
│   ├── User.js
│   ├── Component.js
│   └── File.js
├── routes/             # Route definitions
│   ├── auth.js
│   ├── components.js
│   ├── files.js
│   └── workspace.js
├── utils/              # Utility functions
│   ├── db.js
│   └── validators.js
├── uploads/            # File storage (gitignored)
├── .env                # Environment variables
├── .env.example        # Environment template
├── .gitignore
├── package.json
└── server.js           # Entry point
```

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [...]
}
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Helmet for security headers
- Rate limiting
- CORS configuration
- Input validation
- File type and size restrictions

## Development

- Use `nodemon` for auto-restart during development
- MongoDB connection logs appear in console
- HTTP requests logged with `morgan` in dev mode

## License

ISC
