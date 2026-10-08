import { useRef, useState } from 'react';
import { Clock3, Mail, MessageCircle, PackageSearch } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Contact.css';

const initialForm = {
  name: '',
  email: '',
  topic: '',
  orderNumber: '',
  message: '',
};

function validateForm(form) {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = 'Please enter your name (at least 2 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Enter a valid email address so we can reply.';
  }
  if (!form.topic) errors.topic = 'Choose a topic for your message.';
  if (form.message.trim().length < 20) {
    errors.message = 'Please add a little more detail (at least 20 characters).';
  }
  return errors;
}

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [emailDraft, setEmailDraft] = useState('');
  const formRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setEmailDraft('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm(form);
    setErrors(validationErrors);
    setEmailDraft('');

    if (Object.keys(validationErrors).length > 0) {
      formRef.current?.querySelector(`[name="${Object.keys(validationErrors)[0]}"]`)?.focus();
      return;
    }

    const subject = `[E-Sharp ${form.topic}] ${form.name.trim()}`;
    const body = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Topic: ${form.topic}`,
      form.orderNumber.trim() ? `Order number: ${form.orderNumber.trim()}` : '',
      '',
      form.message.trim(),
    ].filter((line, index, lines) => line || lines[index - 1]).join('\n');

    setEmailDraft(
      `mailto:hello@esharp.store?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setEmailDraft('');
  };

  return (
    <div className="contact-page">
      <header className="contact-hero">
        <span className="about-eyebrow">We’re here to help</span>
        <h1>Let’s get you the right answer.</h1>
        <p>
          Have a question about a product, need help finding something, or want to share feedback?
          Send us a note and we’ll help point you in the right direction.
        </p>
      </header>

      <div className="contact-layout">
        <section className="contact-form-card card" aria-labelledby="contact-form-title">
          <div className="contact-form-heading">
            <span className="contact-heading-icon"><MessageCircle size={20} /></span>
            <div>
              <h2 id="contact-form-title">Send us a message</h2>
              <p>Fields marked with * are required.</p>
            </div>
          </div>

          <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-fields">
              <label className="contact-field">
                <span>Your name <b>*</b></span>
                <input
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  required
                />
                {errors.name && <small id="contact-name-error" className="field-error">{errors.name}</small>}
              </label>

              <label className="contact-field">
                <span>Email address <b>*</b></span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  required
                />
                {errors.email && <small id="contact-email-error" className="field-error">{errors.email}</small>}
              </label>

              <label className="contact-field">
                <span>What can we help with? <b>*</b></span>
                <select
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.topic)}
                  aria-describedby={errors.topic ? 'contact-topic-error' : undefined}
                  required
                >
                  <option value="">Select a topic</option>
                  <option value="Product question">Product question</option>
                  <option value="Order support">Order support</option>
                  <option value="Website feedback">Website feedback</option>
                  <option value="Other">Something else</option>
                </select>
                {errors.topic && <small id="contact-topic-error" className="field-error">{errors.topic}</small>}
              </label>

              <label className="contact-field">
                <span>Order number <small>(optional)</small></span>
                <input
                  name="orderNumber"
                  value={form.orderNumber}
                  onChange={handleChange}
                  placeholder="For example, ES-1024"
                />
              </label>

              <label className="contact-field contact-field-wide">
                <span>Your message <b>*</b></span>
                <textarea
                  name="message"
                  rows="6"
                  maxLength="2000"
                  value={form.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : 'contact-message-count'}
                  placeholder="Tell us a little more about what you need…"
                  required
                />
                <span className="contact-message-meta">
                  {errors.message ? (
                    <small id="contact-message-error" className="field-error">{errors.message}</small>
                  ) : (
                    <small id="contact-message-count">{form.message.length}/2000 characters</small>
                  )}
                </span>
              </label>
            </div>

            <div className="contact-form-actions">
              <button type="submit" className="primary-btn">Prepare message</button>
              <button type="button" className="contact-reset" onClick={handleReset}>Clear form</button>
            </div>

            {emailDraft && (
              <div className="contact-success" role="status" aria-live="polite">
                <strong>Your message is ready.</strong>
                <span>Open your email app to review and send it to our support inbox.</span>
                <a href={emailDraft}>Open email draft</a>
              </div>
            )}
          </form>
        </section>

        <aside className="contact-sidebar">
          <section className="contact-info-card card">
            <span className="contact-heading-icon"><Mail size={20} /></span>
            <h2>Email support</h2>
            <p>For product questions, support requests, or feedback, reach us by email.</p>
            <a href="mailto:hello@esharp.store">hello@esharp.store</a>
          </section>

          <section className="contact-info-card card">
            <span className="contact-heading-icon"><Clock3 size={20} /></span>
            <h2>What to include</h2>
            <p>A few details help us understand your request and give you a useful response.</p>
            <ul>
              <li>The product name, if your question is product-related</li>
              <li>Your order number, if you have one</li>
              <li>A clear description of the issue or question</li>
            </ul>
          </section>

          <section className="contact-info-card contact-help-card card">
            <PackageSearch size={21} />
            <div>
              <h2>Looking for something?</h2>
              <p>Browse the catalog or use search to find products and categories.</p>
              <div className="contact-help-links">
                <Link to="/shop">Browse shop</Link>
                <Link to="/search">Search products</Link>
              </div>
            </div>
          </section>
        </aside>
      </div>
      <p className="contact-demo-note">
        E-Sharp is an evolving storefront. The form prepares an email draft in your email app;
        it does not send or store your message on this site.
      </p>
    </div>
  );
}
