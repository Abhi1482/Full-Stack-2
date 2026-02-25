import { CartProvider } from './CartContext';
import Navbar from './Navbar';
import ProductList from './ProductList';
import Cart from './Cart';

const ContextApp = () => {
    return (
        <CartProvider>
            <Navbar />
            <ProductList />
            <Cart />
        </CartProvider>
    );
};

export default ContextApp;
