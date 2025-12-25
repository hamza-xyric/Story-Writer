---
name: xyric-brand-guidelines
description: Applies Xyric Solutions brand colors, typography, and visual standards to artifacts. Use when brand consistency, visual formatting, or company design standards apply.
license: Complete terms in LICENSE.txt
---

# Xyric Brand Styling

## Overview

Apply Xyric Solutions' official brand identity and style resources to any artifact.

**Keywords**: branding, corporate identity, visual identity, styling, brand colors, typography, Xyric brand, visual formatting, data visualization, dashboards

## Brand Guidelines

### Core Brand Colors

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Primary** | Deep Navy Blue | `#1a2744` | Headers, primary CTAs, dark backgrounds |
| **Secondary** | Steel Blue | `#6b8cae` | Secondary elements, icons, borders |
| **Accent** | Light Periwinkle | `#8fa4c4` | Highlights, hover states, links |

### Extended Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Text Primary** | Deep Navy | `#1a2744` | Headlines, body text, primary content |
| **Text Secondary** | Steel Blue | `#6b8cae` | Captions, metadata, secondary content |
| **Background Light** | Off-White | `#f8fafc` | Page backgrounds, light mode |
| **Background Dark** | Deep Navy | `#1a2744` | Dark mode backgrounds, hero sections |
| **Surface** | White | `#ffffff` | Cards, modals, elevated elements |
| **Border** | Light Gray | `#e2e8f0` | Dividers, form fields, subtle borders |

### Semantic Colors

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Success** | Emerald | `#10b981` | Confirmations, positive states, completed |
| **Warning** | Amber | `#f59e0b` | Caution, attention needed, pending |
| **Error** | Rose | `#f43f5e` | Errors, destructive actions, failed |
| **Info** | Steel Blue | `#6b8cae` | Informational messages, tips |

### Data Visualization Palette

Sequential progression for charts, dashboards, and data graphics:

1. `#1a2744` - Deep Navy (primary/darkest)
2. `#2d4a6f` - Navy Medium
3. `#4a6d94` - Steel Dark
4. `#6b8cae` - Steel Blue (secondary)
5. `#8fa4c4` - Periwinkle (accent)
6. `#b3c5da` - Light Blue (lightest)

**Usage guidelines:**
- Use darker shades for emphasis/primary data
- Use lighter shades for secondary/background data
- Maintain sufficient contrast between adjacent colors
- For categorical data, use colors 1, 3, 5 to maximize distinction

## Typography

### Font Stack

| Element | Font | Fallback | Weight |
|---------|------|----------|--------|
| **Headings** | Inter | Arial, sans-serif | 600-700 |
| **Body** | System UI | -apple-system, BlinkMacSystemFont, sans-serif | 400-500 |
| **Code** | Fira Code | Consolas, monospace | 400 |

### Application

- **Headings (H1-H3)**: Inter, 600-700 weight
- **Body text**: System UI stack for optimal cross-platform rendering
- **Code snippets**: Fira Code for ligature support
- **Smart fallback**: System fonts ensure readability without custom font installation

## Logo Usage

### Logo Files

Located in `Logo/` directory:
- `Original Logo (Light Background).png` - For white/light backgrounds
- `Alternative Logo (Dark Background).png` - For navy/dark backgrounds

### Usage Rules

1. **Clear space**: Maintain minimum padding equal to the height of the "X" letterform
2. **Minimum size**: 32px height for digital, 0.5" for print
3. **Background contrast**: Use light logo on dark backgrounds, dark logo on light backgrounds
4. **No modifications**: Do not rotate, distort, or alter colors

## Features

### Smart Color Application

- Applies Deep Navy (`#1a2744`) to primary text and headings
- Uses Steel Blue (`#6b8cae`) for secondary elements
- Semantic colors for status indicators
- Automatically selects appropriate contrast for backgrounds

### Text Styling

- Headings (24pt+): Inter font, 600-700 weight
- Body text: System UI stack, 400-500 weight
- Smart color selection based on background luminance
- Preserves text hierarchy and formatting

### Shape and Accent Colors

- Non-text shapes cycle through brand palette
- Charts use data visualization palette
- Maintains visual cohesion while staying on-brand

## Technical Details

### Font Management

- Uses Inter when available (pre-install recommended)
- System UI stack ensures consistent rendering without installation
- Fira Code for code blocks (optional, falls back to Consolas)

### Color Application

- Uses RGB hex values for precise brand matching
- WCAG AAA compliant contrast ratios (12:1 for primary text)
- Maintains color fidelity across different systems

### Accessibility

- Primary text meets WCAG AAA standards (12:1 contrast on white)
- Semantic colors meet WCAG AA minimum (4.5:1)
- Color is never the sole indicator of meaning
