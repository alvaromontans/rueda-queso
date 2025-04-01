/**
 * Función de cargador para obtener los detalles de un pedido basado en el ID proporcionado.
 * Esta función se utiliza en el contexto de los cargadores de React Router.
 *
 * @param {LoaderFunctionArgs} args - Los argumentos proporcionados por React Router, incluyendo los parámetros de la ruta.
 * @throws {Error} Lanza un error si el parámetro `order_id` falta.
 * @returns {Promise<any>} Una promesa que resuelve con los detalles del pedido obtenidos desde la API.
 */
import { LoaderFunctionArgs } from "react-router-dom";
import { getOrder } from "../services/apiRestaurant";

export async function orderLoader({ params }: LoaderFunctionArgs) {
    if (!params.order_id) throw new Error("order_id is required");
    const order = await getOrder(params.order_id);
    return order;
}