import styles from "./pollitem.module.css";
import ClipPathButton from "../ClipPathButton/ClipPathButton";

function PollItem({ label, count, votedFor }) {
  return (
    <div className={styles.wrapper}>
      <ClipPathButton type="button" showAnimation={votedFor}>
        <div className={styles.label}>{label}</div>
        {votedFor && (
          <div className={styles.count} aria-label={"number of votes"}>
            {`${count} votes`}
          </div>
        )}
      </ClipPathButton>
    </div>
  );
}

export default PollItem;
