/**
 * Maneja la acción de eliminar un pedido y redirigir al usuario.
 *
 * Esta función se utiliza como un manejador de acciones en una ruta de React Router. 
 * Elimina un pedido basado en el parámetro `order_id` proporcionado en los parámetros de la ruta.
 * Si la eliminación es exitosa, muestra una notificación de éxito (toast) y redirige al usuario a la página principal.
 * Si el `order_id` no está definido, muestra una notificación de error (toast) y lanza un error.
 *
 * @param {ActionFunctionArgs} args - Los argumentos proporcionados por React Router, incluyendo
 * el objeto `params` que contiene los parámetros de la ruta.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta de redirección a la página principal.
 * @throws {Error} Lanza un error si `order_id` no está definido.
 */
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