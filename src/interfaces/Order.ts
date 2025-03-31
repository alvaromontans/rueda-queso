import { Cart } from "./Cart";

export interface Order {
    id?: number;
    order_id?: string;
    customer?: string;
    phone?: string;
    address?: string;
    location?: string;
    priority: boolean;
    estimated_delivery?: string;
    cart: Cart[];
    order_price?: number;
    priority_price?: number;
    status: "Preparando" | "En camino" | "Entregado";
}