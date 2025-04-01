/**
 * Un componente de React que proporciona una funcionalidad de búsqueda para pedidos.
 *
 * Este componente incluye un campo de entrada donde los usuarios pueden escribir una consulta para buscar un pedido.
 * Al enviar el formulario, navega a una ruta correspondiente a la consulta ingresada.
 *
 * @component
 * @returns {JSX.Element} El componente del formulario de búsqueda renderizado.
 *
 * @example
 * <SearchOrder />
 *
 * @remarks
 * - El estado `query` se utiliza para almacenar el valor actual del campo de entrada.
 * - El hook `useNavigate` de `react-router-dom` se utiliza para navegar programáticamente a la página del pedido.
 * - El campo de entrada tiene estilos responsivos y transiciones para una mejor experiencia de usuario.
 *
 * @function handleSubmit
 * Maneja el evento de envío del formulario. Previene el comportamiento predeterminado del envío del formulario,
 * verifica si la consulta no está vacía, navega a la ruta correspondiente al pedido y limpia el campo de entrada.
 *
 * @param {React.FormEvent<HTMLFormElement>} e - El evento de envío del formulario.
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query) return;
    navigate(`order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Buscar pedido"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:ring-yellow-500 focus:outline-none sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchOrder;
