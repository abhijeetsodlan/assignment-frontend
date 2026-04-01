<div align="center">
  <h1>📝 BlogSphere</h1>
  <p><strong>A full-stack blog platform to write, manage, and showcase your content.</strong></p>
  <p>
    <img src="https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white" />
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" />
    <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express" />
  </p>
</div>

---

## Overview

BlogSphere is a modern, full-stack blogging platform with a clean UI, real-time search, dark/light theming, and full SEO support. It separates concerns cleanly — Next.js handles the frontend, while an Express + MongoDB backend powers all data operations.

---

## Features

### 📄 Blog Management
- Create, update, and delete blog posts
- SEO-friendly slug-based URLs
- Organize content with categories

### 🔍 Live Search
- Real-time search powered by the backend
- MongoDB regex filtering on `title` and `excerpt`
- 300ms debounced input via a custom React hook

### 🎨 UI & Experience
- Responsive, modern design
- Smooth animations with Framer Motion
- Clean, minimal layout

### 🌗 Theme System
- Light and dark mode support
- Theme persisted in `localStorage`
- Controlled via React Context and CSS variables

### 🔎 SEO Optimization
- Static and dynamic metadata per page
- `robots.txt` and `sitemap.xml` support
- Admin routes excluded from indexing

---

## Tech Stack

| Layer     | Technologies |
|-----------|-------------|
| Frontend  | Next.js, Tailwind CSS, Framer Motion, Axios, Lucide React, clsx |
| Backend   | Node.js, Express.js, MongoDB, Mongoose, slugify, dotenv, nodemon |

---

## Project Structure
```
blogsphere/
├── frontend/     # Next.js application
└── backend/      # Express REST API
```

---

## API Reference

### Blog Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/blogs` | List all blogs (supports search, filter, sort, pagination) |
| `GET` | `/api/blogs/recent` | Fetch recent blog posts |
| `GET` | `/api/blogs/:slug` | Get a single blog by slug |
| `POST` | `/api/blogs` | Create a new blog post |
| `PUT` | `/api/blogs/:id` | Update a blog post |
| `DELETE` | `/api/blogs/:id` | Delete a blog post |

### Category Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/categories` | List all categories |

---

## Architecture

### Frontend
- Renders UI with animations and theming
- Manages theme state via `ThemeContext`
- Applies 300ms debounce on search input
- Communicates with the backend via Axios

### Backend
- Connects to MongoDB via Mongoose
- Handles full CRUD for blogs and categories
- Supports search, filtering, sorting, and pagination
- Auto-generates slugs for SEO-friendly URLs
- Centralized error handling middleware
- Includes a seed script for sample data

---

## Search Implementation

**Frontend** captures user input → debounces 300ms → updates query params → calls API.

**Backend** reads the `search` query param → runs a MongoDB regex against `title` and `excerpt` → returns filtered results.

> Search is **frontend-triggered** and **backend-powered**.

---

## Theme System

Theming is split across two layers:

- **`ThemeContext`** — manages state and syncs to `localStorage`
- **`globals.css`** — defines CSS variables for both modes

### CSS Variables
```css
--color-primary
--color-secondary
--color-accent
```
