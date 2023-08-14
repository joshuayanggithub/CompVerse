export default function Online({ numberUsers }) {
  return (
    <div className="flex justify-between items-center">
      <div className="w-4 h-4 rounded-lg bg-green-500"></div>
      <div>{`Users Online: ${numberUsers}`}</div>
    </div>
  );
}
