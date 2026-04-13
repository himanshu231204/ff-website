# Free Fire Tournament - CI/CD & Auto Deployment Setup

## 🔧 What's Been Created

### 1. GitHub Actions CI/CD Workflow
**Location**: `.github/workflows/ci-cd.yml`

**Features**:
- ✅ **CI (Continuous Integration)**: Lint check + Build validation on every push/PR
- ✅ **CD (Continuous Deployment)**: Auto-deploy to Vercel on push to `main`
- ✅ **Node.js Setup**: Uses Node 20 for build
- ✅ **Caching**: Dependencies cached for faster builds
- ✅ **Status Checks**: Runs ESLint and build before deployment

### 2. Vercel Auto-Deploy Configuration
**Location**: `vercel.json`

Already configured for SPA routing.

---

## 🚀 How It Works

### Push to `main` branch:
```
GitHub Push → CI (Lint + Build) → Success → CD (Deploy to Vercel)
```

### Pull Request:
```
GitHub PR → CI (Lint + Build) → Status Check → Merge Allowed?
```

---

## 📝 To Enable Vercel Auto-Deploy

1. **Push code to GitHub**:
   ```bash
   git add .
   git commit -m "Add CI/CD workflow"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite + React project
   - Deploy settings already configured via `vercel.json`

3. **Auto-Deploy**: Every push to `main` will automatically deploy! 🎉

---

## ✅ Workflow Testing

| Trigger | Action |
|---------|--------|
| Push to `main` | Lint → Build → Deploy to Vercel |
| Pull Request | Lint → Build (no deploy) |
| Push to other branch | Lint → Build (no deploy) |

---

## 📦 Package.json Scripts

| Script | Command | Used In |
|--------|---------|---------|
| `npm run dev` | Start dev server | Local development |
| `npm run build` | Production build | CI/CD |
| `npm run lint` | ESLint check | CI/CD |
| `npm run preview` | Preview build | Manual testing |

---

## 🔒 Important Notes

- **Vercel** handles the actual deployment
- **GitHub Actions** validates code before deployment
- Branch protection recommended: Require status checks before merge