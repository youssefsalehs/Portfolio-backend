# Portfolio Backend API

A backend service for my personal portfolio website. It provides APIs for managing projects and user authentication.

## Tech Stack

- **Node.js** — runtime
- **Express.js** (`^5.2.1`) — web framework
- **MongoDB** + **Mongoose** (`^9.4.1`) — database & ODM
- **dotenv** (`^17.4.2`) — environment variables
- **bcryptjs** (`^3.0.3`) — password hashing
- **jsonwebtoken** (`^9.0.3`) — JWT authentication
- **zod** (`^4.6.7`) — request validation
- **Cloudinary** (`^2.9.0`) — image & gallery uploads
- **multer** (`^2.1.1`) — multipart file handling
- **slugify** (`^1.6.9`) — URL slugs
- **helmet** (`^8.1.0`) — security headers
- **cors** (`^2.8.6`) — cross-origin requests
- **hpp** (`^0.2.3`) — HTTP Parameter Pollution protection
- **nodemon** (`^3.1.14`) — dev server restart
- **Mailjet** — transactional email

## Project Structure

```
src/
├── app.js                 # createApp() factory — Express setup, middleware, routes, error handler
├── route.js               # Mounts auth and project routers under /api/v1
├── server.js              # Entry point — HTTP server, graceful shutdown, DB connect
├── app/
│   ├── auth/              # Auth feature module
│   │   ├── auth.controller.js
│   │   ├── auth.dto.js
│   │   ├── auth.model.js
│   │   ├── auth.repo.js
│   │   ├── auth.route.js
│   │   ├── auth.service.js
│   │   ├── auth.utilis.js
│   │   └── errors.js
│   └── project/           # Project feature module
│       ├── projects.controller.js
│       ├── project.dto.js
│       ├── project.model.js
│       ├── project.repo.js
│       ├── project.route.js
│       ├── project.service.js
│       └── errors.js
├── lib/                   # Shared libraries / infrastructure
│   ├── auth/protect.js    # JWT auth middleware
│   ├── cloud/cloudinarProvider.js
│   ├── config/env.js      # Zod-validated env config
│   ├── db/mongoose.js     # MongoDB connection
│   ├── media/multer.js    # File upload config (image + gallery)
│   └── validation/validation.js
└── pkg/                   # Packaged utilities
    ├── cloud/cloudinary.js
    ├── email/mailJet.js
    ├── error/error.handler.js
    ├── error/error.js
    ├── logger/logger.js
    └── utils/time.js
```

## Features

- Projects CRUD (create, read, update, delete)
- Featured projects & category/stack filtering
- Image & gallery upload (via Cloudinary + multer)
- User authentication (login / signup) with JWT
- Protected routes (auth middleware)
- Request validation with Zod
- Environment variable validation
- CORS, Helmet, HPP security middleware
- Centralized error handling & logging
- Graceful shutdown (SIGINT/SIGTERM)

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/portfolio-backend.git
cd portfolio-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret_key
FRONTEND_URL=http://localhost:3000
```

### 4. Run the server

```bash
# Development (with auto-restart)
npm run dev

# Production
node src/server.js
```

The API will be available at `http://localhost:5000/api/v1`.

## API Endpoints

All routes are prefixed with `/api/v1`.

### Projects

| Method | Endpoint                           | Description                                   | Auth |
| ------ | ---------------------------------- | --------------------------------------------- | ---- |
| GET    | `/api/v1/projects`                 | Get all projects                              | No   |
| GET    | `/api/v1/projects/featured`        | Get featured projects                         | No   |
| GET    | `/api/v1/projects/category/:stack` | Get projects by stack                         | No   |
| GET    | `/api/v1/projects/:id`             | Get a specific project                        | No   |
| POST   | `/api/v1/projects`                 | Create a new project (image + gallery upload) | Yes  |
| PATCH  | `/api/v1/projects/:id`             | Update a project                              | Yes  |
| DELETE | `/api/v1/projects/:id`             | Delete a project                              | Yes  |

### Auth

| Method | Endpoint              | Description       | Auth |
| ------ | --------------------- | ----------------- | ---- |
| POST   | `/api/v1/auth/login`  | Log in            | No   |
| POST   | `/api/v1/auth/signup` | Create a new user | No   |

## License

ISC
