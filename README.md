# ClubNest: Community Club and Event Management Platform

ClubNest is a vibrant community platform that enables users to discover, join, create, and manage local clubs and events. It connects people with shared passions, allowing them to organize meetups, workshops, and social gatherings while fostering real-world connections.

## Live Demo

Live Website: https://clubnest-commiunity.web.app

## Repositories Link

Repository (Frontend): https://github.com/obaidullah-miazi-dev/ClubNest-Web  
Repository (Backend): https://github.com/obaidullah-miazi-dev/ClubNest-Server

## Features

- User Authentication — Email/Password, Google login, and profile photo upload.
- Protected Routes — Access private dashboards and creation pages only when logged in.
- Discover Clubs — Search, filter by category, and sort clubs dynamically.
- Join Clubs & Events — Users can join clubs (with payment integration) and register for events.
- Create & Manage Clubs/Events — Club managers can create, update, and track their clubs/events.
- Responsive Design — Optimized for desktop, tablet, and mobile.
- Animations — Smooth lenis and Framer Motion animations.
- Dashboards — Separate dashboards for Admins, Club Managers, and Users with stats and Recharts visualizations.
- Payment System — Stripe payment integration and Success page with Lottie animation after transactions.
- Admin Controls — Approve/reject club manager requests and new clubs.
- Toast & Alert System — For feedback on actions like registrations and payments.

## Pages Overview

### Home Page (Public)

- Hero banner with video background.
- Get Started section with animated steps.
- Discover Clubs showcase.

### Clubs Page (Public)

- Search bar, category filters.
- Grid of club cards with details.

### Club Details (Public)

- Banner image, description, manager info, and join button.
- Displays location, fee, and status.

### Events Page (Public/Private)

- Grid of event cards with images, dates, and registration buttons.
- My Events dashboard showing joined/attended events.

### Event Details (Public)

- Hero banner, full description, date/time/location.
- Registration CTA with ticket info.

### Login/Register (Public)

- Forms with email, password (show/hide), full name, photo upload.
- Google sign-in integration.
- Responsive layouts with images.

### Profile Page (Private)

- User info from Firebase (name, email, photo, verification).
- Account Information.

### Become Club Manager (Private)

- Application form with experience, motivation, and terms agreement.

### Create Club/Event (Private - Managers)

- Forms with name, description, category, location, image upload, fee.

### Dashboards (Private)

- Admin: Stats cards, Recharts bar/pie/area charts for events, earnings, clubs, members.
- Club Manager: Similar stats focused on managed clubs/events/members/earnings.
- User: Stats on joined clubs, attended events, total spent.

### Payment Success (Private)

- Lottie animation, transaction ID, amount, and next steps buttons.

### Admin Approval Pages (Private - Admin)

- Tables for manager requests and new clubs with approve/reject buttons.

## Home Page of This Project

![Screenshot](./src/assets/ClubNest-Homepage.png)

## Technologies Used

| Category       | Tools/Library                            |
| -------------- | ---------------------------------------- |
| Frontend       | React.js, React Router DOM, Tailwind CSS |
| Animation      | Framer Motion, Lottie React              |
| Data Fetching  | Tanstack Query (React Query), Axios      |
| Authentication | Firebase Authentication                  |
| Charts         | Recharts                                 |
| Icons          | Lucide React                             |
| Hooks          | Custom hooks (e.g., useAxiosSecure)      |
| Hosting        | Firebase Hosting (Frontend)              |
| Database       | MongoDB                                  |
| Payments       | Stripe (assumed from payment success)    |


## npm pakages used in this project

- @tailwindcss/vite
- @tanstack/react-query
- axios
- daisyui
- firebase
- framer-motion
- lenis
- lottie-react
- lucide-react
- react
- react-datepicker
- react-dom
- react-hook-form
- react-lottie
- react-router
- recharts
- sweetalert2
- tailwindcss

## Running the “ClubNest” Project Locally

This guide explains how to run the Frontend. ClubNest primarily uses Express for backend services.
```bash
1. Clone the Repository  
   git clone https://github.com/obaidullah-miazi-dev/ClubNest-Web

2. Navigate to the folder  
   cd ClubNest-Web

3. Install dependencies  
   npm install

4. Create a .env file  
    Inside the folder, create .env and add:

   VITE_apiKey
   VITE_authDomain
   VITE_projectId
   VITE_storageBucket
   VITE_messagingSenderId
   VITE_appId
   VITE_IMGBB_API_KEY

   (Get Firebase credentials from Firebase Console > Project Settings)

5. Start the development server  
   npm run dev

   The app will run at: http://localhost:5173

```

## Theme Customization

- Light theme by default with Tailwind CSS.
- Purple accents (bg-main) for branding.
- Responsive with mobile-first design.

## Future Improvements

- Add real-time notifications for event updates.
- Implement chat/messaging within clubs.
- Advanced analytics for managers (e.g., attendance tracking).
- Mobile app integration.
- More payment gateways and refund system.

## Developed by Obaidullah Miazi

Email: obaidullahmiazi.dev@gmail.com 
LinkedIn: https://www.linkedin.com/in/obaidullah-miazi/

“Connect, Create, Community — ClubNest brings passions to life.”
