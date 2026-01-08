# Self AI Website - Next.js with MDX Documentation

A modern, tech-themed website for Self AI with 3D particle effects and MDX-powered documentation.

## 🚀 Features

- ✨ 3D Particle background with Three.js
- 📚 MDX-powered documentation system
- 🎨 Deep gray theme with modern design
- 📱 Fully responsive
- ⚡ Fast and optimized with Next.js
- 🔍 SEO-friendly

## 📁 Project Structure

```
self-ai-nextjs/
├── pages/
│   ├── index.js              # Homepage with 3D particles
│   ├── docs/
│   │   ├── index.js          # Documentation hub
│   │   └── [slug].js         # Dynamic doc pages
│   └── _app.js               # App wrapper
├── components/
│   ├── ParticleBackground.jsx # 3D particle system
│   └── Layout.jsx             # Main layout component
├── content/
│   └── docs/                  # Your markdown documentation
│       └── getting-started.md # Example doc
├── styles/
│   ├── globals.css           # Global styles
│   ├── Layout.module.css     # Layout styles
│   ├── Home.module.css       # Homepage styles
│   ├── Docs.module.css       # Docs index styles
│   └── DocPage.module.css    # Doc page styles
├── public/                    # Static files
├── package.json
└── next.config.js
```

## 🛠️ Setup & Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Run development server:**
```bash
npm run dev
```

Visit `http://localhost:3000` to see your site.

3. **Build for production:**
```bash
npm run build
npm start
```

## 📝 Adding Documentation

### Method 1: Create Markdown Files

Simply add `.md` files to `content/docs/`:

```markdown
---
title: 'Your Doc Title'
description: 'Brief description'
date: '2024-01-01'
---

# Your Documentation

Write your content here in Markdown...

## Code Examples

\`\`\`javascript
const example = 'Hello World';
\`\`\`
```

### Method 2: File Naming

File names become URLs automatically:
- `content/docs/api-reference.md` → `/docs/api-reference`
- `content/docs/tutorials.md` → `/docs/tutorials`

### Method 3: Update Sidebar

Edit the sidebar navigation in `pages/docs/[slug].js`:

```javascript
<nav>
  <a href="/docs/getting-started">Getting Started</a>
  <a href="/docs/your-new-doc">Your New Doc</a>
</nav>
```

## 🎨 Customization

### Colors

Edit `styles/globals.css`:

```css
:root {
  --primary-gray: #e0e0e0;
  --accent-gray: #b0b0b0;
  --dark-bg: #1a1a1a;
}
```

### Navigation

Edit `components/Layout.jsx`:

```jsx
<nav>
  <Link href="/">Home</Link>
  <Link href="/docs">Docs</Link>
  <Link href="/your-page">Your Page</Link>
</nav>
```

### Particle Settings

Edit `components/ParticleBackground.jsx`:

```javascript
const particleCount = 3000; // Change particle count
const color1 = new THREE.Color(0xe0e0e0); // Change colors
```

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Deploy automatically

### Deploy to Your Server (selfai.cc)

1. Build the project:
```bash
npm run build
```

2. The output is in `.next/` folder

3. Upload and run:
```bash
npm start
```

Or use PM2 for production:
```bash
npm install -g pm2
pm2 start npm --name "selfai" -- start
```

## 📚 Documentation Tips

### Code Blocks

Use triple backticks with language:

\`\`\`javascript
const ai = new SelfAI();
\`\`\`

### Images

Add images to `public/images/`:

```markdown
![Description](/images/screenshot.png)
```

### Links

Internal links:
```markdown
[API Reference](/docs/api-reference)
```

External links:
```markdown
[GitHub](https://github.com/yourrepo)
```

## 🔧 Common Tasks

### Add a new doc page:
1. Create `content/docs/your-page.md`
2. Add link in sidebar
3. Add to docs index if needed

### Change homepage content:
Edit `pages/index.js`

### Modify styles:
Edit corresponding `.module.css` files

## 🚨 Troubleshooting

**Build errors?**
- Delete `.next/` folder
- Run `npm install` again
- Try `npm run build`

**Particles not showing?**
- Check browser console for errors
- Ensure Three.js is loaded

**Docs not rendering?**
- Check markdown frontmatter format
- Ensure file is in `content/docs/`

## 📞 Support

- Email: support@selfai.cc
- Documentation: https://selfai.cc/docs

---

Built with ❤️ using Next.js, Three.js, and MDX
