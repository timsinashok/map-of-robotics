# GitHub Pages Deployment Guide

This guide will help you deploy your RoboMap application to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your machine
- Node.js and npm installed

## Option 1: Automated Deployment with GitHub Actions (Recommended)

This method automatically deploys your app whenever you push to the main branch.

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `map-of-robotics` (or your preferred name)
3. Don't initialize with README (we already have one)

### Step 2: Initialize Git and Push

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/map-of-robotics.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Configure GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under **Source**, select:
   - Source: **GitHub Actions**
5. Click **Save**

### Step 4: Update Base Path (if needed)

If your repository name is NOT `map-of-robotics`, update `vite.config.ts`:

```typescript
base: mode === 'production' ? '/YOUR-REPO-NAME/' : '/',
```

### Step 5: Deploy

The GitHub Action will automatically run when you push to main:

```bash
git add .
git commit -m "Configure deployment"
git push
```

Your site will be available at:
```
https://YOUR_USERNAME.github.io/map-of-robotics/
```

### Monitoring Deployment

1. Go to your repository on GitHub
2. Click **Actions** tab
3. Watch the deployment workflow run
4. Once complete (green checkmark), your site is live!

---

## Option 2: Manual Deployment with gh-pages

This method allows you to manually deploy whenever you want.

### Step 1: Create and Push Repository

Follow Step 1 and 2 from Option 1 above.

### Step 2: Deploy

Run the deploy command:

```bash
npm run deploy
```

This will:
1. Build your app (`npm run build`)
2. Deploy the `dist` folder to the `gh-pages` branch
3. GitHub Pages will automatically serve from that branch

### Step 3: Configure GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under **Source**, select:
   - Branch: **gh-pages**
   - Folder: **/ (root)**
5. Click **Save**

Your site will be available at:
```
https://YOUR_USERNAME.github.io/map-of-robotics/
```

### Redeploying

Whenever you make changes:

```bash
npm run deploy
```

---

## Custom Domain (Optional)

To use a custom domain like `robotics-map.com`:

### Step 1: Configure DNS

Add DNS records with your domain provider:

```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
```

Or for apex domain:

```
Type: A
Name: @
Values: 
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
```

### Step 2: Update Vite Config

Change the base path in `vite.config.ts`:

```typescript
base: mode === 'production' ? '/' : '/',
```

### Step 3: Add Custom Domain in GitHub

1. Go to repository **Settings** > **Pages**
2. Under **Custom domain**, enter your domain
3. Click **Save**
4. Enable **Enforce HTTPS** (after DNS propagates)

### Step 4: Create CNAME file

Create a file `public/CNAME` with your domain:

```
robotics-map.com
```

---

## Troubleshooting

### Blank Page After Deployment

**Problem**: Page loads but shows blank screen.

**Solution**: Check the base path in `vite.config.ts`. It should match your repository name:

```typescript
base: '/map-of-robotics/'  // Must include slashes and match repo name
```

### 404 Errors for Assets

**Problem**: CSS/JS files return 404.

**Solution**: Verify the base path is correct and rebuild:

```bash
npm run build
npm run deploy
```

### Changes Not Appearing

**Problem**: Deployed but changes don't show.

**Solutions**:
1. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Wait a few minutes for GitHub Pages to update
4. Check GitHub Actions tab for deployment status

### GitHub Actions Fails

**Problem**: Workflow fails with permissions error.

**Solution**: 
1. Go to **Settings** > **Actions** > **General**
2. Under **Workflow permissions**, select:
   - **Read and write permissions**
3. Check **Allow GitHub Actions to create and approve pull requests**
4. Click **Save**

---

## Local Preview of Production Build

To test the production build locally before deploying:

```bash
# Build for production
npm run build

# Preview the build
npm run preview
```

Open `http://localhost:4173` to see how it will look when deployed.

---

## Environment Variables

If your app needs environment variables (like API keys):

### For GitHub Actions:

1. Go to **Settings** > **Secrets and variables** > **Actions**
2. Click **New repository secret**
3. Add your secrets (e.g., `GEMINI_API_KEY`)
4. Update `.github/workflows/deploy.yml` to include them:

```yaml
- name: Build
  run: npm run build
  env:
    NODE_ENV: production
    VITE_API_KEY: ${{ secrets.GEMINI_API_KEY }}
```

### For Manual Deployment:

Create a `.env.production` file:

```
VITE_API_KEY=your_key_here
```

---

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [gh-pages npm package](https://www.npmjs.com/package/gh-pages)

---

## Quick Reference Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy (manual method)
npm run deploy

# Check git status
git status

# Commit and push changes
git add .
git commit -m "Your commit message"
git push
```

---

**Need help?** Open an issue on the [GitHub repository](https://github.com/YOUR_USERNAME/map-of-robotics/issues).
