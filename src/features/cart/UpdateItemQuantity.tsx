/**
 * Un componente de React que permite actualizar la cantidad de un artículo específico de pizza en el carrito.
 *
 * @component
 * @param {UpdateItemQuantityProps} props - Las propiedades del componente.
 * @param {number} props.pizzaId - El identificador único del artículo de pizza.
 * @param {number} [props.currentQuantity=0] - La cantidad actual del artículo de pizza en el carrito. Por defecto es 0.
 *
 * @returns {JSX.Element} Un componente de interfaz de usuario con botones para aumentar o disminuir la cantidad y mostrar la cantidad actual.
 *
 * @example
 * <UpdateItemQuantity pizzaId={1} currentQuantity={2} />
 *
 * @remarks
 * Este componente utiliza el hook `useAppDispatch` para despachar acciones al store de Redux.
 * Depende de los creadores de acciones `increaseItemQuantity` y `decreaseItemQuantity` del `cartSlice`.
 */
import { useAppDispatch } from "../../hooks";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

interface UpdateItemQuantityProps {
  pizzaId: number;
  currentQuantity?: number;
}

function UpdateItemQuantity({
  pizzaId,
  currentQuantity = 0,
}: UpdateItemQuantityProps) {
  const dispatch = useAppDispatch();

  const handleQuantityChange = (action: "increase" | "decrease") => {
    const actionCreator =
      action === "increase" ? increaseItemQuantity : decreaseItemQuantity;
    dispatch(actionCreator(pizzaId));
  };

  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button type="round" onClick={() => handleQuantityChange("decrease")}>
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button type="round" onClick={() => handleQuantityChange("increase")}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
