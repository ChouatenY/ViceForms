# ViceForms Deployment Guide

## Quick Deployment Checklist

### ✅ Pre-Deployment Setup

1. **Environment Variables Ready**
   - [ ] Neon Database URLs configured
   - [ ] Google Gemini API Key obtained
   - [ ] All environment variables tested locally

2. **Database Setup**
   - [ ] Neon PostgreSQL database created
   - [ ] Database schema pushed with `npx prisma db push`
   - [ ] Database connection tested

3. **Code Ready**
   - [ ] All purple colors replaced with secondary color
   - [ ] All "TechWithEmma" references changed to "Built by Vice"
   - [ ] Logo updated to use logo.png
   - [ ] App renamed to ViceForms throughout

### 🚀 Vercel Deployment Steps

1. **Fork Repository**
   ```bash
   # Fork this repository to your GitHub account
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your forked repository

3. **Configure Environment Variables in Vercel**
   ```
   NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
   DATABASE_URL=your-neon-pooled-connection-string
   DIRECT_DATABASE_URL=your-neon-direct-connection-string
   NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
   ```

4. **Deploy**
   - Vercel will automatically build and deploy
   - First deployment may take 2-3 minutes

### 🔧 Post-Deployment

1. **Verify Deployment**
   - [ ] App loads correctly
   - [ ] Database connection works
   - [ ] Form creation works
   - [ ] AI features work (if Gemini API configured)

2. **Update Environment Variables**
   - Update `NEXT_PUBLIC_APP_URL` to your actual Vercel URL
   - Test all functionality

### 🐛 Troubleshooting

**Build Errors:**
- Check environment variables are set correctly
- Ensure database URLs are valid
- Verify Prisma schema is up to date

**Runtime Errors:**
- Check Vercel function logs
- Verify database connection
- Test API endpoints individually

**Database Issues:**
- Run `npx prisma db push` after deployment
- Check Neon database is accessible
- Verify connection strings format

### 📝 Notes

- Vercel automatically handles Next.js optimization
- Database migrations run automatically via `postinstall` script
- Environment variables are encrypted and secure in Vercel
- Free tier includes 100GB bandwidth and 1000 serverless function invocations

### 🎉 Success!

Your ViceForms app should now be live at: `https://your-app-name.vercel.app`
