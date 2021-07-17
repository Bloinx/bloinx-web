import styles from './Aside.module.scss';

export default function Aside({ children }) {
  return (
    <div className={styles.Aside}>
      {children}
    </div>
  );
}
