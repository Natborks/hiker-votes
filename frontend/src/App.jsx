import "./App.css";
import { useEffect, useState } from "react";
import PollWidget from "./components/PollWidget";
import PollOptionsList from "./components/PollOptionList";

function App() {
  const [hikes, setHikes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // `${import.meta.env.VITE_API_BASE_URL}/api/hikes/latest`
    const fetchLatestHike = async () => {
      try {
        const response = await fetch(`http://localhost:80/api/hikes/latest`);
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

  if (loading) return <div>Loading hike data...</div>;
  if (error) return <div>Error fetching hike: {error}</div>;
  if (!hikes) return <div>No hike data available</div>;

  return (
    <>
      <PollWidget question={hikes.question}>
        <PollOptionsList options={hikes.options} id={hikes.id} />
      </PollWidget>
    </>
  );
}

export default App;
