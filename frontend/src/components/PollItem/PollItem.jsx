import styles from "./PollItem.module.css";

function PollItem({ label, count, votedFor }) {
  return (
    <div className={styles.wrapper}>
      <button type="button" className={styles.optionButton}>
        <span className={styles.label}>{label}</span>
        {votedFor && (
          <span className={styles.count} aria-label={"number of votes"}>
            {`${count} votes`}
          </span>
        )}
      </button>
    </div>
  );
}

export default PollItem;
