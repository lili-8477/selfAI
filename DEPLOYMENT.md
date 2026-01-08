# Self AI Next.js - Quick Deployment Guide

## 📋 What You Have

A complete Next.js website with:
- 3D particle homepage (converted from your HTML)
- MDX documentation system
- Deep gray theme
- Responsive design
- Ready for production

## 🚀 Deployment Options

### Option 1: Deploy to Vercel (Easiest - Recommended)

**Free hosting, automatic SSL, CDN included**

1. Push code to GitHub:
```bash
cd self-ai-nextjs
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/self-ai.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

**Done!** Your site will be live at `your-project.vercel.app`

To use your domain (selfai.cc):
- Go to project settings → Domains
- Add `selfai.cc`
- Update DNS records as instructed

---

### Option 2: Deploy to Your Current Server (selfai.cc)

**If you already have a server running:**

1. **Build the project:**
```bash
npm run build
```

2. **Transfer files to server:**
```bash
# Upload entire folder to your server
scp -r self-ai-nextjs user@selfai.cc:/var/www/
```

3. **On your server, install dependencies:**
```bash
ssh user@selfai.cc
cd /var/www/self-ai-nextjs
npm install --production
```

4. **Run with PM2 (process manager):**
```bash
npm install -g pm2
pm2 start npm --name "selfai" -- start
pm2 save
pm2 startup
```

5. **Configure Nginx (reverse proxy):**

Create `/etc/nginx/sites-available/selfai`:

```nginx
server {
    listen 80;
    server_name selfai.cc www.selfai.cc;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/selfai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

6. **Add SSL (Let's Encrypt):**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d selfai.cc -d www.selfai.cc
```

---

### Option 3: Static Export (No Node.js needed)

If you want pure static files:

1. **Update `next.config.js`:**
```javascript
module.exports = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}
```

2. **Build:**
```bash
npm run build
```

3. **Deploy the `out/` folder** to any static host (GitHub Pages, Netlify, etc.)

---

## 📝 Adding New Documentation

### Quick Method:

1. Create a new `.md` file in `content/docs/`:

```bash
# Example: content/docs/tutorials.md
---
title: 'Tutorials'
description: 'Step-by-step guides'
---

# Tutorials

Your content here...
```

2. **That's it!** The page is automatically available at `/docs/tutorials`

### Update Navigation:

Edit `pages/docs/[slug].js` sidebar section:

```javascript
<nav>
  <a href="/docs/getting-started">Getting Started</a>
  <a href="/docs/tutorials">Tutorials</a>  {/* Add this */}
</nav>
```

---

## 🔧 Environment Variables

Create `.env.local` for secrets:

```
SELF_AI_API_KEY=your-key-here
DATABASE_URL=your-database-url
```

Access in code:
```javascript
const apiKey = process.env.SELF_AI_API_KEY;
```

---

## 📊 Project Structure Reference

```
self-ai-nextjs/
├── pages/
│   ├── index.js          ← Homepage
│   └── docs/
│       ├── index.js      ← Docs hub page
│       └── [slug].js     ← Handles all doc routes
├── content/
│   └── docs/             ← ADD YOUR .md FILES HERE
│       ├── getting-started.md
│       └── api-reference.md
├── components/
│   ├── ParticleBackground.jsx  ← 3D particles
│   └── Layout.jsx              ← Header/Footer
└── styles/               ← CSS modules
```

---

## ✅ Testing Locally

```bash
npm run dev
```

Visit: `http://localhost:3000`

Test all pages:
- `/` - Homepage
- `/docs` - Documentation index
- `/docs/getting-started` - Sample doc
- `/docs/api-reference` - API docs

---

## 🎨 Customization Checklist

- [ ] Update company name in `components/Layout.jsx`
- [ ] Add your logo in `public/` folder
- [ ] Customize colors in `styles/globals.css`
- [ ] Write your documentation in `content/docs/`
- [ ] Update contact links
- [ ] Add analytics (Google Analytics, Vercel Analytics)

---

## 🆘 Troubleshooting

**Particles not showing?**
- Clear browser cache
- Check console for errors

**Build fails?**
```bash
rm -rf .next node_modules
npm install
npm run build
```

**Docs not rendering?**
- Check markdown frontmatter format
- Ensure file has `.md` extension
- Verify file is in `content/docs/`

---

## 📞 Need Help?

The README.md file in the project has more detailed information!
