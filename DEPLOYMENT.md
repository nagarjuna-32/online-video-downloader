# Deployment Guide

## Overview

DownloadMedia is designed for easy deployment across modern cloud platforms. This guide covers deployment to Vercel (Frontend) and Render (Backend). The application runs completely database-free and Redis-free, requiring zero external storage configuration.

## Prerequisites

Before deploying, you need:

1. GitHub account with repository containing DownloadMedia
2. Vercel account (free)
3. Render account (free tier available)

## Backend Deployment (Render)

### 1. Prepare Repository

```bash
# Ensure all files are committed
git add .
git commit -m "Configure database-free deployment"
git push
```

### 2. Create Render Service

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: downloadmedia-api
   - **Region**: Choose closest to users
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### 3. Set Environment Variables

In Render dashboard, add:

```
SECRET_KEY=<generate-random-key>
TEMP_DOWNLOAD_DIR=./temp_downloads
ALLOW_ORIGINS=https://downloadmedia.site,https://www.downloadmedia.site
ENVIRONMENT=production
```

### 4. Deploy

Render will automatically deploy when you push to the main branch.

## Frontend Deployment (Vercel)

### 1. Prepare Frontend

```bash
cd frontend
npm run build
```

### 2. Create Vercel Project

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Select your GitHub repository
4. Configure:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3. Set Environment Variables

In Vercel project settings → Environment Variables:

```
VITE_API_URL=https://downloadmedia-api.onrender.com/api
```

### 4. Deploy

Vercel will automatically deploy when you push to the main branch.

## Custom Domain Setup

### For Frontend (Vercel)

1. In Vercel project settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### For Backend (Render)

1. In Render service settings → Custom Domain
2. Add your custom domain
3. Update DNS records with CNAME record

## Environment Variables Checklist

### Backend (Render)
- [ ] `SECRET_KEY` - Random 32+ character string
- [ ] `TEMP_DOWNLOAD_DIR` - Set to `./temp_downloads`
- [ ] `ALLOW_ORIGINS` - Frontend URLs (comma-separated, e.g. `https://downloadmedia.site,https://www.downloadmedia.site`)
- [ ] `ENVIRONMENT` - Set to `production`

### Frontend (Vercel)
- [ ] `VITE_API_URL` - Backend API URL (ending in `/api`)

## Monitoring

### Monitor Backend (Render)

1. Go to Render dashboard
2. Select your service
3. View logs in real-time

### Monitor Frontend (Vercel)

1. Go to Vercel dashboard
2. Select your project
3. View analytics and deployments

## Troubleshooting

### Backend Won't Deploy

1. Check build logs for errors
2. Verify all dependencies in requirements.txt
3. Ensure environment variables are set

### Frontend Won't Deploy

1. Check build logs
2. Verify all dependencies installed
3. Check TypeScript errors
4. Verify environment variables

### CORS Errors

1. Update `ALLOW_ORIGINS` in backend environment variables to include the frontend URL
2. Restart backend service
3. Clear browser cache

## Scaling

### Increase Backend Resources (Render)

1. Render dashboard → Select service
2. Settings → Plan
3. Upgrade to larger tier

## Backup & Recovery

### Code Repository

1. Keep GitHub updated
2. Create releases for stable versions
3. Tag important commits

## Security Checklist

Before going to production:

- [ ] Change `SECRET_KEY` to random string
- [ ] Use HTTPS only
- [ ] Verify CORS settings
- [ ] Enable rate limiting
- [ ] Monitor error logs
- [ ] Set up uptime monitoring
- [ ] Use environment variables for secrets

## Performance Optimization

### Frontend (Vercel)

- Edge caching
- CDN distribution
- Automatic GZIP compression

### Backend (Render)

- Auto-scaling (with paid plan)
- In-memory statistics
- Background cleanup tasks
- Async/await for non-blocking operations

## Next Steps

1. Deploy backend to Render
2. Deploy frontend to Vercel
3. Configure custom domains
4. Set up monitoring
5. Test all features
6. Monitor performance

For questions or issues, refer to:
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

---

Happy deploying! 🚀
