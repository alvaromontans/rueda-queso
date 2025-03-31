import { ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteOrder } from "./apiRestaurant";
import toast from "react-hot-toast";

export async function action({ params }: ActionFunctionArgs) {
    if (params.order_id) {
        await deleteOrder(params.order_id);
        toast.success("Has confirmado la llegada del pedido");
        return redirect("/");
    } else {
        toast.error("Error confirmando la entrega del pedido");
        throw new Error("order_id is undefined");
    }
}