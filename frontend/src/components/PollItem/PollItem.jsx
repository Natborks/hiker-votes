import styles from "./pollitem.module.css";
import ClipPathButton from "../ClipPathButton/ClipPathButton";

function PollItem({ label, count, votedFor, percentage, onClick }) {
  const width = votedFor ? percentage + "%" : "100%";

  return (
    <div className={styles.wrapper}>
      <ClipPathButton type="button" width={width} onClick={onClick}>
        <div className={styles.label}>{label}</div>
        {votedFor && (
          <div className={styles.count} aria-label={"number of votes"}>
            {`${percentage.toFixed(2)}% votes`}
          </div>
        )}
      </ClipPathButton>
    </div>
  );
}

export default PollItem;
