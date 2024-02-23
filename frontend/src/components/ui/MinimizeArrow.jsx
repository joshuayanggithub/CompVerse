import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function MinimizeArrow({ minimized, setMinimized }) {
  const style = { size: 20, color: "gray" };

  return (
    <>
      {!minimized && <IoIosArrowDown style={style} onClick={() => setMinimized(true)} className="hover:cursor-pointer" />}
      {minimized && <IoIosArrowUp style={style} onClick={() => setMinimized(false)} className="hover:cursor-pointer" />}
    </>
  );
}
