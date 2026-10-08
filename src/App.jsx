import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import HomePage from './pages/Home/Home';
import ShopPage from './pages/Shop/Shop';
import SearchPage from './pages/Search/Search';
import ProductDetailsPage from './pages/ProductDetails/ProductDetails';
import CartPage from './pages/Cart/Cart';
import CheckoutPage from './pages/Checkout/Checkout';
import PaymentPage from './pages/Payment/Payment';
import OrderSuccessPage from './pages/OrderSuccess/OrderSuccess';
import TrackOrderPage from './pages/TrackOrder/TrackOrder';
import AboutPage from './pages/About/About';
import ContactPage from './pages/Contact/Contact';
import LoginPage from './pages/Login/Login';
import RegisterPage from './pages/Register/Register';
import AccountPage from './pages/Account/Account';

function AppShell() {
  return (
    <>
      <Navbar />
      <main className="page-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/category/:categorySlug" element={<ShopPage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
          <Route path="/track-order" element={<TrackOrderPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/*" element={<AccountPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>
            <AppShell />
          </WishlistProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
