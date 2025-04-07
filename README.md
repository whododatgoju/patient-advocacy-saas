# Patient Advocacy Platform

## Overview
This repository contains a comprehensive Patient Advocacy SaaS Platform designed to empower patients, connect them with advocates, and provide essential healthcare resources. The platform features a modern, responsive design that works across devices and includes serverless backend functionality for secure data handling.

## Live Demo
The platform is deployed at: [https://peaceful-sfogliatella-0b0dbf.netlify.app](https://peaceful-sfogliatella-0b0dbf.netlify.app)

## Key Features

### 📱 Advocate Matching System
- Responsive design optimized for both mobile and desktop
- Advanced filtering by specialty, experience, language, and availability
- Interactive matching quiz for personalized recommendations
- Testimonials and ratings to help patients make informed decisions

### 🎥 Video Call System
- Complete 4-step scheduling process for booking calls
- Real-time video interface with controls for audio/video toggling
- Chat functionality during calls
- Appointment management dashboard
- Notifications for upcoming calls

### 📚 Resources Center
- Comprehensive patient rights information
- Insurance & billing guidance
- Medical records management help
- Legal information repository
- Self-advocacy tools and techniques
- Medication safety information

### 👤 Role-Specific User Profiles
- Patient profiles with medical conditions and health goals management
- Advocate profiles with specializations and languages tracking
- Provider profiles with professional information and licensure details
- Editable fields for all profile information
- Role-based dashboard customization

### 📋 Health Journey Timeline
- Interactive timeline of health events
- Tracking of appointments, treatments, and milestones
- Notes and documentation capabilities
- Visual representation of patient's health journey

### 🌓 Dark Mode Support
- System preference detection for automatic theme selection
- Manual theme toggle in the navigation bar
- Consistent styling across all components and pages
- Enhanced readability and reduced eye strain in low-light environments
- Persistent theme preference via localStorage

## Technology Stack
- **Frontend**: React (with Vite), TypeScript, CSS Modules
- **Backend**: Serverless functions (via Netlify Functions)
- **Database**: MongoDB (connected via environment variables)
- **Authentication**: JWT-based authentication
- **Real-time Communication**: Socket.io and Simple-Peer

## Deployment Instructions

### Netlify Deployment
1. Fork/Clone this repository
2. Connect your GitHub repository in the Netlify dashboard
3. Configure build settings:
   - Base directory: `patient-advocacy-frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Set up environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Secret key for JWT token generation/validation

### Local Development
1. Clone the repository
   ```
   git clone https://github.com/whododatgoju/patient-advocacy-saas.git
   cd patient-advocacy-saas
   ```

2. Install dependencies
   ```
   cd patient-advocacy-frontend
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the `patient-advocacy-frontend` directory:
   ```
   VITE_API_URL=http://localhost:8888/.netlify/functions/api
   ```

4. Start the development server
   ```
   npm run dev
   ```

5. For serverless functions development
   ```
   npm run netlify:dev
   ```

## Project Structure
```
patient-advocacy-frontend/
├── netlify/
│   └── functions/       # Serverless API functions
├── public/              # Static assets
├── src/
│   ├── assets/          # Images and other static resources
│   │   └── images/      # Image assets for the application
│   ├── components/      # Reusable UI components
│   │   ├── advocate/    # Advocate matching components
│   │   ├── common/      # Shared UI elements (buttons, inputs, notifications)
│   │   ├── journal/     # Health journaling components
│   │   ├── layout/      # Layout components (header, footer, sidebar)
│   │   ├── timeline/    # Health journey timeline components
│   │   └── video/       # Video call components
│   ├── contexts/        # React context providers
│   │   └── AuthContext.tsx  # Authentication context
│   ├── data/            # Mock data and constants
│   ├── pages/           # Main application pages
│   │   ├── AdvocateSearchPage.tsx  # Advocate discovery page
│   │   ├── DashboardPage.tsx       # User dashboard
│   │   ├── LoginPage.tsx           # Authentication page
│   │   ├── ProfilePage.tsx         # User profile management
│   │   ├── ResourcesPage.tsx       # Healthcare resources
│   │   └── VideoCallPage.tsx       # Video consultation interface
│   ├── services/        # API and service integrations
│   │   ├── AuthService.ts          # Authentication API
│   │   └── UserService.ts          # User profile management API
│   ├── styles/          # Global styles and variables
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions and helpers
└── development/         # Documentation and planning
    ├── architecture/    # System architecture diagrams
    ├── design/          # Design system and UI specifications
    └── research/        # Market research and user needs
```

## Testing & Development Features
- Test account system with role-specific demo users (patient, advocate, provider)
- MongoDB database with efficient indexing for user queries
- JWT-based authentication with secure token management

## Environment Variables
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT token generation and validation

## License
This project is licensed under the MIT License - see the LICENSE file for details.
