export default function RoomHeadCount({ online, maxHeadCount, size, style }) {
  let headCount = Math.min(maxHeadCount, online);
  let baseStyle = `w-${size} h-${size} absolute`;
  const styleVariants = [
    //DYNAMIC STYLING IS IMPOSSIBLE IN TAILWIND
    `${baseStyle} left-[1rem] ${style}`,
    `${baseStyle} left-[2rem] ${style}`,
    `${baseStyle} left-[3rem] ${style}`,
    `${baseStyle} left-[4rem] ${style}`,
    `${baseStyle} left-[5rem] ${style}`,
    `${baseStyle} left-[6rem] ${style}`,
    `${baseStyle} left-[7rem] ${style}`,
    `${baseStyle} left-[8rem] ${style} `,
    `${baseStyle} left-[9rem] ${style}`,
    `${baseStyle} left-[10rem] ${style}`,
  ];

  return (
    <>
      {[...Array(headCount)].map((e, i) => {
        return <img src="/anonymous.avif" className={styleVariants[i]} key={i} />;
      })}
    </>
  );
}
