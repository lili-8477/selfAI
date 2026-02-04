import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <Layout>
      <section className={styles.hero}>
        <h1 className={styles.title}>Your AI Assistant</h1>
        <p className={styles.subtitle}>Bringing Intelligence to Your Data & Knowledge</p>
      </section>

      <section className={styles.features} id="features">
        <h2 className={styles.sectionTitle}>Core Capabilities</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🧠</div>
            <h3>Smart Understanding</h3>
            <p>
              Your AI assistant comprehends your ideas and transforms them into
              actionable insights with advanced natural language processing.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💾</div>
            <h3>Intelligent Database</h3>
            <p>
              Make your databases smarter with AI-powered queries, automated
              insights, and semantic search capabilities.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📚</div>
            <h3>Agent Skills</h3>
            <p>
              Extend your AI with custom skills and workflows that automate
              complex tasks and integrate with your existing systems.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
