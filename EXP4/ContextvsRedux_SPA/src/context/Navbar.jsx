import { useCart } from './CartContext';

const Navbar = () => {
    const { cart } = useCart();

    return (
        <nav className="nav-glass glass">
            <h2 style={{ fontSize: '1.2rem' }}>Context Store</h2>
            <div style={{ background: 'var(--accent)', color: 'white', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.9rem' }}>
                Items: {cart.length}
            </div>
        </nav>
    );
};

export default Navbar;
