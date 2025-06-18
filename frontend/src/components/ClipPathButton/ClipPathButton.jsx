import styles from "./clipPathButton.module.css";
function ClipPathButton({ children, showAnimation }) {
  const style = showAnimation
    ? { animation: "overlayFill 1s linear forwards" }
    : null;

  return (
    <button className={styles.button} style={style} type="button">
      <div className={styles.overlay} />
      <div className={styles.children}>{children}</div>
    </button>
  );
}

export default ClipPathButton;
