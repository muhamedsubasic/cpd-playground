import { useEffect, useState } from "react";

export function useFetch(url) {
  const [result, setResult] = useState({
    url: null,
    data: null,
    error: null,
  });

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`Request failed: HTTP ${res.status}`);
        }

        const json = await res.json();

        if (!ignore) {
          setResult({
            url,
            data: json,
            error: null,
          });
        }
      } catch (err) {
        if (!ignore) {
          setResult({
            url,
            data: null,
            error: err.message || "Failed to load data.",
          });
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [url]);

  const loading = result.url !== url;

  return {
    data: loading ? null : result.data,
    error: loading ? null : result.error,
    loading,
  };
}
