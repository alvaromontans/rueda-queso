import { API_URL } from "../constants";
import { Order } from "../interfaces/Order";

export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);
  if (!res.ok) throw Error('Failed getting menu');

  const data = await res.json();
  return data;
}

export async function getOrder(id: string) {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const data = await res.json();
  return data;
}

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

export async function checkOrderExists(orderId: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/order/${orderId}`, {
      method: 'HEAD',
    });

    return res.ok;
  } catch {
    throw Error('Failed checking if the order exists');
  }
}
