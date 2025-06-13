import ClipPathButton from "./ClipPathButton/ClipPathButton";
import PollItem from "./PollItem/PollItem";

function PollOptionsList({ options }) {
  return (
    <ul
      style={{
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {options.map((option) => (
        <li
          style={{
            listStyle: "none",
          }}
          key={option.id}
        >
          <PollItem label={option.label} count={option.count} votedFor={true} />
        </li>
      ))}
      {true && <p>Thanks for voting! </p>}
    </ul>
  );
}

export default PollOptionsList;
