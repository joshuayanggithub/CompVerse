export default function ButtonWrapper({ children, onClick, width }) {
  return (
    <button
      className={`${width} h-10 rounded-md bg-turquoise flex items-center justify-center p-2 gap-2 text-white`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
