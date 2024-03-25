import { useEffect, useState } from "react";
import StarRating from "../ui/StarRating";

function LeaderboardRow({ rank, player }) {
  return (
    <tr className={`border-b border-neutral-200 ${rank % 2 == 1 ? "bg-gray-100" : "bg-white"} dark:border-white/10`}>
      <td className="whitespace-nowrap px-6 py-4 font-bold">{rank}</td>
      <td className="whitespace-nowrap px-6 py-4">
        <StarRating rating={player.starRating} size={20} />
      </td>
      <td className="whitespace-nowrap px-6 py-4">{player.username}</td>
      <td className="whitespace-nowrap px-6 py-4">{player.gamesWon}</td>
      <td className="whitespace-nowrap px-6 py-4">{player.problemsSolved}</td>
      <td className="whitespace-nowrap px-6 py-4">{player.matchesPlayed}</td>
    </tr>
  );
}

export default function Leaderboard() {
  const [topPlayers, setTopPlayers] = useState([]);
  console.log(topPlayers);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL_DEV}api/user/top`, {
          signal,
          method: "GET",
          headers: { "Content-Type": "application/json" }, //LITERALLY 30 MINUTES OF DEBUGGING
        });
        const result = await response.json();
        console.log(result.data.users.length);
        if (result.data.users.length < 20) {
          let arr = [];
          for (let i = 0; i < 20 - result.data.users.length; ++i) {
            arr.push({});
          }
          console.log(arr.length);
          setTopPlayers([...result.data.users, ...arr]);
        } else {
          setTopPlayers(result.data.users);
        }
      } catch (error) {
        // setError(error.toString());
      }
    };

    fetchUserDetails();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="flex flex-col w-full">
      <table className="min-w-full text-left text-sm font-light text-surface outline-1 outline-gray-400 outline rounded-md">
        <thead className="border-b border-neutral-200 bg-white font-medium dark:border-white/10 dark:bg-body-dark">
          <tr>
            <th scope="col" className="px-6 py-4">
              Rank
            </th>
            <th scope="col" className="px-6 py-4">
              Rating
            </th>
            <th scope="col" className="px-6 py-4">
              @Username
            </th>
            <th scope="col" className="px-6 py-4">
              Games Won
            </th>
            <th scope="col" className="px-6 py-4">
              Problems Correct
            </th>
            <th scope="col" className="px-6 py-4">
              Matches Played
            </th>
          </tr>
        </thead>
        <tbody>
          {topPlayers.map((player, index) => {
            return <LeaderboardRow player={player} key={index} rank={index + 1} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
