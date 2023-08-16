export default function Message({ data }) {
  let date = toDateString();

  function toDateString() {
    let d = new Date(data.date);

    let hours = d.getHours();
    let minutes = d.getMinutes();
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " ";
    return strTime;
  }

  return (
    <div className="flex justify-between items-center font-lg font-light border-solid border-gray-200">
      <div>
        <span className="font-semibold">
          {`${data.userId.substring(0, 5)}: `}
        </span>
        <span>{data.message}</span>
      </div>
      <div className="text-gray-400">{date}</div>
    </div>
  );
}
