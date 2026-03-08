# FRAMA Nature Adventures Website

This project is a Next.js application with a Node/Express backend and MongoDB database. It provides a dynamic eco-tourism website for FRAMA Nature Adventures (FRAMA Eco-Lodge) including an admin dashboard for managing content.

## Features

- Responsive design with Tailwind CSS and Framer Motion animations
- Dynamic pages: rooms, activities, gallery, about page, contact, testimonials
- Booking system storing requests in MongoDB
- Admin dashboard with JWT authentication
- CRUD operations for rooms, activities, gallery, about content, and bookings
- SEO-friendly meta tags and optimized assets

## Tech Stack

- Frontend: Next.js, React, Tailwind CSS, Framer Motion
- Backend: Node.js, Express.js (with Next API routes)
- Database: MongoDB (Mongoose)
- Authentication: JWT

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in your MongoDB URI and JWT secret.

3. Create an admin user:
   ```bash
   npm run create-admin -- your-email@example.com yourpassword
   ```

4. Run development server (front and backend):
   ```bash
   npm run start:all
   ```

5. Access the site at `http://localhost:3000` and admin dashboard at `http://localhost:3000/admin`.


Feel free to customize pages, styles, and logic as needed.
