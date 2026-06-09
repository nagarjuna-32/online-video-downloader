# Deployment Guide

## Overview

SocialGrab is designed for easy deployment across modern cloud platforms. This guide covers deployment to Vercel (Frontend), Render (Backend), Neon (Database), and Upstash (Redis).

## Prerequisites

Before deploying, you need:

1. GitHub account with repository containing SocialGrab
2. Vercel account (free)
3. Render account (free tier available)
4. Neon account (free PostgreSQL hosting)
5. Upstash account (free Redis hosting)

## Database Setup (Neon)

### Create PostgreSQL Database

1. Go to [neon.tech](https://neon.tech)
2. Sign up and create a project
3. Create a new database
4. Copy the connection string
5. Save for later use

## Cache Setup (Upstash)

### Create Redis Database

1. Go to [upstash.com](https://upstash.com)
2. Sign up and create a project
3. Create a new Redis database
4. Copy the Redis URL
5. Save for later use

## Backend Deployment (Render)

### 1. Prepare Repository

```bash
# Ensure all files are committed
git add .
git commit -m "Initial SocialGrab deployment"
git push
```

### 2. Create Render Service

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: socialgrab-api
   - **Region**: Choose closest to users
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### 3. Set Environment Variables

In Render dashboard, add:

```
DATABASE_URL=postgresql://user:password@host/socialgrab
REDIS_URL=redis://default:password@host:port
SECRET_KEY=<generate-random-key>
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
GOOGLE_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxxxx
ALLOWED_ORIGINS=https://socialgrab.vercel.app,https://yourdomain.com
TEMP_DOWNLOAD_DIR=/tmp/socialgrab
```

### 4. Deploy

Render will automatically deploy when you push to main branch.

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
VITE_API_URL=https://socialgrab-api.onrender.com/api
```

### 4. Deploy

Vercel will automatically deploy when you push to main branch.

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
- [ ] `DATABASE_URL` - Neon PostgreSQL URL
- [ ] `REDIS_URL` - Upstash Redis URL
- [ ] `SECRET_KEY` - Random 32+ character string
- [ ] `ALLOWED_ORIGINS` - Frontend URLs (comma-separated)
- [ ] `GOOGLE_ANALYTICS_ID` - Your GA ID (optional)
- [ ] `GOOGLE_ADSENSE_CLIENT` - Your AdSense ID (optional)

### Frontend (Vercel)
- [ ] `VITE_API_URL` - Backend API URL
- [ ] `VITE_GA_ID` - Google Analytics ID (optional)

## Database Initialization

### Create Tables

```bash
# Connect to your Neon database
psql <DATABASE_URL>

# Run migrations if using Alembic
alembic upgrade head
```

Or use the application startup which auto-creates tables.

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
4. Check DATABASE_URL format

### Frontend Won't Deploy

1. Check build logs
2. Verify all dependencies installed
3. Check TypeScript errors
4. Verify environment variables

### CORS Errors

1. Update `ALLOWED_ORIGINS` in backend
2. Restart backend service
3. Clear browser cache

### Database Connection Issues

1. Verify connection string format
2. Check if database exists
3. Verify network access is allowed
4. Test connection locally first

### Redis Connection Issues

1. Verify Redis URL format
2. Check if Redis instance is running
3. Verify credentials

## Scaling

### Increase Backend Resources (Render)

1. Render dashboard → Select service
2. Settings → Plan
3. Upgrade to larger tier

### Increase Database Resources (Neon)

1. Neon console
2. Project settings
3. Upgrade plan for more compute

### Increase Redis Resources (Upstash)

1. Upstash console
2. Database settings
3. Upgrade plan

## Backup & Recovery

### Database Backups (Neon)

1. Automatic daily backups included
2. Access via Neon console
3. Download backups as needed

### Code Repository

1. Always keep GitHub updated
2. Create releases for stable versions
3. Tag important commits

## Security Checklist

Before going to production:

- [ ] Change `SECRET_KEY` to random string
- [ ] Use HTTPS only
- [ ] Verify CORS settings
- [ ] Set strong database passwords
- [ ] Enable rate limiting
- [ ] Monitor error logs
- [ ] Set up uptime monitoring
- [ ] Configure automatic backups
- [ ] Enable database encryption (Neon)
- [ ] Use environment variables for secrets

## Monitoring & Analytics

### Set Up Google Analytics

1. Create GA4 property
2. Get Measurement ID (starts with G-)
3. Set `GOOGLE_ANALYTICS_ID` in both frontend and backend

### Set Up Error Tracking

1. Install Sentry (optional)
2. Add error reporting to frontend
3. Add error reporting to backend

## Performance Optimization

### Frontend (Vercel)

- Automatic image optimization
- Edge caching
- CDN distribution
- Automatic GZIP compression

### Backend (Render)

- Auto-scaling (with paid plan)
- Connection pooling
- Redis caching
- Database query optimization

## Continuous Deployment

### GitHub Actions

Optional: Set up CI/CD with GitHub Actions for:

1. Run tests on pull requests
2. Build on main branch
3. Deploy automatically

## Costs Estimation

### Free Tier

- **Vercel**: 100GB bandwidth free
- **Render**: 1 free web service + 1 PostgreSQL instance
- **Neon**: 3 projects, 5GB storage free
- **Upstash**: 10,000 commands/day free

### Monthly Costs (Paid Plans)

- **Vercel**: $20/month (Pro)
- **Render**: $7/month (Standard)
- **Neon**: $15/month+ (Starter)
- **Upstash**: Pay-as-you-go (~$5-20/month)

**Estimated Total**: $50-100/month for production deployment

## Next Steps

1. Deploy backend to Render
2. Deploy frontend to Vercel
3. Configure custom domains
4. Set up monitoring
5. Enable analytics
6. Test all features
7. Monitor performance

For questions or issues, refer to:
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Upstash Documentation](https://upstash.com/docs)

---

Happy deploying! 🚀
