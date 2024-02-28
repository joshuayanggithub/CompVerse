export default function GameHeader({ roomName, competition }) {
  return <div className="italic font-md text-gray-600 font-light ">{`Room ${roomName} / ${competition}`}</div>;
}
