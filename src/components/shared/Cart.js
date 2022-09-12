import React, { useContext } from 'react'
// Context

import { CartContext } from '../../context/CartContextProvider'
// Functions

import { shorten } from '../../helper/functions'
// Style
import styles from "./Cart.module.css";
const Cart = (props) => {
    const { dispatch, actionType } = useContext(CartContext)
    const { image, title, price, quantity } = props.data
    return (
        <div className={styles.container}>
            <img className={styles.productImage} src={image} alt="products" />
            <div className={styles.data}>
                <h3>{shorten(title)}</h3>
                <p>{price} $</p>
            </div>
            <div>
                <span className={styles.quantity}>{quantity}</span>
            </div>
            <div className={styles.buttonContainer}>
                {
                    quantity > 1 ?
                        <button onClick={() => dispatch({ type: actionType.DECREASE, payload: props.data })}>-</button> :
                        <button onClick={() => dispatch({ type: actionType.REMOVE_ITEM, payload: props.data })}>
                            <i class="fa-solid fa-trash"></i>
                        </button>
                }
                        <button onClick={() => dispatch({ type: actionType.INCREASE, payload: props.data })}>+</button>
            </div>
        </div>
    )
}

export default Cart