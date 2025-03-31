import { useFetcher, useLoaderData } from "react-router-dom";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { Cart } from "../../interfaces/Cart";
import { useEffect, useState } from "react";
import { Pizza } from "../../interfaces/Pizza";
import UpdateOrder from "./UpdateOrder";
import DeleteOrder from "./ConfirmOrder";

function Order() {
  const order = useLoaderData();

  const fetcher = useFetcher();
  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher],
  );

  const {
    order_id,
    status,
    priority,
    priority_price,
    order_price,
    estimated_delivery,
    cart,
  } = order;

  const [orderSendTime] = useState(calcMinutesLeft(estimated_delivery) - 5);
  const [deliveryIn, setDeliveryIn] = useState(
    calcMinutesLeft(estimated_delivery),
  );

  useEffect(() => {
    if (deliveryIn > 0) {
      const timer = setTimeout(
        () => setDeliveryIn((prev) => Math.max(prev - 1, 0)),
        60000,
      );
      return () => clearTimeout(timer);
    }
  }, [deliveryIn]);

  useEffect(() => {
    if (
      deliveryIn === orderSendTime &&
      status !== "En camino" &&
      fetcher.state === "idle"
    ) {
      fetcher.submit(
        { status: "En camino" },
        {
          method: "PATCH",
          action: `/order/${order_id}`,
        },
      );
    }
  }, [deliveryIn, fetcher, order_id, orderSendTime, status]);

  useEffect(() => {
    if (
      deliveryIn === 0 &&
      status !== "Entregado" &&
      fetcher.state === "idle"
    ) {
      fetcher.submit(
        { status: "Entregado" },
        {
          method: "PATCH",
          action: `/order/${order_id}`,
        },
      );
    }
  }, [deliveryIn, fetcher, order_id, status]);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2 space-y-2 sm:space-y-0">
        <h2 className="text-xl font-semibold">Estado pedido #{order_id}</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold tracking-wide text-red-50 uppercase">
              Prioridad
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold tracking-wide text-green-50 uppercase">
            {status}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {status === "Entregado"
            ? "El pedido ha llegado"
            : deliveryIn > 1
              ? `${deliveryIn} minutos para la entrega 😃`
              : deliveryIn === 1 && "1 minuto para la entrega 😃"}
        </p>
        <p className="text-xs text-stone-500">
          (Entrega estimada: {formatDate(estimated_delivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-t border-b">
        {cart.map((item: Cart) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher.data?.find((el: Pizza) => el._id === item.pizzaId)
                .ingredients
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Precio: {formatCurrency(order_price)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Extra prioridad: {formatCurrency(priority_price)}
          </p>
        )}
        <p className="font-bold">
          Pago total:{" "}
          {formatCurrency(
            priority ? order_price + priority_price : order_price,
          )}
        </p>
      </div>
      {!priority && status === "Preparando" ? (
        <UpdateOrder
          estimatedDelivery={estimated_delivery}
          onSetDeliveryIn={setDeliveryIn}
          deliveryIn={deliveryIn}
        />
      ) : null}

      {status === "Entregado" && <DeleteOrder orderId={order_id} />}
    </div>
  );
}

export default Order;
