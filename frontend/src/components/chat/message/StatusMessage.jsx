export default function StatusMessage({ data, date }) {
  return (
    <div className="flex w-full justify-between items-center font-lg font-light leading-7">
      <p className="w-full italic ">
        <span className="break-all text-status">{`${data.message} `}</span>
        <span className="text-gray-400 inline-block">{` ${date}`}</span>
      </p>
    </div>
  );
}
