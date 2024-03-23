import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";

export default function StarRating({ rating }) {
  const filled = Array.from({ length: rating }, (_, index) => index);
  const notfilled = Array.from({ length: 5 - rating }, (_, index) => index);

  return (
    <div className="flex">
      {filled.map((ind) => {
        return <AiFillStar key={ind} size={20} fill="gold" />;
      })}
      {notfilled.map((ind) => {
        return <AiOutlineStar key={ind} size={20} fill="gold" />;
      })}
    </div>
  );
}
