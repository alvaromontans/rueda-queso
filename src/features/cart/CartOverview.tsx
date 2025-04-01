/**
 * Un componente de React que proporciona una vista general del carrito de compras.
 * Muestra la cantidad total de pizzas en el carrito y el precio total.
 * Si el carrito está vacío, el componente no renderiza nada.
 *
 * @component
 *
 * @returns {JSX.Element | null} El elemento JSX que representa la vista general del carrito,
 * o `null` si el carrito está vacío.
 *
 * @example
 * // Ejemplo de uso:
 * <CartOverview />
 *
 * @remarks
 * Este componente utiliza el hook `useAppSelector` para acceder a la cantidad total de pizzas
 * y al precio total del carrito desde el store de Redux. También utiliza la función utilitaria
 * `formatCurrency` para formatear el precio total.
 *
 * @dependencies
 * - `react-router-dom`: Usado para el componente `Link` que navega a la página del carrito.
 * - `../../hooks`: Proporciona el hook `useAppSelector` para acceder al estado de Redux.
 * - `./cartSlice`: Contiene los selectores `getTotalCartQuantity` y `getTotalCartPrice`.
 * - `../../utils/helpers`: Contiene la función `formatCurrency` para formatear precios.
 */
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { getTotalCartQuantity, getTotalCartPrice } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalCartQuantity = useAppSelector(getTotalCartQuantity);
  const totalCartPrice = useAppSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null;

  return (
    <div className="fixed right-0 bottom-0 left-0 flex items-center justify-between bg-stone-800 p-4 px-4 py-4 text-sm text-stone-200 uppercase sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Abrir carta &rarr;</Link>
    </div>
  );
}

export default CartOverview;
