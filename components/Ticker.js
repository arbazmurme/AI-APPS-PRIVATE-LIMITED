import styles from './Ticker.module.css';

const items = [
  'Artificial Intelligence','Machine Learning','Web Development','Mobile Apps',
  'Cloud Solutions','Blockchain','UI/UX Design','Data Science','DevOps & CI/CD','Cybersecurity',
];

export default function Ticker() {
  const doubled = [...items, ...items];
  return (
    <div className={styles.ticker}>
      <div className={styles.track}>
        {doubled.map((item, i) => (
          <span key={i}>
            {item}
            {i < doubled.length - 1 && <span className={styles.dot}>●</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
