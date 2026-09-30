'use client';
import { useRef, useState } from 'react';
import styles from './Contact.module.css';

const info = [
  {
    icon: '📍',
    title: 'Our Office',
    lines: [
      'Flat No - 3, 1st Floor, Sharada Complex, Plot No - 103,',
      'Vengal Rao Nagar Rd, Kalyan Nagar Phase 1, Ameerpet,',
      'Hyderabad, Telangana 500038, India'
    ]
  },
  {
    icon: '📧',
    title: 'Email Us',
    lines: ['care@dexterous.in']
  },
  {
    icon: '📞',
    title: 'Call Us',
    lines: ['+91 99085 16950', '+91 95157 05570', '+91 40 3550 6831']
  },
  {
    icon: '💬',
    title: 'WhatsApp Support',
    lines: ['+91 99085 16950 (Instant Response)']
  },
  {
    icon: '⏰',
    title: 'Working Hours',
    lines: ['Monday – Saturday: 9:30 AM – 7:00 PM IST']
  },
];

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setDone(true);
      e.target.reset();
      setTimeout(() => setDone(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <div className="section-header reveal-up">
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">Let&apos;s Build Something <span className="gradient-text">Amazing</span></h2>
          <p className="section-sub">Have a project in mind? Connect with us via WhatsApp, call, or email. We respond quickly.</p>
        </div>

        <div className={styles.grid}>
          {/* Info */}
          <div className={`${styles.info} reveal-up`}>
            {info.map(i => (
              <div key={i.title} className={styles.infoItem}>
                <div className={styles.infoIcon}>{i.icon}</div>
                <div>
                  <h4>{i.title}</h4>
                  {i.lines.map(l => <p key={l}>{l}</p>)}
                </div>
              </div>
            ))}

            {/* Quick WhatsApp Button */}
            <a
              href="https://api.whatsapp.com/send?phone=919908516950&text=Hi%20AI%20APPS%20Technology,%20I%20would%20like%20to%20consult%20about%20building%20my%20app/website."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                marginTop: '10px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                borderColor: 'rgba(16, 185, 129, 0.4)',
                boxShadow: '0 4px 18px rgba(16, 185, 129, 0.35)'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.044-1.924-.469-1.464-.61-2.404-2.112-2.477-2.21-.07-.099-.604-.805-.604-1.536 0-.73.382-1.09.518-1.238.136-.149.297-.186.396-.186.099 0 .198.001.284.005.091.004.213-.034.333.254.124.297.424 1.035.461 1.11.037.074.062.161.012.26-.049.099-.074.16-.148.247-.074.086-.156.193-.223.259-.074.074-.151.155-.065.303.086.148.385.636.826 1.029.568.507 1.047.665 1.196.739.149.074.235.062.322-.037.086-.099.37-.433.469-.582.099-.149.198-.124.334-.074.136.049.865.408 1.014.482.148.074.247.111.284.173.037.062.037.359-.107.764zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.954-1.397A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.637 0-3.15-.477-4.42-1.298l-.317-.204-2.92.823.824-2.846-.226-.339A8.17 8.17 0 013.8 12c0-4.521 3.679-8.2 8.2-8.2 4.522 0 8.2 3.679 8.2 8.2 0 4.522-3.678 8.2-8.2 8.2z"/>
              </svg>
              <span>Direct WhatsApp Chat</span>
            </a>

            <div className={styles.socials} style={{ marginTop: '16px' }}>
              <a href="https://www.facebook.com/DexterousTechnologyWebServices" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>Facebook</a>
              <a href="https://api.whatsapp.com/send?phone=919908516950" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>WhatsApp</a>
              <a href="mailto:care@dexterous.in" className={styles.socialBtn}>Email</a>
            </div>
          </div>

          {/* Form */}
          <form className={`${styles.form} reveal-up`} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.group}>
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" placeholder="John Doe" required />
              </div>
              <div className={styles.group}>
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="john@company.com" required />
              </div>
            </div>
            <div className={styles.group}>
              <label htmlFor="company">Company / Organization</label>
              <input type="text" id="company" name="company" placeholder="Your Company Name" />
            </div>
            <div className={styles.group}>
              <label htmlFor="service">Service Required</label>
              <select id="service" name="service">
                <option value="">Select a service...</option>
                <option value="ai">AI & Machine Learning</option>
                <option value="web">Web Development</option>
                <option value="mobile">Mobile App Development</option>
                <option value="cloud">Cloud Solutions</option>
                <option value="design">UI/UX Design</option>
                <option value="blockchain">Blockchain & Web3</option>
              </select>
            </div>
            <div className={styles.group}>
              <label htmlFor="message">Project Details</label>
              <textarea id="message" name="message" rows={5} placeholder="Tell us about your project, timeline, and budget..." required />
            </div>
            <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={sending}>
              <span>{sending ? 'Sending...' : 'Send Message'}</span>
              {!sending && (
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              )}
            </button>
            {done && (
              <div className={styles.success}>
                🎉 Message sent! We&apos;ll get back to you within 24 hours.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
