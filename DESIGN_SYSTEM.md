# PawMart Design System

## Overview
This design system provides a comprehensive set of UI components, styles, and guidelines for building consistent, accessible, and responsive interfaces across the PawMart application.

## Design Principles

### 1. Color Palette (Maximum 3 Primary + Neutral)
- **Primary Blue**: `#2563eb` - Main brand color for primary actions
- **Primary Green**: `#059669` - Success states and secondary actions  
- **Primary Orange**: `#ea580c` - Accent color for highlights and warnings
- **Neutral Gray**: `#6b7280` - Text and subtle UI elements

### 2. Light & Dark Mode Support
- Automatic theme switching with proper contrast ratios
- CSS custom properties for seamless theme transitions
- Accessible color combinations in both modes

### 3. Responsive Design
- Mobile-first approach with breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px  
  - Desktop: > 1024px
- Touch-friendly interactions (44px minimum touch targets)
- Fluid typography and spacing

## Component Library

### Core Components

#### Button
```jsx
import { Button } from './components/ui';

// Variants
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="accent">Accent Action</Button>
<Button variant="outline">Outline Button</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>
```

#### Card
```jsx
import { Card } from './components/ui';

<Card>
  <Card.Header>
    <h3>Card Title</h3>
  </Card.Header>
  <Card.Body>
    <p>Card content goes here</p>
  </Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

#### Input & Form
```jsx
import { Input, Form } from './components/ui';

<Form onSubmit={handleSubmit}>
  <Input
    name="email"
    type="email"
    label="Email Address"
    placeholder="Enter your email"
    required
    validation={validateEmail}
    error="Invalid email format"
    success="Email is valid"
    helperText="We'll never share your email"
  />
  
  <Form.Submit loading={loading}>
    Submit Form
  </Form.Submit>
</Form>
```

#### Layout Components
```jsx
import { Container, Grid } from './components/ui';

<Container size="lg">
  <Grid cols={3} gap="lg">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </Grid>
</Container>
```

#### Loading States
```jsx
import { Loading, Skeleton } from './components/ui';

// Loading spinner
<Loading size="lg" text="Loading content..." />

// Skeleton placeholders
<Skeleton height="200px" />
<Skeleton.Card />
```

## CSS Custom Properties

### Spacing System
```css
--spacing-xs: 0.25rem;    /* 4px */
--spacing-sm: 0.5rem;     /* 8px */
--spacing-md: 1rem;       /* 16px */
--spacing-lg: 1.5rem;     /* 24px */
--spacing-xl: 2rem;       /* 32px */
--spacing-2xl: 3rem;      /* 48px */
--spacing-3xl: 4rem;      /* 64px */
```

### Border Radius
```css
--radius-sm: 0.375rem;    /* 6px */
--radius-md: 0.5rem;      /* 8px */
--radius-lg: 0.75rem;     /* 12px */
--radius-xl: 1rem;        /* 16px */
```

### Typography Scale
```css
--text-xs: 0.75rem;       /* 12px */
--text-sm: 0.875rem;      /* 14px */
--text-base: 1rem;        /* 16px */
--text-lg: 1.125rem;      /* 18px */
--text-xl: 1.25rem;       /* 20px */
--text-2xl: 1.5rem;       /* 24px */
--text-3xl: 1.875rem;     /* 30px */
--text-4xl: 2.25rem;      /* 36px */
```

### Shadows
```css
--shadow-sm: 0 1px 2px 0 var(--shadow-color);
--shadow-md: 0 4px 6px -1px var(--shadow-color);
--shadow-lg: 0 10px 15px -3px var(--shadow-color);
--shadow-xl: 0 20px 25px -5px var(--shadow-color);
```

## Form Validation Guidelines

### Required Fields
- Visual indicators (red asterisk)
- Clear error messages
- Real-time validation feedback

### Error States
- Red border and text for invalid inputs
- Descriptive error messages
- Prevent form submission until resolved

### Success States  
- Green border and checkmark for valid inputs
- Positive feedback for completed sections

### Loading States
- Disable form during submission
- Show loading spinner on submit button
- Prevent double submissions

## Accessibility Features

### Keyboard Navigation
- Tab order follows logical flow
- Focus indicators on all interactive elements
- Skip links for screen readers

### Color Contrast
- WCAG AA compliant contrast ratios
- Color is not the only way to convey information
- High contrast mode support

### Screen Reader Support
- Semantic HTML structure
- ARIA labels and descriptions
- Proper heading hierarchy

## Responsive Breakpoints

```css
/* Mobile First */
.component {
  /* Mobile styles (default) */
}

@media (min-width: 640px) {
  /* Small tablets and large phones */
}

@media (min-width: 768px) {
  /* Tablets */
}

@media (min-width: 1024px) {
  /* Desktop */
}

@media (min-width: 1280px) {
  /* Large desktop */
}
```

## Touch-Friendly Design

### Minimum Touch Targets
- 44px minimum for all interactive elements
- Adequate spacing between touch targets
- Hover states disabled on touch devices

### Gesture Support
- Swipe navigation where appropriate
- Pull-to-refresh patterns
- Pinch-to-zoom for images

## Performance Considerations

### CSS Optimization
- CSS custom properties for theme switching
- Minimal CSS bundle size
- Efficient animations using transform and opacity

### Component Lazy Loading
- Code splitting for large components
- Skeleton screens during loading
- Progressive image loading

## Usage Examples

### Professional Card Layout
```jsx
const VetCard = ({ vet }) => (
  <Card className="group">
    <div className="relative overflow-hidden">
      <img 
        src={vet.image}
        alt={vet.name}
        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <Card.Body>
      <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
        {vet.name}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 mb-1">
        {vet.specialty}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {vet.experience} Experience
      </p>
      <Button className="w-full" variant="primary">
        Book Appointment
      </Button>
    </Card.Body>
  </Card>
);
```

### Form with Validation
```jsx
const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        name="email"
        type="email"
        label="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
        validation={validateEmail}
      />
      
      <Input
        name="password"
        type="password"
        label="Password"
        value={formData.password}
        onChange={handleChange}
        required
        validation={validatePassword}
      />
      
      <Button type="submit" loading={loading} className="w-full">
        Sign In
      </Button>
    </Form>
  );
};
```

## Best Practices

1. **Consistency**: Use design system components instead of custom styles
2. **Accessibility**: Always include proper ARIA labels and keyboard navigation
3. **Performance**: Lazy load components and optimize images
4. **Responsive**: Test on multiple device sizes and orientations
5. **Dark Mode**: Ensure all components work in both light and dark themes
6. **Touch**: Design for touch interactions on mobile devices
7. **Loading**: Always provide feedback during async operations
8. **Validation**: Implement comprehensive form validation with clear error messages

## Migration Guide

To migrate existing components to the new design system:

1. Replace custom buttons with `<Button>` component
2. Wrap content in `<Container>` for consistent spacing
3. Use `<Card>` for content grouping
4. Replace form inputs with `<Input>` component
5. Add loading states with `<Loading>` or `<Skeleton>`
6. Update color classes to use CSS custom properties
7. Test responsive behavior on all breakpoints
8. Verify accessibility with screen readers

This design system ensures a professional, consistent, and accessible user experience across the entire PawMart application.