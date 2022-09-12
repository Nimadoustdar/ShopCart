import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContextProvider'
import styles from './Navbar.module.css'
const Navbar = () => {
  const { state } = useContext(CartContext)
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <Link className={styles.productLink} to='/products'>Products</Link>
        <div className={styles.iconContainer}>
          <Link className={styles.shopLink} to='/cart'>
          <i class="fa-solid fa-cart-shopping"></i>
          </Link>
          {state.itemsCounter > 0 && <span> {state.itemsCounter} </span>}
        </div>
      </div>
    </div>
  )
}

export default Navbar