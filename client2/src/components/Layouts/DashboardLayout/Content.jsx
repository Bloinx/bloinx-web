import styles from './Content.module.scss';

export default function Content({ children }) {
  return (
    <div className={styles.Content}>
      {children}
    </div>
  );
}
