import React, { createContext, useReducer } from 'react'
const initialState = {
    // انتخاب کاربرد
    selectedItems: [],
    //تعداد کل محصولای انتخاب کاربر
    itemsCounter: 0,
    total: 0,
    checkout: false
}

const actionType = {
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: "REMOVE_ITEM",
    INCREASE: "INCREASE",
    DECREASE: "DECREASE",
    CHECKOUT: "CHECKOUT",
    CLEAR: "CLEAR",

}
const sumItems = items => {
    const itemsCounter = items.reduce((total, product) => total + product.quantity, 0);
    let total = items.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
    return {itemsCounter, total}
}

export const CartContext = createContext()


const cartReducer = (state, action) => {
    switch (action.type) {
        case actionType.ADD_ITEM:
        //true && false
            if (!state.selectedItems.find(item => item.id === action.payload.id)) {
                //this products
                state.selectedItems.push({
                    ...action.payload,
                    quantity: 1,
                })
            }
            return {
                ...state,
                selectedItems: [...state.selectedItems],
                ...sumItems(state.selectedItems),
                checkout:false

            };
        case actionType.REMOVE_ITEM:
            const newSelectedItems = state.selectedItems.filter(item => item.id !== action.payload.id)
            return {
                ...state,
                selectedItems: [...newSelectedItems],
                ...sumItems(newSelectedItems)

            }
        case actionType.INCREASE:
            const indexInc = state.selectedItems.findIndex(item => item.id === action.payload.id)
            state.selectedItems[indexInc].quantity++
            return {
                ...state,
                ...sumItems(state.selectedItems)

            }
        case actionType.DECREASE:
            const indexDec = state.selectedItems.findIndex(item => item.id === action.payload.id)
            state.selectedItems[indexDec].quantity--
            return {
                ...state,
                ...sumItems(state.selectedItems)

            }
        case actionType.CHECKOUT:
            return {
                selectedItems: [],
                itemsCounter: 0,
                total: 0,
                checkout: true
            }
        case actionType.CLEAR:
            return {
                selectedItems: [],
                itemsCounter: 0,
                total: 0,
                checkout: false
            }
        default:
            return state
    }
}
const CartContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, initialState)
    return (
        <CartContext.Provider value={{ state, dispatch, actionType }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider