/**
 * Componente que representa los detalles y el estado de un pedido.
 *
 * Este componente obtiene datos del pedido, gestiona la cuenta regresiva de entrega y actualiza
 * automáticamente el estado del pedido en función del tiempo de entrega. También muestra los detalles
 * del pedido, incluidos los artículos del carrito, precios y estado de prioridad.
 *
 * @component
 *
 * @returns {JSX.Element} El componente Order renderizado.
 *
 * @description
 * - El componente utiliza `useLoaderData` para obtener los datos iniciales del pedido.
 * - Utiliza `useFetcher` para obtener datos adicionales (por ejemplo, elementos del menú) y enviar actualizaciones del estado del pedido.
 * - Las cuentas regresivas de entrega se gestionan utilizando hooks `useEffect`.
 * - El estado del pedido se actualiza automáticamente a "En camino" y "Entregado" según la cuenta regresiva de entrega.
 *
 * @example
 * ```tsx
 * <Order />
 * ```
 *
 * @dependencies
 * - `react-router-dom` para la obtención y envío de datos.
 * - `useEffect` y `useState` de React para el estado y efectos secundarios.
 * - Funciones auxiliares de `../../utils/helpers` para formateo y cálculos.
 * - Componentes secundarios: `OrderItem`, `UpdateOrder` y `DeleteOrder`.
 *
 * @hooks
 * - `useLoaderData`: Obtiene los datos iniciales del pedido.
 * - `useFetcher`: Obtiene datos del menú y envía actualizaciones del estado del pedido.
 * - `useEffect`: Gestiona efectos secundarios para obtener datos, actualizar cuentas regresivas de entrega y actualizar automáticamente el estado del pedido.
 *
 * @state
 * - `orderSendTime` (número): El tiempo (en minutos) antes de la entrega cuando el estado del pedido debe actualizarse a "En camino".
 * - `deliveryIn` (número): El tiempo restante (en minutos) hasta la entrega.
 *
 * @param {Object} order - Los datos del pedido obtenidos con `useLoaderData`.
 * @param {string} order.order_id - El identificador único del pedido.
 * @param {string} order.status - El estado actual del pedido (por ejemplo, "Preparando", "En camino", "Entregado").
 * @param {boolean} order.priority - Indica si el pedido tiene estado de prioridad.
 * @param {number} order.priority_price - El costo adicional para pedidos prioritarios.
 * @param {number} order.order_price - El precio base del pedido.
 * @param {string} order.estimated_delivery - El tiempo estimado de entrega en formato ISO.
 * @param {Cart[]} order.cart - La lista de artículos en el pedido.
 *
 * @childComponent {OrderItem} Renderiza artículos individuales en el carrito del pedido.
 * @childComponent {UpdateOrder} Permite actualizar el tiempo de entrega para pedidos no prioritarios.
 * @childComponent {DeleteOrder} Permite eliminar el pedido después de que haya sido entregado.
 */
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

  // Fetch menu data if not already loaded
  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load("/menu");
    }
  }, [fetcher]);

  // Update delivery countdown
  useEffect(() => {
    if (deliveryIn > 0) {
      const timer = setTimeout(
        () => setDeliveryIn((prev) => Math.max(prev - 1, 0)),
        60000,
      );
      return () => clearTimeout(timer);
    }
  }, [deliveryIn]);

  // Automatically update order status to "En camino"
  useEffect(() => {
    if (
      deliveryIn === orderSendTime &&
      status !== "En camino" &&
      fetcher.state === "idle"
    ) {
      fetcher.submit(
        { status: "En camino" },
        { method: "PATCH", action: `/order/${order_id}` },
      );
    }
  }, [deliveryIn, fetcher, order_id, orderSendTime, status]);

  // Automatically update order status to "Entregado"
  useEffect(() => {
    if (
      deliveryIn === 0 &&
      status !== "Entregado" &&
      fetcher.state === "idle"
    ) {
      fetcher.submit(
        { status: "Entregado" },
        { method: "PATCH", action: `/order/${order_id}` },
      );
    }
  }, [deliveryIn, fetcher, order_id, status]);

  const renderDeliveryStatus = () => {
    if (status === "Entregado") return "El pedido ha llegado";
    if (deliveryIn > 1) return `${deliveryIn} minutos para la entrega 😃`;
    if (deliveryIn === 1) return "1 minuto para la entrega 😃";
    return null;
  };

  const totalPrice = priority ? order_price + priority_price : order_price;

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
        <p className="font-medium">{renderDeliveryStatus()}</p>
        <p className="text-xs text-stone-500">
          (Entrega estimada: {formatDate(estimated_delivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-t border-b">
        {cart.map((item: Cart) => {
          const ingredients = fetcher.data?.find(
            (el: Pizza) => el._id === item.pizzaId,
          )?.ingredients;

          return (
            <OrderItem
              item={item}
              key={item.pizzaId}
              isLoadingIngredients={fetcher.state === "loading"}
              ingredients={ingredients}
            />
          );
        })}
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
        <p className="font-bold">Pago total: {formatCurrency(totalPrice)}</p>
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
