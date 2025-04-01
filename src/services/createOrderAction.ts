import { redirect } from "react-router-dom";
import { Order } from "../interfaces/Order";
import store from "../store";
import { createOrderThunk } from "../features/order/orderSlice";
import { generateOrderId } from "../utils/helpers";
import { checkOrderExists } from "./apiRestaurant";

export async function action({ request }: { request: Request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    let orderId = generateOrderId();

    // Check if the generated order ID already exists in the database
    while (await checkOrderExists(orderId)) {
        orderId = generateOrderId(); // Generate a new ID if it exists
    }

    const order: Order = {
        ...data,
        order_id: orderId,
        cart: JSON.parse(data.cart as string),
        priority: data.priority === "true",
        priority_price: Number(data.order_price) * 0.2,
        status: "Preparando"
    } as Order;

    const newOrder = await store.dispatch(createOrderThunk(order)).unwrap();

    return redirect(`/order/${newOrder.order_id}`);
}