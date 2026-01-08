# 🚀 Self AI Next.js - Quick Start Guide

## What's Inside?

Your complete Self AI website with:
- ✨ 3D particle homepage (deep gray theme)
- 📚 MDX documentation system  
- 🎨 Modern, professional design
- 📱 Fully responsive
- ⚡ Production-ready

## 🏃 Get Started in 3 Steps

### Step 1: Extract & Install

```bash
# Extract the project
tar -xzf self-ai-nextjs.tar.gz
cd self-ai-nextjs

# Install dependencies (takes ~1 minute)
npm install
```

### Step 2: Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 - Your site is live! 🎉

### Step 3: Add Your Documentation

Create files in `content/docs/`:

```markdown
---
title: 'My First Doc'
description: 'This is my documentation'
---

# My Documentation

Write your content in Markdown here...

## Code Examples

\`\`\`javascript
const example = 'Hello World';
\`\`\`
```

**That's it!** Your doc is now at `/docs/my-first-doc`

---

## 📝 Adding More Docs

Just create `.md` files in `content/docs/`:

```
content/docs/
├── getting-started.md      ✅ Already included
├── api-reference.md        ✅ Already included
├── your-new-doc.md         👈 Add yours here
└── another-doc.md          👈 And here
```

Each file automatically becomes a page!

---

## 🚀 Deploy to Production

### Easiest: Vercel (Free)

1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically
4. Add your domain (selfai.cc)

**Full deployment guide:** See `DEPLOYMENT.md`

---

## 📂 Project Structure

```
self-ai-nextjs/
├── pages/
│   ├── index.js              # Homepage
│   └── docs/
│       ├── index.js          # Docs hub
│       └── [slug].js         # Auto-generates doc pages
├── content/
│   └── docs/                 # 👈 PUT YOUR .md FILES HERE
├── components/
│   ├── ParticleBackground.jsx
│   └── Layout.jsx
├── styles/                   # CSS modules
├── package.json
└── README.md                 # Full documentation
```

---

## 🎨 Quick Customizations

### Change Colors

Edit `styles/globals.css`:

```css
:root {
  --primary-gray: #e0e0e0;    /* Light gray */
  --accent-gray: #b0b0b0;     /* Medium gray */
  --dark-bg: #1a1a1a;         /* Dark background */
}
```

### Update Navigation

Edit `components/Layout.jsx`:

```jsx
<nav>
  <Link href="/">Home</Link>
  <Link href="/docs">Docs</Link>
  <Link href="/products">Products</Link>  {/* Add new links */}
</nav>
```

### Adjust Particles

Edit `components/ParticleBackground.jsx`:

```javascript
const particleCount = 3000;  // More or fewer particles
```

---

## 📚 Example Documentation

Two docs are already included:

1. **Getting Started** (`/docs/getting-started`)
   - Installation guide
   - Quick start code
   - Configuration

2. **API Reference** (`/docs/api-reference`)
   - Complete API docs
   - Code examples
   - Error codes

Use these as templates for your own docs!

---

## 🆘 Help & Resources

- **Full Guide:** `README.md` (in project folder)
- **Deployment:** `DEPLOYMENT.md`
- **Issues?** Check troubleshooting in README

---

## 🎯 Next Steps

1. ✅ Run the dev server (`npm run dev`)
2. ✅ Check out the homepage and docs
3. ✅ Add your own documentation in `content/docs/`
4. ✅ Customize colors and branding
5. ✅ Deploy to production

---

**Built with Next.js + Three.js + MDX**

Happy coding! 🚀
