# Patient Advocacy Platform: UI Component Specifications

This document provides detailed specifications for all UI components in the Patient Advocacy Platform. It should be used in conjunction with the design system principles defined in `design_system.md`.

## Component Library

### Button Specifications

#### Button Types
1. **Primary Button**
   - Background: Primary Blue (`#3b82f6`)
   - Text: White
   - Border: None
   - Hover: Darker blue (`#2563eb`)
   - Active: Darkest blue (`#1d4ed8`)
   - Padding: 12px 24px (varies by button size)

2. **Secondary Button**
   - Background: White
   - Text: Primary Blue (`#3b82f6`)
   - Border: 1px solid Primary Blue (`#3b82f6`)
   - Hover: Light blue background (`#eff6ff`)
   - Active: Slightly darker blue background (`#dbeafe`)
   - Padding: 12px 24px (varies by button size)

3. **Tertiary Button**
   - Background: Transparent
   - Text: Primary Blue (`#3b82f6`)
   - Border: None
   - Hover: Light blue background (`#eff6ff`)
   - Active: Slightly darker blue background (`#dbeafe`)
   - Padding: 12px 24px (varies by button size)

4. **Danger Button**
   - Background: Error Red (`#ef4444`)
   - Text: White
   - Border: None
   - Hover: Darker red (`#dc2626`)
   - Active: Darkest red (`#b91c1c`)
   - Padding: 12px 24px (varies by button size)

#### Button Sizes
1. **Small**
   - Height: 32px
   - Font Size: 14px
   - Padding: 8px 16px
   - Border Radius: 4px

2. **Medium (Default)**
   - Height: 40px
   - Font Size: 16px
   - Padding: 10px 20px
   - Border Radius: 6px

3. **Large**
   - Height: 48px
   - Font Size: 18px
   - Padding: 12px 24px
   - Border Radius: 8px

#### Button States
- **Default**: As described above
- **Hover**: Slightly darker background
- **Active/Pressed**: Darkest background
- **Focus**: 2px blue outline offset by 2px
- **Disabled**: 60% opacity, no hover effects, cursor not-allowed

### Input Specifications

#### Text Input
- Height: 40px (default)
- Padding: 10px 12px
- Border: 1px solid Gray-300 (`#d1d5db`)
- Border Radius: 6px
- Background: White
- Text Color: Gray-900 (`#111827`)
- Placeholder Color: Gray-400 (`#9ca3af`)
- Font Size: 16px

#### Input States
- **Default**: As described above
- **Focus**: Border color Primary Blue (`#3b82f6`), blue outline
- **Error**: Border color Error Red (`#ef4444`), optional error message below
- **Disabled**: Background Gray-100 (`#f3f4f6`), opacity 0.7, cursor not-allowed

#### Input Variations
1. **Text Area**
   - Min-height: 80px
   - Padding: 12px
   - Resize: Vertical

2. **Select Input**
   - Same dimensions as text input
   - Custom dropdown icon
   - Options with 12px padding and hover state

3. **Checkbox & Radio**
   - Size: 18px × 18px
   - Border Radius: 4px (checkbox), 50% (radio)
   - Checked State: Primary Blue background

4. **Toggle/Switch**
   - Track Size: 36px × 20px
   - Thumb Size: 16px × 16px
   - Off State: Gray-300 track
   - On State: Primary Blue track

### Card Specifications

1. **Standard Card**
   - Background: White
   - Border: 1px solid Gray-200 (`#e5e7eb`)
   - Border Radius: 8px
   - Padding: 24px
   - Shadow: `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)`

2. **Interactive Card**
   - Same as standard card
   - Hover State: Slight elevation increase, subtle border color change
   - Active State: Slight scale down (98%)

3. **Highlighted Card**
   - Same as standard card
   - Border-left: 4px solid Primary Blue (`#3b82f6`)
   - Slightly enhanced shadow

4. **Resource Card**
   - Image area: 16:9 ratio at top
   - Content area: Title, description, metadata
   - Action area: Buttons, saved indicator, sharing options

### Navigation Components

#### Main Navigation
- Height: 64px on desktop, 56px on mobile
- Background: White
- Border-bottom: 1px solid Gray-200 (`#e5e7eb`)
- Logo area: Left-aligned
- Navigation links: Center or right-aligned
- Active link: Bottom border in Primary Blue
- Mobile: Collapsible with hamburger menu

#### Sidebar Navigation
- Width: 256px on desktop, full-width overlay on mobile
- Background: White
- Border-right: 1px solid Gray-200 (`#e5e7eb`)
- Section Headers: 16px uppercase Gray-500 text
- Links: 16px Gray-700 text with 16px padding
- Active Link: Primary Blue text, light blue background
- Icons: 20px, left-aligned with 12px right margin

#### Tab Navigation
- Border-bottom: 1px solid Gray-200 (`#e5e7eb`)
- Tab Height: 48px
- Padding: 12px 16px
- Inactive Tab: Gray-700 text
- Active Tab: Primary Blue text with bottom border
- Hover State: Gray-100 background

### Special Components

#### Profile Card
- **Patient Profile**
  - Avatar: 64px circle
  - Name: 18px semi-bold
  - Role Badge: Patient (Indigo background)
  - Key Information: Medical conditions, health goals
  - Actions: Message, View Details, Schedule

- **Advocate Profile**
  - Avatar: 64px circle
  - Name: 18px semi-bold
  - Role Badge: Advocate (Emerald background)
  - Key Information: Specializations, years of experience
  - Rating: 5-star system with average display
  - Actions: Contact, View Profile, Schedule

- **Provider Profile**
  - Avatar: 64px circle
  - Name: 18px semi-bold
  - Role Badge: Provider (Blue background)
  - Key Information: Specialization, organization
  - Actions: Contact, View Details, Schedule

#### Case Management Card
- Status Indicator: Color-coded (New, In Progress, Resolved)
- Patient/Advocate Information: Name and avatar
- Case Title: 18px semi-bold
- Brief Description: Max 2 lines with truncation
- Key Metrics: Creation date, last update
- Actions: View Details, Update, Message

#### Resource Entry
- Category Indicator: Color-coded pill
- Title: 18px semi-bold
- Brief Description: Max 2 lines with truncation
- Metadata: Source, date added
- Actions: Save, Share, View Details

## Page Templates

### Home Page Layout
- **Hero Section**
  - Full-width background image or gradient
  - H1 headline: 48px bold
  - Subheadline: 20px light
  - CTA Button: Large Primary Button
  - Optional: Feature highlight icons
  
- **Features Section**
  - 3-column grid on desktop, single column on mobile
  - Icon + Heading + Description for each feature
  - Optional: "Learn More" links
  
- **Testimonials Section**
  - Card-based testimonial display
  - Avatar + Name + Role for each testimonial
  - Quote in italics
  - Testimonial rotation on mobile
  
- **CTA Section**
  - Background color: Light Gray or brand gradient
  - H2 headline: 36px semi-bold
  - Supporting text: 18px regular
  - Primary CTA button
  - Secondary action link

### Dashboard Layouts

#### Patient Dashboard
- **Header**
  - Welcome message with name
  - Quick stats summary
  - Action buttons (New Case, etc.)

- **Main Content**
  - Left: Active cases (⅔ width)
  - Right: Advocate contact (⅓ width)
  - Full width: Recent resources
  - Full width: Upcoming appointments

#### Advocate Dashboard
- **Header**
  - Welcome message with name
  - Performance metrics
  - Action buttons (Case Management, etc.)

- **Main Content**
  - Left: Active cases list (⅔ width)
  - Right: Notifications (⅓ width)
  - Full width: Patient communications
  - Full width: Resource library highlights

#### Provider Dashboard
- **Header**
  - Welcome message with name
  - Patient summary metrics
  - Action buttons (Referrals, etc.)

- **Main Content**
  - Left: Patient overview (⅔ width)
  - Right: Advocate collaborations (⅓ width)
  - Full width: Recent cases
  - Full width: Resource recommendations

### Profile Page Layout
- **Header**
  - Large avatar (128px)
  - Name and role
  - Brief bio
  - Contact information

- **Main Content**
  - Role-specific information sections
  - Editable fields with inline or modal editing
  - Privacy settings section
  - Account settings section

### Resource Library Layout
- **Header**
  - Search bar
  - Category filters
  - View toggles (Grid/List)
  - Sort options

- **Main Content**
  - Grid of resource cards (3 columns on desktop)
  - Pagination or infinite scroll
  - Filter sidebar (left) on desktop
  - Filter modal on mobile

### Advocate Matching Layout
- **Header**
  - Search bar with advanced filters
  - Match criteria explanation
  - View toggles (Grid/List)

- **Main Content**
  - Left: Filter sidebar with specialization, language, experience filters
  - Right: Grid of advocate profiles
  - Each profile with quick view and detailed view options
  - Comparison feature for multiple advocates

## Responsive Behavior

### Mobile Adaptations
- **Navigation**: Converts to bottom tab bar or hamburger menu
- **Grid Layouts**: Single column, stacked elements
- **Tables**: Responsive tables with horizontal scroll or card view
- **Typography**: Reduced heading sizes (80% of desktop size)
- **Spacing**: Reduced margins (16px container margin)
- **Touch Targets**: Minimum 44px × 44px for interactive elements

### Tablet Adaptations
- **Navigation**: Simplified top navigation, optional side menu
- **Grid Layouts**: 2-column layouts for most content
- **Side Panels**: Collapsible when needed
- **Spacing**: Moderate margins (24px container margin)

### Desktop Optimizations
- **Navigation**: Full horizontal navigation with dropdown menus
- **Grid Layouts**: 3+ column layouts for dense information
- **Side Panels**: Persistent when screen space allows
- **Workspace**: Optimized for productivity with multi-panel views
- **Spacing**: Generous margins (32px+ container margin)

## React Implementation Guidelines

### Component Structure
- Use functional components with hooks
- Implement proper prop typing with TypeScript
- Add appropriate defaultProps and prop validation
- Prefer composition over inheritance
- Create small, focused components

### Accessibility Implementation
- Use semantic HTML elements (button, nav, header, etc.)
- Implement keyboard navigation and focus management
- Add ARIA attributes where needed
- Test with screen readers
- Support reduced motion

### Tailwind Implementation
- Use consistent class naming patterns
- Extract common patterns into components
- Use @apply for complex recurring patterns
- Use arbitrary values sparingly
- Maintain the design token system

```jsx
// Example React component with Tailwind
import React from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick,
}) => {
  // Base classes applied to all buttons
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
  
  // Classes based on variant
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700',
    secondary: 'bg-white text-blue-500 border border-blue-500 hover:bg-blue-50 active:bg-blue-100',
    tertiary: 'bg-transparent text-blue-500 hover:bg-blue-50 active:bg-blue-100',
    danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
  };
  
  // Classes based on size
  const sizeClasses = {
    sm: 'text-sm px-4 py-2 h-8 rounded',
    md: 'text-base px-5 py-2.5 h-10 rounded-md',
    lg: 'text-lg px-6 py-3 h-12 rounded-lg',
  };
  
  // Disabled state
  const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

This specification document serves as a guide for implementing the UI components in the Patient Advocacy Platform. Designers and developers should refer to this document to ensure consistency across the application.
