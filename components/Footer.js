import Image from 'next/image';
import styles from './Footer.module.css';

const services = ['AI & ML Solutions', 'Web Development', 'Mobile Apps', 'Cloud Solutions', 'UI/UX Design', 'Blockchain'];
const company  = ['About Us', 'Portfolio', 'Our Team', 'Careers', 'Blog', 'Press Kit'];
const legal    = ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy'];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <Image
                src="/logo.png"
                alt="AI APPS PRIVATE LIMITED"
                width={240}
                height={60}
                className={styles.logoImg}
              />
            </div>
            <p>Building intelligent software solutions that drive growth, innovation, and competitive advantage for businesses worldwide.</p>
            <div className={styles.certs}>
              {['ISO 9001:2015', 'CMMI Level 3', 'NASSCOM Member'].map(c => (
                <span key={c} className={styles.cert}>{c}</span>
              ))}
            </div>
          </div>

          <div className={styles.col}>
            <h4>Services</h4>
            <ul>{services.map(s => <li key={s}><a href="#services">{s}</a></li>)}</ul>
          </div>

          <div className={styles.col}>
            <h4>Company</h4>
            <ul>{company.map(c => <li key={c}><a href="#about">{c}</a></li>)}</ul>
          </div>

          <div className={styles.col}>
            <h4>Contact Info</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '8px' }}>
                📍 Ameerpet, Hyderabad, Telangana 500038
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="mailto:care@dexterous.in" style={{ color: 'var(--primary)' }}>✉️ care@dexterous.in</a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="tel:+919908516950" style={{ color: 'var(--text-muted)' }}>📞 +91 99085 16950</a>
              </li>
              <li>
                <a 
                  href="https://api.whatsapp.com/send?phone=919908516950&text=Hi%20AI%20APPS%20Technology" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: '#10b981', fontWeight: 600 }}
                >
                  💬 WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2024 AI APPS PRIVATE LIMITED. All rights reserved.</p>
          <p>Made with ❤️ in India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}
