/**
 * El componente `CreateUser` es un componente funcional de React que permite a los usuarios ingresar su nombre
 * y proceder a la página del menú. Utiliza hooks de React para la gestión del estado y la navegación.
 *
 * @component
 *
 * @example
 * <CreateUser />
 *
 * @returns {JSX.Element} Un formulario que solicita al usuario ingresar su nombre y enviarlo.
 *
 * @remarks
 * - El componente utiliza `useState` para gestionar el estado de `username`.
 * - El hook `useAppDispatch` se utiliza para despachar la acción `updateName` y actualizar el nombre del usuario en el store de Redux.
 * - El hook `useNavigate` de `react-router-dom` se utiliza para navegar a la ruta `/menu` al enviar el formulario.
 * - El botón de envío se renderiza condicionalmente solo cuando el campo `username` no está vacío.
 *
 * @function handleSubmit
 * Maneja el evento de envío del formulario. Previene el comportamiento predeterminado del formulario, valida la entrada,
 * despacha la acción `updateName` y navega a la ruta `/menu`.
 *
 * @param {React.FormEvent<HTMLFormElement>} e - El evento de envío del formulario.
 *
 * @state {string} username - La variable de estado que contiene el nombre ingresado por el usuario.
 * @state {React.Dispatch<React.SetStateAction<string>>} setUsername - La función actualizadora del estado para `username`.
 *
 * @dependencies
 * - `useState` de React para la gestión del estado.
 * - `useAppDispatch` de los hooks personalizados de la aplicación para despachar acciones de Redux.
 * - `useNavigate` de `react-router-dom` para la navegación.
 * - Acción `updateName` de `userSlice` para actualizar el nombre del usuario en el store de Redux.
 * - Componente `Button` para renderizar el botón de envío.
 */
import { useState } from "react";
import Button from "../../ui/Button";
import { useAppDispatch } from "../../hooks";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!username) return;
    dispatch(updateName(username));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 ¡Bienvenido! Dinos tu nombre:
      </p>

      <input
        type="text"
        placeholder="Introduce tu nombre"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-8 w-72 rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 focus:ring focus:ring-yellow-400 focus:outline-none md:px-6 md:py-3"
      />

      {username !== "" && (
        <div>
          <Button type="primary">Empezar pedido</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
