# Adding New Markdown Documentation Files

Based on my analysis of the Next.js application structure, here's how to add new markdown files for display:

## Current System Structure:

- **Content Location**: `/home/lili/selfai-nextjs/content/docs/`
- **Pages Handler**: `/home/lili/selfai-nextjs/pages/docs/[slug].js`
- **Automatic Generation**: Next.js automatically generates routes from markdown files

## Process to Add New MD Files:

1. **Create Markdown File** in `/home/lili/selfai-nextjs/content/docs/`
   - File name determines URL slug (e.g., `tutorials.md` → `/docs/tutorials`)
   - Must include frontmatter with title, description, date

2. **Update Navigation** in `/pages/docs/[slug].js`
   - Add link to sidebar navigation (lines 15-20)

3. **Rebuild Application**
   - Run `npm run build` to regenerate static pages
   - Restart PM2 process to serve new content

4. **Example Missing Files to Create**:
   - `tutorials.md` - Step-by-step tutorials
   - `best-practices.md` - Development best practices
   - `database-integration.md` - Advanced database features

## Required Frontmatter Format:

```yaml
---
title: 'Page Title'
description: 'Brief description'
date: '2024-01-01'
---
```

This will automatically make new documentation pages available at `https://selfai.cc/docs/[filename]` with proper navigation and table of contents.