import Link from 'next/link';
import Image from 'next/image';
import ParticleBackground from './ParticleBackground';
import styles from '../styles/Layout.module.css';

export default function Layout({ children, showParticles = true }) {
  return (
    <div className={styles.container}>
      {showParticles && <ParticleBackground />}

      <header className={styles.header}>
        <Link href="/" className={styles.logoContainer}>
          <Image
            src="/logo.png"
            alt="Self AI Logo"
            width={40}
            height={40}
            className={styles.logoImage}
          />
          <span className={styles.logo}>Self AI</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/blogs">Blogs</Link>
          <Link href="#contact">Contact</Link>
        </nav>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <p>© 2024 Self AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
