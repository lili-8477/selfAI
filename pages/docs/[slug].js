import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Layout from '../../components/Layout';
import styles from '../../styles/DocPage.module.css';

export default function DocPage({ content, frontMatter, headings }) {
  return (
    <Layout showParticles={false}>
      <div className={styles.docContainer}>
        <aside className={styles.sidebar}>
          <h3>Documentation</h3>
          <nav>
            <a href="/docs/getting-started">Getting Started</a>
            <a href="/docs/api-reference">API Reference</a>
            <a href="/docs/tutorials">Tutorials</a>
            <a href="/docs/database-integration">Database Integration</a>
            <a href="/docs/agent-skills">Agent Skills</a>
            <a href="/docs/best-practices">Best Practices</a>
          </nav>
        </aside>

        <main className={styles.content}>
          <article className={styles.article}>
            {frontMatter.title && <h1>{frontMatter.title}</h1>}
            {frontMatter.description && (
              <p className={styles.description}>{frontMatter.description}</p>
            )}
            <div
              className={styles.markdown}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </article>
        </main>

        <aside className={styles.toc}>
          <h4>On This Page</h4>
          <nav>
            {headings && headings.length > 0 ? (
              headings.map((heading, index) => (
                <a
                  key={index}
                  href={`#${heading.id}`}
                  style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
                >
                  {heading.text}
                </a>
              ))
            ) : (
              <p>No headings found</p>
            )}
          </nav>
        </aside>
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
  const filePath = path.join(process.cwd(), 'content/docs', `${slug}.md`);

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content: markdownContent } = matter(fileContents);

  // Create a custom slugify function that matches what we want
  const slugify = (text) => {
    // Ensure text is a string
    const str = typeof text === 'string' ? text : String(text);
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Create custom renderer to add IDs to headings
  const renderer = new marked.Renderer();

  renderer.heading = function({ text, depth }) {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    const id = slugify(text);
    return `<h${depth} id="${id}">${text}</h${depth}>\n`;
  };

  // Configure marked
  marked.setOptions({
    renderer: renderer,
    headerIds: false,
    mangle: false
  });

  // Extract headings from markdown
  const headings = [];
  const tokens = marked.lexer(markdownContent);

  tokens.forEach((token) => {
    if (token.type === 'heading' && token.depth <= 3) {
      const level = token.depth;
      const text = token.text;
      const id = slugify(text);
      headings.push({ level, text, id });
    }
  });

  const content = marked(markdownContent);

  return {
    props: {
      content,
      frontMatter: data,
      headings,
    },
  };
}
