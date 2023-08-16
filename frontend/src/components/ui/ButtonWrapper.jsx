export default function ButtonWrapper({ children, onClick }) {
  <button
    className="w-10 h-full rounded-md bg-blue-200 flex items-center justify-center"
    onClick={onClick}
  >
    {children}
  </button>;
}
