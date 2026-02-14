"use client";

import { useMemo, useState } from "react";

const defaultApiBase = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000";

export default function ApiTester({ endpoint, title, description, defaultPayload }) {
  const [apiBase, setApiBase] = useState(defaultApiBase);
  const [payloadText, setPayloadText] = useState(
    JSON.stringify(defaultPayload, null, 2)
  );
  const [status, setStatus] = useState("");
  const [responseText, setResponseText] = useState("");
  const [busy, setBusy] = useState(false);

  const fullUrl = useMemo(() => `${apiBase}${endpoint}`, [apiBase, endpoint]);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setStatus("");
    setResponseText("");

    let parsed;
    try {
      parsed = JSON.parse(payloadText);
    } catch (err) {
      setStatus(`Invalid JSON payload: ${err.message}`);
      setBusy(false);
      return;
    }

    try {
      const res = await fetch(fullUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      const text = await res.text();
      setStatus(`${res.status} ${res.statusText}`);
      try {
        const maybeJson = JSON.parse(text);
        setResponseText(JSON.stringify(maybeJson, null, 2));
      } catch {
        setResponseText(text);
      }
    } catch (err) {
      setStatus(`Request failed: ${err.message}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="shell">
      <h1>{title}</h1>
      <p className="muted">{description}</p>

      <form onSubmit={onSubmit} className="stack">
        <label className="label">
          API Base URL
          <input
            className="input"
            value={apiBase}
            onChange={(e) => setApiBase(e.target.value)}
            placeholder="http://127.0.0.1:8000"
          />
        </label>

        <label className="label">
          Request JSON
          <textarea
            className="textarea"
            rows={20}
            value={payloadText}
            onChange={(e) => setPayloadText(e.target.value)}
          />
        </label>

        <button className="button" disabled={busy} type="submit">
          {busy ? "Sending..." : `POST ${endpoint}`}
        </button>
      </form>

      <section className="stack">
        <h2>Status</h2>
        <pre className="pre">{status || "(no request yet)"}</pre>
        <h2>Response</h2>
        <pre className="pre">{responseText || "(no response yet)"}</pre>
      </section>
    </main>
  );
}
