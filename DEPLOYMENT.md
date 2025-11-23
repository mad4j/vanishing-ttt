# Deployment Guide

This guide explains how to deploy the Vanishing Tic-Tac-Toe PWA to various hosting platforms.

## Quick Deploy Options

### GitHub Pages (Recommended for this repository)

1. Go to repository Settings
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select your branch (e.g., `main`)
4. Click "Save"
5. Your site will be live at: `https://mad4j.github.io/vanishing-ttt/`

**Advantages:**
- Free hosting
- Automatic HTTPS
- Direct integration with GitHub
- No configuration needed

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

**Manual deployment:**
1. Sign up at [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub account and select this repository
4. **Build settings:**
   - Build command: (leave empty)
   - Publish directory: `/` (root)
5. Click "Deploy site"

**Advantages:**
- Automatic deployments on push
- Custom domains
- Instant preview URLs
- Built-in CDN

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Manual deployment:**
1. Sign up at [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. **Project settings:**
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
5. Click "Deploy"

**Advantages:**
- Zero configuration
- Automatic deployments
- Edge network
- Free SSL

### Traditional Web Hosting

Upload all files to your web host via FTP/SFTP:

```
public_html/
├── index.html
├── styles.css
├── game.js
├── app.js
├── service-worker.js
├── manifest.json
└── icons/
    ├── icon-192x192.png
    └── icon-512x512.png
```

**Requirements:**
- Web server with HTTPS (required for Service Worker)
- No server-side processing needed
- Works with Apache, Nginx, etc.

## Local Development Server

### Python (comes with most systems)

```bash
python3 -m http.server 8000
```

Visit: `http://localhost:8000`

### Node.js

```bash
npx http-server -p 8000
```

### PHP

```bash
php -S localhost:8000
```

## Post-Deployment Checklist

After deploying, verify:

- ✅ Site loads correctly
- ✅ Game is playable
- ✅ AI opponent works
- ✅ Reset button functions
- ✅ Service Worker registers (check browser console)
- ✅ PWA install prompt appears
- ✅ Offline mode works (try airplane mode)
- ✅ Mobile responsive (test on phone)
- ✅ HTTPS is enabled (required for PWA)

## PWA Testing

### Chrome DevTools (Desktop)

1. Open DevTools (F12)
2. Go to "Application" tab
3. Check "Service Workers" - should show registered
4. Check "Manifest" - should show app details
5. Click "Add to homescreen" link to test install

### Mobile Testing

1. Visit site on mobile device
2. Look for browser's install prompt
3. Add to home screen
4. Test offline by enabling airplane mode
5. Open app from home screen

## Custom Domain Setup

### GitHub Pages

1. Add a `CNAME` file with your domain:
   ```
   tictactoe.yourdomain.com
   ```
2. Configure DNS:
   - Add CNAME record pointing to: `yourusername.github.io`
3. Enable "Enforce HTTPS" in Settings

### Netlify/Vercel

1. Go to domain settings in dashboard
2. Add custom domain
3. Follow DNS configuration instructions
4. SSL is automatic

## Troubleshooting

### Service Worker Not Registering

- Ensure site is served over HTTPS (not HTTP)
- Check browser console for errors
- Clear cache and hard reload (Ctrl+Shift+R)

### PWA Install Prompt Not Showing

- Site must be HTTPS
- Must visit site at least twice with 5-minute gap
- Check manifest.json is accessible
- Verify icons exist and are correct size

### Offline Mode Not Working

- Check Service Worker is registered
- Visit site while online first
- Check browser console for caching errors
- Verify service-worker.js is accessible

## Performance Optimization (Optional)

If you want to optimize further:

1. **Minify JavaScript/CSS**
   ```bash
   npx terser game.js -o game.min.js
   npx terser app.js -o app.min.js
   npx csso styles.css -o styles.min.css
   ```

2. **Optimize Images**
   - Icons are already optimized
   - Consider adding a favicon

3. **Enable Gzip Compression**
   - Most modern hosts do this automatically
   - Configure in `.htaccess` or server config if needed

## Monitoring

Once deployed, you can monitor:

- **Google Analytics** - Add tracking code to index.html
- **Lighthouse** - Run audits in Chrome DevTools
- **Web Vitals** - Monitor performance metrics
- **PWA Stats** - Track install rates

## Support

If you encounter issues:

1. Check browser console for errors
2. Verify all files deployed correctly
3. Test in incognito/private mode
4. Try a different browser
5. Check HTTPS is working

---

**Your PWA is now live and installable! 🎉**
