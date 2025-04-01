import { API_URL } from "../constants";
import { Order } from "../interfaces/Order";
/**
 * Obtiene el menú desde la API.
 * @throws Lanza un error si la solicitud falla.
 * @returns Una promesa que resuelve con los datos del menú.
 */
export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);
  if (!res.ok) throw Error('Failed getting menu');

  const data = await res.json();
  return data;
}
/**
 * Obtiene un pedido por su ID desde la API.
 * @param id - El ID del pedido a obtener.
 * @throws Lanza un error si el pedido no se encuentra o si la solicitud falla.
 * @returns Una promesa que resuelve con los datos del pedido.
 */
export async function getOrder(id: string) {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const data = await res.json();
  return data;
}

/**
 * Crea un nuevo pedido en la API.
 * @param newOrder - El objeto del pedido a crear.
 * @throws Lanza un error si la solicitud falla.
 * @returns Una promesa que resuelve con los datos del pedido creado.
 */
export async function createOrder(newOrder: Order) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    const data = await res.json();
    return data;
  } catch {
    throw Error('Failed creating your order');
  }
}
/**
 * Actualiza un pedido existente en la API.
 * @param id - El ID del pedido a actualizar.
 * @param updateOrder - Un objeto parcial del pedido que contiene los campos a actualizar.
 * @throws Lanza un error si la solicitud falla.
 */
export async function updateOrder(id: string, updateOrder: Partial<Order>) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateOrder),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
  } catch {
    throw Error('Failed updating your order');
  }
}

/**
 * Elimina un pedido por su ID desde la API.
 * @param id - El ID del pedido a eliminar.
 * @throws Lanza un error si la solicitud falla.
 */
export async function deleteOrder(id: string) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
  } catch {
    throw Error('Failed deleting your order');
  }
}

/**
 * Verifica si un pedido existe en la API por su ID.
 * @param orderId - El ID del pedido a verificar.
 * @returns Una promesa que resuelve a `true` si el pedido existe, de lo contrario `false`.
 */
export async function checkOrderExists(orderId: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/order/${orderId}`, {
      method: 'HEAD',
    });

    return res.ok;
  } catch {
    return false;
  }
}










