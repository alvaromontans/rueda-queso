/**
 * Componente para eliminar un elemento del carrito.
 *
 * @component
 * @param {DeleteItemProps} props - Las props para el componente DeleteItem.
 * @param {number} props.pizzaId - El ID de la pizza que se eliminará del carrito.
 * @returns {JSX.Element} Un botón que activa la eliminación del elemento de pizza especificado.
 *
 * @example
 * <DeleteItem pizzaId={1} />
 *
 * Esto renderizará un botón que, al hacer clic, despacha una acción para eliminar la pizza con ID 1 del carrito.
 */
import { useAppDispatch } from "../../hooks";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

interface DeleteItemProps {
  pizzaId: number;
}

function DeleteItem({ pizzaId }: DeleteItemProps) {
  const dispatch = useAppDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Borrar
    </Button>
  );
}

export default DeleteItem;
