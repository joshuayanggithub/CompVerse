export default function UserMessage({ data, date }) {
  return (
    <div className="flex w-full justify-between items-center text-md font-light leading-7">
      <p className="w-full ">
        <span className="font-semibold break-all">{`${data.username}: `}</span>
        <span className="break-all">{`${data.message} `}</span>
        <span className="text-gray-400 inline-block">{` ${date}`}</span>
      </p>
    </div>
  );
}
