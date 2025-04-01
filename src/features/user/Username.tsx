/**
 * Un componente de React que muestra el nombre de usuario del usuario actualmente conectado.
 *
 * Este componente obtiene el `username` del estado global utilizando el hook `useAppSelector`.
 * Si existe un nombre de usuario, renderiza un elemento `div` con el nombre de usuario estilizado para pantallas medianas y más grandes.
 * Si no hay un nombre de usuario disponible, el componente no renderiza nada.
 *
 * @component
 * @returns {JSX.Element | null} Un `div` estilizado que contiene el nombre de usuario, o `null` si no hay un nombre de usuario presente.
 */
import { useAppSelector } from "../../hooks";

function Username() {
  const username = useAppSelector((state) => state.user.username);

  return username ? (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  ) : null;
}

export default Username;
