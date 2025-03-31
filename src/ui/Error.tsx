import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  const error = useRouteError() as { message?: string; data?: string };

  return (
    <div className="font-pizza">
      <h1>Algo ha ido mal 😢</h1>
      <p>{error.data || error.message}</p>

      <LinkButton to="-1"> &larr; Volver</LinkButton>
    </div>
  );
}

export default Error;
