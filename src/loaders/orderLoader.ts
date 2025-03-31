import { LoaderFunctionArgs } from "react-router-dom";
import { getOrder } from "../services/apiRestaurant";

export async function orderLoader({ params }: LoaderFunctionArgs) {
    if (!params.order_id) throw new Error("order_id is required");
    const order = await getOrder(params.order_id);
    return order;
}