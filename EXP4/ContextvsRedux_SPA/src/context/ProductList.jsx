import { useCart } from './CartContext';

const products = [
    { id: 1, name: 'Notebook', price: 50 },
    { id: 2, name: 'Pen', price: 10 },
    { id: 3, name: 'Eraser', price: 5 },
    { id: 4, name: 'Marker', price: 30 },
];

const ProductList = () => {
    const { addToCart } = useCart();

    return (
        <div style={{ padding: '0 1rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Available Products</h3>
            <div className="card-grid">
                {products.map((p) => (
                    <div key={p.id} className="product-card">
                        <div>
                            <h4 style={{ marginBottom: '0.5rem' }}>{p.name}</h4>
                            <p style={{ fontWeight: 600, color: 'var(--accent)' }}>₹{p.price}</p>
                        </div>
                        <button
                            className="btn-primary"
                            style={{ marginTop: '1rem' }}
                            onClick={() => addToCart(p)}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
