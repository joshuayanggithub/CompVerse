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
    <div className="flex w-full justify-between items-center font-lg font-light leading-7">
      <p className="w-full ">
        <span className="font-semibold break-all">{`${data.userId.substring(
          0,
          5
        )}: `}</span>
        <span className="break-all">{`${data.message} `}</span>
        <span className="text-gray-400 inline-block">{` ${date}`}</span>
      </p>
    </div>
  );
}
