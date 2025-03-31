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
