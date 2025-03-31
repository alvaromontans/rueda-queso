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
