import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Layout from '../../components/Layout';
import Link from 'next/link';
import styles from '../../styles/BlogPost.module.css';

export default function BlogPost({ content, frontMatter, headings, slug, allPosts }) {
  return (
    <Layout showParticles={false}>
      <div className={styles.postContainer}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/blogs">← Back to all posts</Link>
        </nav>

        <main className={styles.postMain}>
          <article className={styles.article}>
            {frontMatter.date && (
              <span className={styles.date}>{frontMatter.date}</span>
            )}
            {frontMatter.title && <h1>{frontMatter.title}</h1>}
            {frontMatter.description && (
              <p className={styles.description}>{frontMatter.description}</p>
            )}
            <div
              className={styles.markdown}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </article>

          {/* Table of Contents */}
          {headings && headings.length > 0 && (
            <aside className={styles.toc}>
              <h4>On This Page</h4>
              <nav>
                {headings.map((heading, index) => (
                  <a
                    key={index}
                    href={`#${heading.id}`}
                    style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
                  >
                    {heading.text}
                  </a>
                ))}
              </nav>
            </aside>
          )}
        </main>

        {/* Related Posts */}
        {allPosts && allPosts.length > 0 && (
          <section className={styles.relatedSection}>
            <h3>More Posts</h3>
            <div className={styles.relatedGrid}>
              {allPosts
                .filter((p) => p.slug !== slug)
                .slice(0, 3)
                .map((post, index) => (
                  <Link
                    href={`/blogs/${post.slug}`}
                    key={index}
                    className={styles.relatedCard}
                  >
                    <span className={styles.relatedDate}>{post.date}</span>
                    <h4>{post.title}</h4>
                    <p>{post.description}</p>
                  </Link>
                ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const docsDirectory = path.join(process.cwd(), 'content/docs');

  let paths = [];

  if (fs.existsSync(docsDirectory)) {
    const filenames = fs.readdirSync(docsDirectory);
    paths = filenames.map((filename) => ({
      params: { slug: filename.replace('.md', '') },
    }));
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const docsDirectory = path.join(process.cwd(), 'content/docs');
  const filePath = path.join(docsDirectory, `${slug}.md`);

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content: markdownContent } = matter(fileContents);

  // Slugify helper
  const slugify = (text) => {
    const str = typeof text === 'string' ? text : String(text);
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Custom renderer for heading IDs
  const renderer = new marked.Renderer();
  renderer.heading = function ({ text, depth }) {
    const id = slugify(text);
    return `<h${depth} id="${id}">${text}</h${depth}>\n`;
  };

  marked.setOptions({
    renderer: renderer,
    headerIds: false,
    mangle: false,
  });

  // Extract headings
  const headings = [];
  const tokens = marked.lexer(markdownContent);
  tokens.forEach((token) => {
    if (token.type === 'heading' && token.depth <= 3) {
      headings.push({
        level: token.depth,
        text: token.text,
        id: slugify(token.text),
      });
    }
  });

  const content = marked(markdownContent);

  // Get all posts for "More Posts" section
  let allPosts = [];
  if (fs.existsSync(docsDirectory)) {
    const filenames = fs.readdirSync(docsDirectory);
    allPosts = filenames.map((filename) => {
      const fp = path.join(docsDirectory, filename);
      const fc = fs.readFileSync(fp, 'utf8');
      const { data: d } = matter(fc);
      return {
        slug: filename.replace('.md', ''),
        title: d.title || filename.replace('.md', '').replace(/-/g, ' '),
        description: d.description || '',
        date: d.date || '',
      };
    });
    allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return {
    props: {
      content,
      frontMatter: data,
      headings,
      slug,
      allPosts,
    },
  };
}
