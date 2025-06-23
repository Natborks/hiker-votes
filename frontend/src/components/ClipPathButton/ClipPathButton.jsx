import styles from "./clipPathButton.module.css";
function ClipPathButton({ children, width, onClick }) {
  const style = { width: width };

  return (
    <button className={styles.button} type="button" onClick={onClick}>
      <div className={styles.overlay} style={style} />
      <div className={styles.children}>{children}</div>
    </button>
  );
}

export default ClipPathButton;
