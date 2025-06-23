const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const fetchLatestHike = async () => {
  try {
    const response = await fetch(`/api/hikes/latest`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
const saveVote = async (data) => {
  const res = await fetch("/api/hikes/vote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to save vote");
  }

  return await res.json();
};

export { fetchLatestHike, saveVote };
