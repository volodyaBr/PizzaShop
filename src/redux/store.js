import { configureStore } from '@reduxjs/toolkit'
import pizzaReducer from "./pizzaSlice"

export default configureStore({
    reducer: {
        pizza: pizzaReducer
    },
})
