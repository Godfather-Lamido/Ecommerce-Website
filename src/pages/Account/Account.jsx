import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useProducts } from '../../context/ProductContext';
import { fetchProductById, formatPrice } from '../../data/products';

function AccountOverview() {
  return (
    <div className="account-overview card">
      <h2>My account</h2>
      <p>Welcome back! Manage your profile, saved items, and recent orders.</p>
    </div>
  );
}

function WishlistView() {
  const { items } = useWishlist();
  const { products } = useProducts();
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [error, setError] = useState('');
  const catalogProducts = useMemo(
    () => new Map(products.map((product) => [String(product.id), product])),
    [products],
  );

  useEffect(() => {
    const missingIds = items.filter((id) => !catalogProducts.has(String(id)));
    if (!missingIds.length) {
      setFetchedProducts([]);
      setError('');
      return undefined;
    }

    const controller = new AbortController();
    Promise.all(missingIds.map((id) => fetchProductById(id, { signal: controller.signal })))
      .then((results) => setFetchedProducts(results))
      .catch((requestError) => {
        if (requestError.code !== 'ERR_CANCELED') {
          setError(requestError.message || 'Could not load all saved products.');
        }
      });
    return () => controller.abort();
  }, [items, catalogProducts]);

  const savedProducts = items
    .map((id) => catalogProducts.get(String(id)) ?? fetchedProducts.find((product) => String(product.id) === String(id)))
    .filter(Boolean);

  return (
    <div className="account-panel card">
      <h2>Wishlist</h2>
      {error && <p role="alert">Some saved products could not be loaded: {error}</p>}
      {items.length === 0 ? (
        <p>Your saved items will appear here.</p>
      ) : savedProducts.length === 0 && !error ? (
        <p>Loading saved products…</p>
      ) : (
        <div className="wishlist-grid">
          {savedProducts.map((product) => (
            <div key={product.id} className="wishlist-item">
              <img src={product.image} alt={product.name} />
              <div>
                <strong>{product.name}</strong>
                <span>{formatPrice(product.price, product.currency)}</span>
              </div>
              <Link to={`/product/${product.id}`} className="secondary-btn">View</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function OrdersView() {
  return (
    <div className="account-panel card">
      <h2>Orders</h2>
      <p>You do not have any orders yet.</p>
    </div>
  );
}

export default function AccountPage() {
  const tabs = [
    { label: 'Overview', to: '/account' },
    { label: 'Wishlist', to: '/account/wishlist' },
    { label: 'Orders', to: '/account/orders' },
  ];

  return (
    <div className="page-shell account-page">
      <header className="page-header">
        <h1>Account</h1>
      </header>

      <div className="account-shell">
        <aside className="account-sidebar card">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              end={tab.to === '/account'}
              to={tab.to}
              className={({ isActive }) => (isActive ? 'account-tab active' : 'account-tab')}
            >
              {tab.label}
            </NavLink>
          ))}
          <Link to="/login" className="secondary-btn">Log out</Link>
        </aside>

        <div className="account-content">
          <Routes>
            <Route index element={<AccountOverview />} />
            <Route path="wishlist" element={<WishlistView />} />
            <Route path="orders" element={<OrdersView />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
