# AGENTS.md - Free Fire Tournament Website

## Tech Stack
- **React 18** with Vite 5
- **Tailwind CSS v4** (CSS-based config, no `tailwind.config.js`)
- **Framer Motion** for animations
- **React Router DOM v7** for routing

## Developer Commands
```bash
npm run dev      # Start dev server (may use port 5173-5175)
npm run build    # Production build to dist/
npm run lint     # ESLint check
npm run preview  # Preview production build
```

**Windows PowerShell**: Use `;` instead of `&&`
```bash
cd C:/Users/himan/Desktop/Free_fire; npm run build
```

## Project Structure
```
src/
├── App.jsx              # Main router
├── index.css            # Global styles + glass-card + glow utilities
├── main.jsx             # Entry point
├── components/          # Navbar, PlayerCard, MatchCard, etc.
├── pages/               # Home, Players, Schedule, Leaderboard, Knockout, Weapons, Banned, Rules
└── data/
    ├── players.js       # Player data with stats
    ├── matches.js       # Match data + automation functions
    └── content.json     # All text content (centralized)
```

## Important Conventions

### Tailwind v4
- No `tailwind.config.js` - styles in CSS via `@theme` or `index.css`
- Glass card utility: `.glass-card` class (defined in `index.css`)

### Content Management
- **All text in `src/data/content.json`** - navbar, pages, footer
- Update content there instead of in component files

### Dynamic Leaderboard
- Scores calculated from player stats (not hardcoded)
- Formula: `(wins * 2) + (kills / matches)`
- Sort: Score DESC → KR DESC → Wins DESC

### Adding Pages
1. Create `src/pages/PageName.jsx`
2. Import in `App.jsx`
3. Add `<Route path="/path" element={<PageName />} />`

### Components
- Use `framer-motion` for animations: `<motion.div initial={{...}} animate={{...}} />`
- Lucide React for icons: `import { IconName } from 'lucide-react'`
- Dark theme with `.glass-card` class

## CI/CD
- **Lint job targets wrong directories** (`eslint app components hooks utils` should be `eslint src` or similar)
- Build passes: `npm run build` outputs to `dist/`
- Vercel handles SPA routing via `vercel.json`

## Testing
- No test framework configured
- Verify with `npm run build` (compilation check only)

## Key Files
- `src/data/content.json` - Centralized text content
- `src/data/matches.js` - Match automation functions
- `src/pages/RulesPage.jsx` - Rules & regulations