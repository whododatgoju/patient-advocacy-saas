# Button Component

## Overview

The Button component is a key interactive element in the Patient Advocacy Platform. It provides a consistent way for users to trigger actions, navigate, and submit forms.

## Variants

### 1. Primary Button

![Primary Button](../assets/button-primary.png)

The primary button is used for main actions and calls-to-action.

```jsx
<Button variant="primary">Get Started</Button>
```

**Specifications:**
- Background: Primary Blue (`#3b82f6`)
- Text: White
- Border: None
- Hover: Darker blue (`#2563eb`)
- Active: Darkest blue (`#1d4ed8`)

### 2. Secondary Button

![Secondary Button](../assets/button-secondary.png)

The secondary button is used for alternative actions that are still important but not the primary focus.

```jsx
<Button variant="secondary">Learn More</Button>
```

**Specifications:**
- Background: White
- Text: Primary Blue (`#3b82f6`)
- Border: 1px solid Primary Blue (`#3b82f6`)
- Hover: Light blue background (`#eff6ff`)
- Active: Slightly darker blue background (`#dbeafe`)

### 3. Tertiary Button

![Tertiary Button](../assets/button-tertiary.png)

The tertiary button is used for less prominent actions, often in card footers or alongside other buttons.

```jsx
<Button variant="tertiary">View Details</Button>
```

**Specifications:**
- Background: Transparent
- Text: Primary Blue (`#3b82f6`)
- Border: None
- Hover: Light blue background (`#eff6ff`)
- Active: Slightly darker blue background (`#dbeafe`)

### 4. Danger Button

![Danger Button](../assets/button-danger.png)

The danger button is used for destructive actions that require user attention.

```jsx
<Button variant="danger">Delete Account</Button>
```

**Specifications:**
- Background: Error Red (`#ef4444`)
- Text: White
- Border: None
- Hover: Darker red (`#dc2626`)
- Active: Darkest red (`#b91c1c`)

## Sizes

### Small
- Height: 32px
- Font Size: 14px
- Padding: 8px 16px
- Border Radius: 4px

```jsx
<Button size="sm">Small Button</Button>
```

### Medium (Default)
- Height: 40px
- Font Size: 16px
- Padding: 10px 20px
- Border Radius: 6px

```jsx
<Button size="md">Medium Button</Button>
```

### Large
- Height: 48px
- Font Size: 18px
- Padding: 12px 24px
- Border Radius: 8px

```jsx
<Button size="lg">Large Button</Button>
```

## States

### Default
- Standard appearance as described above

### Hover
- Slightly darker background color
- Cursor: pointer

### Active/Pressed
- Darkest background color
- Slight scale reduction (98%)

### Focus
- 2px blue outline offset by 2px
- Visible keyboard focus indicator

### Disabled
- 60% opacity
- No hover effects
- Cursor: not-allowed

```jsx
<Button disabled>Disabled Button</Button>
```

### Loading
- Optional loading spinner
- Potentially disabled interaction
- Visual indication of processing

```jsx
<Button loading>Processing...</Button>
```

## Accessibility

- Proper `role="button"` for non-button elements
- Keyboard focus management
- Appropriate color contrast (4.5:1 for text)
- ARIA attributes for state (aria-disabled, aria-busy)
- Support for screen readers

## Icons

Buttons can include icons before or after the text.

```jsx
<Button iconBefore={<PlusIcon />}>Add Item</Button>
<Button iconAfter={<ArrowRightIcon />}>Next Step</Button>
```

Icons should be:
- Size: 20px for default button
- Color: Matching the button text
- Spacing: 8px between icon and text

## Implementation

```jsx
import React from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  iconBefore,
  iconAfter,
  children,
  onClick,
  type = 'button',
}) => {
  // Implementation using Tailwind CSS classes
  // ...
  
  return (
    <button
      className={/* Tailwind classes */}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
    >
      {loading && <Spinner className="mr-2" />}
      {iconBefore && <span className="mr-2">{iconBefore}</span>}
      {children}
      {iconAfter && <span className="ml-2">{iconAfter}</span>}
    </button>
  );
};
```

## Usage Guidelines

- Use primary buttons for the main action on a page
- Limit the number of primary buttons on a single view
- Use secondary or tertiary buttons for alternative actions
- Use danger buttons sparingly and only for destructive actions
- Keep button text concise (1-3 words)
- Use action verbs that describe what the button does
- Ensure sufficient spacing between buttons (16px minimum)
