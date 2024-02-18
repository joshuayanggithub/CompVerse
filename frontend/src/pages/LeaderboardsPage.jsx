import Header from "../components/lobby/Header";

export default function LeaderBoardsPage() {
  return (
    <div className="flex w-full h-full p-5 box-border gap-3">
      <div className="flex flex-col h-full w-full">
        <div className="h-[5%] w-full">
          <Header />
        </div>
        <div className="h-[95%] w-full flex items-center justify-center gap-[4rem]">
          <div className="h-full w-full outline outline-gray-400 outline-1 rounded-lg flex flex-col justify-between">
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
