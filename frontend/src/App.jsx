import { useState } from "react";
import "./App.css";
import PollWidget from "./components/PollWidget";
import PollOptionsList from "./components/PollOptionList";

function App() {
  const votes = {
    question: "Where should we go for the next hike?",
    numberOfVotes: 36,
    options: [
      { id: 1, label: "Mountain Trail", count: 12 },
      { id: 2, label: "Forest Loop", count: 7 },
      { id: 3, label: "Coastal Cliffs", count: 5 },
    ],
  };

  return (
    <>
      <PollWidget question={votes.question}>
        <PollOptionsList options={votes.options} />
      </PollWidget>
    </>
  );
}

export default App;
