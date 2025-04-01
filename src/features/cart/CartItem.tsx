/**
 * Representa un único elemento en el carrito de compras.
 *
 * @component
 * @param {CartItemProps} props - Las props para el componente CartItem.
 * @param {Cart} props.item - El objeto del carrito que contiene detalles sobre la pizza.
 * @returns {JSX.Element} Un elemento de lista que muestra los detalles del elemento del carrito, incluyendo nombre, cantidad, precio total y acciones para actualizar o eliminar el elemento.
 *
 * @typedef {Object} CartItemProps
 * @property {Cart} item - El objeto del carrito que contiene detalles sobre la pizza.
 *
 * @remarks
 * Este componente muestra el nombre, la cantidad y el precio total de una pizza en el carrito.
 * También incluye botones para actualizar la cantidad o eliminar el elemento del carrito.
 *
 * @example
 * ```tsx
 * import CartItem from './CartItem';
 * import { Cart } from '../../interfaces/Cart';
 *
 * const item: Cart = {
 *   pizzaId: 1,
 *   name: 'Margherita',
 *   quantity: 2,
 *   total_price: 20.0,
 * };
 *
 * <CartItem item={item} />;
 * ```
 */
import { Cart } from "../../interfaces/Cart";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";

type CartItemProps = {
  item: Cart;
};

function CartItem({ item }: CartItemProps) {
  const { pizzaId, name, quantity, total_price } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(total_price)}</p>
        <UpdateItemQuantity pizzaId={pizzaId} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
