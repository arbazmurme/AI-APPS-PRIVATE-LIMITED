'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Navbar.module.css';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Solutions', href: '#projects' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('hero');
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage (default: light)
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = document.querySelectorAll('section[id]');
      let curr = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) curr = s.id;
      });
      setActive(curr);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.container} container`}>
        {/* Logo */}
        <a href="#hero" className={styles.logo} onClick={closeMenu}>
          <Image
            src="/logo.png"
            alt="AI APPS PRIVATE LIMITED"
            width={220}
            height={55}
            className={styles.logoImg}
            priority
          />
        </a>

        {/* Links */}
        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {navItems.map(item => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`${styles.link} ${active === item.href.slice(1) ? styles.activeLink : ''}`}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Controls: Theme Switcher + CTA */}
        <div className={styles.navActions}>
          {/* Theme Toggle Button */}
          {mounted && (
            <button
              type="button"
              className={styles.themeToggleBtn}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              <div className={styles.themeIconWrap}>
                {theme === 'light' ? (
                  <>
                    <span className={styles.themeIcon}>🌙</span>
                    <span className={styles.themeText}>Dark</span>
                  </>
                ) : (
                  <>
                    <span className={styles.themeIcon}>☀️</span>
                    <span className={styles.themeText}>Light</span>
                  </>
                )}
              </div>
            </button>
          )}

          <a href="#contact" className={styles.cta} onClick={closeMenu}>
            <span>Get Started</span>
          </a>

          {/* Mobile Hamburger */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamOpen : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
