Online Store is a modern React + Vite application built to manage cars, user authentication, and admin workflows. It uses React Router for navigation, React Hook Form for validated forms, Axios for API integration, and Tailwind CSS via Vite for responsive styling.

Deploy URL: https://stalwart-druid-2a689a.netlify.app/

Figma link: https://www.figma.com/design/80rIHzJI5NZIhZAaZm5Skc/Untitled?node-id=0-1&t=4rSGtmDQcXW7rEM3-1

Features
- Browse car listings with dynamic search and filtering.
- View detailed car pages and manage inventory from admin area.
- Protected routes for authenticated users and role-based admin areas.
- Create, edit, and delete car entries through intuitive forms.
- Login, register, profile, dashboard, and error handling pages.

Project Structure
- src/pages: main pages including Home, CarList, CarDetail, Admin, Login, Register, Profile.
- src/components: reusable UI elements such as Navbar, LoadingSpinner, ErrorMessage, SearchFilter.
- src/context: authentication provider and session logic.
- src/api: service modules for backend communication.
- src/layouts: layout containers for application shell.

Getting Started
1. Install dependencies: npm install
2. Start dev server: npm run dev
3. Build for production: npm run build
4. Preview build: npm run preview

This repository is ideal for frontend developers learning a real-world Vite + React app with auth, routing, and Tailwind-driven UI. Adapt it to any product inventory or e-commerce workflow. It is clean, maintainable, and extensible.
