import { useEffect, useRef, useState } from "react";
import { api } from "../../lib/api";
import "./ConnectModal.css";

const INTERESTS = ["Selling & Buying", "Selling", "Buying", "Renting", "Other"];

/**
 * Molecule. The "Leave a Message" popup — opened either by
 * FloatingConnect (general inquiry, no property context) or by
 * "Contact about this property" inside ListingDetailBody, via
 * `propertyContext` ({ id, label }). Same backend (POST /inquiries)
 * either way. `size="compact"` renders a smaller card, used for the
 * property-specific case since it sits on top of the listing modal.
 */
export function ConnectModal({ onClose, propertyContext = null, size = "default" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interestedIn, setInterestedIn] = useState(INTERESTS[0]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const firstFieldRef = useRef(null);

  // Close on Escape, and put focus on the first field on open.
  useEffect(() => {
    firstFieldRef.current?.focus();
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      await api.createInquiry({
        propertyId: propertyContext?.id ?? null,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        interestedIn,
        message: message.trim(),
      });
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="connect-modal__overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={`connect-modal ${size === "compact" ? "connect-modal--compact" : ""}`} role="dialog" aria-modal="true" aria-labelledby="connect-modal-title">
        <button className="connect-modal__close" onClick={onClose} aria-label="Close">&times;</button>

        {sent ? (
          <div className="connect-modal__done">
            <h3>Thank you for your message.</h3>
            <p>We'll be in touch with you shortly.</p>
            <button className="btn btn--ghost" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <h3 id="connect-modal-title">Leave a Message</h3>
            {propertyContext && (
              <p className="connect-modal__context">Re: {propertyContext.label}</p>
            )}
            <form onSubmit={handleSubmit} className="connect-modal__form">
              <div className="form-field">
                <label htmlFor="cm-name">Name</label>
                <input id="cm-name" ref={firstFieldRef} required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-field">
                <label htmlFor="cm-email">Email</label>
                <input id="cm-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-field">
                <label htmlFor="cm-phone">Phone</label>
                <input id="cm-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              {!propertyContext && (
                <div className="form-field">
                  <label htmlFor="cm-interest">Interested in...</label>
                  <select id="cm-interest" value={interestedIn} onChange={(e) => setInterestedIn(e.target.value)}>
                    {INTERESTS.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              )}
              <div className="form-field">
                <label htmlFor="cm-message">Message</label>
                <textarea id="cm-message" required rows={size === "compact" ? 4 : 6} value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>
              {error && <div className="empty empty--error">{error}</div>}
              <button type="submit" className="btn btn--primary" disabled={sending}>
                {sending ? "Sending…" : "Submit"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
