import { createSlice } from '@reduxjs/toolkit';

let nextId = 1;

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            state.push({ ...action.payload, cartId: nextId++ });
        },
        removeFromCart: (state, action) => {
            return state.filter((item) => item.cartId !== action.payload);
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
