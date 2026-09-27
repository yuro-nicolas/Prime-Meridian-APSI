import { useEffect, useRef, useState } from "react";
import { api } from "../lib/api";


export function useProperties(query = {}, { pollMs } = {}) {
  const [properties, setProperties] = useState([]);
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "error"
  const [error, setError] = useState(null);
  const propertiesRef = useRef(properties);
  propertiesRef.current = properties;

  const queryKey = JSON.stringify(query);

  useEffect(() => {
    let cancelled = false;

    function loadInitial() {
      setStatus("loading");
      return api
        .listProperties(query)
        .then((data) => {
          if (cancelled) return;
          setProperties(data);
          setStatus("ready");
        })
        .catch((err) => {
          if (cancelled) return;
          setError(err);
          setStatus("error");
        });
    }

    function pollSilently() {
      api
        .listProperties(query)
        .then((data) => {
          if (cancelled) return;
          // Only touch state if something actually changed, so a page
          // that hasn't changed re-renders zero times from a poll.
          const changed = JSON.stringify(data) !== JSON.stringify(propertiesRef.current);
          if (changed) setProperties(data);
        })
        .catch(() => {
          // Silently ignore errors on background polls — the page
        });
    }

    loadInitial();

    let intervalId;
    if (pollMs) {
      intervalId = setInterval(pollSilently, pollMs);
    }

    return () => {
      cancelled = true;
      if (intervalId) clearInterval(intervalId);
    };

  }, [queryKey, pollMs]);

  return { properties, status, error };
}
