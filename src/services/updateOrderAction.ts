/**
 * Función de acción para manejar la actualización de un pedido.
 * 
 * Esta función está diseñada para ser utilizada con las APIs de datos de React Router. 
 * Recupera los datos del formulario de la solicitud, extrae el `order_id` de los parámetros 
 * de la ruta y actualiza el pedido correspondiente utilizando el servicio `updateOrder`.
 * 
 * @param {ActionFunctionArgs} args - Los argumentos proporcionados por React Router, 
 * incluyendo `params` y `request`.
 * @param {Record<string, string>} args.params - Los parámetros de la ruta, se espera que incluyan `order_id`.
 * @param {Request} args.request - El objeto de solicitud HTTP que contiene los datos del formulario.
 * 
 * @throws {Error} Lanza un error si `order_id` es indefinido.
 * 
 * @returns {Promise<null>} Devuelve una promesa que se resuelve en `null` después de actualizar el pedido.
 */
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