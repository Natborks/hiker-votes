import { useEffect, useId, useState } from "react";
import useStickyState from "../hooks/useStickyState";
import PollItem from "../components/PollItem/PollItem";

function PollOptionsList({ id: voteId, options, vote, totalVotes }) {
  const [value, setValue] = useStickyState(false, voteId);

  const [name, setName] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const votedFor = value;

  const handleVote = async (id) => {
    if (votedFor) return;

    // if (!name) {
    //   alert("Please fill out the name field");
    //   return;
    // }

    try {
      //setvalue optimistically
      setValue(true);
      await vote({ name, date, optionId: id, voteId });
    } catch (err) {
      setValue(false);
      alert("Vote failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#fff",
      }}
    >
      {!votedFor && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor="name"
              style={{ marginBottom: "4px", fontWeight: "bold" }}
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor="date"
              style={{ marginBottom: "4px", fontWeight: "bold" }}
            >
              Availability, If you're unavailable on wednesday:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                padding: "10px",
                backgroundColor: "transparent",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "16px",
              }}
            />
          </div>
        </div>
      )}

      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: 0,
        }}
      >
        {!votedFor && <span>Click to vote</span>}

        {options.map((option) => (
          <li key={option.id}>
            <PollItem
              onClick={() => handleVote(option.id)}
              label={option.label}
              count={option.count}
              votedFor={votedFor}
              percentage={(option.count / totalVotes) * 100}
            />
          </li>
        ))}
      </ul>

      {votedFor && (
        <p style={{ marginTop: "16px", color: "green", fontWeight: "500" }}>
          Thanks for voting!
        </p>
      )}
    </div>
  );
}

export default PollOptionsList;
