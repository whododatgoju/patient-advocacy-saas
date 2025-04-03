# Web Application Implementation Guide (React Vite)

## Overview

This guide provides instructions for implementing the Patient Advocacy Platform web application using React Vite. It covers the application structure, key implementation patterns, and best practices aligned with our design system and architecture.

## Technology Stack

- **Framework**: React 18+
- **Build Tool**: Vite
- **Language**: TypeScript
- **State Management**: Redux Toolkit + React Query
- **Styling**: Tailwind CSS + Styled Components
- **UI Components**: Custom component library
- **Routing**: React Router v6
- **Form Handling**: React Hook Form
- **API Communication**: Axios
- **Testing**: Jest + React Testing Library
- **Accessibility**: React Aria + custom implementations

## Project Structure

```
packages/web/
├── public/                # Static assets (favicons, manifest, etc.)
├── src/
│   ├── assets/            # Images, fonts, and other static assets
│   ├── components/        # Reusable UI components
│   │   ├── core/          # Basic UI elements
│   │   ├── composite/     # Composed components
│   │   ├── layout/        # Layout components
│   │   └── features/      # Feature-specific components
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   │   ├── patient/       # Patient-facing pages
│   │   ├── advocate/      # Advocate-facing pages
│   │   └── provider/      # Provider-facing pages
│   ├── routes/            # Routing configuration
│   ├── services/          # API and external services
│   ├── store/             # Redux store configuration
│   │   ├── slices/        # Redux Toolkit slices
│   │   ├── selectors/     # Reselect selectors
│   │   ├── middleware/    # Custom Redux middleware
│   │   └── index.ts       # Store configuration
│   ├── styles/            # Global styles and Tailwind configuration
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Root component
│   └── main.tsx           # Entry point
├── index.html             # HTML template
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## Core Implementation Patterns

### 1. Component Organization

Components follow a hierarchical structure:

```jsx
// Core component example - Button.tsx
import React from 'react';
import classNames from 'classnames';
import { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  isFullWidth = false,
  isDisabled = false,
  children,
  onClick,
  ...props
}) => {
  const buttonClasses = classNames(
    'px-4 py-2 rounded font-medium focus:outline-none focus:ring-2',
    {
      'bg-primary-600 text-white hover:bg-primary-700': variant === 'primary',
      'border border-gray-300 text-gray-700 hover:bg-gray-50': variant === 'secondary',
      'text-primary-600 hover:text-primary-700': variant === 'text',
      'text-sm px-3 py-1': size === 'small',
      'text-lg px-5 py-3': size === 'large',
      'w-full': isFullWidth,
      'opacity-50 cursor-not-allowed': isDisabled,
    }
  );

  return (
    <button
      className={buttonClasses}
      disabled={isDisabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
```

### 2. Page Structure

Pages combine components with data fetching and business logic:

```jsx
// Patient Dashboard Page
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

import { PageLayout, LoadingSpinner, ErrorMessage } from '@/components/layout';
import { ResourceCard, UpcomingAppointments, HealthSummary } from '@/components/features/patient';
import { fetchPatientDashboardData } from '@/services/api/patient';
import { selectCurrentPatient } from '@/store/selectors/patientSelectors';

export const PatientDashboardPage: React.FC = () => {
  const currentPatient = useSelector(selectCurrentPatient);
  const { data, isLoading, error } = useQuery(
    ['patientDashboard', currentPatient?.id],
    () => fetchPatientDashboardData(currentPatient?.id),
    { enabled: !!currentPatient?.id }
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error as Error} />;

  return (
    <PageLayout title="Your Dashboard" className="gap-6">
      <HealthSummary patientData={data.healthSummary} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UpcomingAppointments appointments={data.appointments} />
        </div>
        <div>
          <ResourceCard resources={data.recommendedResources} />
        </div>
      </div>
    </PageLayout>
  );
};
```

### 3. Routing & Navigation

Implement role-based routing with protected routes:

```jsx
// routes/index.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

import { RootLayout } from '@/components/layout';
import { LandingPage, LoginPage, RegisterPage } from '@/pages/auth';
import { patientRoutes } from './patientRoutes';
import { advocateRoutes } from './advocateRoutes';
import { providerRoutes } from './providerRoutes';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRouter = () => {
  const { isAuthenticated, userRole } = useAuth();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <LandingPage /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage /> },
        
        // Protected routes by role
        {
          path: 'patient/*',
          element: (
            <ProtectedRoute isAllowed={isAuthenticated && userRole === 'PATIENT'}>
              {patientRoutes}
            </ProtectedRoute>
          ),
        },
        {
          path: 'advocate/*',
          element: (
            <ProtectedRoute isAllowed={isAuthenticated && userRole === 'ADVOCATE'}>
              {advocateRoutes}
            </ProtectedRoute>
          ),
        },
        {
          path: 'provider/*',
          element: (
            <ProtectedRoute isAllowed={isAuthenticated && userRole === 'PROVIDER'}>
              {providerRoutes}
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
```

### 4. State Management

Combine Redux for global state with React Query for server state:

```jsx
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from './slices/userSlice';
import preferencesReducer from './slices/preferencesSlice';
import { api } from '../services/api';

export const store = configureStore({
  reducer: {
    user: userReducer,
    preferences: preferencesReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// hooks/useApiQuery.ts - Wrapper for React Query with accessibility considerations
import { useQuery, UseQueryOptions } from 'react-query';
import { useAnnounce } from './useAnnounce';

export function useApiQuery<TData, TError>(
  queryKey: any,
  queryFn: () => Promise<TData>,
  options?: UseQueryOptions<TData, TError>
) {
  const announce = useAnnounce();
  const query = useQuery<TData, TError>(queryKey, queryFn, {
    ...options,
    onError: (error) => {
      announce(`Error loading data: ${error}`);
      options?.onError?.(error);
    },
  });

  return query;
}
```

## Implementing Accessibility Features

### 1. Reading Level Adaptation

```jsx
// hooks/useReadingLevel.ts
import { useSelector } from 'react-redux';
import { selectUserPreferences } from '@/store/selectors/userSelectors';

export function useReadingLevel() {
  const { readingLevel = 'standard' } = useSelector(selectUserPreferences);
  
  return {
    readingLevel,
    getContentForReadingLevel: (content: { 
      standard: string;
      simplified?: string;
      basic?: string;
    }) => {
      if (readingLevel === 'basic' && content.basic) {
        return content.basic;
      }
      if (readingLevel === 'simplified' && content.simplified) {
        return content.simplified;
      }
      return content.standard;
    }
  };
}

// Usage in component
import { useReadingLevel } from '@/hooks/useReadingLevel';

export const InfoCard = ({ content }) => {
  const { getContentForReadingLevel } = useReadingLevel();
  
  return (
    <div className="p-4 border rounded">
      <p>{getContentForReadingLevel(content)}</p>
    </div>
  );
};
```

### 2. Focus Management

```jsx
// hooks/useFocusManagement.ts
import { useRef, useEffect } from 'react';

export function useFocusManagement<T extends HTMLElement>(
  shouldFocus: boolean = false,
  { preventScroll = false } = {}
) {
  const elementRef = useRef<T>(null);
  
  useEffect(() => {
    if (shouldFocus && elementRef.current) {
      elementRef.current.focus({ preventScroll });
    }
  }, [shouldFocus, preventScroll]);
  
  return elementRef;
}

// Usage in component
import { useFocusManagement } from '@/hooks/useFocusManagement';

export const ErrorMessage = ({ error, onClose }) => {
  const errorRef = useFocusManagement<HTMLDivElement>(true);
  
  return (
    <div 
      ref={errorRef}
      role="alert"
      tabIndex={-1}
      className="p-4 bg-red-100 text-red-700 rounded"
    >
      {error.message}
      <button onClick={onClose}>Dismiss</button>
    </div>
  );
};
```

### 3. Keyboard Navigation

```jsx
// components/navigation/NavigationMenu.tsx
import React, { useRef, useState, KeyboardEvent } from 'react';
import { NavLink } from 'react-router-dom';

export const NavigationMenu = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const menuRef = useRef<HTMLUListElement>(null);
  
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % items.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
        break;
      case 'Home':
        e.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setActiveIndex(items.length - 1);
        break;
    }
  };
  
  useEffect(() => {
    const links = menuRef.current?.querySelectorAll('a');
    links?.[activeIndex]?.focus();
  }, [activeIndex]);
  
  return (
    <nav aria-label="Main Navigation">
      <ul 
        ref={menuRef}
        role="menubar"
        onKeyDown={handleKeyDown}
        className="flex space-x-4"
      >
        {items.map((item, index) => (
          <li key={item.path} role="none">
            <NavLink
              to={item.path}
              role="menuitem"
              tabIndex={index === activeIndex ? 0 : -1}
              className={({ isActive }) =>
                `px-3 py-2 ${isActive ? 'font-bold text-primary-600' : ''}`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

## Offline Functionality

Implement service workers and offline cache strategies:

```jsx
// src/service-worker.ts
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

clientsClaim();

// Precache all static assets generated by Vite
precacheAndRoute(self.__WB_MANIFEST);

// Cache page navigations (HTML)
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'pages',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  })
);

// Cache static assets (CSS, JS, images)
registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

// Cache API requests
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'api-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60, // 1 hour
      }),
    ],
  })
);

// Fallback page for offline access
const offlineFallbackPage = '/offline.html';
registerRoute(
  ({ request }) => request.mode === 'navigate' && !navigator.onLine,
  ({ url }) => {
    return caches.match(offlineFallbackPage);
  }
);
```

## Multi-Modal Content Delivery

```jsx
// components/content/AdaptiveContent.tsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserPreferences, selectConnectionStatus } from '@/store/selectors/userSelectors';
import { TextToSpeech } from '@/components/accessibility/TextToSpeech';

type ContentFormat = 'text' | 'audio' | 'video' | 'simplified';

type AdaptiveContentProps = {
  content: {
    text: {
      standard: string;
      simplified?: string;
      basic?: string;
    };
    audio?: string;
    video?: string;
    imageAlt?: string;
  };
  title: string;
  image?: string;
};

export const AdaptiveContent: React.FC<AdaptiveContentProps> = ({
  content,
  title,
  image,
}) => {
  const { readingLevel, preferredFormat } = useSelector(selectUserPreferences);
  const { isOffline, connectionSpeed } = useSelector(selectConnectionStatus);
  const [activeFormat, setActiveFormat] = useState<ContentFormat>(preferredFormat || 'text');
  
  // Determine best format based on preferences and connection
  const getBestFormat = (): ContentFormat => {
    if (isOffline) return 'text';
    if (connectionSpeed === 'slow' && activeFormat === 'video') return 'audio';
    return activeFormat;
  };
  
  // Get appropriate text based on reading level
  const getText = () => {
    if (readingLevel === 'basic' && content.text.basic) {
      return content.text.basic;
    }
    if (readingLevel === 'simplified' && content.text.simplified) {
      return content.text.simplified;
    }
    return content.text.standard;
  };
  
  const currentFormat = getBestFormat();
  
  return (
    <div className="adaptive-content">
      <h2>{title}</h2>
      
      {image && (
        <img 
          src={image} 
          alt={content.imageAlt || ''} 
          loading="lazy"
          className="max-w-full h-auto rounded"
        />
      )}
      
      <div className="format-selector mb-4 flex space-x-2">
        <button 
          onClick={() => setActiveFormat('text')}
          className={`px-3 py-1 rounded ${currentFormat === 'text' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
        >
          Text
        </button>
        {content.audio && !isOffline && (
          <button 
            onClick={() => setActiveFormat('audio')}
            className={`px-3 py-1 rounded ${currentFormat === 'audio' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          >
            Audio
          </button>
        )}
        {content.video && !isOffline && connectionSpeed !== 'slow' && (
          <button 
            onClick={() => setActiveFormat('video')}
            className={`px-3 py-1 rounded ${currentFormat === 'video' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          >
            Video
          </button>
        )}
      </div>
      
      {currentFormat === 'text' && (
        <div className="text-content">
          <p>{getText()}</p>
          <TextToSpeech text={getText()} />
        </div>
      )}
      
      {currentFormat === 'audio' && content.audio && (
        <audio controls className="w-full">
          <source src={content.audio} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
      
      {currentFormat === 'video' && content.video && (
        <video controls className="w-full">
          <source src={content.video} type="video/mp4" />
          Your browser does not support the video element.
        </video>
      )}
    </div>
  );
};
```

## Progressive Web App Configuration

```javascript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Patient Advocacy Platform',
        short_name: 'Advocacy',
        description: 'Platform connecting patients, advocates, and providers',
        theme_color: '#1A73E8',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          // Additional icon sizes...
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        // Custom service worker configuration
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.advocacy-platform\.org\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60, // 1 hour
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
```

## Implementation Roadmap

Following the project phases, implement features in this order:

### Phase 1: Foundation
1. Setup project structure
2. Authentication & user management
3. Core design system implementation
4. Routing framework
5. API client configuration

### Phase 2: Patient Experience
1. User profile management
2. Health information dashboard
3. Resource discovery components
4. Offline support foundations
5. Basic community features

### Phase 3: Advocate Tools
1. Case management interface
2. Resource library implementation
3. Secure messaging components
4. Documentation tools

### Phase 4: Healthcare Provider Integration
1. Provider portal views
2. Care coordination interfaces
3. Referral management
4. EHR integration connectors

## Performance Optimization

### 1. Code Splitting

```jsx
// Dynamic imports for route-based code splitting
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/components/core';

const PatientDashboard = lazy(() => import('@/pages/patient/Dashboard'));
const AdvocatePortal = lazy(() => import('@/pages/advocate/Portal'));
const ProviderView = lazy(() => import('@/pages/provider/View'));

// In router configuration
{
  path: 'patient/dashboard',
  element: (
    <Suspense fallback={<LoadingSpinner />}>
      <PatientDashboard />
    </Suspense>
  )
}
```

### 2. Image Optimization

Use responsive images with appropriate formats:

```jsx
// components/common/ResponsiveImage.tsx
import React from 'react';

type ResponsiveImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
};

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  sizes = '100vw',
  className = '',
  loading = 'lazy',
}) => {
  // Generate WebP source if not already WebP
  const generateSrcSet = (baseUrl: string) => {
    const isWebP = baseUrl.endsWith('.webp');
    const basePath = baseUrl.substring(0, baseUrl.lastIndexOf('.'));
    
    if (isWebP) {
      return `
        ${baseUrl} 1x,
        ${basePath}@2x.webp 2x
      `;
    }
    
    const extension = baseUrl.substring(baseUrl.lastIndexOf('.'));
    
    return `
      ${baseUrl} 1x,
      ${basePath}@2x${extension} 2x,
      ${basePath}.webp 1x,
      ${basePath}@2x.webp 2x
    `;
  };
  
  return (
    <picture>
      <source type="image/webp" srcSet={generateSrcSet(src)} sizes={sizes} />
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={className}
        sizes={sizes}
      />
    </picture>
  );
};
```

## Testing Implementation

### Component Tests

```jsx
// components/core/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  test('renders correctly with default props', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary-600');
  });
  
  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  test('applies disabled state correctly', () => {
    render(<Button isDisabled>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeDisabled();
  });
  
  test('applies variant styles correctly', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button', { name: /primary/i })).toHaveClass('bg-primary-600');
    
    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button', { name: /secondary/i })).toHaveClass('border-gray-300');
  });
});
```

### E2E Tests with Cypress

```javascript
// cypress/e2e/authentication.cy.js
describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should allow a user to log in', () => {
    cy.get('[data-cy=login-button]').click();
    cy.url().should('include', '/login');
    
    cy.get('[data-cy=email-input]').type('test@example.com');
    cy.get('[data-cy=password-input]').type('Password123!');
    cy.get('[data-cy=submit-button]').click();
    
    cy.url().should('include', '/dashboard');
    cy.get('[data-cy=user-greeting]').should('contain', 'Welcome');
  });
  
  it('should show validation errors for invalid inputs', () => {
    cy.get('[data-cy=login-button]').click();
    cy.get('[data-cy=submit-button]').click();
    
    cy.get('[data-cy=email-error]').should('be.visible');
    cy.get('[data-cy=password-error]').should('be.visible');
  });
  
  it('should allow a user to reset their password', () => {
    cy.get('[data-cy=login-button]').click();
    cy.get('[data-cy=forgot-password]').click();
    
    cy.url().should('include', '/reset-password');
    cy.get('[data-cy=email-input]').type('test@example.com');
    cy.get('[data-cy=submit-button]').click();
    
    cy.get('[data-cy=confirmation-message]').should('be.visible');
  });
});
```

## Deployment Configuration

```yaml
# .github/workflows/deploy.yml
name: Deploy Web Application

on:
  push:
    branches: [main]
    paths:
      - 'packages/web/**'
      - 'packages/common/**'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'yarn'
      
      - name: Install dependencies
        run: yarn install --frozen-lockfile
      
      - name: Build common package
        run: |
          cd packages/common
          yarn build
      
      - name: Run tests
        run: |
          cd packages/web
          yarn test
      
      - name: Build web application
        run: |
          cd packages/web
          yarn build
        env:
          VITE_API_URL: ${{ secrets.PRODUCTION_API_URL }}
          VITE_ENVIRONMENT: production
      
      - name: Deploy to hosting
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: patient-advocacy-platform
```

## Resources and References

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/introduction/getting-started)
- [React Query Documentation](https://tanstack.com/query/latest)
- [React Router Documentation](https://reactrouter.com/docs/en/v6)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
- [React Aria Components](https://react-spectrum.adobe.com/react-aria/)
