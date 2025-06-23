import "./App.css";
import { useSelector, useDispatch } from "react-redux";

import { useEffect, useState } from "react";
import PollWidget from "./components/PollWidget";
import PollOptionsList from "./components/PollOptionList";
import { setHike } from "./reducer/voteReducer";
import { fetchLatestHike, saveVote } from "./service/latestHike";

function App() {
  const hikes = useSelector((state) => state);
  const [voted, setVoted] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchLatestHike().then((data) => dispatch(setHike(data)));
  }, []);

  const handlevote = async (data) => {
    try {
      const response = await saveVote(data);
      dispatch(setHike(response));
    } catch (error) {
      dispatch(setHike(hikes));
      throw error;
    }
  };

  if (!hikes) return <div>fetching...</div>;

  return (
    <main className="wrapper">
      <PollWidget question={hikes.question}>
        <PollOptionsList
          key={hikes.numberOfVotes}
          options={hikes.options}
          id={hikes.id}
          vote={handlevote}
          totalVotes={hikes.numberOfVotes}
        />
      </PollWidget>
    </main>
  );
}

export default App;
