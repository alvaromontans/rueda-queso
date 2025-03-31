import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Cart } from "../../interfaces/Cart"
import { RootState } from "../../store";

const initialState: { cart: Cart[] } = {
    cart: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<Cart>) {
            state.cart.push(action.payload)
        },
        deleteItem(state, action: PayloadAction<number>) {
            state.cart = state.cart.filter((item) => item.pizzaId !== action.payload)
        },
        increaseItemQuantity(state, action: PayloadAction<number>) {
            const item = state.cart.find((item) => item.pizzaId === action.payload);
            if (item) {
                item.quantity++;
                item.total_price = item.quantity * item.unit_price;
            }
        },
        decreaseItemQuantity(state, action: PayloadAction<number>) {
            const item = state.cart.find((item) => item.pizzaId === action.payload);
            if (item) {
                item.quantity--;
                item.total_price = item.quantity + item.unit_price;
                if (item?.quantity === 0) {
                    cartSlice.caseReducers.deleteItem(state, action);
                }
            }


        },
        clearCart(state) {
            state.cart = []
        },
    },
});

export const {
    addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state: RootState) => state.cart.cart;

export const getTotalCartQuantity = (state: RootState) =>
    state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state: RootState) =>
    state.cart.cart.reduce((sum, item) => sum + item.total_price, 0);

export const getCurrentQuantityById = (id: number) =>
    (state: RootState) => state.cart.cart.find((item) =>
        item.pizzaId === id)?.quantity ?? 0;
