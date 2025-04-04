# Patient Advocacy Platform - UI/UX Design Specifications

## Design System Overview

The Patient Advocacy Platform uses a cohesive design system to ensure consistency, accessibility, and a professional appearance across all interfaces. This document outlines the detailed specifications for implementing the UI/UX design.

## Brand Identity

### Logo & Brand Assets
- **Primary Logo**: A symbolic representation combining a shield (protection) with a heart (care)
- **Color Variations**: Full color, monochrome, and reversed versions
- **Usage Guidelines**: Clear space requirements, minimum sizes, and improper usages

### Brand Voice
- **Tone**: Compassionate, empowering, clear, and professional
- **Language**: Accessible, jargon-free, and focused on patient empowerment
- **Communication Style**: Direct, supportive, and solution-oriented

## Color System

### Primary Colors
- **Primary Blue**: `#3b82f6` (Tailwind blue-500)
  - Hover: `#2563eb` (blue-600)
  - Active: `#1d4ed8` (blue-700)
  - Light: `#93c5fd` (blue-300)

- **Secondary Indigo**: `#6366f1` (Tailwind indigo-500)
  - Hover: `#4f46e5` (indigo-600)
  - Active: `#4338ca` (indigo-700)
  - Light: `#a5b4fc` (indigo-300)

### Role-Based Colors
- **Patient**: `#818cf8` (Tailwind indigo-400)
- **Advocate**: `#34d399` (Tailwind emerald-400)
- **Provider**: `#60a5fa` (Tailwind blue-400)

### Semantic Colors
- **Success**: `#22c55e` (Tailwind green-500)
- **Warning**: `#f59e0b` (Tailwind amber-500)
- **Error**: `#ef4444` (Tailwind red-500)
- **Info**: `#3b82f6` (Tailwind blue-500)

### Neutral Colors
- **White**: `#ffffff`
- **Gray-50**: `#f9fafb`
- **Gray-100**: `#f3f4f6`
- **Gray-200**: `#e5e7eb`
- **Gray-300**: `#d1d5db`
- **Gray-400**: `#9ca3af`
- **Gray-500**: `#6b7280`
- **Gray-600**: `#4b5563`
- **Gray-700**: `#374151`
- **Gray-800**: `#1f2937`
- **Gray-900**: `#111827`

### Color Usage Guidelines
- **Text**: Gray-900 for primary text, Gray-700 for secondary text
- **Backgrounds**: White for cards, Gray-50 for page backgrounds
- **Borders**: Gray-200 for subtle borders, Gray-300 for pronounced borders
- **Icons**: Primary colors for interactive icons, Gray-500 for utility icons
- **Focus States**: Blue-500 for focus rings with 2px width

## Typography

### Font Family
```css
--font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
```

### Type Scale
```css
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
--text-5xl: 3rem;       /* 48px */
```

### Line Heights
```css
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```

### Font Weights
```css
--font-thin: 100;
--font-extralight: 200;
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
--font-black: 900;
```

### Typography Usage
- **Headings**: Semi-bold (600) weight
- **Body Text**: Regular (400) weight
- **Interactive Elements**: Medium (500) weight
- **Emphasis**: Semi-bold (600) or medium (500) weight
- **Captions**: Regular (400) weight at small size

## Spacing System

### Spacing Scale
```css
--space-0: 0px;
--space-1: 0.25rem;     /* 4px */
--space-2: 0.5rem;      /* 8px */
--space-3: 0.75rem;     /* 12px */
--space-4: 1rem;        /* 16px */
--space-5: 1.25rem;     /* 20px */
--space-6: 1.5rem;      /* 24px */
--space-8: 2rem;        /* 32px */
--space-10: 2.5rem;     /* 40px */
--space-12: 3rem;       /* 48px */
--space-16: 4rem;       /* 64px */
--space-20: 5rem;       /* 80px */
--space-24: 6rem;       /* 96px */
```

### Spacing Usage
- **Component Padding**: 16px (--space-4) standard internal padding
- **Grid Gap**: 24px (--space-6) between grid items
- **Section Spacing**: 48px (--space-12) vertical spacing between major sections
- **Container Margins**: 32px (--space-8) edge margins for containers on desktop
- **Mobile Margins**: 16px (--space-4) edge margins on mobile devices

## Layout System

### Breakpoints
```css
--screen-sm: 640px;
--screen-md: 768px;
--screen-lg: 1024px;
--screen-xl: 1280px;
--screen-2xl: 1536px;
```

### Container Widths
```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```

### Grid System
- 12-column grid system using Tailwind's grid utilities
- Consistent gutters of 24px (--space-6)
- Responsive column configurations:
  - Mobile: 4-column grid
  - Tablet: 8-column grid
  - Desktop: 12-column grid

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

## Accessibility Considerations

### Color & Contrast
- All text meets WCAG 2.1 AA standards
  - 4.5:1 contrast ratio for normal text
  - 3:1 contrast ratio for large text
- Non-text elements have sufficient contrast
- Interface does not rely solely on color to convey information

### Typography & Readability
- Line height minimum 1.5 for body text
- Paragraph spacing minimum 1.5 times larger than line spacing
- Text can be resized up to 200% without loss of content
- No justified text to avoid "rivers" of white space

### Keyboard Navigation
- All interactive elements accessible via keyboard
- Logical tab order following visual layout
- Focus states clearly visible (2px outline)
- Skip links for main content areas

### Screen Reader Support
- Semantic HTML throughout the application
- ARIA landmarks for main areas (header, main, nav, etc.)
- Alternative text for all informative images
- Form labels explicitly associated with inputs
- ARIA attributes for custom components

### Motion & Animation
- Respects user preferences via `prefers-reduced-motion` media query
- Essential animations are subtle and brief (≤ 400ms)
- No content flashes more than 3 times per second

## Implementation Notes

### CSS Approach
- Tailwind CSS for utility-first approach
- Custom component classes for complex patterns
- CSS variables for design tokens (colors, spacing, etc.)
- Responsive utility classes using Tailwind breakpoints

### Component Structure
- Atomic design methodology:
  - Atoms (buttons, inputs, icons)
  - Molecules (form groups, search bars)
  - Organisms (navigation, cards, sections)
  - Templates (page layouts)
  - Pages (specific implementations)

### Asset Optimization
- Optimized SVGs for icons and illustrations
- WebP image format with fallbacks
- Lazy loading for below-the-fold images
- Icon system using SVG sprites

### Performance Considerations
- Critical CSS inlined for fast first paint
- Component code splitting for reduced bundle size
- Optimized rendering with React memo where beneficial
- Efficient state management to prevent unnecessary re-renders

## Design-to-Development Handoff

### Design Deliverables
- Figma component library with interactive prototypes
- Design token documentation (colors, spacing, typography)
- Animation specifications for interactive elements
- Responsive behavior guidelines

### Development Guidelines
- Component APIs clearly defined with PropTypes
- Accessibility requirements specified per component
- State management patterns for complex interactions
- Edge cases and loading states documented

### QA Checklist
- Cross-browser compatibility testing
- Responsive testing at all breakpoints
- Accessibility audit (automated and manual)
- Performance benchmarking
- Usability testing with representative users

## Appendix: Page-Specific Design Details

### Home Page
- Hero image: Professional healthcare setting with diverse patients and advocates
- Feature icons: Simple, two-color SVG illustrations
- Testimonial layout: Card-based with subtle shadows
- Call-to-action: High-contrast section with clear value proposition

### Dashboard
- User greeting: Personalized with name and time-based greeting
- Status indicators: Color-coded with clear legends
- Data visualization: Simple charts with clear labeling
- Action items: Prominently placed, grouped by priority

### Profile Pages
- Layout: Clearly segmented sections with appropriate headings
- Edit controls: Inline or modal based on complexity
- Privacy indicators: Visual cues for what information is visible to whom
- Verification badges: For advocates and providers with approved credentials

### Matching Interface
- Filter design: Left sidebar with collapsible categories
- Results display: Grid with sortable columns
- Profile cards: Consistent information architecture across all advocate profiles
- Comparison view: Side-by-side with highlighted differences

This design specification provides a comprehensive guide for implementing a consistent, accessible, and user-friendly interface for the Patient Advocacy Platform. The design system ensures that all components work together cohesively while maintaining the brand identity and meeting user needs across different roles and capabilities.
