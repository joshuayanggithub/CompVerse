import Header from "../components/nav/Header";

export default function LeaderBoardsPage() {
  return (
    <div className="flex flex-col w-full h-full box-border py-5">
      <div className="h-[10%] w-full">
        <div className="h-full">
          <Header />
        </div>
      </div>
      <div className="flex h-[90%] w-full justify-evenly items-center"></div>
    </div>
  );
}
