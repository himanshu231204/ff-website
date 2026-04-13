# Vercel Deployment Guide

## 🚀 Quick Deploy Steps

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add CI/CD workflow"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel auto-detects: Vite + React
5. Click "Deploy"!

### Step 3: Auto-Deploy Setup (Optional - for GitHub Actions)
For automatic deployment via GitHub Actions:

1. **Create Vercel Token**:
   - Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
   - Create a new token named "GitHub Actions"
   - Copy the token

2. **Get Vercel Project ID**:
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings → General
   - Copy "Project ID"

3. **Get Vercel Org ID**:
   - Go to Settings → General
   - Copy "Organization ID"

4. **Add GitHub Secrets**:
   - Go to your GitHub repository
   - Settings → Secrets and variables → Actions
   - Add these secrets:
     - `VERCEL_TOKEN`: Your Vercel token
     - `VERCEL_ORG_ID`: Your organization ID
     - `VERCEL_PROJECT_ID`: Your project ID

5. **Done!** Push to `main` will auto-deploy! 🎉

---

## 📊 Deployment Status

| Trigger | CI | CD | Deploy |
|---------|----|----|--------|
| Push to `main` | ✅ | ✅ | ✅ Auto |
| Push to branch | ✅ | ❌ | ❌ |
| Pull Request | ✅ | ❌ | ❌ (preview) |

---

## 🔧 Vercel Configuration

```json
{
  "github": { "silent": true },
  "routes": [{ "src": "/(.*)", "dest": "/" }],
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

---

## 🌐 Your Live URL

After first deploy, you'll get a URL like:
`https://free-fire-tournament.vercel.app`

---

## ⚡ Speed Up Deploys

- Use `npm ci` instead of `npm install` (faster, uses package-lock.json)
- Dependencies are cached in GitHub Actions
- First deploy takes ~2-3 minutes
- Subsequent deploys take ~1 minute