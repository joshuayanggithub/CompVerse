import { useEffect, useState } from "react";
import StarRating from "../StarRating";
import { GrFormClose } from "react-icons/gr";
import { MdPublic } from "react-icons/md";

export default function UserProfileModal({ profile, toggleProfile }) {
  const [userDetails, setUserDetails] = useState({ username: "", starRating: 0, gamesWon: "", problemsSolved: "", userCreationDate: "" });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL_DEV}api/user/${profile}`, {
          signal,
          method: "GET",
          headers: { "Content-Type": "application/json" }, //LITERALLY 30 MINUTES OF DEBUGGING
        });
        const result = await response.json();
        setUserDetails(result.data.user);
      } catch (error) {
        // setError(error.toString());
      }
    };

    fetchUserDetails();
    return () => {
      controller.abort();
    };
  }, [profile]);

  return (
    profile != "" && (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl flex flex-col bg-white outline outline-gray-400 outline-1 px-2 py-1 items-center justify-start gap-5">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center justify-center gap-1">
            {/* <MdPublic size={17} fill="gray" />
            <h3 className="font-light italic text-gray-600 text-sm">User Profile</h3> */}
          </div>
          <GrFormClose size={30} color="gray" onClick={() => toggleProfile("")} className="hover:cursor-pointer" />
        </div>
        <div className="px-16 pb-16 flex flex-col gap-5">
          <div className="flex flex-col items-center">
            <div className="flex gap-1 justify-center items-center">
              <img src="/anonymous.avif" className="h-10" />
              <h1 className="font-jockey text-5xl ">{userDetails.username}</h1>
            </div>
            <h5 className="font-jost italic text-xs">{`Member since ${userDetails.userCreationDate != "" && new Date(userDetails.userCreationDate).toDateString()}`}</h5>
          </div>
          <div className="font-jost italic text-xl">
            <div className="w-full flex items-center justify-start">
              <span>Rating:</span>
              <StarRating rating={userDetails.starRating} size={20} />
            </div>
            <h2>{`Games Won: ${userDetails.gamesWon}`}</h2>
            <h2>{`Matches Played: ${userDetails.matchesPlayed}`}</h2>
            <h2>{`Problems Correct: ${userDetails.problemsSolved}`}</h2>
          </div>
        </div>
      </div>
    )
  );
}
