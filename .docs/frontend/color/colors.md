# Color System Documentation

This document outlines the color system used in our projects, based on the OKLCH color space. This system provides a consistent, accessible, and visually harmonious palette that can be applied across all projects.

## What is OKLCH?

OKLCH is a perceptually uniform color space that stands for:

- **O**: Oklab (perceptual color space)
- **L**: Lightness (0-1)
- **C**: Chroma (colorfulness/saturation)
- **H**: Hue (angle in degrees)

Unlike HEX or RGB, OKLCH allows for more intuitive color manipulations because it separates colors into human-perceivable dimensions.

## Core Philosophy

Our color system is built on four key principles:

1. **Semantic naming** - Colors are named by their role, not their appearance
2. **Perceptual uniformity** - Colors with the same lightness value appear equally bright to humans
3. **Mathematical relationships** - Colors relate to each other through consistent mathematical patterns
4. **Glassmorphism compatibility** - Colors are designed to work beautifully with translucent, glass-like interfaces

### Glassmorphism Integration

This color system is specifically designed to work with glassmorphism design patterns:

- **Transparency-ready colors** - Our OKLCH values maintain their visual hierarchy even when used with transparency
- **Blur-friendly contrast** - Colors maintain readability behind backdrop-blur effects
- **Depth perception** - Subtle hue variations (285-286 range) create natural depth when layered
- **Light transmission** - Colors work beautifully when light passes through translucent elements

## Base Color Palette

### Light Theme

```css
--background: oklch(1 0 0); /* Pure white */
--foreground: oklch(
  0.141 0.005 285.823
); /* Almost black with slight blue undertone */
--card: oklch(1 0 0); /* Pure white */
--card-foreground: oklch(
  0.141 0.005 285.823
); /* Almost black with slight blue undertone */
--popover: oklch(1 0 0); /* Pure white */
--popover-foreground: oklch(
  0.141 0.005 285.823
); /* Almost black with slight blue undertone */
--primary: oklch(0.21 0.006 285.885); /* Dark blue-gray */
--primary-foreground: oklch(0.985 0 0); /* Almost white */
--secondary: oklch(
  0.967 0.001 286.375
); /* Very light gray with blue undertone */
--secondary-foreground: oklch(0.21 0.006 285.885); /* Dark blue-gray */
--muted: oklch(0.967 0.001 286.375); /* Very light gray with blue undertone */
--muted-foreground: oklch(
  0.552 0.016 285.938
); /* Medium gray with blue undertone */
--accent: oklch(0.967 0.001 286.375); /* Very light gray with blue undertone */
--accent-foreground: oklch(0.21 0.006 285.885); /* Dark blue-gray */
--destructive: oklch(0.577 0.245 27.325); /* Warm red */
--border: oklch(0.92 0.004 286.32); /* Light gray with blue undertone */
--input: oklch(0.92 0.004 286.32); /* Light gray with blue undertone */
--ring: oklch(0.705 0.015 286.067); /* Medium-light gray with blue undertone */
```

### Dark Theme

```css
--background: oklch(
  0.141 0.005 285.823
); /* Almost black with slight blue undertone */
--foreground: oklch(0.985 0 0); /* Almost white */
--card: oklch(0.21 0.006 285.885); /* Dark blue-gray */
--card-foreground: oklch(0.985 0 0); /* Almost white */
--popover: oklch(0.21 0.006 285.885); /* Dark blue-gray */
--popover-foreground: oklch(0.985 0 0); /* Almost white */
--primary: oklch(0.92 0.004 286.32); /* Light gray with blue undertone */
--primary-foreground: oklch(0.21 0.006 285.885); /* Dark blue-gray */
--secondary: oklch(0.274 0.006 286.033); /* Darker blue-gray */
--secondary-foreground: oklch(0.985 0 0); /* Almost white */
--muted: oklch(0.274 0.006 286.033); /* Darker blue-gray */
--muted-foreground: oklch(
  0.705 0.015 286.067
); /* Medium-light gray with blue undertone */
--accent: oklch(0.274 0.006 286.033); /* Darker blue-gray */
--accent-foreground: oklch(0.985 0 0); /* Almost white */
--destructive: oklch(0.704 0.191 22.216); /* Lighter warm red */
--border: oklch(1 0 0 / 10%); /* Semi-transparent white */
--input: oklch(1 0 0 / 15%); /* Semi-transparent white, slightly more opaque */
--ring: oklch(0.552 0.016 285.938); /* Medium gray with blue undertone */
```

### Data Visualization Palette

```css
--chart-1: oklch(0.646 0.222 41.116); /* Warm orange */
--chart-2: oklch(0.6 0.118 184.704); /* Teal */
--chart-3: oklch(0.398 0.07 227.392); /* Deep blue */
--chart-4: oklch(0.828 0.189 84.429); /* Bright yellow */
--chart-5: oklch(0.769 0.188 70.08); /* Gold */

/* Dark mode variants */
--chart-1: oklch(0.488 0.243 264.376); /* Purple */
--chart-2: oklch(0.696 0.17 162.48); /* Mint */
--chart-3: oklch(0.769 0.188 70.08); /* Gold */
--chart-4: oklch(0.627 0.265 303.9); /* Pink */
--chart-5: oklch(0.645 0.246 16.439); /* Coral red */
```

## Mathematical Relationships

Our color system follows precise mathematical relationships:

1. **Lightness hierarchy**:

   - Base background: 1.0 (lightest)
   - Muted surfaces: 0.967 (slightly darker)
   - Borders: 0.92 (more visible)
   - Primary elements: 0.21 (high contrast)
   - Text on light: 0.141 (highest contrast)

2. **Border radius**:
   ```css
   --radius: 0.625rem;
   --radius-sm: calc(var(--radius) - 4px); /* 6px */
   --radius-md: calc(var(--radius) - 2px); /* 8px */
   --radius-lg: var(--radius); /* 10px */
   --radius-xl: calc(var(--radius) + 4px); /* 14px */
   ```

## How to Use This System

### 1. For UI Elements

```css
/* Base containers */
.container {
  background: var(--background);
  color: var(--foreground);
}

/* Cards and elevated elements */
.card {
  background: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

/* Buttons */
.button-primary {
  background: var(--primary);
  color: var(--primary-foreground);
  border-radius: var(--radius-md);
}

.button-secondary {
  background: var(--secondary);
  color: var(--secondary-foreground);
  border-radius: var(--radius-md);
}

/* Text variants */
.text-muted {
  color: var(--muted-foreground);
}

/* Form elements */
.input {
  background: var(--background);
  border: 1px solid var(--input);
  border-radius: var(--radius-sm);
}

.input:focus {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

/* Destructive actions */
.button-delete {
  background: var(--destructive);
  color: white;
}

/* Popovers/dropdowns */
.dropdown {
  background: var(--popover);
  color: var(--popover-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}
```

### 2. For Data Visualization

```css
.chart-item-1 {
  background: var(--chart-1);
}
.chart-item-2 {
  background: var(--chart-2);
}
.chart-item-3 {
  background: var(--chart-3);
}
.chart-item-4 {
  background: var(--chart-4);
}
.chart-item-5 {
  background: var(--chart-5);
}
```

## Best Practices

1. **Always use semantic variables** - Never hardcode colors

   ```css
   /* Good */
   color: var(--primary);

   /* Bad */
   color: oklch(0.21 0.006 285.885);
   ```

2. **Maintain contrast ratios** - The system is designed for accessibility

   ```css
   /* Primary on background = good contrast */
   background: var(--background);
   color: var(--primary);

   /* Secondary on muted = potential contrast issues */
   background: var(--muted);
   color: var(--secondary); /* Be careful with this combination */
   ```

3. **Use opacity for state changes** - Rather than new colors

   ```css
   .button {
     background: var(--primary);
   }

   .button:hover {
     background: var(--primary);
     opacity: 0.9;
   }

   .button:active {
     background: var(--primary);
     opacity: 0.8;
   }
   ```

4. **Extend sensibly** - If you need new colors, follow the pattern
   ```css
   /* Adding a success color */
   --success: oklch(0.55 0.14 142.5);
   --success-foreground: oklch(0.985 0 0);
   ```

## Integration with Tailwind

This color system can be integrated with Tailwind CSS:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary))",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary))",
          foreground: "oklch(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted))",
          foreground: "oklch(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "oklch(var(--accent))",
          foreground: "oklch(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive))",
        },
        // Add other colors as needed
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
    },
  },
};
```

## Converting from Other Color Formats

To convert HEX or RGB to OKLCH:

1. Use modern browsers' DevTools color pickers (Chrome and Firefox support OKLCH)
2. Use online converters like [oklch.com](https://oklch.com)
3. Use tools like [ColorBox](https://colorbox.io/) or [Leonardo](https://leonardocolor.io/) to generate accessible color scales

## Conclusion

This OKLCH-based color system provides a solid foundation for all projects, ensuring:

- **Consistency** across products
- **Accessibility** through proper contrast
- **Flexibility** for different applications
- **Efficiency** by eliminating color decision fatigue

By using this system across all projects, we create a recognizable visual language while maintaining the flexibility to adapt to each project's unique needs.
