/**
 * Componente para confirmar la entrega de un pedido.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.orderId - El identificador único del pedido a confirmar.
 *
 * @returns {JSX.Element} Un formulario con un botón para confirmar la entrega del pedido.
 *
 * @example
 * <ConfirmOrder orderId="12345" />
 *
 * @remarks
 * Este componente utiliza el hook `useFetcher` de `react-router-dom` para manejar el envío del formulario.
 * El envío del formulario realiza una solicitud `DELETE` con el ID del pedido para confirmar la entrega.
 *
 * @dependencies
 * - `react-router-dom` para el hook `useFetcher`.
 * - Componente `Button` de `../../ui/Button`.
 */
import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";

function ConfirmOrder({ orderId }: { orderId: string }) {
  const fetcher = useFetcher();

  function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("order_id", orderId);
    fetcher.submit(formData, { method: "DELETE" });
  }

  return (
    <fetcher.Form
      method="DELETE"
      className="text-right"
      onSubmit={handleUpdate}
    >
      <Button type="primary">Confirmar entrega</Button>
    </fetcher.Form>
  );
}

export default ConfirmOrder;
