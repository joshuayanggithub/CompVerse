export default function ErrorWrapper({ children }) {
  return (
    <div
      className={`w-2/3 h-10 rounded-md bg-red-200 flex items-center justify-center p-2 gap-2`}
    >
      {children}
    </div>
  );
}
