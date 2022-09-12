import React, { useContext } from 'react';

// Components
import Product from './shared/Product';

// Context
import { ProductsContext } from '../context/ProductContextProvider';

import style from './Store.module.css'

const Store = () => {
    const products = useContext(ProductsContext)

    return (
        <div
           className={style.container}
        >
            {products.map(product => <Product
                key={product.id}
                productData={product}
            />)
            }
        </div>
    )
}

export default Store