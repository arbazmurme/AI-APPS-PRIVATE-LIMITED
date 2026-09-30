import styles from './Ticker.module.css';

const techItems = [
  { icon: '🤖', title: 'Artificial Intelligence', color: '#3b82f6' },
  { icon: '🧠', title: 'Machine Learning', color: '#8b5cf6' },
  { icon: '💻', title: 'Web Development', color: '#6366f1' },
  { icon: '📱', title: 'Mobile Apps', color: '#06b6d4' },
  { icon: '☁️', title: 'Cloud Solutions', color: '#3b82f6' },
  { icon: '🧊', title: 'Blockchain', color: '#10b981' },
  { icon: '🎨', title: 'UI/UX Design', color: '#ec4899' },
  { icon: '📊', title: 'Data Science', color: '#0284c7' },
  { icon: '♾️', title: 'DevOps & CI/CD', color: '#7c3aed' },
];

export default function Ticker() {
  const doubled = [...techItems, ...techItems];
  return (
    <div className={styles.tickerWrapper}>
      <div className={styles.track}>
        {doubled.map((item, i) => (
          <div key={i} className={styles.tickerItem}>
            <span className={styles.itemIcon}>{item.icon}</span>
            <span className={styles.itemTitle}>{item.title}</span>
            <span className={styles.separator}>|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
