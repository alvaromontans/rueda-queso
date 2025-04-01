/**
 * Un componente funcional de React que renderiza campos de entrada ocultos para el envío de formularios.
 * Serializa las props `cart` y `position` en campos de entrada ocultos.
 *
 * @componente
 * @param {HiddenFieldsProps} props - Las props para el componente.
 * @param {Cart[]} props.cart - Un array de elementos del carrito que se serializan en un campo de entrada oculto.
 * @param {{ latitude?: number; longitude?: number }} props.position - Un objeto que contiene valores opcionales de latitud y longitud.
 * @returns {JSX.Element} Un fragmento JSX que contiene campos de entrada ocultos para `cart` y `position`.
 */
import { Cart } from "../interfaces/Cart";

interface HiddenFieldsProps {
  cart: Cart[];
  position: { latitude?: number; longitude?: number };
}

function HiddenFields({ cart, position }: HiddenFieldsProps) {
  const positionValue =
    position.latitude && position.longitude
      ? `${position.latitude},${position.longitude}`
      : "";

  return (
    <>
      <input type="hidden" name="cart" value={JSON.stringify(cart)} />
      <input type="hidden" name="position" value={positionValue} />
    </>
  );
}

export default HiddenFields;
