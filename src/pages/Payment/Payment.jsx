import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../data/products';

import './Payment.css';

const ORDERS_STORAGE_KEY = 'eSharp-orders';
const CUSTOMER_STORAGE_KEY = 'customer';

function readStoredArray(key) {
  try {
    const value = JSON.parse(
      localStorage.getItem(key) || '[]',
    );

    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function readCustomer() {
  try {
    return JSON.parse(
      localStorage.getItem(
        CUSTOMER_STORAGE_KEY,
      ) || 'null',
    );
  } catch {
    return null;
  }
}

function createOrderId() {
  return `ESH-${Date.now()}-${Math.floor(
    Math.random() * 10000,
  )}`;
}

export default function PaymentPage() {
  const navigate = useNavigate();

  const {
    subtotal,
    items,
    clearCart,
  } = useCart();

  const [isProcessing, setIsProcessing] =
    useState(false);

  const [error, setError] = useState('');

  const currency =
    items[0]?.currency || 'USD';

  function handleSubmit(event) {
    event.preventDefault();

    if (isProcessing) {
      return;
    }

    if (items.length === 0) {
      setError(
        'Your cart is empty. Add products before checking out.',
      );

      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // 1. Take a snapshot of the cart.
      const purchasedItems = items.map(
        (item) => ({
          ...item,
        }),
      );

      // 2. Retrieve previously saved orders.
      const existingOrders =
        readStoredArray(
          ORDERS_STORAGE_KEY,
        );

      // 3. Retrieve the customer's saved information.
      const customer = readCustomer();

      // 4. Create a unique order ID.
      const orderId = createOrderId();

      // 5. Create the new order.
      const order = {
        id: orderId,
        items: purchasedItems,
        subtotal,
        delivery: 0,
        total: subtotal,
        currency,
        customer,
        createdAt:
          new Date().toISOString(),
        paymentStatus: 'demo-success',
        orderStatus: 'processing',
      };

      // 6. Save the new order without
      //    deleting previous orders.
      localStorage.setItem(
        ORDERS_STORAGE_KEY,
        JSON.stringify([
          order,
          ...existingOrders,
        ]),
      );

      // 7. Verify that the order was saved.
      const savedOrders = JSON.parse(
        localStorage.getItem(
          ORDERS_STORAGE_KEY,
        ) || '[]',
      );

      const orderWasSaved =
        Array.isArray(savedOrders) &&
        savedOrders.some(
          (savedOrder) =>
            savedOrder.id === orderId,
        );

      if (!orderWasSaved) {
        throw new Error(
          'The order could not be saved.',
        );
      }

      // 8. Clear the cart only after
      //    successfully saving the order.
      clearCart();

      // 9. Navigate to the order success page.
      navigate(
        `/order-success/${orderId}`,
        {
          replace: true,
          state: {
            order,
          },
        },
      );
    } catch (paymentError) {
      console.error(
        'Could not complete demo checkout:',
        paymentError,
      );

      setError(
        'We could not save your order. Please try again.',
      );

      setIsProcessing(false);
    }
  }

  return (
    <div className="payment-page">
      <header className="page-header">
        <h1>Payment</h1>

        <p>
          Review your order before completing
          checkout.
        </p>
      </header>

      <div
        className="payment-notice"
        role="note"
      >
        <strong>Demo payment</strong>

        <p>
          This checkout simulates a successful
          payment for project demonstration. It
          does not charge a card or process a real
          transaction.
        </p>
      </div>

      <div className="payment-layout">
        <section className="card payment-card">
          <h2>Order confirmation</h2>

          {items.length === 0 ? (
            <div className="payment-empty">
              <p>Your cart is empty.</p>

              <button
                type="button"
                className="primary-btn"
                onClick={() =>
                  navigate('/shop')
                }
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <>
              <p>
                You're about to complete a demo
                purchase for the following{' '}
                {items.length === 1
                  ? 'item'
                  : 'items'}
                :
              </p>

              <ul className="payment-item-list">
                {items.map((item) => (
                  <li key={item.id}>
                    <span>
                      {item.title ||
                        item.name}{' '}
                      × {item.quantity}
                    </span>

                    <strong>
                      {formatPrice(
                        item.price *
                          item.quantity,
                        item.currency ||
                          currency,
                      )}
                    </strong>
                  </li>
                ))}
              </ul>

              <p>
                No real card details are required
                for this demonstration.
              </p>
            </>
          )}
        </section>

        <aside className="card payment-summary">
          <h2>Order summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>

            <strong>
              {formatPrice(
                subtotal,
                currency,
              )}
            </strong>
          </div>

          <div className="summary-row">
            <span>Delivery</span>

            <strong>
              {formatPrice(0, currency)}
            </strong>
          </div>

          <div className="summary-row total">
            <span>Total</span>

            <strong>
              {formatPrice(
                subtotal,
                currency,
              )}
            </strong>
          </div>

          {error && (
            <p
              className="account-error"
              role="alert"
            >
              {error}
            </p>
          )}

          {items.length > 0 && (
            <form onSubmit={handleSubmit}>
              <button
                type="submit"
                className="primary-btn large-btn full-width"
                disabled={isProcessing}
              >
                {isProcessing
                  ? 'Completing order...'
                  : 'Confirm demo payment'}
              </button>
            </form>
          )}
        </aside>
      </div>
    </div>
  );
}