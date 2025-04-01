/**
 * Función de carga asíncrona para obtener los datos del menú.
 *
 * Esta función utiliza el servicio `getMenu` de la API para recuperar
 * los datos del menú y los devuelve. Se utiliza típicamente en el contexto
 * de la carga de datos para una aplicación React.
 *
 * @returns {Promise<any>} Una promesa que se resuelve con los datos del menú.
 */
import { getMenu } from "../services/apiRestaurant";

export async function menuLoader() {
    const menu = await getMenu();
    return menu;
}