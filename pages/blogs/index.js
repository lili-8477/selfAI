import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Blog.module.css';

export default function BlogIndex({ posts }) {
  const featured = posts[0];
  const allPosts = posts.slice(1);

  return (
    <Layout showParticles={false}>
      <div className={styles.blogContainer}>
        {/* Hero Title */}
        <div className={styles.blogHero}>
          <h1>Self AI Blog</h1>
        </div>

        {/* Featured Post */}
        {featured && (
          <Link href={`/blogs/${featured.slug}`} className={styles.featuredPost}>
            <div className={styles.featuredImage}>
              <Image
                src={`/blog-images/${featured.slug}.png`}
                alt={featured.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
            <div className={styles.featuredContent}>
              <span className={styles.date}>{featured.date}</span>
              <h2>{featured.title}</h2>
              <p>{featured.description}</p>
              <span className={styles.readMore}>Read article →</span>
            </div>
          </Link>
        )}

        {/* All Posts */}
        <div className={styles.allPostsSection}>
          <h2 className={styles.sectionTitle}>All Posts</h2>
          <div className={styles.postsGrid}>
            {allPosts.map((post, index) => (
              <Link
                href={`/blogs/${post.slug}`}
                key={index}
                className={styles.postCard}
              >
                <div className={styles.postImage}>
                  <Image
                    src={`/blog-images/${post.slug}.png`}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 180px"
                  />
                </div>
                <div className={styles.postContent}>
                  <span className={styles.date}>{post.date}</span>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const docsDirectory = path.join(process.cwd(), 'content/docs');

  let posts = [];

  if (fs.existsSync(docsDirectory)) {
    const filenames = fs.readdirSync(docsDirectory);
    posts = filenames.map((filename) => {
      const filePath = path.join(docsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug: filename.replace('.md', ''),
        title: data.title || filename.replace('.md', '').replace(/-/g, ' '),
        description: data.description || '',
        date: data.date || '',
      };
    });

    // Sort by date descending
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return {
    props: {
      posts,
    },
  };
}
