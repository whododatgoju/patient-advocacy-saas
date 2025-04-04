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
│   ├── components/      # Reusable UI components
│   │   ├── advocate/    # Advocate matching components
│   │   ├── common/      # Shared UI elements
│   │   ├── layout/      # Layout components
│   │   └── video/       # Video call components
│   ├── pages/           # Main application pages
│   ├── utils/           # Utility functions and API
│   └── types/           # TypeScript type definitions
└── development/         # Documentation and planning
    ├── architecture/    # System architecture diagrams
    ├── design/          # Design system and UI specifications
    └── research/        # Market research and user needs
```

## Environment Variables
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT token generation and validation

## License
This project is licensed under the MIT License - see the LICENSE file for details.
