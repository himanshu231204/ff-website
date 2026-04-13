# Free Fire Tournament Website

A React + Vite tournament website with public pages and a secure admin panel.

## Scripts

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run lint` - run ESLint
- `npm run preview` - preview production build

## Admin Panel Setup

1. Install dependencies:
   - `npm install`
2. Create a `.env` file from `.env.example` and fill in Firebase values.
3. In Firebase Authentication, enable Email/Password sign-in.
4. Create an admin user in Firebase Auth using the same email configured by `VITE_ADMIN_EMAIL`.
5. In Firestore, deploy the rules from `firestore.rules`.
6. Start app and login at `/login`, then access `/admin`.

## Admin Features

- Protected route: `/admin` (redirects to `/login` for non-admin users)
- Player CRUD in Firestore collection `players`
- Match result entry in Firestore collection `matches`
- Transactional updates for player `matches`, `wins`, and `kills`
- Public `Players` and `Leaderboard` pages auto-refresh from Firestore with static fallback data

## Firestore Collections

### `players`

Expected fields:

- `name` (string)
- `group` (string: `A` or `B`)
- `level` (number)
- `matches` (number)
- `wins` (number)
- `kills` (number)
- `createdAt` (timestamp)

### `matches`

Expected fields:

- `player1Id` (string)
- `player2Id` (string)
- `player1` (string)
- `player2` (string)
- `winnerId` (string)
- `winner` (string)
- `stage` (string)
- `kills` (map)
- `createdAt` (timestamp)
