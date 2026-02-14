import Link from "next/link";

export default function HomePage() {
  return (
    <main className="shell">
      <h1>Dynasty Radar</h1>
      <p className="muted">Frontend scaffold wired to FastAPI backend.</p>
      <div className="card-grid">
        <Link className="card" href="/valuations">
          <h2>Valuations</h2>
          <p>Test POST /v1/valuations</p>
        </Link>
        <Link className="card" href="/lineup">
          <h2>Lineup</h2>
          <p>Test POST /v1/lineup/recommend</p>
        </Link>
        <Link className="card" href="/workspace">
          <h2>League Workspace</h2>
          <p>Load Sleeper league ID and run all features.</p>
        </Link>
      </div>
    </main>
  );
}
