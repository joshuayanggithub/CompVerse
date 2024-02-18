import { useEffect, useState } from "react";

export default function StatsSummary() {
  const currentDate = new Date();
  const options = { weekday: "long", month: "short", day: "numeric" };
  const currentDateString = currentDate.toLocaleDateString("en-us", options);

  const [problems, setProblems] = useState(0);
  const [games, setGames] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchStats = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL_DEV}api/user/user-stats`, { signal, method: "GET", body: JSON.stringify() });
      const results = await response.json();
      setProblems(results.data.stats[0].problemsSolved);
      setGames(results.data.stats[0].gamesPlayed);
    };

    fetchStats();

    return () => {
      controller.abort();
    };
  });

  return (
    <div className="w-full h-full font-jost text-gray-400 italic">
      <p>{`${currentDateString} - ${problems} Problems Solved All Time - ${games} Games Played All Time`}</p>
    </div>
  );
}
