export default function ButtonWrapper({ children, onClick, width, color }) {
  return (
    <button className={`${width} h-10 rounded-md ${color ? color : "bg-turquoise"} flex items-center justify-center p-2 gap-2 text-white`} onClick={onClick}>
      {children}
    </button>
  );
}
