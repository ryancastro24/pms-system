import { useRouteError, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/button";
type ErrorProptype = {
  statusText?: string;
  message?: string;
};

export default function ErrorPage() {
  const error = useRouteError() as ErrorProptype;
  const navigate = useNavigate();
  return (
    <div
      id="error-page"
      className="text-center mt-8  flex flex-col items-center justify-center gap-5 w-full h-screen "
    >
      <div>
        <h1 className="text-4xl font-bold text-red-600">Oops!</h1>
        <p className="mt-4 text-lg">Sorry, an unexpected error has occurred.</p>
        <p className="mt-2 text-gray-700">
          <i>{error?.statusText || error?.message || "Unknown error"}</i>
        </p>
      </div>

      <Button onPress={() => navigate(-1)} color="primary">
        Back to Home
      </Button>
    </div>
  );
}
