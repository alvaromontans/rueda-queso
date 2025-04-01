/**
 * Un componente funcional de React que muestra un mensaje indicando que el carrito está vacío.
 * Incluye un botón para navegar de regreso al menú y anima al usuario a añadir pizzas.
 *
 * @component
 * @returns {JSX.Element} El componente EmptyCart renderizado.
 */
import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Menú</LinkButton>

      <p className="mt-7 font-semibold">
        Tu carta está vacía. Empieza a añadir algunas pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
