import styles from './index.module.scss';

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.DashboardLayout}>
      {children}
    </div>
  );
}
