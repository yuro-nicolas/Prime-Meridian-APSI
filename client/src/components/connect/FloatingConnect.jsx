import { useState } from "react";
import { ConnectModal } from "./ConnectModal";
import { useNearFooter } from "../../hooks/useNearFooter";
import "./FloatingConnect.css";

/**
 * Organism. Fixed bottom-right button that opens a lightweight
 * lead-capture modal — separate from the full /contact page, meant
 * for the "I'm scrolling and have a quick question" moment. Fades
 * out whenever the footer is in view, so it never sits on top of it.
 */
export function FloatingConnect() {
  const [open, setOpen] = useState(false);
  const nearFooter = useNearFooter();

  return (
    <>
      <button
        className={`floating-connect ${nearFooter ? "is-hidden" : ""}`}
        onClick={() => setOpen(true)}
      >
        <span className="floating-connect__dot" aria-hidden="true" />
        Let's Connect
      </button>
      {open && <ConnectModal onClose={() => setOpen(false)} />}
    </>
  );
}
