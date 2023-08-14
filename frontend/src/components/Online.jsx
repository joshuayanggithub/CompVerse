export default function Online({ numberUsers }) {
  return (
    <div className="flex justify-between items-center h-[5%]">
      <div className="flex items-center justify-center gap-1">
        <div className="w-[5px] h-[5px] rounded-lg bg-green-500"></div>
        <div>{`Users Online: ${numberUsers}`}</div>
      </div>
      <div className="flex h-full justify-between items-center">
        <img src="/anonymous.avif" className="h-[80%]" />
      </div>
    </div>
  );
}
