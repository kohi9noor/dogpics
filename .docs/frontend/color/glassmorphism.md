# Glassmorphism Design System

This document outlines our glassmorphism design philosophy and implementation patterns using our OKLCH color system. This approach creates modern, translucent interfaces that feel lightweight and premium.

## What is Glassmorphism?

Glassmorphism is a design style that uses:

- **Translucent backgrounds** with transparency
- **Backdrop blur effects** to create depth
- **Subtle borders** for definition
- **Layered hierarchy** with varying transparency levels
- **Floating elements** that appear to hover above content

## Philosophy Behind Our Glassmorphism

### 1. Depth Through Transparency

Our glassmorphism creates visual depth without heavy shadows or gradients:

- Multiple transparency layers create natural hierarchy
- Backdrop blur simulates real glass behavior
- Color consistency maintained across transparency levels

### 2. Contextual Transparency

Different transparency levels serve different purposes:

- **High transparency (20-40%)** - Background elements, subtle overlays
- **Medium transparency (60-80%)** - Interactive elements, cards
- **Low transparency (85-95%)** - Navigation, important UI elements

### 3. Color Harmony with Blur

Our OKLCH color system works perfectly with glassmorphism because:

- Perceptual uniformity maintains readability behind blur
- Mathematical color relationships preserve hierarchy
- Slight blue undertones create natural glass tinting

## Glassmorphism Color Variables

### Base Glass Variables

```css
/* Glass transparency levels */
--glass-ultra-light: var(--background) / 0.1; /* 10% opacity */
--glass-light: var(--background) / 0.2; /* 20% opacity */
--glass-medium: var(--background) / 0.4; /* 40% opacity */
--glass-strong: var(--background) / 0.6; /* 60% opacity */
--glass-heavy: var(--background) / 0.8; /* 80% opacity */

/* Glass borders */
--glass-border-light: var(--border) / 0.1; /* Subtle border */
--glass-border-medium: var(--border) / 0.2; /* Visible border */
--glass-border-strong: var(--border) / 0.4; /* Defined border */

/* Glass backdrop blur values */
--blur-sm: 4px;
--blur-md: 8px;
--blur-lg: 12px;
--blur-xl: 16px;
--blur-2xl: 24px;
```

### Dark Mode Glass Variables

```css
.dark {
  /* In dark mode, we use white for glass effects */
  --glass-ultra-light: oklch(1 0 0 / 0.05); /* 5% white */
  --glass-light: oklch(1 0 0 / 0.1); /* 10% white */
  --glass-medium: oklch(1 0 0 / 0.15); /* 15% white */
  --glass-strong: oklch(1 0 0 / 0.2); /* 20% white */
  --glass-heavy: oklch(1 0 0 / 0.25); /* 25% white */

  /* Dark mode borders are more visible */
  --glass-border-light: oklch(1 0 0 / 0.1);
  --glass-border-medium: oklch(1 0 0 / 0.15);
  --glass-border-strong: oklch(1 0 0 / 0.2);
}
```

## Glassmorphism Component Patterns

### 1. Glass Cards

```css
.glass-card {
  background: var(--glass-medium);
  backdrop-filter: blur(var(--blur-md));
  border: 1px solid var(--glass-border-medium);
  border-radius: var(--radius-lg);

  /* Enhance the glass effect */
  box-shadow: 0 8px 32px oklch(0.141 0.005 285.823 / 0.1), inset 0 1px 0 var(--glass-border-light);
}

.glass-card-strong {
  background: var(--glass-strong);
  backdrop-filter: blur(var(--blur-lg));
  border: 1px solid var(--glass-border-strong);
  border-radius: var(--radius-lg);

  box-shadow: 0 12px 40px oklch(0.141 0.005 285.823 / 0.15), inset 0 1px 0 var(--glass-border-medium);
}
```

### 2. Glass Navigation

```css
.glass-nav {
  background: var(--glass-heavy);
  backdrop-filter: blur(var(--blur-xl));
  border-bottom: 1px solid var(--glass-border-medium);

  /* Sticky glass effect */
  position: sticky;
  top: 0;
  z-index: 100;
}

.glass-nav-floating {
  background: var(--glass-strong);
  backdrop-filter: blur(var(--blur-lg));
  border: 1px solid var(--glass-border-medium);
  border-radius: var(--radius-xl);

  /* Floating navigation */
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);

  box-shadow: 0 16px 64px oklch(0.141 0.005 285.823 / 0.2), inset 0 1px 0 var(--glass-border-light);
}
```

### 3. Glass Modals & Overlays

```css
.glass-overlay {
  background: var(--glass-light);
  backdrop-filter: blur(var(--blur-md));

  /* Full screen overlay */
  position: fixed;
  inset: 0;
  z-index: 50;
}

.glass-modal {
  background: var(--glass-strong);
  backdrop-filter: blur(var(--blur-lg));
  border: 1px solid var(--glass-border-strong);
  border-radius: var(--radius-xl);

  /* Center the modal */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 51;

  box-shadow: 0 24px 96px oklch(0.141 0.005 285.823 / 0.25), inset 0 1px 0 var(--glass-border-light);
}
```

### 4. Glass Buttons

```css
.glass-button {
  background: var(--glass-medium);
  backdrop-filter: blur(var(--blur-sm));
  border: 1px solid var(--glass-border-medium);
  border-radius: var(--radius-md);

  color: var(--foreground);
  padding: 0.5rem 1rem;

  transition: all 0.2s ease;
}

.glass-button:hover {
  background: var(--glass-strong);
  transform: translateY(-1px);

  box-shadow: 0 8px 24px oklch(0.141 0.005 285.823 / 0.15), inset 0 1px 0 var(--glass-border-light);
}

.glass-button:active {
  transform: translateY(0);
  background: var(--glass-heavy);
}
```

### 5. Glass Form Elements

```css
.glass-input {
  background: var(--glass-medium);
  backdrop-filter: blur(var(--blur-sm));
  border: 1px solid var(--glass-border-medium);
  border-radius: var(--radius-sm);

  color: var(--foreground);
  padding: 0.75rem 1rem;

  transition: all 0.2s ease;
}

.glass-input:focus {
  background: var(--glass-strong);
  border-color: var(--glass-border-strong);
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

.glass-input::placeholder {
  color: var(--muted-foreground);
  opacity: 0.8;
}
```

## Advanced Glassmorphism Techniques

### 1. Layered Glass Hierarchy

```css
/* Background layer */
.glass-layer-1 {
  background: var(--glass-ultra-light);
  backdrop-filter: blur(var(--blur-sm));
}

/* Middle layer */
.glass-layer-2 {
  background: var(--glass-light);
  backdrop-filter: blur(var(--blur-md));
}

/* Foreground layer */
.glass-layer-3 {
  background: var(--glass-medium);
  backdrop-filter: blur(var(--blur-lg));
}
```

### 2. Glass with Gradients

```css
.glass-gradient {
  background: linear-gradient(
    135deg,
    var(--glass-medium) 0%,
    var(--glass-light) 100%
  );
  backdrop-filter: blur(var(--blur-md));
  border: 1px solid;
  border-image: linear-gradient(
      135deg,
      var(--glass-border-strong),
      var(--glass-border-light)
    ) 1;
}
```

### 3. Responsive Glass Effects

```css
.glass-responsive {
  /* Mobile: lighter glass for performance */
  background: var(--glass-light);
  backdrop-filter: blur(var(--blur-sm));
}

@media (min-width: 768px) {
  .glass-responsive {
    /* Desktop: full glass effect */
    background: var(--glass-medium);
    backdrop-filter: blur(var(--blur-md));
  }
}

@media (prefers-reduced-motion: reduce) {
  .glass-responsive {
    /* Respect accessibility preferences */
    backdrop-filter: none;
    background: var(--card);
  }
}
```

## Best Practices for Glassmorphism

### 1. Performance Considerations

```css
/* Use transform3d to enable hardware acceleration */
.glass-element {
  transform: translate3d(0, 0, 0);
  will-change: backdrop-filter;
}

/* Contain paint for better performance */
.glass-container {
  contain: paint;
}
```

### 2. Accessibility

```css
/* Ensure sufficient contrast behind glass */
.glass-text {
  color: var(--foreground);
  text-shadow: 0 1px 2px oklch(0.141 0.005 285.823 / 0.5);
}

/* Provide fallbacks for unsupported browsers */
@supports not (backdrop-filter: blur(1px)) {
  .glass-fallback {
    background: var(--card);
    border: 1px solid var(--border);
  }
}
```

### 3. Animation

```css
/* Smooth glass transitions */
.glass-animated {
  transition: background 0.3s ease, backdrop-filter 0.3s ease,
    transform 0.3s ease;
}

/* Glass hover effect */
.glass-hover:hover {
  background: var(--glass-strong);
  backdrop-filter: blur(var(--blur-lg));
  transform: translateY(-2px);
}
```

## Integration with Our Color System

### Using Semantic Colors with Glass

```css
/* Primary glass elements */
.glass-primary {
  background: var(--primary) / 0.1;
  border: 1px solid var(--primary) / 0.2;
  color: var(--primary);
}

/* Success glass notification */
.glass-success {
  background: var(--success) / 0.1;
  border: 1px solid var(--success) / 0.2;
  color: var(--success);
}

/* Destructive glass warning */
.glass-destructive {
  background: var(--destructive) / 0.1;
  border: 1px solid var(--destructive) / 0.2;
  color: var(--destructive);
}
```

## Framework Integration

### Tailwind CSS Classes

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
      },
      backgroundColor: {
        "glass-ultra-light": "var(--background) / 0.1",
        "glass-light": "var(--background) / 0.2",
        "glass-medium": "var(--background) / 0.4",
        "glass-strong": "var(--background) / 0.6",
        "glass-heavy": "var(--background) / 0.8",
      },
    },
  },
};
```

### React Component Example

```jsx
const GlassCard = ({ children, variant = "medium", className = "" }) => {
  const variants = {
    light: "bg-glass-light backdrop-blur-sm border-glass-border-light",
    medium: "bg-glass-medium backdrop-blur-md border-glass-border-medium",
    strong: "bg-glass-strong backdrop-blur-lg border-glass-border-strong",
  };

  return (
    <div
      className={`
      ${variants[variant]}
      border rounded-lg
      shadow-lg
      ${className}
    `}
    >
      {children}
    </div>
  );
};
```

## Conclusion

This glassmorphism system provides:

- **Visual hierarchy** through transparency levels
- **Performance optimization** with hardware acceleration
- **Accessibility compliance** with proper contrast and fallbacks
- **Design consistency** with our OKLCH color system
- **Cross-platform compatibility** with responsive considerations

By following these patterns, you can create modern, glass-like interfaces that feel premium and lightweight while maintaining excellent usability and performance.
