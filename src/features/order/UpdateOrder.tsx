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

  function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("priority", "true");

    const deliveryDate = new Date(estimatedDelivery);
    onSetDeliveryIn(deliveryIn / 2);
    const currentTime = new Date().getTime();
    const newEstimatedDelivery = new Date(
      currentTime + (deliveryDate.getTime() - currentTime) / 2,
    );

    formData.append("estimated_delivery", newEstimatedDelivery.toISOString());
    fetcher.submit(formData, { method: "PATCH" });
  }

  return (
    <fetcher.Form method="PATCH" className="text-right" onSubmit={handleUpdate}>
      <Button type="primary">Dar prioridad</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;
