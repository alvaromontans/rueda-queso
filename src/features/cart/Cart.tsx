/**
 * El componente `Cart` representa la vista del carrito de compras en la aplicación.
 * Muestra los artículos del carrito del usuario actual, permite la navegación de regreso al menú,
 * y proporciona opciones para realizar un pedido o vaciar el carrito.
 *
 * @component
 *
 * @returns {JSX.Element} El componente del carrito renderizado.
 *
 * @remarks
 * - Si el carrito está vacío, se muestra el componente `EmptyCart`.
 * - El componente utiliza `useAppSelector` para acceder al nombre de usuario y al estado del carrito desde el store de Redux.
 * - El hook `useAppDispatch` se utiliza para despachar acciones como vaciar el carrito.
 *
 * @dependencies
 * - `LinkButton`: Un componente para enlaces de navegación con estilo de botones.
 * - `Button`: Un componente reutilizable de botón.
 * - `CartItem`: Un componente para renderizar artículos individuales del carrito.
 * - `EmptyCart`: Un componente que se muestra cuando el carrito está vacío.
 * - `useAppSelector` y `useAppDispatch`: Hooks personalizados para acceder y despachar el estado de Redux.
 * - `clearCart` y `getCart`: Acciones y selectores de Redux para gestionar el estado del carrito.
 *
 * @example
 * ```tsx
 * <Cart />
 * ```
 */

import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearCart, getCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const username = useAppSelector((state) => state.user.username);
  const cart = useAppSelector(getCart);
  const dispatch = useAppDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Menú</LinkButton>
      <h2 className="mt-7 text-xl font-semibold">Tu pedido, {username}</h2>
      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="mt-6 space-x-3">
        <Button to="/order/new" type="primary">
          Haz tu pedido
        </Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Vaciar carta
        </Button>
      </div>
    </div>
  );
}

export default Cart;
