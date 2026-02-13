import Layout from '../components/Layout';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  const services = [
    {
      title: 'Data & Knowledge AI',
      description:
        'Connect your databases, documents, and domain knowledge to build AI that truly understands your business — powered by real data, not guesswork.',
      image: '/blog-images/home-data-ai.png',
    },
    {
      title: 'AI Infrastructure',
      description:
        'We design and build the custom AI architecture your team needs — from multi-agent orchestration to private deployments, tailored to your workflow.',
      image: '/blog-images/home-ai-infra.png',
    },
    {
      title: 'AI Training & Education',
      description:
        'Hands-on programs that teach your team to leverage AI efficiently, reproducibly, and safely — so you get real results, not just experiments.',
      image: '/blog-images/home-ai-teaching.png',
    },
  ];

  return (
    <Layout>
      <section className={styles.hero}>
        <h1 className={styles.title}>Build Your Own AI</h1>
        <p className={styles.subtitle}>
          Customized AI infrastructure, superpowered for your needs
        </p>
      </section>

      <section className={styles.features} id="features">
        <h2 className={styles.sectionTitle}>Core Services</h2>
        <div className={styles.featuresGrid}>
          {services.map((service, index) => (
            <div className={styles.featureCard} key={index}>
              <div className={styles.featureImage}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
