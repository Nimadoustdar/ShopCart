import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// Style
import styles from "./ProductDetails.module.css";
//Context
import { CartContext } from '../context/CartContextProvider';
//API
import { singleStoreApi } from '../services/api';
//Helper
import { isInCart, quantityCount } from '../helper/functions';


const ProductsDetails = (props) => {

    const id = props.match.params.id
    const [product, setProduct] = useState([])
    const { state, dispatch, actionType } = useContext(CartContext)

    useEffect(() => {
        const fetchApi = async () => {
            setProduct(await singleStoreApi(id))
        }
        fetchApi()
    }, [id])
    const { image, title, price, description, category } = product

    return (
        <div className={styles.container}>

            <img className={styles.image} src={image} alt='product' />
            <div className={styles.textContainer}>
                <h3>
                    {title}
                </h3>
                <p className={styles.description}>{description}</p>
                <p className={styles.category}>{category}</p>
                <div className={styles.buttonContainer}>
                    <span className={styles.price}>{price}</span>
                    <div className={styles.buttonContainer}>
                        {
                            quantityCount(state, product.id) > 1 &&
                            <button
                                className={styles.smallButton}
                                onClick={() => dispatch({
                                    type: actionType.DECREASE,
                                    payload: product
                                })}
                            >
                                -
                            </button>
                        }
                        {
                            quantityCount(state, product.id) === 1 &&
                            <button
                                className={styles.smallButton}
                                onClick={() => dispatch({
                                    type: actionType.REMOVE_ITEM,
                                    payload: product
                                })}
                            >
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        }
                        {
                            quantityCount(state, product.id) > 0 &&
                            <span className={styles.counter}>
                                {quantityCount(state, product.id)}
                            </span>
                        }
                        {
                            isInCart(state, product.id) ?
                                <button
                                    className={styles.smallButton}
                                    onClick={() => dispatch({
                                        type: actionType.INCREASE,
                                        payload: product
                                    })}
                                >
                                    +
                                </button> :
                                <button
                                    onClick={() => dispatch({
                                        type: actionType.ADD_ITEM,
                                        payload: product
                                    })}
                                >
                                    Add To Cart
                                </button>
                        }
                    </div>
                </div>
                <Link className={styles.back} to='/products'>Back to Shop</Link>
            </div>

        </div>
    )
}

export default ProductsDetails