import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
//Context
import { CartContext } from '../context/CartContextProvider'
//Component
import Cart from './shared/Cart'
// Style
import styles from "./ShopCart.module.css";

const ShopCart = () => {
    const { state, dispatch, actionType } = useContext(CartContext)
    return (
        <div className={styles.container}>
            <div className={styles.cartContainer}>
                {state.selectedItems.map(item => <Cart key={item.id} data={item} />)}
            </div>
            {
                state.itemsCounter > 0 &&
                <div className={styles.payments} >
                    <p><span>Total Items:</span>{state.itemsCounter} </p>
                    <p><span>Total Price:</span>{state.total}</p>
                    <div className={styles.buttonContainer}>
                        <button onClick={() => dispatch({ type: actionType.CHECKOUT })} className={styles.checkout}>Checkout</button>
                        <button onClick={() => dispatch({ type: actionType.CLEAR })} className={styles.clear}>Clear</button>
                    </div>
                </div>
            }
            {
                state.checkout &&
                <div className={styles.complete}>
                    <h3>Check Out Successfully</h3>
                    <Link to='/products'>Buy more</Link>
                </div>
            }
          
            {
                !state.checkout && state.itemsCounter === 0 &&
                <div className={styles.complete}>
                    <h3>Want to buy?</h3>
                    <Link to='/products'>Go to Shop</Link>
                </div>
            }
        </div>
    )
}

export default ShopCart