import { useEffect, useState } from "react";

export default function BuzzTimer({ submitAnswer }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      //100/3 secondds = 30;
      if (width > 100) {
        clearInterval(interval);
        return;
      } else if (width == 100) {
        submitAnswer();
      }

      setWidth((width) => width + 1);
    }, 33);

    return () => {
      clearInterval(interval);
    };
  });

  const element = (
    <div className="h-5 animate-pulse rounded-md bg-red-400" style={{ width: `${width}%` }}>
      {/* <div className="h-full w-full translate-x-full transform bg-white"></div> */}
    </div>
  );

  return <div className="mb-5 h-5 overflow-hidden rounded-md bg-gray-200 border-gray-400 w-72">{element}</div>;
}
