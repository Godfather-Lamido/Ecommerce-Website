import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../data/products";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../context/CheckoutContext";
import { isValidEmail } from "../../utils/validation";
import "./Checkout.css";


export default function CheckoutPage() {
  const { subtotal, items } = useCart();
  const { setCustomer } = useCheckout();

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
  });

  const [isLoaded, setIsLoaded] = useState(false);

  const [touched, setTouched] = useState({});

  const [submitted, setSubmitted] = useState(false);


  useEffect(() => {
    const savedCustomer = localStorage.getItem("customer");

    if (savedCustomer) {
      setUserInfo(JSON.parse(savedCustomer));
    }

    setIsLoaded(true);
  }, []);


  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    localStorage.setItem(
      "customer",
      JSON.stringify(userInfo)
    );
  }, [userInfo, isLoaded]);


  function handleChange(event) {
    const { name, value } = event.target;

    setUserInfo((previous) => ({
      ...previous,
      [name]: value,
    }));
  }


  function handleBlur(event) {
    const { name } = event.target;

    setTouched((previous) => ({
      ...previous,
      [name]: true,
    }));
  }


  const isFieldEmpty = (field) =>
    userInfo[field].trim() === "";


  const isEmailValid =
    isValidEmail(userInfo.email);


  const isPhoneValid =
    /^(?:\+234|0)[789]\d{9}$/.test(
      userInfo.phone.replace(/\s/g, "")
    );


  const isFormValid =
    Object.values(userInfo).every(
      (value) => value.trim() !== ""
    ) &&
    isEmailValid &&
    isPhoneValid;


  const showError = (field) =>
    submitted || touched[field];


  function handleSubmit(event) {
    event.preventDefault();

    setSubmitted(true);

    setTouched({
      fullName: true,
      phone: true,
      email: true,
      address: true,
      city: true,
      state: true,
    });


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

        <p>
          Review your order and complete payment.
        </p>
      </header>


      <div className="checkout-layout">

        <section className="checkout-card card">

          <h2>Delivery details</h2>


          <form
            id="checkout-form"
            className="checkout-form"
            onSubmit={handleSubmit}
            noValidate
          >

            <div className="form-grid">

              {/* Full name */}

              <label>

                Full name

                <input
                  type="text"
                  name="fullName"
                  value={userInfo.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="name"
                  className={
                    showError("fullName") &&
                    isFieldEmpty("fullName")
                      ? "input-error"
                      : ""
                  }
                />

                {showError("fullName") &&
                  isFieldEmpty("fullName") && (
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
                  onBlur={handleBlur}
                  autoComplete="tel"
                  className={
                    showError("phone") &&
                    (
                      !userInfo.phone.trim() ||
                      !isPhoneValid
                    )
                      ? "input-error"
                      : ""
                  }
                />

                {showError("phone") &&
                  !userInfo.phone.trim() && (
                    <small className="field-error">
                      Please enter your phone number.
                    </small>
                  )}

                {showError("phone") &&
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
                  onBlur={handleBlur}
                  autoComplete="email"
                  className={
                    showError("email") &&
                    (
                      !userInfo.email.trim() ||
                      !isEmailValid
                    )
                      ? "input-error"
                      : ""
                  }
                />

                {showError("email") &&
                  !userInfo.email.trim() && (
                    <small className="field-error">
                      Please enter your email address.
                    </small>
                  )}

                {showError("email") &&
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
                  onBlur={handleBlur}
                  autoComplete="street-address"
                  className={
                    showError("address") &&
                    isFieldEmpty("address")
                      ? "input-error"
                      : ""
                  }
                />

                {showError("address") &&
                  isFieldEmpty("address") && (
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
                  onBlur={handleBlur}
                  autoComplete="address-level2"
                  className={
                    showError("city") &&
                    isFieldEmpty("city")
                      ? "input-error"
                      : ""
                  }
                />

                {showError("city") &&
                  isFieldEmpty("city") && (
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
                  onBlur={handleBlur}
                  autoComplete="address-level1"
                  className={
                    showError("state") &&
                    isFieldEmpty("state")
                      ? "input-error"
                      : ""
                  }
                />

                {showError("state") &&
                  isFieldEmpty("state") && (
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
            <div
              className="mini-order-row"
              key={item.id}
            >

              <span>
                {item.name} x {item.quantity}
              </span>

              <strong>
                {formatPrice(
                  item.price * item.quantity,
                  item.currency
                )}
              </strong>

            </div>
          ))}


          <div className="summary-row total">

            <span>Total</span>

            <strong>
              {formatPrice(
                subtotal,
                items[0]?.currency
              )}
            </strong>

          </div>


          <button
            type="submit"
            form="checkout-form"
            className="primary-btn large-btn full-width"
          >
            Continue to payment
          </button>

        </aside>

      </div>

    </div>
  );
}