import { Cart } from "../../interfaces/Cart";
import { formatCurrency } from "../../utils/helpers";

interface OrderItemProps {
  item: Cart;
  isLoadingIngredients?: boolean;
  ingredients?: string[];
}

function OrderItem({
  item,
  isLoadingIngredients,
  ingredients,
}: OrderItemProps) {
  const { quantity, name, total_price } = item;

  return (
    <li className="space-y-1 py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(total_price)}</p>
      </div>
      <p className="text-sm text-stone-500 capitalize italic">
        {isLoadingIngredients ? "Cargando..." : ingredients?.join(",")}
      </p>
    </li>
  );
}

export default OrderItem;
