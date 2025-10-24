# ResQwave

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Project Title

**ResQwave** - A comprehensive, multi-platform hazard reporting and emergency response system.

## Description

ResQwave is a robust solution designed to empower communities and authorities in responding to and managing hazards and emergencies more effectively. It provides a seamless platform for users to report incidents in real-time via a mobile application, while offering a powerful web dashboard for authorities to monitor, manage, and disseminate critical information. By integrating crowdsourced data with official communications, ResQwave aims to improve situational awareness and facilitate rapid, coordinated responses during critical times.

## Features

*   **Real-time Incident Reporting:** Mobile users can quickly report hazards, accidents, or emergencies with photo evidence and precise location data.
*   **Interactive Live Map:** A web-based dashboard displays all reported incidents and official notices on an interactive map for comprehensive overview and monitoring.
*   **Crowdsourced Information Hub:** Aggregates and visualizes crowdsourced incident data, providing valuable insights into potential dangers.
*   **Authority Management Dashboard:** A dedicated interface for emergency services and authorized personnel to review, verify, categorize, and manage incoming reports.
*   **Public Notice & Alert System:** Authorities can issue immediate public notices, safety advisories, and emergency alerts to all mobile application users.
*   **Multi-language Support:** The mobile application is localized to support various languages, ensuring accessibility for a diverse user base.
*   **User Profiles & History:** Users can maintain profiles and view their reporting history.
*   **Safety Tips & Resources:** Provides readily accessible safety guidelines and emergency preparedness tips within the mobile app.
*   **Cloud-based Media Storage:** Efficiently handles image uploads for reports, leveraging cloud storage for scalability and reliability.
*   **Real-time Notifications:** Keep users informed about nearby incidents, status updates on their reports, and important alerts.

## Tech Stack

ResQwave is built using a modern, scalable, and cross-platform technology stack.

**Backend:**
*   **Node.js / Express.js:** For building a fast, scalable, and efficient API server.
*   **MongoDB:** A flexible NoSQL database for storing incident reports, user data, notices, and other application information.
*   **Cloudinary:** Cloud-based media management platform for storing and serving incident photos.
*   **Multer:** Node.js middleware for handling `multipart/form-data`, primarily for file uploads.
*   **Mongoose:** ODM (Object Data Modeling) library for MongoDB and Node.js.

**Mobile (React Native):**
*   **React Native:** For building cross-platform mobile applications for iOS and Android.
*   **Expo:** A framework and platform for universal React applications, enabling rapid development and deployment.
*   **TypeScript:** For enhanced code quality, readability, and maintainability.
*   **NativeWind (Tailwind CSS for React Native):** For utility-first styling.
*   **Axios:** Promise-based HTTP client for making API requests.
*   **Zustand (or similar custom hook based store):** For lightweight and flexible state management.
*   **i18n:** For internationalization and multi-language support.

**Web (React.js):**
*   **React.js:** A declarative, component-based JavaScript library for building user interfaces.
*   **Vite:** A fast build tool that provides an extremely quick development experience.
*   **JavaScript (ES6+):** The primary programming language.
*   **CSS:** For styling the web dashboard.

## Installation Guide

To set up and run ResQwave locally, follow these steps. Ensure you have Node.js, npm/yarn, and MongoDB installed on your system.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or Yarn
*   MongoDB (running locally or a cloud instance)
*   Cloudinary Account (for backend image uploads)
*   Expo Go app on your mobile device (for testing the mobile app)

### 1. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install
# or
yarn install

# Create a .env file in the backend directory with your environment variables
# Example .env content:
# MONGODB_URI=mongodb://localhost:27017/resqwave
# CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
# CLOUDINARY_API_KEY=your_cloudinary_api_key
# CLOUDINARY_API_SECRET=your_cloudinary_api_secret
# PORT=5000

# Start the backend server
npm start
# or
yarn start
```
The backend server will typically run on `http://localhost:5000` (or the PORT specified in your `.env` file).

### 2. Mobile App Setup

```bash
# Navigate to the mobile directory
cd mobile

# Install dependencies
npm install
# or
yarn install

# Create a config file or set environment variables for your backend API URL
# (e.g., update `mobile/libs/axios.ts` base URL to point to your backend server)
# BASE_URL = 'http://YOUR_BACKEND_IP:5000/api/v1' (Use your machine's IP, not localhost, for mobile testing)

# Start the Expo development server
npm start
# or
yarn start
```
This will open an Expo development server in your browser. You can scan the QR code with the Expo Go app on your phone to run the app.

### 3. Web Dashboard Setup

```bash
# Navigate to the web directory
cd web

# Install dependencies
npm install
# or
yarn install

# Create a config file or set environment variables for your backend API URL
# (e.g., update `web/src/libs/axios.js` base URL to point to your backend server)
# VITE_API_URL=http://localhost:5000/api/v1 (for local development)

# Start the development server
npm run dev
# or
yarn dev
```
The web dashboard will typically be available at `http://localhost:5173` (or another port specified by Vite).

## Project Structure

```
.
├── .gitignore
├── backend/
│   ├── config/
│   │   └── cloudinary.js         # Cloudinary configuration
│   ├── index.js                  # Backend entry point
│   ├── libs/
│   │   └── mongo.js              # MongoDB connection setup
│   ├── middlewares/
│   │   └── multer.js             # Multer middleware for file uploads
│   ├── models/
│   │   ├── hazard.js             # Mongoose model for hazard reports
│   │   └── notice.model.js       # Mongoose model for public notices
│   ├── package.json              # Backend dependencies
│   ├── routes/
│   │   ├── notice.route.js       # API routes for notices
│   │   └── report.route.js       # API routes for incident reports
│   └── services/
│       └── notification.service.js # Notification handling service
├── mobile/
│   ├── .gitignore
│   ├── README.md
│   ├── app.json                  # Expo project configuration
│   ├── app/
│   │   ├── (auth)/               # Authentication routes (login, etc.)
│   │   │   ├── _layout.tsx
│   │   │   └── login.tsx
│   │   ├── Camera.tsx            # Camera screen for taking photos
│   │   ├── Profile.tsx           # User profile screen
│   │   ├── Report.tsx            # Incident reporting screen
│   │   ├── SafetyTips.tsx        # Safety tips screen
│   │   ├── _layout.tsx           # Mobile app layout
│   │   ├── global.css            # Global styles for NativeWind
│   │   └── index.tsx             # Home screen of the mobile app
│   ├── assets/                   # Static assets (images, icons)
│   ├── babel.config.js
│   ├── components/
│   │   └── CameraPreview.tsx     # Component for camera preview
│   ├── eslint.config.js
│   ├── i18n/                     # Internationalization setup
│   │   └── index.ts
│   ├── libs/
│   │   └── axios.ts              # Axios configuration for API calls
│   ├── locales/                  # Language translation files
│   │   ├── be.json
│   │   ├── en.json
│   │   ├── hi.json
│   │   ├── mr.json
│   │   ├── ta.json
│   │   └── te.json
│   ├── metro.config.js
│   ├── nativewind-env.d.ts
│   ├── package.json              # Mobile app dependencies
│   ├── store/                    # State management using Zustand
│   │   ├── useLanguageStore.ts
│   │   └── useReportStore.ts
│   ├── tailwind.config.js        # NativeWind/Tailwind CSS configuration
│   └── tsconfig.json             # TypeScript configuration
└── web/
    ├── .gitignore
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package.json              # Web app dependencies
    ├── public/                   # Public assets for the web app
    ├── src/
    │   ├── App.css
    │   ├── App.jsx               # Main React application component
    │   ├── assets/
    │   ├── index.css
    │   ├── main.jsx              # React entry point
    │   └── pages/                # Web dashboard pages
    │       ├── AuthorityDB.jsx   # Dashboard for authorities
    │       ├── CrowdSourced.jsx  # Crowdsourced data visualization
    │       ├── Home.jsx          # Web home page
    │       ├── LiveMap.jsx       # Live map for incident monitoring
    │       ├── Notice.jsx        # Public notice management
    │       └── SocialMedia.jsx   # Social media integration/monitoring page
    └── vite.config.js            # Vite build configuration
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

-- made by docify --
