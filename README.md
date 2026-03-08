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
   (The login page lives at `/admin/login` and is not linked in the public nav; a small footer link is provided.)

6. Run development server (front and backend):
   ```bash
   npm run start:all
   ```

7. Access the site at `http://localhost:3000` (or the automatic port from Next.js, e.g. 3001) and the admin dashboard at `http://localhost:3000/admin/login`.

**Deployment note:**  the GitHub repository only contains source code; it does not serve the website. To publish a working site you must deploy the project to a hosting service such as **Vercel**, **Netlify**, **Heroku**, etc. After deployment you will receive a public URL where the site (and `/admin/login`) will be available.

**Authentication:**  At the moment admins authenticate with email/password stored in MongoDB. You can extend this with OAuth (e.g. Google) using libraries like [NextAuth.js](https://next-auth.js.org) or passport.js. The current implementation is JWT-based; strengthen it by enforcing strong passwords and/or adding 2FA or OAuth as needed.


Feel free to customize pages, styles, and logic as needed.
