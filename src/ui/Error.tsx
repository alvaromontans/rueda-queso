/**
 * El componente `Error` es un componente de interfaz de usuario que muestra un mensaje de error
 * cuando algo sale mal en la aplicación. Proporciona una interfaz amigable para informar al usuario
 * sobre el problema e incluye un botón para navegar hacia atrás.
 *
 * @component
 *
 * @example
 * ```tsx
 * <Error />
 * ```
 *
 * @remarks
 * - Este componente utiliza el componente `LinkButton` para proporcionar funcionalidad de navegación.
 * - El hook `useRouteError` de `react-router-dom` está comentado, pero se puede usar
 *   para obtener detalles del error si es necesario.
 *
 * @returns {JSX.Element} Un mensaje de error estilizado con un botón de navegación hacia atrás.
 */
// import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  // const error = useRouteError() as { message?: string; data?: string };

  return (
    <div className="font-pizza">
      <h1>Algo ha ido mal 😢</h1>
      {/* <p>{error.data || error.message}</p> */}

      <LinkButton to="-1"> &larr; Volver</LinkButton>
    </div>
  );
}

export default Error;
