# VLOGCUT Brand Guidelines

## The VLOGCUT Identity

VLOGCUT is a premium, professional video editing platform that combines power with elegance. Our brand represents **craftsmanship**, **precision**, and **creative empowerment**. Unlike gaming-focused editors, VLOGCUT positions itself as the sophisticated choice for vloggers, content creators, filmmakers, and professionals who demand both beauty and functionality.

---

## Brand Essence

### Core Values
- **Precision** - Every cut matters, every frame counts
- **Elegance** - Professional tools shouldn't feel industrial
- **Empowerment** - Unlock your creative potential
- **Authenticity** - Your story, your way

### Brand Voice
- Confident but approachable
- Professional but not corporate
- Sophisticated but not pretentious
- Empowering but not aggressive

### Tagline Options
- "Cut. Create. Captivate."
- "Professional Editing, Beautifully Simple."
- "Where Precision Meets Creativity."
- "Your Story, Perfected."

---

## Logo System

### Primary Logo
The VLOGCUT shield emblem represents:
- **Shield Shape**: Protection and trust - your content is safe with us
- **V Monogram**: VLOGCUT identity, bold and confident
- **Faceted Design**: Multi-dimensional creativity, professional craft
- **Gold Frame**: Premium quality, refined experience

### Logo Usage
- Minimum clear space: 0.5x logo height on all sides
- Minimum size: 32px height for digital, 0.5" for print
- Always maintain aspect ratio
- Never distort, rotate, or add effects

### Logo Variants
1. **Full Color** - Primary use (shield with green interior, gold elements)
2. **Monochrome Gold** - On dark backgrounds
3. **Monochrome White** - On colored/dark backgrounds
4. **Monochrome Black** - On light backgrounds

---

## Color Palette

### Primary Colors

#### Obsidian Black (Background Primary)
```
HEX: #0A0A0B
HSL: 240, 5%, 3%
RGB: 10, 10, 11
```
The foundation of our interface. Deep, rich, and sophisticated.

#### Prestige Gold (Accent Primary)
```
HEX: #D4AF37
HSL: 45, 67%, 52%
RGB: 212, 175, 55
```
Our signature accent. Represents premium quality and refinement.

#### Emerald Green (Accent Secondary)
```
HEX: #2D5A3D
HSL: 145, 34%, 26%
RGB: 45, 90, 61
```
Deep, rich green for secondary highlights and success states.

### Extended Palette

#### Gold Spectrum
```
Gold Lightest:   #F4E4A6  (HSL: 48, 78%, 81%)  - Highlights, glows
Gold Light:      #E8C95C  (HSL: 46, 76%, 63%)  - Hover states
Gold Primary:    #D4AF37  (HSL: 45, 67%, 52%)  - Primary accent
Gold Dark:       #B8941F  (HSL: 44, 71%, 42%)  - Active states
Gold Darkest:    #8B6914  (HSL: 42, 74%, 31%)  - Pressed states
```

#### Green Spectrum
```
Green Lightest:  #4A8F5E  (HSL: 140, 32%, 42%)  - Success highlights
Green Light:     #3D7A4D  (HSL: 142, 33%, 36%)  - Hover
Green Primary:   #2D5A3D  (HSL: 145, 34%, 26%)  - Primary green
Green Dark:      #1F4029  (HSL: 143, 36%, 19%)  - Active
Green Darkest:   #152A1C  (HSL: 142, 36%, 12%)  - Pressed
```

#### Neutral Spectrum (Dark Mode)
```
Background:      #0A0A0B  (HSL: 240, 5%, 3%)    - App background
Surface:         #111113  (HSL: 240, 7%, 7%)    - Cards, panels
Surface Elevated:#18181B  (HSL: 240, 6%, 10%)   - Elevated elements
Border:          #27272A  (HSL: 240, 4%, 16%)   - Subtle borders
Border Hover:    #3F3F46  (HSL: 240, 5%, 26%)   - Interactive borders
Muted:           #52525B  (HSL: 240, 5%, 34%)   - Muted text
Foreground:      #FAFAFA  (HSL: 0, 0%, 98%)     - Primary text
```

#### Light Mode Palette
```
Background:      #FAFAF9  (HSL: 60, 9%, 98%)    - App background
Surface:         #FFFFFF  (HSL: 0, 0%, 100%)    - Cards, panels
Surface Elevated:#F5F5F4  (HSL: 60, 5%, 96%)    - Elevated elements
Border:          #E7E5E4  (HSL: 30, 6%, 90%)    - Subtle borders
Border Hover:    #D6D3D1  (HSL: 30, 5%, 83%)    - Interactive borders
Muted:           #78716C  (HSL: 30, 6%, 45%)    - Muted text
Foreground:      #0C0A09  (HSL: 24, 10%, 4%)    - Primary text
```

### Semantic Colors
```
Success:         #2D5A3D  (Emerald Green)
Warning:         #D4AF37  (Prestige Gold)
Error:           #B91C1C  (HSL: 0, 72%, 42%)
Info:            #3B82F6  (HSL: 217, 91%, 60%)
```

---

## Typography

### Font System

#### Primary Font: Inter
Modern, highly legible sans-serif for UI elements
```
Weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
```

#### Display Font: Plus Jakarta Sans (Optional)
For headlines and marketing materials when extra personality is needed
```
Weights: 600 (Semibold), 700 (Bold), 800 (Extrabold)
```

### Type Scale

```
Display:    3rem / 48px    - Hero headlines
H1:         2.25rem / 36px - Page titles
H2:         1.875rem / 30px - Section headers
H3:         1.5rem / 24px   - Subsection headers
H4:         1.25rem / 20px  - Card titles
H5:         1.125rem / 18px - Group labels
Body:       1rem / 16px     - Default body text
Body Small: 0.875rem / 14px - Secondary text
Caption:    0.75rem / 12px  - Labels, timestamps
Tiny:       0.625rem / 10px - Badges, minimal labels
```

### Line Heights
```
Tight:    1.1  - Display text
Snug:     1.25 - Headings
Normal:   1.5  - Body text
Relaxed:  1.75 - Long-form content
```

---

## Visual Effects

### Glow Effects

#### Gold Glow (Primary Interactive Elements)
```css
/* Subtle */
box-shadow: 0 0 10px rgba(212, 175, 55, 0.15),
            0 0 20px rgba(212, 175, 55, 0.08);

/* Standard */
box-shadow: 0 0 15px rgba(212, 175, 55, 0.25),
            0 0 30px rgba(212, 175, 55, 0.15);

/* Strong (hover/focus) */
box-shadow: 0 0 20px rgba(212, 175, 55, 0.35),
            0 0 40px rgba(212, 175, 55, 0.20),
            0 0 60px rgba(212, 175, 55, 0.10);
```

#### Green Glow (Secondary/Success)
```css
/* Subtle */
box-shadow: 0 0 10px rgba(45, 90, 61, 0.20),
            0 0 20px rgba(45, 90, 61, 0.10);

/* Standard */
box-shadow: 0 0 15px rgba(45, 90, 61, 0.30),
            0 0 30px rgba(45, 90, 61, 0.15);
```

### Text Glow
```css
/* Gold text glow */
text-shadow: 0 0 10px rgba(212, 175, 55, 0.4),
             0 0 20px rgba(212, 175, 55, 0.2);

/* Subtle text glow */
text-shadow: 0 0 8px rgba(212, 175, 55, 0.25);
```

### Glass Morphism (Panels)
```css
/* Dark mode glass panel */
background: rgba(17, 17, 19, 0.8);
backdrop-filter: blur(12px);
border: 1px solid rgba(212, 175, 55, 0.1);

/* Dark mode glass panel strong */
background: rgba(17, 17, 19, 0.9);
backdrop-filter: blur(16px);
border: 1px solid rgba(212, 175, 55, 0.15);
```

### Gradients

#### Primary Gold Gradient
```css
background: linear-gradient(135deg, #D4AF37 0%, #E8C95C 50%, #D4AF37 100%);
```

#### Premium Green-Gold Gradient (Accent)
```css
background: linear-gradient(135deg, #2D5A3D 0%, #D4AF37 100%);
```

#### Surface Gradient (Subtle depth)
```css
background: linear-gradient(180deg, #111113 0%, #0A0A0B 100%);
```

---

## Component Styling

### Buttons

#### Primary Button
```css
background: linear-gradient(135deg, #D4AF37, #E8C95C);
color: #0A0A0B;
font-weight: 600;
border-radius: 8px;
transition: all 0.2s ease;

/* Hover */
transform: scale(1.02);
box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
```

#### Secondary Button
```css
background: transparent;
border: 1px solid rgba(212, 175, 55, 0.3);
color: #D4AF37;

/* Hover */
background: rgba(212, 175, 55, 0.1);
border-color: #D4AF37;
```

#### Outline Button
```css
background: transparent;
border: 1px solid #27272A;
color: #FAFAFA;

/* Hover */
border-color: rgba(212, 175, 55, 0.5);
```

### Cards
```css
background: #111113;
border: 1px solid #27272A;
border-radius: 12px;

/* Hover */
border-color: rgba(212, 175, 55, 0.2);
box-shadow: 0 0 20px rgba(212, 175, 55, 0.08);
```

### Inputs
```css
background: #111113;
border: 1px solid #27272A;
color: #FAFAFA;
border-radius: 8px;

/* Focus */
border-color: #D4AF37;
box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.15);
```

---

## Border Radius

```
None:     0px      - Sharp edges (timeline elements)
Small:    4px      - Badges, tags
Medium:   8px      - Buttons, inputs
Large:    12px     - Cards, panels
XLarge:   16px     - Modal dialogs
Full:     9999px   - Pills, avatars
```

---

## Spacing Scale

Based on 4px grid:
```
0:    0px
1:    4px
2:    8px
3:    12px
4:    16px
5:    20px
6:    24px
8:    32px
10:   40px
12:   48px
16:   64px
20:   80px
24:   96px
```

---

## Animation & Motion

### Timing Functions
```
ease-default:    cubic-bezier(0.4, 0, 0.2, 1)     - Standard
ease-in:         cubic-bezier(0.4, 0, 1, 1)       - Entering
ease-out:        cubic-bezier(0, 0, 0.2, 1)       - Exiting
ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1)     - Moving
ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1) - Bouncy/playful
```

### Duration
```
instant:   50ms    - Micro-interactions
fast:      150ms   - Button states, hovers
normal:    200ms   - Default transitions
slow:      300ms   - Panel reveals
slower:    500ms   - Page transitions
```

### Signature Animations

#### Gold Pulse (for primary CTA buttons)
```css
@keyframes gold-pulse {
  0%, 100% {
    box-shadow: 0 0 10px rgba(212, 175, 55, 0.3),
                0 0 20px rgba(212, 175, 55, 0.15);
  }
  50% {
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.5),
                0 0 40px rgba(212, 175, 55, 0.25);
  }
}
```

#### Shimmer (for loading states)
```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

background: linear-gradient(
  90deg,
  #111113 0%,
  #1a1a1d 50%,
  #111113 100%
);
background-size: 200% 100%;
```

---

## Iconography

### Style Guidelines
- Stroke weight: 1.5px (consistent with Lucide defaults)
- Size scale: 16px, 20px, 24px, 32px
- Color: Inherit from parent (typically muted foreground)
- Interactive icons: Use gold on hover

### Custom Icon Treatment
For brand-specific icons:
- Use rounded corners
- Maintain consistent stroke weight
- Gold color for primary actions
- Subtle glow effect on hover for interactive icons

---

## Photography & Imagery

### Style
- High contrast, cinematic quality
- Rich shadows with subtle gold/green color grading
- Minimal, uncluttered compositions
- Focus on the creative process (editing, filming, storytelling)

### Overlays
When text appears over images:
```css
/* Dark gradient overlay */
background: linear-gradient(
  180deg,
  transparent 0%,
  rgba(10, 10, 11, 0.7) 100%
);
```

---

## Usage Don'ts

1. **Never** use bright/neon colors that clash with the premium aesthetic
2. **Never** use the gold color for error states (reserve for positive actions)
3. **Never** stretch or distort the logo
4. **Never** use more than 2 glow effects simultaneously
5. **Never** place low-contrast text on busy backgrounds
6. **Never** use the green as a primary action color (reserve for secondary/success)
7. **Never** combine gold glow with green glow on the same element
8. **Never** use playful/gaming terminology in the UI

---

## Accessibility

### Contrast Ratios (WCAG 2.1 AA)
- Normal text: Minimum 4.5:1
- Large text (18px+ or 14px+ bold): Minimum 3:1
- UI components: Minimum 3:1

### Focus States
All interactive elements must have visible focus indicators:
```css
/* Focus visible */
outline: 2px solid #D4AF37;
outline-offset: 2px;
```

### Motion
Respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Implementation Reference

### CSS Custom Properties
```css
:root {
  /* Primary Colors */
  --color-gold: #D4AF37;
  --color-green: #2D5A3D;
  --color-black: #0A0A0B;

  /* Gold Scale */
  --gold-50: #F9F5E7;
  --gold-100: #F4E4A6;
  --gold-200: #ECDA7F;
  --gold-300: #E8C95C;
  --gold-400: #D4AF37;
  --gold-500: #B8941F;
  --gold-600: #8B6914;
  --gold-700: #664E0F;
  --gold-800: #45360A;
  --gold-900: #2A2006;

  /* Green Scale */
  --green-50: #E8F5EA;
  --green-100: #C5E6CA;
  --green-200: #8FC89A;
  --green-300: #4A8F5E;
  --green-400: #3D7A4D;
  --green-500: #2D5A3D;
  --green-600: #1F4029;
  --green-700: #152A1C;
  --green-800: #0D1A11;
  --green-900: #060D08;
}
```

---

*VLOGCUT Brand Guidelines v1.0*
*Last Updated: January 2026*
