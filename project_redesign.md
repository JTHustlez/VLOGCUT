# VLOGCUT Complete Redesign Plan

## Executive Summary

This document outlines the complete visual transformation from **GamrClipr** (cyberpunk/gaming aesthetic) to **VLOGCUT** (premium/professional aesthetic). The redesign maintains all existing functionality while replacing the cyan neon gaming theme with an elegant black, gold, and emerald green design system.

---

## Design Philosophy Shift

| Aspect | GamrClipr (Current) | VLOGCUT (Target) |
|--------|---------------------|------------------|
| Aesthetic | Cyberpunk, Gaming | Premium, Professional |
| Primary Color | Cyan (#00D9FF) | Gold (#D4AF37) |
| Secondary Color | Blue/Purple | Emerald Green (#2D5A3D) |
| Background | Dark Navy | Deep Black |
| Target Audience | Gamers, Streamers | Vloggers, Creators, Pros |
| Vibe | Aggressive, High-energy | Sophisticated, Refined |
| Effects | Neon glows, Scanlines | Subtle gold glows, Glass |

---

## Phase 1: Core Design System

### 1.1 Update Global CSS Variables
**File:** `apps/web/src/app/globals.css`

Replace the entire color system:

```css
:root {
  /* VLOGCUT Light Mode */
  --background: hsl(60, 9%, 98%);        /* Warm white */
  --foreground: hsl(24, 10%, 4%);        /* Near black */
  --card: hsl(0, 0%, 100%);
  --card-foreground: hsl(24, 10%, 4%);
  --popover: hsl(0, 0%, 100%);
  --popover-foreground: hsl(24, 10%, 4%);
  --primary: hsl(45, 67%, 52%);          /* Gold */
  --primary-foreground: hsl(24, 10%, 4%);
  --secondary: hsl(60, 5%, 96%);
  --secondary-foreground: hsl(24, 10%, 4%);
  --muted: hsl(30, 6%, 90%);
  --muted-foreground: hsl(30, 6%, 45%);
  --accent: hsl(145, 34%, 26%, 0.15);    /* Green accent */
  --accent-foreground: hsl(24, 10%, 4%);
  --destructive: hsl(0, 72%, 42%);
  --destructive-foreground: hsl(0, 0%, 100%);
  --border: hsl(30, 6%, 90%);
  --input: hsl(30, 6%, 90%);
  --ring: hsl(45, 67%, 52%);             /* Gold ring */

  /* VLOGCUT Accent Colors */
  --gold-primary: hsl(45, 67%, 52%);
  --gold-light: hsl(46, 76%, 63%);
  --gold-dark: hsl(44, 71%, 42%);
  --green-primary: hsl(145, 34%, 26%);
  --green-light: hsl(142, 33%, 36%);
  --green-dark: hsl(143, 36%, 19%);

  --radius: 0.5rem;
}

.dark {
  /* VLOGCUT Dark Mode - Primary Theme */
  --background: hsl(240, 5%, 3%);        /* Deep black #0A0A0B */
  --foreground: hsl(0, 0%, 98%);
  --card: hsl(240, 7%, 7%);              /* Elevated surface */
  --card-foreground: hsl(0, 0%, 98%);
  --popover: hsl(240, 7%, 7%);
  --popover-foreground: hsl(0, 0%, 98%);
  --primary: hsl(45, 67%, 52%);          /* Gold */
  --primary-foreground: hsl(240, 5%, 3%);
  --secondary: hsl(240, 6%, 10%);
  --secondary-foreground: hsl(0, 0%, 98%);
  --muted: hsl(240, 5%, 16%);
  --muted-foreground: hsl(240, 5%, 45%);
  --accent: hsl(45, 67%, 52%, 0.15);     /* Gold accent */
  --accent-foreground: hsl(0, 0%, 98%);
  --destructive: hsl(0, 72%, 42%);
  --destructive-foreground: hsl(0, 0%, 98%);
  --border: hsl(240, 4%, 16%);
  --input: hsl(240, 6%, 10%);
  --ring: hsl(45, 67%, 52%);

  /* Panel/Sidebar specific */
  --sidebar-background: hsl(240, 5%, 4%);
  --sidebar-foreground: hsl(0, 0%, 98%);
  --sidebar-primary: hsl(45, 67%, 52%);
  --sidebar-border: hsl(240, 4%, 12%);
  --panel-background: hsl(240, 6%, 5%);
  --panel-accent: hsl(240, 6%, 8%);

  /* VLOGCUT Accent Colors */
  --gold-primary: hsl(45, 67%, 52%);
  --gold-light: hsl(46, 76%, 63%);
  --gold-dark: hsl(44, 71%, 42%);
  --green-primary: hsl(145, 34%, 26%);
  --green-light: hsl(142, 33%, 36%);
  --green-dark: hsl(143, 36%, 19%);
}
```

### 1.2 Update Utility Classes
**File:** `apps/web/src/app/globals.css`

Replace cyberpunk utilities with VLOGCUT equivalents:

```css
/* VLOGCUT Premium Utilities - Replace Cyberpunk Utilities */

@utility gold-glow {
  box-shadow: 0 0 10px hsl(45, 67%, 52%, 0.25),
              0 0 20px hsl(45, 67%, 52%, 0.15);
}

@utility gold-glow-strong {
  box-shadow: 0 0 15px hsl(45, 67%, 52%, 0.35),
              0 0 30px hsl(45, 67%, 52%, 0.20),
              0 0 45px hsl(45, 67%, 52%, 0.10);
}

@utility gold-text {
  text-shadow: 0 0 10px hsl(45, 67%, 52%, 0.4),
               0 0 20px hsl(45, 67%, 52%, 0.2);
}

@utility gold-text-subtle {
  text-shadow: 0 0 8px hsl(45, 67%, 52%, 0.25);
}

@utility premium-border {
  border: 1px solid hsl(45, 67%, 52%, 0.2);
}

@utility premium-border-glow {
  border: 1px solid hsl(45, 67%, 52%, 0.35);
  box-shadow: 0 0 10px hsl(45, 67%, 52%, 0.15);
}

@utility glass-panel {
  background: hsl(240, 7%, 7%, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid hsl(45, 67%, 52%, 0.08);
}

@utility glass-panel-strong {
  background: hsl(240, 6%, 5%, 0.92);
  backdrop-filter: blur(16px);
  border: 1px solid hsl(45, 67%, 52%, 0.12);
}

@utility subtle-grid-bg {
  background-image:
    linear-gradient(hsl(45, 67%, 52%, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, hsl(45, 67%, 52%, 0.02) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Remove these old utilities: neon-glow, neon-text, cyber-border, cyber-grid-bg, scanline */

/* Update animations */
@keyframes gold-pulse {
  0%, 100% {
    box-shadow: 0 0 8px hsl(45, 67%, 52%, 0.25),
                0 0 16px hsl(45, 67%, 52%, 0.15);
  }
  50% {
    box-shadow: 0 0 15px hsl(45, 67%, 52%, 0.4),
                0 0 30px hsl(45, 67%, 52%, 0.25);
  }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

---

## Phase 2: Component Updates

### 2.1 Button Component
**File:** `apps/web/src/components/ui/button.tsx`

Update button variants:

```typescript
const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background shadow-sm hover:bg-foreground/90 hover:scale-[1.02]",
        primary:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:scale-[1.02] hover:shadow-[0_0_15px_hsl(45,67%,52%,0.35)]",
        "primary-gradient":
          "bg-gradient-to-r from-[hsl(45,67%,52%)] to-[hsl(46,76%,63%)] text-primary-foreground font-semibold hover:opacity-90 hover:scale-[1.02] hover:shadow-[0_0_20px_hsl(45,67%,52%,0.4)] transition-all",
        "gold-outline":
          "border border-primary/40 bg-transparent text-primary hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_15px_hsl(45,67%,52%,0.25)]",
        destructive:
          "bg-destructive/0 border border-destructive/25 text-destructive shadow-xs hover:bg-destructive hover:text-destructive-foreground",
        outline:
          "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground hover:border-primary/25 transition-colors",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 border border-border hover:border-primary/15",
        text: "bg-transparent p-0 rounded-none opacity-100 hover:opacity-70 hover:text-primary transition-all",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
      },
      // ... sizes remain the same
    },
  }
);
```

### 2.2 Card Component
**File:** `apps/web/src/components/ui/card.tsx`

Update hover effects:

```typescript
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-border/50 bg-card text-card-foreground transition-all duration-200 hover:border-primary/15 hover:shadow-[0_0_20px_hsl(45,67%,52%,0.08)]",
        className
      )}
      {...props}
    />
  )
);
```

---

## Phase 3: Landing Page Redesign

### 3.1 Header Component
**File:** `apps/web/src/components/header.tsx`

Replace gaming branding with VLOGCUT:

```tsx
// Replace Gamepad2 icon with custom VLOGCUT logo
// Update brand text styling:
<Link href="/" className="flex items-center gap-2.5 group">
  <div className="relative">
    <img
      src="/logo.png"
      alt="VLOGCUT"
      className="w-8 h-8 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_hsl(45,67%,52%,0.5)]"
    />
  </div>
  <span className="text-xl font-bold tracking-tight hidden md:block">
    <span className="text-foreground">VLOG</span>
    <span className="text-primary">CUT</span>
  </span>
</Link>
```

### 3.2 Hero Component
**File:** `apps/web/src/components/landing/hero.tsx`

Complete redesign:

**Background:** Replace cyberpunk grid with subtle premium gradient
```tsx
{/* Premium background */}
<div className="absolute inset-0 -z-50">
  {/* Base dark gradient */}
  <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-[hsl(240,6%,5%)]" />

  {/* Subtle grid pattern */}
  <div
    className="absolute inset-0 opacity-10"
    style={{
      backgroundImage: `
        linear-gradient(hsl(45, 67%, 52%, 0.06) 1px, transparent 1px),
        linear-gradient(90deg, hsl(45, 67%, 52%, 0.06) 1px, transparent 1px)
      `,
      backgroundSize: '60px 60px',
    }}
  />

  {/* Radial gold glow from center-top */}
  <div
    className="absolute inset-0"
    style={{
      background: 'radial-gradient(ellipse at 50% 20%, hsl(45, 67%, 52%, 0.06) 0%, transparent 50%)',
    }}
  />

  {/* Bottom decorative line */}
  <div
    className="absolute bottom-0 left-0 right-0 h-px"
    style={{
      background: 'linear-gradient(90deg, transparent, hsl(45, 67%, 52%, 0.4), transparent)',
    }}
  />
</div>
```

**Badge:** Replace gaming badge with professional badge
```tsx
<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/25 bg-primary/5 backdrop-blur-sm">
  <Scissors className="w-4 h-4 text-primary" />
  <span className="text-sm font-medium text-primary">Professional Editing</span>
</div>
```

**Headline:** Update copy
```tsx
<h1 className="text-foreground">
  <span className="inline-block">Cut.</span>{" "}
  <span className="inline-block">Create.</span>{" "}
  <motion.span
    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-[hsl(46,76%,63%)]"
    // ... animation props
  >
    Captivate.
  </motion.span>
</h1>
```

**Tagline:** Update messaging
```tsx
<motion.p className="mt-8 text-base sm:text-xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
  Professional video editing, beautifully simple.
  <span className="text-foreground/80"> Powerful tools that run entirely in your browser.</span>
</motion.p>
```

**Feature Pills:**
```tsx
{['No watermarks', 'Free forever', 'No signup required', 'Privacy-first'].map(/* ... */)}
```

### 3.3 Footer Component
**File:** `apps/web/src/components/footer.tsx`

Update branding and styling:
- Replace `Gamepad2` icon with VLOGCUT logo
- Update brand name from "GamrClipr" to "VLOGCUT"
- Update copyright text
- Replace gaming-specific copy with professional copy
- Update grid background color from cyan to gold

### 3.4 Handlebars Component
**File:** `apps/web/src/components/landing/handlebars.tsx`

Update gradient colors from cyan/blue to gold spectrum or replace entirely with simple styled "VLOGCUT" text.

---

## Phase 4: Editor Interface

### 4.1 Editor Header
**File:** `apps/web/src/components/editor/editor-header.tsx`

- Replace `Gamepad2` icon with VLOGCUT logo image
- Update "GamrClipr" text to "VLOGCUT"
- Update Discord link and references
- Change hover glow from cyan to gold

### 4.2 Projects Page
**File:** `apps/web/src/app/projects/page.tsx`

- Update grid background color
- Replace `Gamepad2` icon references
- Update brand text from "GamrClipr" to "VLOGCUT"
- Update card hover effects to gold glow
- Change primary buttons styling

### 4.3 Timeline Component
**File:** `apps/web/src/components/editor/timeline/index.tsx`

- Background panel should use updated `--panel-background`
- Selection colors should use gold for selected elements
- Playhead color can remain cyan/blue or shift to gold (consider usability)

### 4.4 Preview Panel
**File:** `apps/web/src/components/editor/preview-panel.tsx`

- Update toolbar button styling to match new theme
- Progress bar should use gold color for filled portion

### 4.5 Media Panel & Properties Panel
- Update all panel backgrounds to use new dark theme variables
- Update selection highlights and hover states
- Ensure consistent border colors

---

## Phase 5: Asset Updates

### 5.1 Logo Files
**Location:** `apps/web/public/`

Files to update/create:
- `logo.png` - Already exists (VLOGCUT shield logo)
- `logo.svg` - Create SVG version of VLOGCUT logo
- `logo-gamrclipr.svg` - Delete or replace
- `favicon.ico` - Generate from VLOGCUT logo
- All icon sizes in `/icons/` folder - Regenerate

### 5.2 Open Graph Images
**Location:** `apps/web/public/open-graph/`

- `default.jpg` - Create new OG image with VLOGCUT branding
- `roadmap.jpg` - Update with VLOGCUT branding

### 5.3 Manifest Updates
**File:** `apps/web/public/manifest.json`

Update all name references from GamrClipr to VLOGCUT.

---

## Phase 6: Metadata & SEO

### 6.1 Site Constants
**File:** `apps/web/src/constants/site.ts`

Update site name, description, and any brand references.

### 6.2 Layout Metadata
**File:** `apps/web/src/app/layout.tsx`

Update page title and meta descriptions.

### 6.3 All Page Metadata
Search for "GamrClipr" or "Gamr" in all files and replace with "VLOGCUT".

---

## Phase 7: Additional Updates

### 7.1 Remove Scanline Effects
The cyberpunk scanline effect is too gaming-focused. Remove from:
- `globals.css` (utility class)
- `hero.tsx` (any usage)

### 7.2 Update Animation Names
In `globals.css`:
- Rename `neon-pulse` to `gold-pulse`
- Update animation colors

### 7.3 Social Links
Update any social media links/handles from GamrClipr to VLOGCUT.

### 7.4 Discord References
- Update Discord server link if changed
- Update Discord text/branding in UI

---

## File Change Summary

### Critical Files (Must Update)
| File | Changes |
|------|---------|
| `globals.css` | Complete color system replacement |
| `button.tsx` | Button variant colors |
| `card.tsx` | Hover effects |
| `header.tsx` | Logo, brand name |
| `footer.tsx` | Logo, brand name, copy |
| `hero.tsx` | Background, copy, badge |
| `editor-header.tsx` | Logo, brand name |
| `projects/page.tsx` | Logo, grid, cards |

### Secondary Files (Should Update)
| File | Changes |
|------|---------|
| `handlebars.tsx` | Gradient colors or remove |
| `timeline/index.tsx` | Panel colors |
| `preview-panel.tsx` | Toolbar styling |
| All `/public/` assets | Logos, favicons, OG images |
| `manifest.json` | App name |

### Search & Replace Targets
- "GamrClipr" → "VLOGCUT"
- "Gamr" + "Clipr" → "VLOG" + "CUT"
- "gamrclipr" → "vlogcut"
- "Built for Gamers" → "Professional Editing"
- `hsl(185, 100%, 50%)` → `hsl(45, 67%, 52%)`

---

## Implementation Order

### Stage 1: Foundation (Do First)
1. `globals.css` - Core theme variables
2. Button component - Primary interactions
3. Card component - Everywhere in UI

### Stage 2: Landing (High Visibility)
4. Header component
5. Hero component
6. Footer component

### Stage 3: Editor (Main App)
7. Editor header
8. Projects page
9. Timeline styling
10. Panel components

### Stage 4: Assets (Final Polish)
11. Logo/favicon regeneration
12. OG images
13. Manifest and metadata

### Stage 5: Cleanup
14. Search for remaining "GamrClipr" references
15. Remove unused cyberpunk utilities
16. Test all color states (hover, focus, active)

---

## Testing Checklist

After implementation, verify:

- [ ] Light mode looks correct
- [ ] Dark mode looks correct
- [ ] All buttons have proper hover/focus states
- [ ] Cards show gold glow on hover
- [ ] Landing page hero renders correctly
- [ ] Editor header shows VLOGCUT branding
- [ ] Projects page loads without errors
- [ ] Timeline elements are visible and selectable
- [ ] Export functionality works
- [ ] No console errors related to styling
- [ ] Logo appears at all sizes
- [ ] Favicon displays correctly
- [ ] Mobile responsive layouts intact
- [ ] Accessibility contrast ratios pass

---

## Risk Mitigation

### Potential Issues
1. **CSS specificity conflicts** - New utilities may need `!important` temporarily
2. **Missed color references** - Some HSL values may be hardcoded
3. **Animation timing** - Some animations reference old color names

### Rollback Plan
- Keep backup of `globals.css` before changes
- Make changes in feature branch
- Test thoroughly before merging

---

## Success Metrics

The redesign is complete when:
1. Zero visual references to GamrClipr branding remain
2. All interactive elements use gold accent color
3. Brand guidelines are fully implemented
4. Application functions identically to before
5. No regression in accessibility

---

*VLOGCUT Redesign Plan v1.0*
*Prepared for presentation review*
