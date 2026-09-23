import { STATUS_CLASS } from "../../lib/api";
import "./StatusBadge.css";

/** Atom. A small colored pill for a property's status. */
export function StatusBadge({ status, size = "md" }) {
  return (
    <span className={`status-badge status-badge--${size} ${STATUS_CLASS[status] || ""}`}>
      {status}
    </span>
  );
}
