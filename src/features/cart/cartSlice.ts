/**
 * Slice de Redux para gestionar el estado del carrito en la aplicación.
 * 
 * Este slice incluye acciones y selectores para agregar, eliminar y modificar
 * elementos en el carrito, así como para obtener información relacionada con
 * el carrito, como la cantidad total y el precio total.
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart } from "../../interfaces/Cart";
import { RootState } from "../../store";

/**
 * Estado inicial del slice del carrito.
 * 
 * @property cart - Un array de elementos del carrito, inicialmente vacío.
 */
const initialState: { cart: Cart[] } = {
    cart: [],
};

/**
 * Slice para la gestión del estado relacionado con el carrito.
 */
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        /**
         * Agrega un elemento al carrito.
         * 
         * @param state - El estado actual del carrito.
         * @param action - La acción que contiene el elemento a agregar.
         */
        addItem(state, action: PayloadAction<Cart>) {
            state.cart.push(action.payload);
        },

        /**
         * Elimina un elemento del carrito por su ID de pizza.
         * 
         * @param state - El estado actual del carrito.
         * @param action - La acción que contiene el ID de la pizza del elemento a eliminar.
         */
        deleteItem(state, action: PayloadAction<number>) {
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
        },

        /**
         * Incrementa la cantidad de un elemento en el carrito por su ID de pizza.
         * Actualiza el precio total del elemento en consecuencia.
         * 
         * @param state - El estado actual del carrito.
         * @param action - La acción que contiene el ID de la pizza del elemento a incrementar.
         */
        increaseItemQuantity(state, action: PayloadAction<number>) {
            const item = state.cart.find(item => item.pizzaId === action.payload);
            if (item) {
                item.quantity++;
                item.total_price = item.quantity * item.unit_price;
            }
        },

        /**
         * Decrementa la cantidad de un elemento en el carrito por su ID de pizza.
         * Actualiza el precio total del elemento en consecuencia.
         * Elimina el elemento del carrito si su cantidad llega a cero.
         * 
         * @param state - El estado actual del carrito.
         * @param action - La acción que contiene el ID de la pizza del elemento a decrementar.
         */
        decreaseItemQuantity(state, action: PayloadAction<number>) {
            const item = state.cart.find(item => item.pizzaId === action.payload);
            if (item) {
                item.quantity--;
                item.total_price = item.quantity * item.unit_price;
                if (item.quantity === 0) {
                    state.cart = state.cart.filter(cartItem => cartItem.pizzaId !== action.payload);
                }
            }
        },

        /**
         * Limpia todos los elementos del carrito.
         * 
         * @param state - El estado actual del carrito.
         */
        clearCart(state) {
            state.cart = [];
        },
    },
});

export const {
    addItem,
    deleteItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

/**
 * Selector para obtener el array del carrito desde el estado.
 * 
 * @param state - El estado raíz de la aplicación.
 * @returns El array de elementos del carrito.
 */
export const getCart = (state: RootState) => state.cart.cart;

/**
 * Selector para calcular la cantidad total de elementos en el carrito.
 * 
 * @param state - El estado raíz de la aplicación.
 * @returns La cantidad total de elementos en el carrito.
 */
export const getTotalCartQuantity = (state: RootState) =>
    state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

/**
 * Selector para calcular el precio total de los elementos en el carrito.
 * 
 * @param state - El estado raíz de la aplicación.
 * @returns El precio total de los elementos en el carrito.
 */
export const getTotalCartPrice = (state: RootState) =>
    state.cart.cart.reduce((sum, item) => sum + item.total_price, 0);

/**
 * Selector para obtener la cantidad actual de un elemento específico en el carrito por su ID de pizza.
 * 
 * @param id - El ID de la pizza del elemento.
 * @returns Una función que toma el estado raíz y devuelve la cantidad del elemento, o 0 si no se encuentra.
 */
export const getCurrentQuantityById = (id: number) => (state: RootState) =>
    state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0;
