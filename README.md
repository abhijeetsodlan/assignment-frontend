# BlogSphere Frontend

BlogSphere is a modern blog platform frontend built with Next.js 14, React 18, and Tailwind CSS. It connects to the Express + MongoDB backend in this repository and provides both the public reading experience and the blog management dashboard.

This README is written for someone opening the frontend for the first time. It explains what the project does, how the app is structured, which features are implemented, how it talks to the backend, and how to run it locally.

## What This Project Is

The frontend is an editorial-style blog application with:

- A landing page for discovery and featured content
- A public blog listing page with filtering, sorting, search, and pagination
- A blog detail page rendered from backend data
- A management page to create, edit, and delete blogs through the API
- Light and dark theme support with persisted theme preference

The UI is designed around reusable components, design tokens in global CSS, and App Router pages in Next.js.

## Main User Flows

### 1. Explore the platform
Visitors land on the home page and can:

- Read the hero section and featured content
- Browse highlighted categories
- Jump into the blog listing page

### 2. Discover blogs
On the `/blogs` page, users can:

- Search by keyword
- Filter by category
- Sort by latest or oldest
- Move through paginated results
- View recent content in supporting UI areas

### 3. Read a single blog
On the `/blog/[slug]` route, users can:

- See the blog cover image
- Read the full article content
- View author details, publish date, read time, tags, and comments count

### 4. Manage content
On the `/manage-blogs` page, users can:

- Open a modal editor
- Create a new blog post
- Edit existing posts
- Delete posts
- Enter thumbnail and avatar URLs, author details, article content, category, tags, and metadata

## Tech Stack

- Next.js 14 with App Router
- React 18
- Tailwind CSS
- Axios for API calls
- Framer Motion for motion and transitions
- Lucide React for icons

## Backend Dependency

The frontend depends on the backend API in the sibling `backend` folder.

Default API base URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

If `NEXT_PUBLIC_API_URL` is not set, the frontend falls back to `http://localhost:5000/api`.

API integration lives in [lib/api.js](/e:/personal/assignment/frontend/lib/api.js).

## Implemented Pages

### `/`
Landing page composed from:

- `HeroSection`
- `StatsBar`
- `FeaturedBlogs`
- `CategoriesStrip`
- `CallToAction`

### `/blogs`
Public listing page with:

- Search support
- Category filtering
- Sort selection
- Pagination
- Server-side fetching for blog data

### `/blog/[slug]`
Single blog page with:

- Cover image
- Author metadata
- Rich HTML content rendering
- Tags
- Error handling for missing content

### `/manage-blogs`
Management dashboard with:

- Blog table/card listing
- Search within manager
- Create modal
- Edit modal
- Delete action
- API-backed form submission

## Component Highlights

Key reusable components in `frontend/components`:

- `Navbar.jsx`: shared bottom navigation
- `Footer.jsx`: footer credit area
- `BlogCard.jsx`: reusable blog preview card
- `BlogList.jsx`: list state wrapper for cards
- `SearchBar.jsx`: search input UI
- `CategoryFilter.jsx`: category selection
- `SortSelect.jsx`: ordering control
- `Pagination.jsx`: page navigation
- `Sidebar.jsx` and `RecentPosts.jsx`: supporting browse UI
- `BlogManager.jsx`: complete management workflow

Landing page sections live in `frontend/components/landing`.

## Styling and Theme System

Global styling lives in [app/globals.css](/e:/personal/assignment/frontend/app/globals.css).

The UI uses CSS custom properties for:

- Primary color
- Secondary color
- Accent color
- Background and surface colors
- Border color
- Primary and secondary text colors

Theme behavior:

- Dark mode is the default
- Theme preference is stored in `localStorage`
- Theme switching is handled by `ThemeContext`
- Theme transitions are animated
- Custom text selection colors are defined for light and dark themes

Theme context is implemented in [context/ThemeContext.jsx](/e:/personal/assignment/frontend/context/ThemeContext.jsx).

## API Operations Used by the Frontend

The frontend currently uses these backend operations:

- `GET /blogs`
- `GET /blogs/:slug`
- `GET /blogs/recent`
- `POST /blogs`
- `PUT /blogs/:id`
- `DELETE /blogs/:id`
- `GET /categories`

These functions are wrapped in `frontend/lib/api.js`.

## Content Model Expected by the Frontend

Each blog is expected to contain:

- `title`
- `slug`
- `excerpt`
- `content`
- `thumbnail`
- `author.name`
- `author.avatar`
- `category`
- `tags`
- `readTime`
- `commentsCount`
- `publishedAt`
- `isFeatured`

This shape matches the backend `Blog` model.

## Image Handling

Blog thumbnails and author avatars are remote URLs. The frontend uses Next.js image optimization, so external image hosts must be allowed in [next.config.js](/e:/personal/assignment/frontend/next.config.js).

Current behavior:

- Remote image URLs are allowed through Next image configuration
- If an image still does not render, the source website may be blocking hotlinking or direct image access

## Project Structure

```text
frontend/
  app/
    blog/[slug]/
    blogs/
    manage-blogs/
    globals.css
    layout.jsx
    loading.jsx
    not-found.jsx
    page.jsx
  components/
    landing/
    BlogCard.jsx
    BlogDiscoverControls.jsx
    BlogList.jsx
    BlogManager.jsx
    CategoryFilter.jsx
    DarkModeToggle.jsx
    Footer.jsx
    MobileBlogExplore.jsx
    Navbar.jsx
    Pagination.jsx
    RecentPosts.jsx
    SearchBar.jsx
    Sidebar.jsx
    SkeletonCard.jsx
    SortSelect.jsx
  context/
    ThemeContext.jsx
  hooks/
    useDebounce.js
  lib/
    animations.js
    api.js
  jsconfig.json
  next.config.js
  package.json
  postcss.config.js
  tailwind.config.js
```

## Local Development

### 1. Install frontend dependencies

```bash
cd frontend
npm install
```

### 2. Start the frontend

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:3000
```

### 3. Start the backend separately

From the repository root:

```bash
cd backend
npm install
npm run dev
```

The backend is expected on:

```text
http://localhost:5000
```

## Build Commands

Frontend scripts from [package.json](/e:/personal/assignment/frontend/package.json):

- `npm run dev`: clears `.next` and starts the Next dev server
- `npm run build`: clears `.next` and creates a production build
- `npm run start`: starts the production server
- `npm run lint`: runs Next lint

## Current Strengths

- Clean separation between public browsing and content management
- API-backed CRUD flow for blogs
- Reusable UI components
- Themed design system with dark and light support
- App Router structure with route-based organization
- Modern editorial landing page

## Known Limitations

- No authentication or role protection on the management page
- No form-level URL validation for thumbnail or avatar inputs
- No image upload flow, only image URL input
- No rich-text editor, content is entered as raw HTML
- No comments system, only a displayed `commentsCount` field
- No test suite documented in the frontend package

## Who This README Is For

This frontend is suitable for:

- Recruiters or reviewers who want to understand the project quickly
- Developers onboarding to the codebase
- Teammates who need to run or extend the frontend
- Anyone evaluating the UI, architecture, or integration points

## Summary

The frontend is a full blog-reading and blog-management UI built with Next.js. It is connected to the backend API, supports themed UI, remote images, blog discovery features, and CRUD operations for blog posts. The codebase is organized in a way that is easy to extend with authentication, richer editor features, validation, and deployment configuration.
