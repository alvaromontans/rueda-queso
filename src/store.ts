/**
 * Configura y exporta el store de Redux para la aplicación.
 * 
 * El store combina múltiples reducers:
 * - `user`: Maneja el estado relacionado con la información del usuario, importado desde `userSlice`.
 * - `cart`: Administra el estado relacionado con el carrito de compras, importado desde `cartSlice`.
 * 
 * Exportaciones:
 * - `store`: El store de Redux configurado.
 * - `RootState`: Un tipo de TypeScript que representa la estructura general del estado del store.
 * - `AppDispatch`: Un tipo de TypeScript para la función dispatch del store.
 * 
 * Uso:
 * - Usa `RootState` para tipar el estado en los selectores.
 * - Usa `AppDispatch` para tipar la función dispatch en acciones asíncronas o componentes.
 */
import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;