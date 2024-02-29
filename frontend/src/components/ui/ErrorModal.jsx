import ButtonWrapper from "./wrappers/ButtonWrapper";

export default function ErrorModal({ error, setError }) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/3 w-1/2 rounded-xl flex flex-col bg-white outline outline-gray-400 outline-1 p-5 items-center justify-center gap-5 ">
      <h1 className="font-jost text-3xl">
        ERROR: <h3 className=" inline text-lg">{error.text != null ? error.text : error}</h3>{" "}
      </h1>
      <ButtonWrapper color={"bg-red-500"} onClick={() => setError("")}>
        Close
      </ButtonWrapper>
    </div>
  );
}
