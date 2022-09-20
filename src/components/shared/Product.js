import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// Functions
import { shorten, isInCart, quantityCount } from '../../helper/functions';
//Context
import { CartContext } from '../../context/CartContextProvider';

// Style
import styles from "./Product.module.css";

const Product = ({ productData }) => {
    const { state, dispatch, actionType } = useContext(CartContext)

 

    return (
        <div className={styles.container}>
            <img className={styles.cardImage} src={productData.image} alt="product" style={{ width: "200px" }} />
            <h3>{shorten(productData.title)}</h3>
            <p>{productData.price}</p>
            <div className={styles.linkContainer}>
                <Link to={`/products/${productData.id}`}>Details</Link>
                <div className={styles.buttonContainer}>
                    {
                        quantityCount(state, productData.id) > 1 &&
                        <button
                            className={styles.smallButton}
                            onClick={() => dispatch({
                                type: actionType.DECREASE,
                                payload: productData
                            })}
                        >
                            -
                        </button>
                    }
                    {
                        quantityCount(state, productData.id) === 1 &&
                        <button
                            className={styles.smallButton}
                            onClick={() => dispatch({
                                type: actionType.REMOVE_ITEM,
                                payload: productData
                            })}
                        >
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    }
                    {
                        quantityCount(state, productData.id) > 0 &&
                        <span className={styles.counter}>
                            {quantityCount(state, productData.id)}
                        </span>
                    }
                    {
                        isInCart(state, productData.id) ?
                            <button
                                className={styles.smallButton}
                                onClick={() => dispatch({
                                    type: actionType.INCREASE,
                                    payload: productData
                                })}
                            >
                                +
                            </button> :
                            <button
                                onClick={() => dispatch({
                                    type: actionType.ADD_ITEM,
                                    payload: productData
                                })}
                            >
                                Add To Cart
                            </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Product;