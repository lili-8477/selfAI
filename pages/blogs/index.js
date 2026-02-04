import Layout from '../../components/Layout';
import Link from 'next/link';
import styles from '../../styles/Docs.module.css';

export default function DocsIndex() {
  const docCategories = [
    {
      title: 'Getting Started',
      description: 'Quick start guide to integrate Self AI into your projects',
      link: '/docs/getting-started',
      icon: '🚀'
    },
    {
      title: 'API Reference',
      description: 'Complete API documentation and endpoint references',
      link: '/docs/api-reference',
      icon: '📖'
    },
    {
      title: 'Tutorials',
      description: 'Step-by-step tutorials for common use cases',
      link: '/docs/tutorials',
      icon: '🎓'
    },
    {
      title: 'Database Integration',
      description: 'Connect Self AI to your existing databases',
      link: '/docs/database-integration',
      icon: '💾'
    },
    {
      title: 'Agent Skills',
      description: 'Extend AI capabilities with custom workflows',
      link: '/docs/agent-skills',
      icon: '📚'
    },
    {
      title: 'Best Practices',
      description: 'Tips and tricks for optimal performance',
      link: '/docs/best-practices',
      icon: '⭐'
    }
  ];

  return (
    <Layout showParticles={false}>
      <div className={styles.docsContainer}>
        <div className={styles.docsHero}>
          <h1>Documentation</h1>
          <p>Everything you need to know about Self AI</p>
        </div>

        <div className={styles.docsGrid}>
          {docCategories.map((category, index) => (
            <Link href={category.link} key={index} className={styles.docCard}>
              <div className={styles.docIcon}>{category.icon}</div>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <span className={styles.docArrow}>→</span>
            </Link>
          ))}
        </div>

        <div className={styles.quickLinks}>
          <h2>Quick Links</h2>
          <div className={styles.linkGrid}>
            <a href="#" className={styles.quickLink}>
              <span>💬</span>
              <div>
                <h4>Community</h4>
                <p>Join our Discord</p>
              </div>
            </a>
            <a href="#" className={styles.quickLink}>
              <span>🐛</span>
              <div>
                <h4>Report Issues</h4>
                <p>GitHub Issues</p>
              </div>
            </a>
            <a href="#" className={styles.quickLink}>
              <span>📧</span>
              <div>
                <h4>Contact</h4>
                <p>Get in touch</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
