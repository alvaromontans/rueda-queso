/**
 * Acción thunk para crear un nuevo pedido y limpiar el carrito.
 * 
 * @async
 * @function createOrderThunk
 * @param {Order} order - El objeto del pedido que contiene los detalles del pedido.
 * @param {Object} thunkAPI - El objeto thunk API proporcionado por Redux Toolkit.
 * @param {Function} thunkAPI.dispatch - La función dispatch para despachar acciones.
 * @returns {Promise<Order>} Una promesa que se resuelve con el pedido recién creado.
 * 
 * Esta acción thunk realiza los siguientes pasos:
 * 1. Llama al servicio `createOrder` para crear un nuevo pedido.
 * 2. Despacha la acción `clearCart` para limpiar el carrito después de crear el pedido.
 * 3. Devuelve el pedido recién creado.
 */

/**
 * Slice de Redux para gestionar el estado de los pedidos.
 * 
 * Este slice contiene lo siguiente:
 * - Estado inicial con `order` establecido en `null` y `status` establecido en `"idle"`.
 * - Reducer adicional para manejar la acción `createOrderThunk.fulfilled`:
 *   - Actualiza el estado `order` con el pedido recién creado.
 *   - Establece el `status` en `"success"`.
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearCart } from "../cart/cartSlice";
import { createOrder } from "../../services/apiRestaurant";
import { Order } from "../../interfaces/Order";

export const createOrderThunk = createAsyncThunk(
    "order/new",
    async (order: Order, { dispatch }) => {
        const newOrder = await createOrder(order);
        dispatch(clearCart());
        return newOrder;
    }
);

const orderSlice = createSlice({
    name: "order",
    initialState: { order: null, status: "idle" },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createOrderThunk.fulfilled, (state, action) => {
            state.order = action.payload;
            state.status = "success";
        });
    },
});

export default orderSlice.reducer;
