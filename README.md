# Portfolio Backend API

A backend service for my personal portfolio website.\
It provides APIs for managing project.

------------------------------------------------------------------------

## Features

-   Projects CRUD operations\
-   Image upload support\
-   User authentication (login / signup)\
-   RESTful API design\
-   Environment variables support\
-   Error handling & validation

------------------------------------------------------------------------

## Tech Stack

-   Node.js\
-   Express.js\
-   MongoDB\
-   Mongoose\
-   dotenv

------------------------------------------------------------------------

## Project Structure

    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── config/
    ├── api/
    ├── utils/
    ├── .env
    ├── app.js
    └── server.js

------------------------------------------------------------------------

## Installation & Setup

### 1. Clone the repository

    git clone https://github.com/your-username/portfolio-backend.git
    cd portfolio-backend

### 2. Install dependencies

    npm install

### 3. Create environment variables

Create a `.env` file in the root directory:

    PORT=8000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret_key


### 4. Run the server

    npm run dev

------------------------------------------------------------------------

## API Endpoints

###  Projects

  Method   Endpoint                              Description
  -------- -------------------                   --------------------
  GET      /api/v1/projects                      Get all projects
  GET      /api/v1/projects/featured             Get featured projects
  GET      /api/v1/projects/category/:stack      Get all projects in a category
  GET      /api/v1/projects/:id                  Get specific project
  POST     /api/v1/projects                         Create new project
  PATCH    /api/v1/projects/:id                     Update project
  DELETE   /api/v1/projects/:id                     Delete project

------------------------------------------------------------------------

###  Auth
  Method   Endpoint                              Description
  -------- -------------------                   --------------------
  POST     /api/v1/login                         login 
  POST     /api/v1/signup                        create new user
 

------------------------------------------------------------------------
