import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useProducts } from '../../context/ProductContext';
import { fetchProductById, formatPrice } from '../../data/products';
import './Account.css';

function AccountOverview() {
  const { items } = useWishlist();

  return (
    <div className="account-overview">
      <div className="overview-hero">
        <div className="overview-copy">
          <span className="section-label">MY ACCOUNT</span>

          <h2>Shop smarter, your way.</h2>

          <p>
            Keep track of your favorites, orders, and shopping activity
            all in one place.
          </p>

          <Link to="/shop" className="account-primary-btn">
            Continue shopping
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="overview-mark" aria-hidden="true">
          <span>E</span>
        </div>
      </div>

      <div className="account-stats">
        <div className="stat-card">
          <span className="stat-label">Saved items</span>
          <strong>{items.length}</strong>
          <span className="stat-description">In your wishlist</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Orders</span>
          <strong>0</strong>
          <span className="stat-description">Total orders</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Account</span>
          <strong>Active</strong>
          <span className="stat-description">Everything looks good</span>
        </div>
      </div>

      <div className="account-section">
        <div className="section-heading">
          <div>
            <span className="section-label">ACTIVITY</span>
            <h3>Recent activity</h3>
          </div>

          <Link to="/account/orders" className="section-link">
            View orders →
          </Link>
        </div>

        <div className="activity-empty">
          <div className="activity-icon">○</div>

          <div>
            <h4>No orders yet</h4>
            <p>
              Your recent orders will appear here once you make a purchase.
            </p>
          </div>
        </div>
      </div>

      <div className="account-help">
        <div>
          <span className="section-label">NEED HELP?</span>
          <h3>We're here when you need us.</h3>
        </div>

        <Link to="/about" className="section-link">
          Get support →
        </Link>
      </div>
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
    const missingIds = items.filter(
      (id) => !catalogProducts.has(String(id)),
    );

    if (!missingIds.length) {
      setFetchedProducts([]);
      setError('');
      return undefined;
    }

    const controller = new AbortController();

    Promise.all(
      missingIds.map((id) =>
        fetchProductById(id, { signal: controller.signal }),
      ),
    )
      .then((results) => {
        setFetchedProducts(results);
      })
      .catch((requestError) => {
        if (requestError.code !== 'ERR_CANCELED') {
          setError(
            requestError.message ||
              'Could not load all saved products.',
          );
        }
      });

    return () => controller.abort();
  }, [items, catalogProducts]);

  const savedProducts = items
    .map(
      (id) =>
        catalogProducts.get(String(id)) ??
        fetchedProducts.find(
          (product) => String(product.id) === String(id),
        ),
    )
    .filter(Boolean);

  return (
    <div className="account-panel">
      <div className="panel-heading">
        <div>
          <span className="section-label">SAVED</span>
          <h2>Wishlist</h2>
          <p>Products you've saved for later.</p>
        </div>
      </div>

      {error && (
        <p className="account-error" role="alert">
          Some saved products could not be loaded: {error}
        </p>
      )}

      {items.length === 0 ? (
        <div className="panel-empty">
          <h3>Your wishlist is empty.</h3>
          <p>
            Save products you love and come back to them whenever
            you're ready.
          </p>

          <Link to="/shop" className="account-primary-btn">
            Explore products
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      ) : savedProducts.length === 0 && !error ? (
        <div className="panel-empty">
          <p>Loading saved products…</p>
        </div>
      ) : (
        <div className="wishlist-grid">
          {savedProducts.map((product) => (
            <div key={product.id} className="wishlist-item">
              <img src={product.image} alt={product.name} />

              <div className="wishlist-info">
                <strong>{product.name}</strong>

                <span>
                  {formatPrice(product.price, product.currency)}
                </span>
              </div>

              <Link
                to={`/product/${product.id}`}
                className="secondary-btn"
              >
                View
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function OrdersView() {
  return (
    <div className="account-panel">
      <div className="panel-heading">
        <div>
          <span className="section-label">PURCHASES</span>
          <h2>Orders</h2>
          <p>Keep track of your E-Sharp purchases.</p>
        </div>
      </div>

      <div className="panel-empty">
        <h3>No orders yet.</h3>

        <p>
          Once you place an order, you’ll be able to track it from
          here.
        </p>

        <Link to="/shop" className="account-primary-btn">
          Start shopping
          <span aria-hidden="true">→</span>
        </Link>
      </div>
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
      <header className="account-header">
        <span className="section-label">ACCOUNT</span>

        <h1>Welcome back 👋</h1>

        <p>
          Manage your E-Sharp experience in one place.
        </p>
      </header>

      <div className="account-shell">
        <aside className="account-sidebar">
          <nav className="account-navigation" aria-label="Account navigation">
            {tabs.map((tab) => (
              <NavLink
                key={tab.to}
                end={tab.to === '/account'}
                to={tab.to}
                className={({ isActive }) =>
                  isActive
                    ? 'account-tab active'
                    : 'account-tab'
                }
              >
                {tab.label}
              </NavLink>
            ))}
          </nav>

          <Link to="/login" className="account-logout">
            Log out
          </Link>
        </aside>

        <main className="account-content">
          <Routes>
            <Route index element={<AccountOverview />} />
            <Route path="wishlist" element={<WishlistView />} />
            <Route path="orders" element={<OrdersView />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}