# Development Environment Setup Guide

## Overview

This guide provides step-by-step instructions for setting up the development environment for the Patient Advocacy Platform. The platform consists of a web application built with React Vite and a mobile application built with React Native.

## Prerequisites

Before beginning, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** for version control
- A code editor (VS Code recommended)
- For mobile development:
  - **Xcode** (Mac only, for iOS development)
  - **Android Studio** (for Android development)
  - **CocoaPods** (for iOS dependencies)

## Project Repository Structure

```
patient-advocacy-platform/
├── packages/                   # Monorepo packages
│   ├── common/                 # Shared code, components, and utilities
│   │   ├── components/         # Shared React components
│   │   ├── hooks/              # Shared React hooks
│   │   ├── utils/              # Shared utility functions
│   │   ├── api/                # API client and services
│   │   └── types/              # TypeScript type definitions
│   │
│   ├── web/                    # React Vite web application
│   │   ├── public/             # Static assets
│   │   ├── src/                # Source code
│   │   │   ├── assets/         # Web-specific assets
│   │   │   ├── components/     # Web-specific components
│   │   │   ├── pages/          # Page components
│   │   │   ├── routes/         # Routing configuration
│   │   │   ├── store/          # State management
│   │   │   ├── styles/         # Global styles
│   │   │   ├── App.tsx         # Root component
│   │   │   └── main.tsx        # Entry point
│   │   ├── index.html          # HTML template
│   │   ├── tsconfig.json       # TypeScript configuration
│   │   └── vite.config.ts      # Vite configuration
│   │
│   └── mobile/                 # React Native mobile application
│       ├── android/            # Android-specific code
│       ├── ios/                # iOS-specific code
│       ├── src/                # Source code
│       │   ├── assets/         # Mobile-specific assets
│       │   ├── components/     # Mobile-specific components
│       │   ├── screens/        # Screen components
│       │   ├── navigation/     # Navigation configuration
│       │   ├── store/          # State management
│       │   ├── styles/         # Global styles
│       │   ├── App.tsx         # Root component
│       │   └── index.tsx       # Entry point
│       ├── tsconfig.json       # TypeScript configuration
│       └── app.json           # React Native configuration
│
├── api/                        # Backend API services (if applicable)
├── design/                     # Design assets and documentation
│   ├── tokens/                 # Design tokens
│   ├── assets/                 # Shared assets (icons, illustrations)
│   └── prototypes/             # Design prototypes
│
├── docs/                       # Project documentation
├── scripts/                    # Development and build scripts
├── package.json                # Root package.json for workspace configuration
├── tsconfig.json               # Base TypeScript configuration
├── jest.config.js              # Jest configuration for testing
└── README.md                   # Project overview
```

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-organization/patient-advocacy-platform.git
cd patient-advocacy-platform
```

### 2. Install Dependencies

We use Yarn workspaces to manage the monorepo structure:

```bash
# Install yarn if you don't have it
npm install -g yarn

# Install all dependencies
yarn install
```

### 3. Set Up Environment Variables

Create environment files for each environment:

```bash
# Development environment
cp .env.example .env.development

# Production environment
cp .env.example .env.production

# Edit the files with appropriate values for each environment
```

## Web Application Setup (React Vite)

### 1. Start Development Server

```bash
# From the root directory
yarn web:dev

# Or navigate to the web package
cd packages/web
yarn dev
```

The development server will start at http://localhost:3000 with hot module replacement enabled.

### 2. Available Scripts

- `yarn web:dev`: Start development server
- `yarn web:build`: Build for production
- `yarn web:preview`: Preview production build locally
- `yarn web:lint`: Lint the code
- `yarn web:test`: Run tests

### 3. VS Code Configuration

For optimal development experience, install the following VS Code extensions:

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Vite
- Jest Runner
- Path Intellisense

Apply the VS Code settings from the `.vscode/settings.json` file in the repository.

## Mobile Application Setup (React Native)

### 1. iOS Setup

**Mac users only:**

```bash
# Install CocoaPods if you don't have it
sudo gem install cocoapods

# Install iOS dependencies
cd packages/mobile/ios
pod install
cd ../../..

# Start iOS simulator
yarn mobile:ios
```

### 2. Android Setup

```bash
# Ensure you have Android Studio installed with SDK tools

# Start Android emulator (create one in Android Studio if needed)
yarn mobile:android
```

### 3. Available Scripts

- `yarn mobile:start`: Start React Native metro bundler
- `yarn mobile:ios`: Run on iOS simulator
- `yarn mobile:android`: Run on Android emulator
- `yarn mobile:lint`: Lint the code
- `yarn mobile:test`: Run tests

### 4. Device Testing

To test on physical devices:

- **iOS**: Connect device via USB, trust computer, and select the device in Xcode
- **Android**: Enable USB debugging, connect device, and run `yarn mobile:android`

## Common Package Development

The common package contains shared code between web and mobile applications:

```bash
# Build common package
cd packages/common
yarn build

# Watch for changes during development
yarn build:watch
```

## Testing Setup

### Unit Testing

We use Jest for unit testing:

```bash
# Run all tests
yarn test

# Run tests with coverage
yarn test:coverage

# Run tests in watch mode
yarn test:watch
```

### End-to-End Testing

We use Cypress for web e2e tests and Detox for mobile e2e tests:

```bash
# Web e2e tests
yarn e2e:web

# Mobile e2e tests (iOS)
yarn e2e:ios

# Mobile e2e tests (Android)
yarn e2e:android
```

## Git Workflow

1. Create a new branch for each feature or fix:
   ```bash
   git checkout -b feature/feature-name
   ```

2. Make commits with descriptive messages following conventional commits:
   ```bash
   git commit -m "feat: add patient dashboard"
   git commit -m "fix: resolve login error on slow connections"
   ```

3. Push to remote and create a pull request:
   ```bash
   git push -u origin feature/feature-name
   ```

4. Ensure CI passes before merging

## Code Style and Linting

We use ESLint and Prettier for code quality:

```bash
# Lint all code
yarn lint

# Format all code
yarn format
```

The configurations are in:
- `.eslintrc.js`: ESLint rules
- `.prettierrc`: Prettier formatting rules
- `tsconfig.json`: TypeScript configuration

## Troubleshooting Common Issues

### Metro Bundler Issues

If you encounter problems with the React Native metro bundler:

```bash
# Clear cache and restart
yarn mobile:clear-cache
```

### iOS Build Issues

For iOS dependency or build problems:

```bash
cd packages/mobile/ios
pod deintegrate
pod install
```

### Node Modules Issues

For dependency-related problems:

```bash
# Remove node_modules and reinstall
yarn clean
yarn install
```

## Next Steps

After setting up your development environment:

1. Familiarize yourself with the [Architecture Documentation](/development/architecture/system_architecture.md)
2. Review the [Design System](/development/design/design_system.md)
3. Check the [Feature Specifications](/development/features/core_features.md)
4. Start with implementing a small component or feature to verify your setup

## Support

If you encounter issues not covered in this guide:

1. Check the project documentation in the `/docs` directory
2. Review existing GitHub issues
3. Contact the development team via the project Slack channel
