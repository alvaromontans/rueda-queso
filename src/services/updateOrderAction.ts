import { ActionFunctionArgs } from "react-router-dom";
import { updateOrder } from "./apiRestaurant";
import { Order } from "../interfaces/Order";

export async function action({ params, request }: ActionFunctionArgs) {
    const data = await request.formData();
    if (params.order_id) {
        const orderData: Partial<Order> = Object.fromEntries(data.entries());
        await updateOrder(params.order_id, orderData);
    } else {
        throw new Error("order_id is undefined");
    }
    return null;
}