import { useEffect, useState } from "react";
import { api } from "../lib/api";

/**
 * Fetches one property by id. `id` may be undefined (e.g. no
 * ?id= in the URL) — the hook just stays in "empty" status.
 */
export function useProperty(id) {
  const [property, setProperty] = useState(null);
  const [status, setStatus] = useState(id ? "loading" : "empty"); // "empty" | "loading" | "ready" | "error"
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setStatus("empty");
      return;
    }
    let cancelled = false;
    setStatus("loading");

    api
      .getProperty(id)
      .then((data) => {
        if (cancelled) return;
        setProperty(data);
        setStatus("ready");
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err);
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { property, status, error };
}
