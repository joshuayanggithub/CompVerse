export default function DuplicateTabModal() {
  return (
    <div className="flex items-center justify-center h-full w-full ">
      <div className="h-4/5 w-2/3 rounded-xl flex flex-col bg-white outline outline-gray-400 outline-1 p-5 items-center justify-center gap-5 ">
        <h1 className="font-jost">ERROR: You can only connect on one tab. Please do not open multiple tabs. </h1>
      </div>
    </div>
  );
}
