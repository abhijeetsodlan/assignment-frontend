BlogSphere

BlogSphere is a full-stack blog platform where you can write, manage, and showcase your blogs with a clean interface, SEO optimization, and a scalable backend.

Features
Blog Management
Create, update, and delete blogs
SEO-friendly slug-based URLs
Organize blogs using categories
Live Search
Real-time search functionality
Backend-powered filtering using title and excerpt
300ms debounced input for better performance
UI and Experience
Responsive and modern design
Smooth animations
Clean and minimal layout
Theme System
Dark and light mode support
Theme stored in localStorage
Theme controlled via context and global CSS variables
SEO Optimization
Metadata implemented across pages
Dynamic metadata for blog pages
robots.txt and sitemap.xml support
Admin pages excluded from indexing
Tech Stack
Frontend
Next.js
Tailwind CSS
Axios
Framer Motion
Lucide React
clsx
Backend
Node.js
Express.js (v4.19.2)
MongoDB with Mongoose (v8.5.2)
cors
dotenv
slugify
nodemon (development)
Architecture Overview
Frontend Responsibilities
Rendering UI and handling animations
Managing theme state
Handling debounced search input
Communicating with backend APIs
Backend Responsibilities
Connecting to MongoDB
Handling blog and category data
Implementing CRUD operations
Processing search, filtering, pagination, and sorting
Generating slugs for blog posts
Centralized error handling
API Endpoints
Core APIs
GET     /api/health
GET     /api/blogs
GET     /api/blogs/recent
GET     /api/blogs/:slug
POST    /api/blogs
PUT     /api/blogs/:id
DELETE  /api/blogs/:id
GET     /api/categories
Additional
GET /
Search Implementation

Frontend:

Captures user input
Applies 300ms debounce using a custom hook
Updates query parameters and triggers API calls

Backend:

Reads search query from request
Performs MongoDB regex search on title and excerpt

Summary:
The search is frontend-triggered and backend-powered.

Theme System

Theme handling is divided into two parts:

ThemeContext manages theme state and persistence
globals.css defines color variables for light and dark modes
Theme Variables
--color-primary
--color-secondary
--color-accent
Project Structure
/frontend   -> Next.js application
/backend    -> Express API server
Backend Details

The backend is built using Node.js and Express and provides REST APIs for the platform.

It includes:

Blog CRUD operations
Category management
Search, filtering, sorting, and pagination
Slug generation for SEO-friendly URLs
Centralized error handling
Seed script for inserting sample data
