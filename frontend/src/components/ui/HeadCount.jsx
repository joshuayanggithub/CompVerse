export default function HeadCount({ online }) {
  let headCount = Math.min(10, online);
  let baseStyle = "w-8 h-8 absolute";
  const styleVariants = [
    //DYNAMIC STYLING IS IMPOSSIBLE IN TAILWIND
    `${baseStyle} right-[1rem]`,
    `${baseStyle} right-[2rem]`,
    `${baseStyle} right-[3rem]`,
    `${baseStyle} right-[4rem]`,
    `${baseStyle} right-[5rem]`,
    `${baseStyle} right-[6rem]`,
    `${baseStyle} right-[7rem]`,
    `${baseStyle} right-[8rem]`,
    `${baseStyle} right-[9rem]`,
    `${baseStyle} right-[10rem]`,
  ];

  return (
    <div className="relative w-[50%] flex items-center">
      {[...Array(headCount)].map((e, i) => {
        return (
          <img src="/anonymous.avif" className={styleVariants[i]} key={i} />
        );
      })}
      {online - headCount != 0 && (
        <div className="font-lg absolute -right-0">
          <span>+</span>
          <span>{online - headCount}</span>
        </div>
      )}
    </div>
  );
}
