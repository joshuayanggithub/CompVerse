import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="w-full h-full flex items-center justify-center">
      <h1>Sorry! This Page Does Not Exist!</h1>
      <p>The game might have expired or simply you mistyped a link!</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
