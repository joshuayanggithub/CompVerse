export default function ButtonWrapper({ children, onClick, width }) {
  return (
    <button
      className={`${width} h-10 rounded-md bg-blue-200 flex items-center justify-center p-2 `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
