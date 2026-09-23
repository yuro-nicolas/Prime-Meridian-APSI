import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../lib/api";
import "./Contact.css";

export function Contact() {
  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get("property");

  const [property, setProperty] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null); // { ok: true } | { ok: false, message }

  // Look up the property being asked about, purely to personalize the
  // copy — a failed lookup shouldn't block sending a general message.
  useEffect(() => {
    if (!propertyId) {
      setProperty(null);
      return;
    }
    let cancelled = false;
    api.getProperty(propertyId).then(
      (p) => { if (!cancelled) setProperty(p); },
      () => { if (!cancelled) setProperty(null); }
    );
    return () => { cancelled = true; };
  }, [propertyId]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setResult(null);
    try {
      await api.createInquiry({
        propertyId: propertyId ? Number(propertyId) : null,
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      setResult({ ok: true, name: name.trim() });
      setName(""); setEmail(""); setMessage("");
    } catch (err) {
      setResult({ ok: false, message: err.message });
    } finally {
      setSending(false);
    }
  }

  const lede = property
    ? `Send a note about ${property.address}, ${property.city}, or ask anything else.`
    : "Send a note about a listing, a dispute, or a general question.";
  const placeholder = property
    ? `I'd like to know more about ${property.address}...`
    : "How can we help?";

  return (
    <section className="section">
      <div className="shell contact-grid">
        <div>
          <h2>Contact Prime Meridian</h2>
          <p className="contact-lede">{lede}</p>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-field">
              <label htmlFor="cf-name">Name</label>
              <input id="cf-name" type="text" required placeholder="Your full name"
                value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-field">
              <label htmlFor="cf-email">Email</label>
              <input id="cf-email" type="email" required placeholder="you@example.com"
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-field">
              <label htmlFor="cf-message">Message</label>
              <textarea id="cf-message" required placeholder={placeholder}
                value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
            <button type="submit" className="btn btn--primary" disabled={sending}>
              {sending ? "Sending…" : "Send message"}
            </button>
          </form>

          {result?.ok && (
            <div className="confirm">
              <strong>Message sent.</strong> Thanks, {result.name || "there"} — Marcus typically
              responds within one business day.
            </div>
          )}
          {result && !result.ok && (
            <div className="confirm confirm--error">
              <strong>Couldn't send that.</strong> {result.message}
            </div>
          )}
        </div>

        <div className="contact-photo">
          <div className="contact-photo__scrim" />
          <div className="contact-photo__content">
            <a href="tel:+14155550148" className="contact-photo__phone">(415) 555-0148</a>
            <p><strong>Response time.</strong> Jonh Doe typically replies within one business day.</p>
            <p>
              <strong>Dispute matters.</strong> If you're contacting us about an active dispute,
              include any case or reference number you already have so it can be routed correctly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
