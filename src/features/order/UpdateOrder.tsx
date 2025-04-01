/**
 * Componente para actualizar la prioridad de un pedido y el tiempo estimado de entrega.
 *
 * @component
 * @param {Object} props - Las propiedades del componente UpdateOrder.
 * @param {string} props.estimatedDelivery - La fecha estimada de entrega actual como cadena.
 * @param {function} props.onSetDeliveryIn - Función de devolución de llamada para actualizar el tiempo de entrega en minutos.
 * @param {number} props.deliveryIn - El tiempo de entrega actual en minutos.
 *
 * @returns {JSX.Element} Un formulario con un botón para priorizar el pedido.
 *
 * @description
 * Este componente permite a los usuarios priorizar un pedido reduciendo a la mitad el tiempo de entrega
 * y actualizando la fecha estimada de entrega. Utiliza el hook `useFetcher` de
 * `react-router-dom` para enviar los datos actualizados mediante una solicitud PATCH.
 *
 * @example
 * ```tsx
 * <UpdateOrder
 *   estimatedDelivery="2023-10-15T12:00:00Z"
 *   onSetDeliveryIn={(newDeliveryIn) => console.log(newDeliveryIn)}
 *   deliveryIn={60}
 * />
 * ```
 */
import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";

interface UpdateOrderProps {
  estimatedDelivery: string;
  onSetDeliveryIn: (deliveryIn: number) => void;
  deliveryIn: number;
}

function UpdateOrder({
  estimatedDelivery,
  onSetDeliveryIn,
  deliveryIn,
}: UpdateOrderProps) {
  const fetcher = useFetcher();

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("priority", "true");

    const deliveryDate = new Date(estimatedDelivery);
    const currentTime = Date.now();
    const newEstimatedDelivery = new Date(
      currentTime + (deliveryDate.getTime() - currentTime) / 2,
    );

    onSetDeliveryIn(deliveryIn / 2);
    formData.append("estimated_delivery", newEstimatedDelivery.toISOString());

    fetcher.submit(formData, { method: "PATCH" });
  };

  return (
    <fetcher.Form method="PATCH" className="text-right" onSubmit={handleUpdate}>
      <Button type="primary">Dar prioridad</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;
