export default function HeadCount({ online, maxHeadCount, size, style }) {
  let headCount = Math.min(maxHeadCount, online);
  let baseStyle = `w-${size} h-${size} absolute`;
  const styleVariants = [
    //DYNAMIC STYLING IS IMPOSSIBLE IN TAILWIND
    `${baseStyle} right-[1rem] ${style}`,
    `${baseStyle} right-[2rem] ${style}`,
    `${baseStyle} right-[3rem] ${style}`,
    `${baseStyle} right-[4rem] ${style}`,
    `${baseStyle} right-[5rem] ${style}`,
    `${baseStyle} right-[6rem] ${style}`,
    `${baseStyle} right-[7rem] ${style}`,
    `${baseStyle} right-[8rem] ${style} `,
    `${baseStyle} right-[9rem] ${style}`,
    `${baseStyle} right-[10rem] ${style}`,
  ];

  return (
    <div className={`relative w-[50%] flex items-center`}>
      {[...Array(headCount)].map((e, i) => {
        return <img src="/anonymous.avif" className={styleVariants[i]} key={i} />;
      })}
      {online - headCount != 0 && ( //THIS IS IMPORTANT - NUMBER OF ADDITIONAL PLAYERS THAT YOU CANNOT DISPLAY IMAGE WITH
        <div className={`font-lg absolute -right-0`}>
          <span>+</span>
          <span>{online - headCount}</span>
        </div>
      )}
    </div>
  );
}
