/**
 * Componente que representa un elemento individual de un pedido en una lista.
 *
 * @componente
 * @param {OrderItemProps} props - Las propiedades para el componente `OrderItem`.
 * @param {Cart} props.item - El elemento del carrito que contiene detalles como cantidad, nombre y precio total.
 * @param {number} props.item.quantity - La cantidad del artículo pedido.
 * @param {string} props.item.name - El nombre del artículo pedido.
 * @param {number} props.item.total_price - El precio total del artículo pedido.
 * @param {boolean} [props.isLoadingIngredients=false] - Indica si los ingredientes aún se están cargando.
 * @param {string[]} [props.ingredients=[]] - La lista de ingredientes del artículo.
 *
 * @returns {JSX.Element} Un elemento de lista (`<li>`) que muestra los detalles del pedido, incluyendo cantidad, nombre, precio total e ingredientes.
 *
 * @example
 * ```tsx
 * <OrderItem
 *   item={{ quantity: 2, name: "Margherita", total_price: 15.99 }}
 *   isLoadingIngredients={false}
 *   ingredients={["queso", "tomate", "albahaca"]}
 * />
 * ```
 */
import { Cart } from "../../interfaces/Cart";
import { formatCurrency } from "../../utils/helpers";

interface OrderItemProps {
  item: Cart;
  isLoadingIngredients?: boolean;
  ingredients?: string[];
}

function OrderItem({
  item: { quantity, name, total_price },
  isLoadingIngredients = false,
  ingredients = [],
}: OrderItemProps) {
  return (
    <li className="space-y-1 py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(total_price)}</p>
      </div>
      <p className="text-sm text-stone-500 capitalize italic">
        {isLoadingIngredients ? "Cargando..." : ingredients.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
