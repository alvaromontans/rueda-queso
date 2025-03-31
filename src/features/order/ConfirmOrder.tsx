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
