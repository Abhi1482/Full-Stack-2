import { Provider } from 'react-redux';
import store from './store';
import Navbar from './Navbar';
import ProductList from './ProductList';
import Cart from './Cart';

const ReduxApp = () => {
    return (
        <Provider store={store}>
            <Navbar />
            <ProductList />
            <Cart />
        </Provider>
    );
};

export default ReduxApp;
