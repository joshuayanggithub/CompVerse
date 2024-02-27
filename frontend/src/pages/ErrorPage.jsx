import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="w-full h-full flex items-center justify-center gap-4 flex-col">
      <h1 className="font-jost text-5xl">Sorry! This Page Does Not Exist!</h1>
      <p className="text-2xl">The game might have expired or simply you mistyped a link!</p>
      <p className="italic">
        <i>{`ERROR: ${error.statusText || error.message}`}</i>
      </p>
    </div>
  );
}
