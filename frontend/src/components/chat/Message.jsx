import StatusMessage from "./StatusMessage";
import UserMessage from "./UserMessage";

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
    <>
      {data.type == "user" ? (
        <UserMessage data={data} date={date} />
      ) : (
        <StatusMessage data={data} date={date} />
      )}
    </>
  );
}
