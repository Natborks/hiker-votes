import { useState } from "react";
import useStickyState from "../hooks/useStickyState";
import PollItem from "../components/PollItem/PollItem";

function PollOptionsList({ id: voteid, options }) {
  const [value, setValue] = useStickyState(null, voteid);
  const votedFor = value != null;

  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const handleVote = async (id) => {
    if (!name || !date) {
      alert("Please fill out both name and date before voting.");
      return;
    }

    try {
      await fetch("http://localhost:80/api/hikes/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          voteId: voteid,
          optionId: id,
          name,
          date,
        }),
      });

      setValue(voteid);
    } catch (err) {
      console.error("Failed to submit vote", err);
      alert("There was an error submitting your vote. Please try again.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
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
              Availability (after 3pm):
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
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
        <span>Click to vote</span>
        {options.map((option) => (
          <li key={option.id} onClick={() => handleVote(option.id)}>
            <PollItem
              label={option.label}
              count={option.count}
              votedFor={votedFor}
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
