import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import {
  CheckCircle,
  Copy,
  Package,
  ArrowRight,
  Truck,
  ShieldCheck,
} from 'lucide-react';

import './OrderSuccess.css';

export default function OrderSuccessPage() {
  const { orderId } = useParams();

  const [copied, setCopied] =
    useState(false);

  const handleCopyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(
        orderId,
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(
        'Failed to copy order ID:',
        error,
      );
    }
  };

  return (
    <main className="order-success-page">
      <section className="order-success-container">

        {/* Success message */}

        <div className="success-hero">
          <div className="success-icon-wrapper">
            <CheckCircle
              className="success-icon"
              size={64}
              strokeWidth={1.8}
            />
          </div>

          <h1>
            You're all set! 🎉
          </h1>

          <p>
            Your E-Sharp demo order has been
            successfully placed and is now being
            processed.
          </p>
        </div>


        {/* Order ID */}

        <div className="order-reference-card">
          <div className="order-reference-icon">
            <Package
              size={28}
              strokeWidth={1.8}
            />
          </div>

          <div className="order-reference-content">
            <span>Order ID</span>

            <strong>
              {orderId}
            </strong>
          </div>

          <button
            type="button"
            className="copy-order-btn"
            onClick={handleCopyOrderId}
          >
            <Copy size={18} />

            {copied
              ? 'Copied!'
              : 'Copy'}
          </button>
        </div>


        {/* Reassurance */}

        <div className="order-reassurance">
          <ShieldCheck size={20} />

          <p>
            Keep your order ID handy. You'll
            need it when checking your order
            status.
          </p>
        </div>


        {/* What's next */}

        <section className="next-steps-card">
          <div className="next-steps-heading">
            <h2>
              What's next?
            </h2>

            <p>
              Here's what happens after your
              order is placed.
            </p>
          </div>

          <div className="next-steps">

            <div className="next-step">
              <div className="step-icon completed">
                <CheckCircle size={25} />
              </div>

              <div className="step-content">
                <h3>
                  Order confirmed
                </h3>

                <p>
                  Your demo order has been
                  successfully placed.
                </p>
              </div>
            </div>


            <ArrowRight
              className="step-arrow"
              size={25}
            />


            <div className="next-step">
              <div className="step-icon completed">
                <CheckCircle size={25} />
              </div>

              <div className="step-content">
                <h3>
                  Order being processed
                </h3>

                <p>
                  Your order is being prepared
                  for delivery.
                </p>
              </div>
            </div>


            <ArrowRight
              className="step-arrow"
              size={25}
            />


            <div className="next-step">
              <div className="step-icon upcoming">
                <Truck size={25} />
              </div>

              <div className="step-content">
                <h3>
                  Track your delivery
                </h3>

                <p>
                  You can use your order ID to
                  check your order status.
                </p>
              </div>
            </div>

          </div>
        </section>


        {/* Actions */}

        <div className="order-success-actions">
          <Link
            to="/track-order"
            className="primary-btn success-primary-btn"
          >
            <Truck size={19} />

            Track my order

            <ArrowRight size={19} />
          </Link>

          <Link
            to="/shop"
            className="secondary-btn success-secondary-btn"
          >
            <Package size={19} />

            Continue shopping
          </Link>
        </div>


        {/* Final reassurance */}

        <div className="success-footer-message">
          <span>♡</span>

          <div>
            <strong>
              Thanks for choosing E-Sharp!
            </strong>

            <p>
              We're excited to get your order
              to you.
            </p>
          </div>
        </div>

      </section>
    </main>
  );
}