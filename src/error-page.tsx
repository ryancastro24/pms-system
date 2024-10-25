import { useRouteError } from "react-router-dom";

type ErrorProptype = {
  statusText?: string;
  message?: string;
};

export default function ErrorPage() {
  const error = useRouteError() as ErrorProptype;

  return (
    <div id="error-page" className="text-center mt-8">
      <h1 className="text-4xl font-bold text-red-600">Oops!</h1>
      <p className="mt-4 text-lg">Sorry, an unexpected error has occurred.</p>
      <p className="mt-2 text-gray-700">
        <i>{error?.statusText || error?.message || "Unknown error"}</i>
      </p>
    </div>
  );
}
