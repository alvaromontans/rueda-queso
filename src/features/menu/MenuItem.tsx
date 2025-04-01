/**
 * Componente que representa un elemento individual del menú de pizzas.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Pizza} props.pizza - El objeto pizza que contiene los detalles del elemento del menú.
 * @returns {JSX.Element} Un elemento de lista (`<li>`) que muestra los detalles de la pizza, precio y acciones del carrito.
 *
 * @remarks
 * - Muestra el nombre, ingredientes, precio e imagen de la pizza.
 * - Si la pizza está agotada, muestra un mensaje de "Agotado" y desactiva las acciones del carrito.
 * - Si la pizza ya está en el carrito, muestra opciones para actualizar la cantidad o eliminar el elemento.
 * - De lo contrario, proporciona un botón para añadir la pizza al carrito.
 *
 * @example
 * ```tsx
 * const pizza = {
 *   _id: "123",
 *   name: "Margherita",
 *   unit_price: 10,
 *   ingredients: ["tomate", "mozzarella", "albahaca"],
 *   sold_out: false,
 *   image_url: "https://example.com/margherita.jpg",
 * };
 *
 * <MenuItem pizza={pizza} />
 * ```
 *
 * @see {@link ../../interfaces/Pizza} para la interfaz `Pizza`.
 * @see {@link ../../interfaces/Cart} para la interfaz `Cart`.
 * @see {@link ../cart/cartSlice} para las acciones y selectores relacionados con el carrito.
 */
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Cart } from "../../interfaces/Cart";
import { Pizza } from "../../interfaces/Pizza";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }: { pizza: Pizza }) {
  const { _id, name, unit_price, ingredients, sold_out, image_url } = pizza;
  const dispatch = useAppDispatch();
  const currentQuantity = useAppSelector(getCurrentQuantityById(_id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem: Cart = {
      pizzaId: _id,
      name,
      quantity: 1,
      unit_price,
      total_price: unit_price * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={image_url}
        alt={name}
        className={`h-24 ${sold_out ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-stone-500 capitalize italic">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!sold_out ? (
            <p className="text-sm">{formatCurrency(unit_price)}</p>
          ) : (
            <p className="text-sm font-medium text-stone-500 uppercase">
              Agotado
            </p>
          )}
          {!sold_out && !isInCart && (
            <>
              <Button type="small" onClick={handleAddToCart}>
                Añadir a la carta
              </Button>
            </>
          )}
          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                pizzaId={_id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={_id} />
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
