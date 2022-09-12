import { Redirect, Route, Switch } from 'react-router-dom';
// Component
import ProductsDetails from './components/ProductsDetails';
import Navbar from './components/shared/Navbar';
import ShopCart from './components/ShopCart';
import Store from './components/Store'
import CartContextProvider from './context/CartContextProvider';
// Context
import ProductContextProvider from './context/ProductContextProvider';
//Style
import "./App.css"
function App() {
  return (
    <ProductContextProvider>
      <CartContextProvider>
        <Navbar/>
        <Switch>
          <Route path='/products/:id' component={ProductsDetails} />
          <Route path='/products' component={Store} />
          <Route path='/cart' component={ShopCart} />
          <Redirect to='/products' />
        </Switch>
      </CartContextProvider>
    </ProductContextProvider>
  );
}

export default App;
