import {createSlice} from '@reduxjs/toolkit'
import {getPizzaFromServer} from "../api/api";

export const counterSlice = createSlice({
    name: 'pizza',
    initialState: {
        pizzas: [],
        orderPizzas: [],
        currentPrice: 0,
        totalCountOrderPizzas: 0,
        sortValue: null,
        filterValue: null,
        nameValue: "",
        isLoading: false,
        currentPage: 1,
        totalCountPizzas: null
    },
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setNameValue: (state, action) => {
            state.nameValue = action.payload
        },
        addPizzas: (state, action) => {
            state.pizzas = [...action.payload.oldPizzas, ...action.payload.pizzas]
        },
        setPizzas: (state, action) => {
            state.pizzas = action.payload
        },
        setSortValue: (state, action) => {
            state.sortValue = action.payload
        },
        setFilterValue: (state, action) => {
            state.filterValue = action.payload
        },
        resetPizzas: (state, action) => {
            state.pizzas = []
        },
        setTotalCountPizzas: (state, action) => {
            state.totalCountPizzas = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        addOrderPizzas: (state, action) => {
            state.orderPizzas = [...action.payload.orderPizzas, action.payload.pizza]
            state.currentPrice = Number(action.payload.currentPrice) + Number(action.payload.pizza.price)
            state.totalCountOrderPizzas = Number(action.payload.totalCountOrderPizzas) + 1
        },
        updateOrderPizzas: (state, action) => {
            state.orderPizzas = action.payload.orderPizzas.map(item => {
                let pizza = {...item}

                if (pizza.pizzaId === action.payload.pizzaId && pizza.dough === action.payload.dough && pizza.size === action.payload.size) {
                    if (!action.payload.decrease) {

                        pizza.count++
                        pizza.totalPrice = Number(pizza.totalPrice) + Number(pizza.price)
                        state.currentPrice = Number(action.payload.currentPrice) + Number(pizza.price)
                        state.totalCountOrderPizzas = Number(action.payload.totalCountOrderPizzas) + 1
                    } else {
                        pizza.count--
                        pizza.totalPrice = Number(pizza.totalPrice) - Number(pizza.price)
                        state.currentPrice = Number(action.payload.currentPrice) - Number(pizza.price)
                        state.totalCountOrderPizzas = Number(action.payload.totalCountOrderPizzas) - 1
                    }
                }

                return pizza
            })
        },
        deletePizza: (state, action) => {
            state.orderPizzas = action.payload.orderPizzas.filter(pizza => {
                if (pizza.pizzaId === action.payload.pizzaId && pizza.dough === action.payload.dough && pizza.size === action.payload.size) {
                    state.totalCountOrderPizzas = action.payload.totalCountOrderPizzas - pizza.count
                    state.currentPrice = action.payload.currentPrice - pizza.totalPrice
                    return false
                } else {
                    return true
                }
            })
        },
        clearBasket: (state, action) => {
            state.orderPizzas = []
            state.totalCountOrderPizzas = 0
            state.currentPrice = 0
        }
    },
})

export const {
    setPizzas,
    addOrderPizzas,
    updateOrderPizzas,
    resetPizzas,
    setSortValue,
    setFilterValue,
    deletePizza,
    clearBasket,
    setNameValue,
    setIsLoading,
    addPizzas,
    setTotalCountPizzas,
    setCurrentPage
} = counterSlice.actions

export const getPizzas = (isAdd) => {
    return async (dispatch, getState) => {
        try {
            const state = getState()
            const filterValue = state.pizza.filterValue
            const sortValue = state.pizza.sortValue
            const nameValue = state.pizza.nameValue
            const isLoading = state.pizza.isLoading
            const pizzas = state.pizza.pizzas
            const currentPage = state.pizza.currentPage
            const totalCountPizzas = state.pizza.totalCountPizzas

            if (!isLoading) {
                dispatch(setIsLoading(true))

                if (isAdd) {
                    if (pizzas.length < totalCountPizzas) {
                        console.log("request")
                        const res = await getPizzaFromServer(sortValue, filterValue, nameValue, currentPage)
                        dispatch(setCurrentPage(currentPage + 1))
                        dispatch(addPizzas({oldPizzas: pizzas, pizzas: res.data}))
                    }
                } else {
                    const res = await getPizzaFromServer(sortValue, filterValue, nameValue, currentPage)
                    dispatch(setTotalCountPizzas(res.headers["x-total-count"]))
                    dispatch(setCurrentPage(currentPage + 1))
                    dispatch(setPizzas(res.data))
                }
            }
        } catch (err) {
            console.log(err)
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export default counterSlice.reducer
