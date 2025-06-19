import "./App.css";
import { useEffect, useState } from "react";
import PollWidget from "./components/PollWidget";
import PollOptionsList from "./components/PollOptionList";

function App() {
  const [hikes, setHikes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //
    const fetchLatestHike = async () => {
      try {
        const response = await fetch(`/api/hikes/latest`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setHikes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestHike();
  }, []);

  const vote = async (data) => {
    try {
      const res = await fetch(`/api/hikes/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const responseData = await res.json();
        setHikes(responseData);
      }
    } catch (err) {
      console.error("Failed to submit vote", err);
      alert("There was an error submitting your vote. Please try again.");
    }
  };

  if (loading) return <div>Loading hike data...</div>;
  if (error) return <div>Error fetching hike: {error}</div>;
  if (!hikes) return <div>No hike data available</div>;

  return (
    <main className="wrapper">
      <PollWidget question={hikes.question}>
        <PollOptionsList
          options={hikes.options}
          id={hikes.id}
          vote={vote}
          key={Math.random()}
        />
      </PollWidget>
    </main>
  );
}

export default App;
