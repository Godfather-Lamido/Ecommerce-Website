// import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../data/products";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../context/CheckoutContext"; 
import "./Checkout.css";


export default function CheckoutPage() {
  const { subtotal, items } = useCart();
  const { setCustomer } = useCheckout();

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
  fullName  : "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  });
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    const savedCustomer = localStorage.getItem("customer");

    if (savedCustomer) {
      setUserInfo(JSON.parse(savedCustomer))
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    localStorage.setItem("customer", JSON.stringify(userInfo));
  }, [userInfo, isLoaded]);

  const [ touched, setTouched ] = useState({});


  function handleChange(event) {
    const { name, value } = event.target;

    setUserInfo((previous) => ({
      ...previous,
      [name]: value,
    }));

    setTouched((previous) => ({
      ...previous,
      [name]: true,
    }));
  }

  const isFieldEmpty = (field) => userInfo[field].trim() === "";

    const isFormComplete = Object.values(userInfo).every(
    (value) => value.trim() !== ""
  );

const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email);

const isPhoneValid = /^(?:\+234|0)[789]\d{9}$/.test(
  userInfo.phone.replace(/\s/g, "")
);

const isFormValid =
  isFormComplete &&
  isEmailValid &&
  isPhoneValid;

  function handleSubmit(event) {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    setCustomer(userInfo);
    navigate("/payment");
  }

  return (
    <div className="checkout-page">
      <header className="page-header">
        <h1>Checkout</h1>
        <p>Review your order and complete payment.</p>
      </header>

      <div className="checkout-layout"> 
        <section className="checkout-card card">
          <h2>Delivery details</h2>
          <form 
            id="checkout-form"
            className="checkout-form"
            onSubmit={handleSubmit}
            >
            <div className="form-grid">
              <label>
                Full name
                <input 
                  type="text" 
                  name="fullName"
                  value={userInfo.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                  className={
                    touched.fullName && isFieldEmpty("fullName")
                    ? "input-error"
                    : ""
                  }
                  />
                  {touched.fullName && isFieldEmpty("fullName") && (
                    <small className="field-error">
                      Please enter your full name.
                    </small>
                  )}
              </label>

              {/* Phone */}
              <label>
                Phone number
                <input 
                  type="tel" 
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  className={
                    touched.phone &&
                    (!userInfo.phone.trim() || !isPhoneValid)
                    ? "input-error"
                    : ""
                  }
                  />
                    {touched.phone && !userInfo.phone.trim() && (
                      <small className="field-error">
                        Please enter your phone number.
                      </small>
                    )}
                    {touched.phone &&
                      userInfo.phone.trim() &&
                      !isPhoneValid && (
                      <small className="field-error">
                        Please enter a valid Nigerian phone number.
                      </small>
                    )}
              </label>

              {/* Email */}
              <label>
                Email
                <input 
                  type="email"  
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className={
                    touched.email &&
                    (!userInfo.email.trim() || !isEmailValid)
                    ? "input-error"
                    : ""
                  }
                />
                {touched.email && !userInfo.email.trim() && (
                  <small className="field-error">
                    Please enter your email address.
                  </small>
                )}
               {touched.email &&
                userInfo.email.trim() &&
                !isEmailValid && (
                <small className="field-error">
                  Please enter a valid email address.
                </small>
              )}
              </label>

              {/* Address */}
              <label className="full-width">
                Address
                <input 
                  type="text"  
                  name="address"
                  value={userInfo.address}
                  onChange={handleChange}
                  autoComplete="street-address"
                  className={
                    touched.address && isFieldEmpty("address")
                    ? "input-error"
                    : ""
                  }
                />
                {touched.address && isFieldEmpty("address") && (
                  <small className="field-error">
                    Please enter your address.
                  </small>
                )}
              </label>

              {/* City */}
              <label>
                City
                <input 
                  type="text"  
                  name="city"
                  value={userInfo.city}
                  onChange={handleChange}
                  autoComplete="address-level2"   
                  className={
                    touched.city && isFieldEmpty("city")
                    ? "input-error"
                    : ""
                  }  
                />
                {touched.city && isFieldEmpty("city") && (
                  <small className="field-error">
                    Please enter your city.
                  </small>
                )}
              </label>

              {/* State */}
              <label>
                State
                <input 
                  type="text"  
                  name="state"
                  value={userInfo.state}
                  onChange={handleChange}
                  autoComplete="address-level1"
                  className={
                    touched.state && isFieldEmpty("state")
                    ? "input-error"
                    : ""
                  }
                />
                {touched.state && isFieldEmpty("state") && (
                  <small className="field-error">
                    Please enter your state.
                  </small>
                )}
              </label>
            </div>
          </form>
        </section>

        <aside className="checkout-summary card">
          <h2>Order summary</h2>
          {items.map((item) => (
            <div className="mini-order-row" key={item.id}>
              <span>
                {item.name} x {item.quantity}
              </span>
              <strong>
                {formatPrice(item.price * item.quantity, item.currency)}
              </strong>
            </div>
          ))}
          <div className="summary-row total">
            <span>Total</span>
            <strong>{formatPrice(subtotal, items[0]?.currency)}</strong>
          </div>

          {/* <Link
            to="/payment"
            className="primary-btn large-btn full-width"
            style={{ cursor: "not-allowed" }}
          >
            Continue to payment
          </Link> */}

          <button
            type="submit"
            form="checkout-form"
            className="primary-btn large-btn full-width"
            disabled={!isFormValid}
          >
            Continue to payment
          </button>

        </aside>
      </div>
    </div>
  );
}
