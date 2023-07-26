import { createContext , useReducer } from "react";
import { StoreReducer } from "../Reducers/StoreReducer";

export const store = createContext();

const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : [],
        paymentMethod: localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : "",

    },
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
}

export function StoreProvider( props ) {
const [state, dispatch] = useReducer(StoreReducer, initialState);
const body = {
    state , dispatch
}

return(
    <store.Provider value={body}>{props.children}</store.Provider>
)
}