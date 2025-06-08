import styles from "./clipPathButton.module.css";
function ClipPathButton({ children }) {
  return (
    <button className={styles.button}>
      <div className={styles.overlay} />
      <div className={styles.children}>{children}</div>
    </button>
  );
}

export default ClipPathButton;
