import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from './cartSlice';

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    return (
        <div style={{ padding: '2rem 1rem' }}>
            <h3 style={{ marginBottom: '1rem', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '2rem' }}>
                Your Cart {cart.length > 0 && <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>({cart.length} items)</span>}
            </h3>
            {cart.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>Your cart is feeling light...</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {cart.map((item) => (
                        <div key={item.cartId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.5)', borderRadius: 'var(--radius)' }}>
                            <span>{item.name} <small style={{ color: 'var(--accent)' }}>₹{item.price}</small></span>
                            <button
                                onClick={() => dispatch(removeFromCart(item.cartId))}
                                style={{ color: '#eb4d4b', background: 'rgba(235, 77, 75, 0.1)', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cart;
