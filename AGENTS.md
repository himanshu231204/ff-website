# AGENTS.md - Free Fire Tournament Website

## Tech Stack
- **React 18** with Vite 5
- **Tailwind CSS v4** (CSS-based config, no `tailwind.config.js`)
- **Framer Motion** for animations
- **React Router DOM v7** for routing

## Developer Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint check
npm run preview  # Preview production build
```

**Windows PowerShell**: Use `;` instead of `&&` for chaining commands.
```bash
cd C:/Users/himan/Desktop/Free_fire; npm run build
```

## Project Structure
```
src/
├── App.jsx              # Main router (no Navbar here - separate component)
├── index.css            # Global styles + glass-card + gradient utilities
├── main.jsx             # Entry point
├── components/
│   ├── Navbar.jsx       # Sticky nav with mobile hamburger menu
│   ├── PlayerCard.jsx   # Player grid card with glow effects
│   ├── MatchCard.jsx    # Schedule match card with VS design
│   ├── LeaderboardTable.jsx # Sortable leaderboard table
│   ├── WeaponCard.jsx   # Weapon card with category badge
│   └── CharacterCard.jsx # Banned character card
├── pages/
│   ├── HomePage.jsx     # Hero section + stats + groups
│   ├── PlayersPage.jsx  # Card grid with group filters
│   ├── SchedulePage.jsx # Match cards grouped by group
│   ├── LeaderboardPage.jsx # Sortable tables with scoring
│   ├── KnockoutPage.jsx # Existing knockout bracket
│   ├── WeaponsPage.jsx  # Allowed weapons with search/filter
│   └── BannedPage.jsx  # Banned characters (active/passive)
└── data/
    ├── players.js       # Player data
    └── matches.js       # Match data
```

## Important Conventions

### Tailwind v4
- No `tailwind.config.js` - styles are in CSS via `@theme` or `index.css`
- Glass card utility: `.glass-card` (defined in `index.css`)

### Components
- Use `framer-motion` for animations: `<motion.div initial={{...}} animate={{...}} />`
- Lucide React for icons: `import { IconName } from 'lucide-react'`
- Dark theme with `glass-card` class for cards

### Adding New Pages
1. Create page in `src/pages/PageName.jsx`
2. Import in `App.jsx`
3. Add `<Route path="/path" element={<PageName />} />`

### Leaderboard Scoring Logic
```js
const KR = kills / matches;
const points = wins * 2;
const finalScore = points + KR;
// Sort: Final Score DESC → KR DESC → Wins DESC
```

## Build Output
- Production build goes to `dist/` folder
- Run `npm run preview` to serve dist locally
- `vercel.json` handles SPA routing for Vercel deployment

## Testing
- No test framework configured
- Use `npm run build` to verify compilation

## Key Files
- `src/App.jsx` - Main app with routing
- `src/index.css` - Global styles + glass-card + glow utilities
- `src/components/Navbar.jsx` - Navigation with mobile support
- `src/pages/HomePage.jsx` - Hero with animations + stats