import { useCallback, useEffect, useState } from "react";
import { api } from "../../lib/api";
import "./AdminMessages.css";

export function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("loading");
  const [tab, setTab] = useState("unread"); // "unread" | "read"
  const [openMessage, setOpenMessage] = useState(null);

  const refresh = useCallback(async () => {
    setStatus("loading");
    try {
      const list = await api.listInquiries();
      setMessages(list);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  async function handleToggleRead(id, isRead) {
    try {
      await api.markInquiryRead(id, !isRead);
      await refresh();
      setOpenMessage((m) => (m && m.id === id ? { ...m, is_read: !isRead } : m));
    } catch (err) {
      window.alert("Couldn't update: " + err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this message? This can't be undone.")) return;
    try {
      await api.deleteInquiry(id);
      setOpenMessage((m) => (m && m.id === id ? null : m));
      await refresh();
    } catch (err) {
      window.alert("Couldn't delete: " + err.message);
    }
  }

  // Deletes only the messages in the tab being viewed (all read, or
  // all unread), so clearing one tab never touches the other.
  async function handleDeleteAll() {
    const label = tab === "unread" ? "unread" : "read";
    if (!window.confirm(`Delete all ${shown.length} ${label} messages? This can't be undone.`)) return;
    try {
      await api.deleteAllInquiries(tab);
      setOpenMessage(null);
      await refresh();
    } catch (err) {
      window.alert("Couldn't delete all: " + err.message);
    }
  }

  const unread = messages.filter((m) => !m.is_read);
  const read = messages.filter((m) => m.is_read);
  const shown = tab === "unread" ? unread : read;

  return (
    <div className="shell">
      <div className="admin-page__head">
        <div className="section__head" style={{ marginBottom: 0 }}>
          <h2>Messages</h2>
          <p>Everything submitted through the Contact page and the "Let's Connect" popup lands here.</p>
        </div>
        {messages.length > 0 && (
          <button className="btn btn--ghost admin-card__delete" onClick={handleDeleteAll}>
            Delete all
          </button>
        )}
      </div>

      <div className="admin-subtabs">
        <button className={`admin-subtab ${tab === "unread" ? "is-active" : ""}`} onClick={() => setTab("unread")}>
          Unread ({unread.length})
        </button>
        <button className={`admin-subtab ${tab === "read" ? "is-active" : ""}`} onClick={() => setTab("read")}>
          Read ({read.length})
        </button>
      </div>

      {status === "loading" && <div className="empty">Loading messages…</div>}
      {status === "error" && <div className="empty empty--error">Couldn't load messages</div>}
      {status === "ready" && shown.length === 0 && (
        <div className="empty">{tab === "unread" ? "No unread messages." : "No read messages yet."}</div>
      )}
      {status === "ready" && shown.length > 0 && (
        <div className="inbox">
          {shown.map((m) => (
            <div className="inbox-item" key={m.id}>
              <button className="inbox-item__open" onClick={() => setOpenMessage(m)}>
                <div className="inbox-item__top">
                  <span className="inbox-item__name">{m.name}</span>
                  <span className="inbox-item__date">{new Date(m.created_at).toLocaleDateString()}</span>
                </div>
                <p className="inbox-item__preview">{m.message}</p>
              </button>
              <div className="inbox-item__actions">
                <button className="btn btn--ghost btn--sm" onClick={() => handleToggleRead(m.id, m.is_read)}>
                  {m.is_read ? "Mark unread" : "Mark read"}
                </button>
                <button className="btn btn--ghost btn--sm admin-card__delete" onClick={() => handleDelete(m.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {openMessage && (
        <div className="message-modal__overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpenMessage(null); }}>
          <div className="message-modal" role="dialog" aria-modal="true">
            <button className="message-modal__close" onClick={() => setOpenMessage(null)} aria-label="Close">&times;</button>

            <div className="message-modal__top">
              <h3>{openMessage.name}</h3>
              <span className="inbox-item__date">{new Date(openMessage.created_at).toLocaleString()}</span>
            </div>

            <div className="message-modal__meta">
              <a href={`mailto:${openMessage.email}`}>{openMessage.email}</a>
              {openMessage.phone && <span> · {openMessage.phone}</span>}
              {openMessage.interested_in && <span> · Interested in: {openMessage.interested_in}</span>}
              {openMessage.address && <span> · Re: {openMessage.address}{openMessage.city ? `, ${openMessage.city}` : ""}</span>}
            </div>

            <p className="message-modal__body">{openMessage.message}</p>

            <div className="message-modal__actions">
              <button className="btn btn--ghost btn--sm" onClick={() => handleToggleRead(openMessage.id, openMessage.is_read)}>
                {openMessage.is_read ? "Mark unread" : "Mark read"}
              </button>
              <button className="btn btn--ghost btn--sm admin-card__delete" onClick={() => handleDelete(openMessage.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
