"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const DEFAULT_API = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000";
const LS_KEY = "dynasty_radar_league_players";
const LS_KEY_ID = "dynasty_radar_league_id";
const LS_KEY_HUB = "dynasty_radar_league_hub";
const LS_KEY_USERNAME = "dynasty_radar_sleeper_username";
const LS_KEY_LEAGUES = "dynasty_radar_sleeper_leagues";
const TABS = ["overview", "league", "valuations", "lineup", "trade", "fa", "model"];
let sleeperPlayerIndexPromise = null;

async function postJson(url, payload) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  let body = null;
  try {
    body = JSON.parse(text);
  } catch {
    body = text;
  }
  if (!res.ok) {
    throw new Error(typeof body === "string" ? body : JSON.stringify(body));
  }
  return body;
}

async function getJson(url) {
  const res = await fetch(url);
  const text = await res.text();
  let body = null;
  try {
    body = JSON.parse(text);
  } catch {
    body = text;
  }
  if (!res.ok) {
    throw new Error(typeof body === "string" ? body : JSON.stringify(body));
  }
  return body;
}

function StatCard({ label, value }) {
  return (
    <div className="stat-card">
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
    </div>
  );
}

function avatarUrl(avatar) {
  return avatar ? `https://sleepercdn.com/avatars/thumbs/${avatar}` : "";
}

function playerImageUrl(player) {
  const id = player?.player_id || player?.sleeper_id || player?.image_id || player?.id;
  return id ? `https://sleepercdn.com/content/nfl/players/${id}.jpg` : "";
}

function PlayerImage({ player, className = "" }) {
  const src = playerImageUrl(player);
  if (!src) {
    return <div className={`player-image-fallback ${className}`} aria-hidden="true" />;
  }
  return (
    <img
      className={className}
      src={src}
      alt=""
      onError={(event) => {
        event.currentTarget.style.visibility = "hidden";
      }}
    />
  );
}

function recordFromRoster(roster) {
  const wins = roster?.settings?.wins ?? 0;
  const losses = roster?.settings?.losses ?? 0;
  const ties = roster?.settings?.ties ?? 0;
  return ties ? `${wins}-${losses}-${ties}` : `${wins}-${losses}`;
}

function rosterPoints(roster, key, decimalKey) {
  return Number(`${roster?.settings?.[key] || 0}.${roster?.settings?.[decimalKey] || 0}`);
}

function lineupConfigFromRosterPositions(rosterPositions = []) {
  if (!Array.isArray(rosterPositions) || rosterPositions.length === 0) {
    return null;
  }

  const config = { qb: 0, rb: 0, wr: 0, te: 0, flex: 0, superflex: 0, k: 0, te_premium: false };
  for (const rawSlot of rosterPositions) {
    const slot = String(rawSlot || "").toUpperCase();
    if (slot === "QB") config.qb += 1;
    if (slot === "RB") config.rb += 1;
    if (slot === "WR") config.wr += 1;
    if (slot === "TE") config.te += 1;
    if (slot === "K") config.k += 1;
    if (["FLEX", "WRRB_FLEX", "REC_FLEX"].includes(slot)) config.flex += 1;
    if (["SUPER_FLEX", "SFLEX", "OP"].includes(slot)) config.superflex += 1;
  }

  const starterCount = config.qb + config.rb + config.wr + config.te + config.flex + config.superflex + config.k;
  return starterCount > 0 ? config : null;
}

function normalizeName(name) {
  return String(name || "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\b(jr|sr|ii|iii|iv|v)\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function sleeperPlayerLookupKey(name, pos) {
  return `${normalizeName(name)}::${String(pos || "").toUpperCase()}`;
}

async function fetchSleeperPlayerIndex() {
  if (!sleeperPlayerIndexPromise) {
    sleeperPlayerIndexPromise = getJson("https://api.sleeper.app/v1/players/nfl").then((players) => {
      const index = new Map();
      for (const [playerId, player] of Object.entries(players || {})) {
        const pos = player?.position;
        if (!["QB", "RB", "WR", "TE", "K"].includes(pos)) {
          continue;
        }
        const names = [
          player?.full_name,
          player?.search_full_name,
          [player?.first_name, player?.last_name].filter(Boolean).join(" "),
        ];
        for (const name of names) {
          if (!normalizeName(name)) {
            continue;
          }
          const key = sleeperPlayerLookupKey(name, pos);
          if (!index.has(key)) {
            index.set(key, {
              player_id: playerId,
              sleeper_id: playerId,
              team: player?.team || "",
            });
          }
        }
      }
      return index;
    });
  }
  return sleeperPlayerIndexPromise;
}

function enrichFreeAgentsWithSleeperIds(faResponse, playerIndex) {
  if (!faResponse || !playerIndex) {
    return faResponse;
  }
  const enrich = (player) => {
    const match = playerIndex.get(sleeperPlayerLookupKey(player?.name, player?.pos));
    if (!match) {
      return player;
    }
    return {
      ...player,
      image_id: match.player_id,
      team: player.team || match.team,
    };
  };
  return {
    ...faResponse,
    fa_pool: (faResponse.fa_pool || []).map(enrich),
  };
}

async function fetchSleeperHub(leagueId, week = 1) {
  const [leagueRes, usersRes, rostersRes, matchupsRes] = await Promise.all([
    fetch(`https://api.sleeper.app/v1/league/${leagueId}`),
    fetch(`https://api.sleeper.app/v1/league/${leagueId}/users`),
    fetch(`https://api.sleeper.app/v1/league/${leagueId}/rosters`),
    fetch(`https://api.sleeper.app/v1/league/${leagueId}/matchups/${week}`),
  ]);

  if (!leagueRes.ok || !usersRes.ok || !rostersRes.ok || !matchupsRes.ok) {
    throw new Error("Sleeper league data failed to load.");
  }

  const [league, users, rosters, rows] = await Promise.all([
    leagueRes.json(),
    usersRes.json(),
    rostersRes.json(),
    matchupsRes.json(),
  ]);

  const usersById = new Map((users || []).map((u) => [u.user_id, u]));
  const rostersById = new Map((rosters || []).map((r) => [r.roster_id, r]));

  function teamFromRoster(roster) {
    const user = usersById.get(roster?.owner_id);
    const name = user?.metadata?.team_name || user?.display_name || `Roster ${roster?.roster_id}`;
    return {
      roster_id: roster?.roster_id,
      team_name: name,
      owner_name: user?.display_name || "Unknown Owner",
      avatar: avatarUrl(user?.avatar),
      record: recordFromRoster(roster),
      wins: roster?.settings?.wins ?? 0,
      losses: roster?.settings?.losses ?? 0,
      points_for: rosterPoints(roster, "fpts", "fpts_decimal"),
      points_against: rosterPoints(roster, "fpts_against", "fpts_against_decimal"),
    };
  }

  const teams = (rosters || [])
    .map(teamFromRoster)
    .sort((a, b) => b.wins - a.wins || b.points_for - a.points_for);

  const buckets = new Map();
  for (const row of rows || []) {
    if (!row.matchup_id) continue;
    const bucket = buckets.get(row.matchup_id) || [];
    bucket.push(row);
    buckets.set(row.matchup_id, bucket);
  }

  const matchups = [...buckets.entries()]
    .map(([id, matchupRows]) => {
      if (matchupRows.length < 2) return null;
      return {
        id,
        week,
        home: teamFromRoster(rostersById.get(matchupRows[0].roster_id)),
        away: teamFromRoster(rostersById.get(matchupRows[1].roster_id)),
        home_points: matchupRows[0].points ?? 0,
        away_points: matchupRows[1].points ?? 0,
      };
    })
    .filter(Boolean);

  return { league, teams, matchups, week };
}

async function fetchSleeperUserLeagues(username, season) {
  const cleanUsername = username.trim();
  if (!cleanUsername) {
    throw new Error("Enter a Sleeper username first.");
  }

  const user = await getJson(`https://api.sleeper.app/v1/user/${encodeURIComponent(cleanUsername)}`);
  if (!user?.user_id) {
    throw new Error("Sleeper user not found.");
  }

  async function loadSeason(year) {
    const leagues = await getJson(`https://api.sleeper.app/v1/user/${user.user_id}/leagues/nfl/${year}`);
    return (leagues || []).map((league) => ({ ...league, season: String(year) }));
  }

  let leagues = await loadSeason(season);
  if (leagues.length === 0) {
    leagues = await loadSeason(Number(season) - 1);
  }

  return {
    user,
    leagues: leagues.sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""))),
  };
}

function ScoreTicker({ matchups }) {
  const items = matchups && matchups.length > 0
    ? matchups
    : [
        { id: "empty-1", week: 1, home: { team_name: "Enter a league ID" }, away: { team_name: "Build dashboard" }, home_points: 0, away_points: 0 },
        { id: "empty-2", week: 1, home: { team_name: "Radar Rankings" }, away: { team_name: "Trade Lab" }, home_points: 0, away_points: 0 },
      ];

  return (
    <div className="score-ticker" aria-label="League matchups">
      <div className="ticker-label">Top Matchups</div>
      <div className="ticker-track">
        {items.slice(0, 8).map((m) => (
          <div className="ticker-card" key={m.id}>
            <div className="ticker-meta">
              <span>Week {m.week}</span>
              <strong>Preview</strong>
            </div>
            <div className="ticker-team">
              {m.home?.avatar ? <img src={m.home.avatar} alt="" /> : null}
              <span>{m.home?.team_name}</span>
              <em>{m.home?.record || "0-0"}</em>
              <strong>{Number(m.home_points || 0).toFixed(1)}</strong>
            </div>
            <div className="ticker-team">
              {m.away?.avatar ? <img src={m.away.avatar} alt="" /> : null}
              <span>{m.away?.team_name}</span>
              <em>{m.away?.record || "0-0"}</em>
              <strong>{Number(m.away_points || 0).toFixed(1)}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RankingList({
  title,
  players,
  emptyText = "Run valuations to fill this board.",
  valueAccessor = (player) => Number(player.risk_adjusted_value || player.true_value || 0),
}) {
  return (
    <section className="dashboard-card">
      <div className="section-kicker">{title}</div>
      <div className="rank-list">
        {players.length === 0 ? <p className="muted">{emptyText}</p> : null}
        {players.slice(0, 12).map((player, index) => (
          <div className="rank-row" key={`${title}-${player.name}-${index}`}>
            <span className="rank-number">{index + 1}</span>
            <PlayerImage player={player} />
            <div>
              <strong>{player.name}</strong>
              <p>{player.pos || "-"} {player.team ? `- ${player.team}` : ""}</p>
            </div>
            <em>{Number(valueAccessor(player) || 0).toFixed(1)}</em>
          </div>
        ))}
      </div>
    </section>
  );
}

function StandingsBoard({ teams }) {
  return (
    <section className="dashboard-card">
      <div className="section-kicker">Standings</div>
      <div className="standings-list">
        {teams.length === 0 ? <p className="muted">Load a league to see teams.</p> : null}
        {teams.slice(0, 14).map((team, index) => (
          <div className="standing-row" key={team.roster_id || team.team_name}>
            <span>{index + 1}</span>
            {team.avatar ? <img src={team.avatar} alt="" /> : <div className="avatar-fallback" />}
            <div>
              <strong>{team.team_name}</strong>
              <p>@{team.owner_name}</p>
            </div>
            <em>{team.record}</em>
          </div>
        ))}
      </div>
    </section>
  );
}

function MatchupBoard({ matchups }) {
  return (
    <section className="dashboard-card dashboard-card--wide">
      <div className="section-kicker">Week Matchups</div>
      <div className="matchup-grid">
        {matchups.length === 0 ? <p className="muted">Matchups will appear after loading a Sleeper league.</p> : null}
        {matchups.map((m) => (
          <div className="matchup-tile" key={m.id}>
            <div className="matchup-side">
              {m.home?.avatar ? <img src={m.home.avatar} alt="" /> : null}
              <strong>{m.home?.team_name}</strong>
              <span>{m.home?.record}</span>
            </div>
            <div className="matchup-center">
              <p>{Number(m.home_points || 0).toFixed(1)}</p>
              <strong>VS</strong>
              <p>{Number(m.away_points || 0).toFixed(1)}</p>
            </div>
            <div className="matchup-side matchup-side--right">
              {m.away?.avatar ? <img src={m.away.avatar} alt="" /> : null}
              <strong>{m.away?.team_name}</strong>
              <span>{m.away?.record}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ActionCard({ title, body, button, disabled, onClick }) {
  return (
    <article className="action-card">
      <div>
        <strong>{title}</strong>
        <p>{body}</p>
      </div>
      <button className="button" type="button" disabled={disabled} onClick={onClick}>
        {button}
      </button>
    </article>
  );
}

function PlayerMiniCard({ player, label }) {
  if (!player) return null;
  return (
    <div className="player-mini-card">
      <PlayerImage player={player} />
      <div>
        <span>{label}</span>
        <strong>{player.name}</strong>
        <p>{player.pos || "-"} {player.team ? `- ${player.team}` : ""}</p>
      </div>
      <em>{Number(player.risk_adjusted_value || player.true_value || 0).toFixed(1)}</em>
    </div>
  );
}

function valueKey(name, pos) {
  return `${String(name || "").toLowerCase().replace(/[^a-z0-9 ]/g, "").trim()}::${String(pos || "").toUpperCase()}`;
}

function enrichPlayer(row, valuations) {
  const match = valuations.find((player) => (
    valueKey(player.name, player.pos) === valueKey(row?.name, row?.pos)
  ));
  return { ...row, ...(match || {}) };
}

function LineupBoard({ lineup, valuations, teamName, teams, onTeamChange }) {
  const starters = (lineup?.starters || []).map((row) => enrichPlayer(row, valuations));
  const bench = (lineup?.bench || []).map((row) => enrichPlayer(row, valuations));

  return (
    <section className="dashboard-card dashboard-card--wide lineup-board">
      <div className="lineup-board-header">
        <div>
          <div className="section-kicker">Recommended Lineup</div>
          <h3>{teamName || "Select a team"}</h3>
        </div>
        <label className="label lineup-team-picker">
          Team
          <select className="input compact-select" value={teamName} onChange={(e) => onTeamChange(e.target.value)}>
            <option value="">View lineup...</option>
            {teams.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>
      {!lineup ? <p className="muted">Lineup will load automatically with the dashboard.</p> : null}
      {lineup ? (
        <>
          <div className="lineup-total">
            <strong>{Number(lineup.total_projected_points || 0).toFixed(1)}</strong>
            <span>projected starter points</span>
          </div>
          <div className="lineup-slot-grid">
            {starters.map((player) => (
              <div className="lineup-slot" key={`${player.slot}-${player.name}`}>
                <span>{player.slot || player.pos}</span>
                <PlayerImage player={player} />
                <strong>{player.name}</strong>
                <p>{player.pos} - {player.team || "-"}</p>
                <em>{Number(player.proj_week || 0).toFixed(1)}</em>
              </div>
            ))}
          </div>
          <div className="bench-strip">
            {bench.slice(0, 10).map((player) => (
              <PlayerMiniCard key={`bench-${player.name}`} player={player} label="Bench" />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}

function FaBoard({ fa }) {
  const faPool = [...(fa?.fa_pool || [])]
    .sort((a, b) => Number(b.market_value || 0) - Number(a.market_value || 0));

  return (
    <section className="dashboard-card dashboard-card--wide fa-board">
      <div className="section-kicker">Free-Agent Market Edge</div>
      {!fa ? <p className="muted">Free-agent values will load automatically with the dashboard.</p> : null}
      {fa ? (
        <>
          <RankingList
            title="Best Available Players"
            players={faPool.slice(0, 12)}
            emptyText="No free-agent pool returned."
            valueAccessor={(player) => player.market_value}
          />
          <SortableTable title="Sortable Market Edge" rows={faPool} defaultSortKey="market_value" />
        </>
      ) : null}
    </section>
  );
}

function MyTeamSnapshot({ teamName, teams, players, onTeamChange }) {
  const topAssets = players.slice(0, 6);
  const risky = [...players]
    .sort((a, b) => Number(b.risk_index || 0) - Number(a.risk_index || 0))
    .slice(0, 4);
  const positions = players.reduce((acc, player) => {
    acc[player.pos || "OTHER"] = (acc[player.pos || "OTHER"] || 0) + 1;
    return acc;
  }, {});

  return (
    <section className="dashboard-card dashboard-card--wide command-center-card">
      <div className="section-kicker">My Team Command Center</div>
      <div className="team-command-grid">
        <div>
          <div className="team-command-header">
            <h3>{teamName || "Select a team"}</h3>
            <select className="input compact-select" value={teamName} onChange={(e) => onTeamChange(e.target.value)}>
              <option value="">View as team...</option>
              {teams.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <p className="muted">
            Start here for the weekly loop: check your core, set lineup, scan free agents, then build trades.
          </p>
          <div className="position-pills">
            {["QB", "RB", "WR", "TE"].map((pos) => (
              <span key={pos}>{pos}: {positions[pos] || 0}</span>
            ))}
          </div>
        </div>
        <div className="mini-card-stack">
          {topAssets.map((player, index) => (
            <PlayerMiniCard key={`asset-${player.name}`} player={player} label={index === 0 ? "Franchise Piece" : "Core Asset"} />
          ))}
          {players.length === 0 ? <p className="muted">Run valuations to see your team snapshot.</p> : null}
        </div>
        <div className="mini-card-stack">
          {risky.map((player) => (
            <PlayerMiniCard key={`risk-${player.name}`} player={player} label="Watch List" />
          ))}
        </div>
      </div>
    </section>
  );
}

function ValuationStory({ myTeam, topPlayers, valueLeaders, myTeamPlayers, onTrade }) {
  const topAsset = myTeamPlayers[0];
  const bestValue = valueLeaders.find((p) => p.display_name === myTeam) || valueLeaders[0];
  const leagueMvp = topPlayers[0];

  return (
    <section className="dashboard-card valuation-story">
      <div className="section-kicker">What This Means</div>
      <div className="story-grid">
        <PlayerMiniCard player={topAsset} label="Your Top Asset" />
        <PlayerMiniCard player={bestValue} label="Best Value Signal" />
        <PlayerMiniCard player={leagueMvp} label="League Benchmark" />
      </div>
      <div className="story-copy">
        <h3>Use valuations as decisions, not just rankings.</h3>
        <p>
          Treat top assets as your core, value edges as buy/hold signals, and high-risk names as players to review
          before you reject a trade or ignore waivers.
        </p>
        <button className="button ghost-button" type="button" disabled={!myTeamPlayers.length} onClick={onTrade}>
          Turn This Into A Trade
        </button>
      </div>
    </section>
  );
}

function SortableTable({ title, rows, defaultSortKey, limit = 60 }) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState(defaultSortKey || "");
  const [sortDir, setSortDir] = useState("desc");

  const hiddenKeys = new Set(["image_id", "player_id", "sleeper_id", "id"]);
  const keys = rows && rows.length > 0 ? Object.keys(rows[0]).filter((key) => !hiddenKeys.has(key)) : [];

  useEffect(() => {
    if (!sortKey && keys.length > 0) {
      setSortKey(keys[0]);
    }
  }, [keys, sortKey]);

  const filtered = useMemo(() => {
    if (!rows || rows.length === 0) {
      return [];
    }
    if (!query.trim()) {
      return rows;
    }
    const q = query.trim().toLowerCase();
    return rows.filter((row) =>
      Object.values(row).some((v) => String(v ?? "").toLowerCase().includes(q))
    );
  }, [rows, query]);

  const sorted = useMemo(() => {
    const out = [...filtered];
    if (!sortKey) {
      return out;
    }
    out.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const an = Number(av);
      const bn = Number(bv);
      const bothNum = Number.isFinite(an) && Number.isFinite(bn);

      let cmp = 0;
      if (bothNum) {
        cmp = an - bn;
      } else {
        cmp = String(av ?? "").localeCompare(String(bv ?? ""));
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return out;
  }, [filtered, sortKey, sortDir]);

  if (!rows || rows.length === 0) {
    return (
      <section className="stack panel">
        <div className="row between">
          <h3>{title}</h3>
        </div>
        <p className="muted">No data yet.</p>
      </section>
    );
  }

  const shown = sorted.slice(0, limit);

  function onHeaderClick(k) {
    if (sortKey === k) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(k);
    setSortDir("desc");
  }

  return (
    <section className="stack panel">
      <div className="row between">
        <h3>{title}</h3>
        <input
          className="input"
          style={{ maxWidth: 260 }}
          placeholder="Filter rows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div style={{ overflowX: "auto", maxHeight: 520 }}>
        <table className="table">
          <thead>
            <tr>
              {keys.map((k) => (
                <th key={k} onClick={() => onHeaderClick(k)} style={{ cursor: "pointer" }}>
                  {k}
                  {sortKey === k ? (sortDir === "asc" ? " ▲" : " ▼") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((r, idx) => (
              <tr key={idx}>
                {keys.map((k) => (
                  <td key={`${idx}-${k}`}>{String(r[k] ?? "")}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted">Showing {shown.length} of {sorted.length} rows.</p>
    </section>
  );
}

export default function LeagueWorkspace() {
  const [apiBase, setApiBase] = useState(DEFAULT_API);
  const [backendReady, setBackendReady] = useState(null);
  const [leagueId, setLeagueId] = useState("");
  const [sleeperUsername, setSleeperUsername] = useState("");
  const [sleeperUser, setSleeperUser] = useState(null);
  const [sleeperLeagues, setSleeperLeagues] = useState([]);
  const [sleeperSeason, setSleeperSeason] = useState(new Date().getFullYear());
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("idle");
  const [tab, setTab] = useState("overview");

  const [leaguePlayers, setLeaguePlayers] = useState([]);
  const [valuations, setValuations] = useState([]);
  const [lineup, setLineup] = useState(null);
  const [trade, setTrade] = useState(null);
  const [tradeEval, setTradeEval] = useState(null);
  const [fa, setFa] = useState(null);
  const [modelQa, setModelQa] = useState(null);
  const [market, setMarket] = useState([]);
  const [hub, setHub] = useState(null);

  const [selectedSend, setSelectedSend] = useState([]);
  const [selectedReceive, setSelectedReceive] = useState([]);

  const [myTeam, setMyTeam] = useState("");
  const [partner, setPartner] = useState("");
  const [superflex, setSuperflex] = useState(false);
  const [qaSeasonFrom, setQaSeasonFrom] = useState(2021);
  const [qaSeasonTo, setQaSeasonTo] = useState(2025);
  const [qaMinGames, setQaMinGames] = useState(4);
  const [qaEwmaAlpha, setQaEwmaAlpha] = useState(0.6);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const bootstrappedLeagueRef = useRef("");
  const tradeAutoKeyRef = useRef("");
  const lineupAutoKeyRef = useRef("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      const rawId = localStorage.getItem(LS_KEY_ID);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setLeaguePlayers(parsed);
        }
      }
      if (rawId) {
        setLeagueId(rawId);
      }
      const rawUsername = localStorage.getItem(LS_KEY_USERNAME);
      if (rawUsername) {
        setSleeperUsername(rawUsername);
      }
      const rawLeagues = localStorage.getItem(LS_KEY_LEAGUES);
      if (rawLeagues) {
        const parsedLeagues = JSON.parse(rawLeagues);
        if (Array.isArray(parsedLeagues)) {
          setSleeperLeagues(parsedLeagues);
        }
      }
      const rawHub = localStorage.getItem(LS_KEY_HUB);
      if (rawHub) {
        setHub(JSON.parse(rawHub));
      }
    } catch {
      // ignore malformed local storage
    }
  }, []);

  useEffect(() => {
    let active = true;
    async function pingBackend() {
      try {
        setBackendReady(false);
        await getJson(`${apiBase}/health`);
        if (active) {
          setBackendReady(true);
        }
      } catch {
        if (active) {
          setBackendReady(false);
        }
      }
    }
    pingBackend();
    return () => {
      active = false;
    };
  }, [apiBase]);

  useEffect(() => {
    if (!leagueId.trim() || backendReady !== true || busy) {
      return;
    }
    if (bootstrappedLeagueRef.current === leagueId.trim()) {
      return;
    }
    if (leaguePlayers.length > 0 && valuations.length > 0) {
      bootstrappedLeagueRef.current = leagueId.trim();
      return;
    }
    bootstrappedLeagueRef.current = leagueId.trim();
    buildDashboard();
  }, [backendReady, leagueId]);

  const teams = useMemo(() => {
    const uniq = new Set();
    for (const p of leaguePlayers) {
      if (p.display_name) {
        uniq.add(p.display_name);
      }
    }
    return [...uniq].sort((a, b) => a.localeCompare(b));
  }, [leaguePlayers]);

  const myTeamRoster = useMemo(
    () => leaguePlayers.filter((p) => p.display_name === myTeam),
    [leaguePlayers, myTeam]
  );

  const myTeamValuations = useMemo(
    () => valuations
      .filter((p) => p.display_name === myTeam)
      .sort((a, b) => Number(b.risk_adjusted_value || b.true_value || 0) - Number(a.risk_adjusted_value || a.true_value || 0)),
    [valuations, myTeam]
  );

  const leagueLineupConfig = useMemo(
    () => lineupConfigFromRosterPositions(hub?.league?.roster_positions),
    [hub]
  );

  const topPlayers = useMemo(() => {
    return [...valuations]
      .sort((a, b) => Number(b.risk_adjusted_value || b.true_value || 0) - Number(a.risk_adjusted_value || a.true_value || 0))
      .slice(0, 25);
  }, [valuations]);

  const valueLeaders = useMemo(() => {
    return [...valuations]
      .filter((p) => Number.isFinite(Number(p.edge || p.edge_z_adj)))
      .sort((a, b) => Number(b.edge_z_adj || b.edge || 0) - Number(a.edge_z_adj || a.edge || 0))
      .slice(0, 12);
  }, [valuations]);

  const teamPower = useMemo(() => {
    const buckets = new Map();
    for (const player of valuations) {
      const team = player.display_name || "Unknown";
      const bucket = buckets.get(team) || { team, total: 0, starters: 0, count: 0 };
      const value = Number(player.risk_adjusted_value || player.true_value || 0);
      bucket.total += value;
      bucket.count += 1;
      if (["QB", "RB", "WR", "TE"].includes(player.pos)) {
        bucket.starters += value;
      }
      buckets.set(team, bucket);
    }
    return [...buckets.values()]
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);
  }, [valuations]);

  useEffect(() => {
    if (!myTeam && teams.length > 0) {
      setMyTeam(teams[0]);
    }
    if (!partner && teams.length > 1) {
      const fallback = teams[0] === myTeam ? teams[1] : teams[0];
      setPartner(fallback || "");
    }
  }, [teams, myTeam, partner]);

  const candidateGive = (trade?.give_candidates && trade.give_candidates.length > 0)
    ? trade.give_candidates
    : (trade?.my_team_pool || []);
  const candidateReceive = (trade?.receive_candidates && trade.receive_candidates.length > 0)
    ? trade.receive_candidates
    : (trade?.partner_pool || []);

  useEffect(() => {
    if (tab !== "trade" || busy || valuations.length === 0 || !myTeam || !partner) {
      return;
    }
    const key = `${myTeam}::${partner}::${valuations.length}`;
    if (tradeAutoKeyRef.current === key) {
      return;
    }
    tradeAutoKeyRef.current = key;
    runTradeTargets();
  }, [tab, myTeam, partner, valuations.length]);

  useEffect(() => {
    if (tab !== "lineup" || busy || valuations.length === 0 || !myTeam || myTeamRoster.length === 0) {
      return;
    }
    const key = `${myTeam}::${valuations.length}::${superflex}::${JSON.stringify(leagueLineupConfig || {})}`;
    if (lineupAutoKeyRef.current === key) {
      return;
    }
    lineupAutoKeyRef.current = key;
    runLineup();
  }, [tab, myTeam, valuations.length, myTeamRoster.length, superflex, leagueLineupConfig]);

  function tabLabel(t) {
    const map = {
      overview: "Overview",
      league: "League",
      valuations: "Valuations",
      lineup: "Lineup",
      trade: "Trade Lab",
      fa: "FA Upgrades",
      model: "Model QA",
    };
    return map[t] || t;
  }

  async function loadLeague(nextLeagueId = leagueId) {
    if (!String(nextLeagueId).trim()) {
      setStatus("Enter a Sleeper league ID first.");
      return;
    }
    setBusy(true);
    setStatus("Loading league...");
    try {
      const trimmedLeagueId = String(nextLeagueId).trim();
      const [out, sleeperHub] = await Promise.all([
        postJson(`${apiBase}/v1/league/load`, { league_id: trimmedLeagueId }),
        fetchSleeperHub(trimmedLeagueId).catch(() => null),
      ]);
      const players = out.players || [];
      setLeaguePlayers(players);
      setHub(sleeperHub);
      setValuations([]);
      setLineup(null);
      setTrade(null);
      setTradeEval(null);
      setFa(null);
      setSelectedSend([]);
      setSelectedReceive([]);
      localStorage.setItem(LS_KEY, JSON.stringify(players));
      localStorage.setItem(LS_KEY_ID, trimmedLeagueId);
      if (sleeperHub) {
        localStorage.setItem(LS_KEY_HUB, JSON.stringify(sleeperHub));
      }
      setStatus(`Loaded ${players.length} players across ${new Set(players.map((p) => p.display_name)).size} teams.`);
      setTab("overview");
    } catch (err) {
      setStatus(`Load failed: ${err.message}`);
    } finally {
      setBusy(false);
    }
  }

  async function buildDashboard(nextLeagueId = leagueId) {
    if (!String(nextLeagueId).trim()) {
      setStatus("Enter a Sleeper league ID first.");
      return;
    }
    setBusy(true);
    setStatus("Building league dashboard...");
    try {
      const trimmedLeagueId = String(nextLeagueId).trim();
      setLeagueId(trimmedLeagueId);
      const [out, sleeperHub, outMkt, sleeperPlayerIndex] = await Promise.all([
        postJson(`${apiBase}/v1/league/load`, { league_id: trimmedLeagueId }),
        fetchSleeperHub(trimmedLeagueId).catch(() => null),
        market.length > 0 ? Promise.resolve({ players: market }) : getJson(`${apiBase}/v1/market/default`),
        fetchSleeperPlayerIndex().catch(() => null),
      ]);
      const players = out.players || [];
      const mkt = outMkt.players || [];
      const dashboardLineupConfig = lineupConfigFromRosterPositions(sleeperHub?.league?.roster_positions);
      const dashboardSuperflex = dashboardLineupConfig ? dashboardLineupConfig.superflex > 0 : superflex;
      const outVals = await postJson(`${apiBase}/v1/valuations`, {
        roster: players,
        market: mkt,
        superflex: dashboardSuperflex,
        ppr: true,
      });
      const valuedPlayers = outVals.players || [];
      const dashboardTeams = [...new Set(players.map((p) => p.display_name).filter(Boolean))].sort((a, b) => a.localeCompare(b));
      const defaultTeam = dashboardTeams.includes(myTeam) ? myTeam : dashboardTeams[0] || "";
      const defaultPartner = dashboardTeams.includes(partner) && partner !== defaultTeam
        ? partner
        : dashboardTeams.find((team) => team !== defaultTeam) || "";
      const defaultRoster = players.filter((p) => p.display_name === defaultTeam);
      const marketMap = new Map(mkt.map((p) => [valueKey(p.name, p.pos), Number(p.market_value || 0)]));
      const valMap = new Map(
        valuedPlayers
          .filter((v) => v.display_name === defaultTeam)
          .map((v) => [valueKey(v.name, v.pos), Number(v.market_value || 0)])
      );
      const valuationPayload = valuedPlayers.map((v) => ({
        name: v.name,
        pos: v.pos,
        display_name: v.display_name,
        true_value: v.true_value,
        risk_adjusted_value: v.risk_adjusted_value,
        floor_value: v.floor_value,
        ceiling_value: v.ceiling_value,
        confidence: v.confidence,
        risk_index: v.risk_index,
        market_value: v.market_value,
        edge: v.edge,
        edge_z_adj: v.edge_z_adj,
        WinNowScore: v.WinNowScore,
      }));
      const [lineupResult, faResult, tradeResult] = await Promise.allSettled([
        defaultRoster.length > 0 ? postJson(`${apiBase}/v1/lineup/recommend`, {
          roster: defaultRoster.map((p) => {
            const k = valueKey(p.name, p.pos);
            return {
              name: p.name,
              pos: p.pos,
              team: p.team,
              market_value: valMap.get(k) || marketMap.get(k) || 0,
            };
          }),
          config: dashboardLineupConfig || undefined,
          superflex: dashboardSuperflex,
        }) : Promise.resolve(null),
        defaultRoster.length > 0 ? postJson(`${apiBase}/v1/fa/upgrades`, {
          roster: defaultRoster.map((p) => {
            const k = valueKey(p.name, p.pos);
            return {
              name: p.name,
              pos: p.pos,
              team: p.team,
              market_value: valMap.get(k) || marketMap.get(k) || 0,
            };
          }),
          league_roster: players.map((p) => ({
            name: p.name,
            pos: p.pos,
            display_name: p.display_name,
            team: p.team,
          })),
          dp_market: mkt,
          config: dashboardLineupConfig || undefined,
          superflex: dashboardSuperflex,
        }) : Promise.resolve(null),
        defaultTeam && defaultPartner ? postJson(`${apiBase}/v1/trade/targets`, {
          my_team: defaultTeam,
          partner: defaultPartner,
          players: valuationPayload,
        }) : Promise.resolve(null),
      ]);
      setLeaguePlayers(players);
      setHub(sleeperHub);
      setMarket(mkt);
      setValuations(valuedPlayers);
      setMyTeam(defaultTeam);
      setPartner(defaultPartner);
      setLineup(lineupResult.status === "fulfilled" ? lineupResult.value : null);
      setTrade(tradeResult.status === "fulfilled" ? tradeResult.value : null);
      setTradeEval(null);
      setFa(faResult.status === "fulfilled" ? enrichFreeAgentsWithSleeperIds(faResult.value, sleeperPlayerIndex) : null);
      setSelectedSend([]);
      setSelectedReceive([]);
      localStorage.setItem(LS_KEY, JSON.stringify(players));
      localStorage.setItem(LS_KEY_ID, trimmedLeagueId);
      if (sleeperHub) {
        localStorage.setItem(LS_KEY_HUB, JSON.stringify(sleeperHub));
      }
      bootstrappedLeagueRef.current = trimmedLeagueId;
      setTab("overview");
      setStatus(`Dashboard ready: ${players.length} players, ${outVals.players?.length || 0} valuations.`);
    } catch (err) {
      setStatus(`Dashboard failed: ${err.message}`);
    } finally {
      setBusy(false);
    }
  }

  function submitLeagueId(event) {
    event.preventDefault();
    bootstrappedLeagueRef.current = "";
    buildDashboard();
  }

  async function submitSleeperUsername(event) {
    event.preventDefault();
    if (!sleeperUsername.trim()) {
      setStatus("Enter a Sleeper username first.");
      return;
    }

    setBusy(true);
    setStatus(`Finding leagues for ${sleeperUsername.trim()}...`);
    try {
      const out = await fetchSleeperUserLeagues(sleeperUsername, sleeperSeason);
      setSleeperUser(out.user);
      setSleeperLeagues(out.leagues);
      localStorage.setItem(LS_KEY_USERNAME, sleeperUsername.trim());
      localStorage.setItem(LS_KEY_LEAGUES, JSON.stringify(out.leagues));
      setStatus(out.leagues.length > 0
        ? `Found ${out.leagues.length} Sleeper leagues. Pick one to build.`
        : "No leagues found for that username.");
    } catch (err) {
      setStatus(`Sleeper lookup failed: ${err.message}`);
    } finally {
      setBusy(false);
    }
  }

  function selectSleeperLeague(league) {
    const nextLeagueId = String(league?.league_id || "");
    if (!nextLeagueId) {
      return;
    }
    bootstrappedLeagueRef.current = "";
    setLeagueId(nextLeagueId);
    buildDashboard(nextLeagueId);
  }

  async function runValuations() {
    if (leaguePlayers.length === 0) {
      setStatus("Load a league first.");
      return;
    }
    setBusy(true);
    setStatus("Running valuations...");
    try {
      let mkt = market;
      if (mkt.length === 0) {
        const outMkt = await getJson(`${apiBase}/v1/market/default`);
        mkt = outMkt.players || [];
        setMarket(mkt);
      }
      const out = await postJson(`${apiBase}/v1/valuations`, {
        roster: leaguePlayers,
        market: mkt,
        superflex: leagueLineupConfig ? leagueLineupConfig.superflex > 0 : superflex,
        ppr: true,
      });
      setValuations(out.players || []);
      setStatus(`Valuations complete (${out.players?.length || 0} players).`);
      setTab("valuations");
    } catch (err) {
      setStatus(`Valuation failed: ${err.message}`);
    } finally {
      setBusy(false);
    }
  }

  async function runLineup() {
    if (!myTeam || myTeamRoster.length === 0) {
      setStatus("Select a team with rostered players first.");
      return;
    }

    setBusy(true);
    setStatus(`Running lineup for ${myTeam}...`);
    try {
      let mkt = market;
      if (mkt.length === 0) {
        const outMkt = await getJson(`${apiBase}/v1/market/default`);
        mkt = outMkt.players || [];
        setMarket(mkt);
      }
      const key = (name, pos) => `${String(name || "").toLowerCase().replace(/[^a-z0-9 ]/g, "").trim()}::${String(pos || "").toUpperCase()}`;
      const marketMap = new Map(mkt.map((p) => [key(p.name, p.pos), Number(p.market_value || 0)]));
      const valMap = new Map(
        valuations
          .filter((v) => v.display_name === myTeam)
          .map((v) => [key(v.name, v.pos), Number(v.market_value || 0)])
      );
      const out = await postJson(`${apiBase}/v1/lineup/recommend`, {
        roster: myTeamRoster.map((p) => {
          const k = key(p.name, p.pos);
          return {
            name: p.name,
            pos: p.pos,
            team: p.team,
            market_value: valMap.get(k) || marketMap.get(k) || 0,
          };
        }),
        config: leagueLineupConfig || undefined,
        superflex: leagueLineupConfig ? leagueLineupConfig.superflex > 0 : superflex,
      });
      setLineup(out);
      setStatus("Lineup complete.");
      setTab("lineup");
    } catch (err) {
      setStatus(`Lineup failed: ${err.message}`);
    } finally {
      setBusy(false);
    }
  }

  async function runTradeTargets() {
    if (!myTeam || !partner) {
      setStatus("Select both your team and a trade partner.");
      return;
    }
    if (valuations.length === 0) {
      setStatus("Run valuations first.");
      return;
    }

    setBusy(true);
    setStatus(`Running trade analysis for ${myTeam} vs ${partner}...`);
    try {
      const out = await postJson(`${apiBase}/v1/trade/targets`, {
        my_team: myTeam,
        partner,
        players: valuations.map((v) => ({
          name: v.name,
          pos: v.pos,
          display_name: v.display_name,
          true_value: v.true_value,
          risk_adjusted_value: v.risk_adjusted_value,
          floor_value: v.floor_value,
          ceiling_value: v.ceiling_value,
          confidence: v.confidence,
          risk_index: v.risk_index,
          market_value: v.market_value,
          edge: v.edge,
          edge_z_adj: v.edge_z_adj,
          WinNowScore: v.WinNowScore,
        })),
      });
      setTrade(out);
      setTradeEval(null);
      setSelectedSend([]);
      setSelectedReceive([]);
      setStatus("Trade candidates generated. Step 2: pick package players below.");
      setTab("trade");
    } catch (err) {
      setStatus(`Trade failed: ${err.message}`);
    } finally {
      setBusy(false);
    }
  }

  function togglePick(setter, current, name) {
    if (current.includes(name)) {
      setter(current.filter((n) => n !== name));
      return;
    }
    setter([...current, name]);
  }

  async function evaluateTradePackage() {
    if (!trade || !partner) {
      setStatus("Run trade analysis first.");
      return;
    }
    if (selectedSend.length === 0 || selectedReceive.length === 0) {
      setStatus("Pick at least one send and one receive player.");
      return;
    }

    setBusy(true);
    setStatus("Evaluating selected package...");
    try {
      const out = await postJson(`${apiBase}/v1/trade/evaluate`, {
        my_team: myTeam,
        partner,
        send_names: selectedSend,
        receive_names: selectedReceive,
        players: valuations.map((v) => ({
          name: v.name,
          pos: v.pos,
          display_name: v.display_name,
          true_value: v.true_value,
          risk_adjusted_value: v.risk_adjusted_value,
          floor_value: v.floor_value,
          ceiling_value: v.ceiling_value,
          confidence: v.confidence,
          risk_index: v.risk_index,
          market_value: v.market_value,
          edge: v.edge,
          edge_z_adj: v.edge_z_adj,
          WinNowScore: v.WinNowScore,
        })),
      });
      setTradeEval(out);
      setStatus("Trade package evaluated.");
    } catch (err) {
      setStatus(`Trade package failed: ${err.message}`);
    } finally {
      setBusy(false);
    }
  }

  async function runFaUpgrades() {
    if (!myTeam || myTeamRoster.length === 0) {
      setStatus("Select your team first.");
      return;
    }

    setBusy(true);
    setStatus("Running FA upgrades...");
    try {
      let mkt = market;
      if (mkt.length === 0) {
        const outMkt = await getJson(`${apiBase}/v1/market/default`);
        mkt = outMkt.players || [];
        setMarket(mkt);
      }
      const [out, sleeperPlayerIndex] = await Promise.all([
        postJson(`${apiBase}/v1/fa/upgrades`, {
        roster: myTeamRoster.map((p) => {
          const k = valueKey(p.name, p.pos);
          const match = valuations.find((v) => v.display_name === myTeam && valueKey(v.name, v.pos) === k);
          const marketMatch = mkt.find((v) => valueKey(v.name, v.pos) === k);
          return {
            name: p.name,
            pos: p.pos,
            team: p.team,
            market_value: Number(match?.market_value || marketMatch?.market_value || 0),
          };
        }),
        league_roster: leaguePlayers.map((p) => ({
          name: p.name,
          pos: p.pos,
          display_name: p.display_name,
          team: p.team,
        })),
        dp_market: mkt,
        config: leagueLineupConfig || undefined,
        superflex: leagueLineupConfig ? leagueLineupConfig.superflex > 0 : superflex,
        }),
        fetchSleeperPlayerIndex().catch(() => null),
      ]);
      setFa(enrichFreeAgentsWithSleeperIds(out, sleeperPlayerIndex));
      setStatus("FA upgrades complete.");
      setTab("fa");
    } catch (err) {
      setStatus(`FA upgrades failed: ${err.message}`);
    } finally {
      setBusy(false);
    }
  }

  async function runModelQa() {
    setBusy(true);
    setStatus("Running historical model backtest...");
    try {
      const out = await postJson(`${apiBase}/v1/model/backtest/auto`, {
        season_from: Number(qaSeasonFrom),
        season_to: Number(qaSeasonTo),
        min_history_games: Number(qaMinGames),
        ewma_alpha: Number(qaEwmaAlpha),
      });
      setModelQa(out);
      setStatus("Model QA backtest complete.");
      setTab("model");
    } catch (err) {
      setStatus(`Model QA failed: ${err.message}`);
    } finally {
      setBusy(false);
    }
  }

  function renderTabBody() {
    if (tab === "overview") {
      return (
        <section className="dashboard-layout">
          <div className="stat-grid">
            <StatCard label="League Players" value={leaguePlayers.length} />
            <StatCard label="Teams" value={hub?.teams?.length || teams.length} />
            <StatCard label="Valued Players" value={valuations.length} />
            <StatCard label="My Team" value={myTeam || "-"} />
          </div>

          <div className="dashboard-main-grid">
            <MyTeamSnapshot
              teamName={myTeam}
              teams={teams}
              players={myTeamValuations}
              onTeamChange={setMyTeam}
            />
            <RankingList title="Radar Rankings" players={topPlayers} />
            <StandingsBoard teams={hub?.teams || []} />
            <div className="overview-pair overview-pair--wide">
              <RankingList title="Best Value Edges" players={valueLeaders} emptyText="Run valuations to find value edges." />
              <MatchupBoard matchups={hub?.matchups || []} />
            </div>

            <section className="dashboard-card dashboard-card--wide team-power-card">
              <div className="section-kicker">Team Power</div>
              <div className="power-list">
                {teamPower.length === 0 ? <p className="muted">Run valuations to compare team value.</p> : null}
                {teamPower.map((team, index) => (
                  <div className="power-row" key={team.team}>
                    <span>{index + 1}</span>
                    <strong>{team.team}</strong>
                    <div className="power-meter">
                      <span style={{ width: `${Math.min(100, Math.max(8, team.total / Math.max(teamPower[0]?.total || 1, 1) * 100))}%` }} />
                    </div>
                    <em>{team.total.toFixed(1)}</em>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </section>
      );
    }

    if (tab === "league") {
      return (
        <section className="stack">
          <SortableTable title="League Players" rows={leaguePlayers} defaultSortKey="display_name" />
          <SortableTable title="My Team Roster" rows={myTeamRoster} defaultSortKey="pos" />
        </section>
      );
    }

    if (tab === "valuations") {
      return (
        <section className="stack">
          <ValuationStory
            myTeam={myTeam}
            topPlayers={topPlayers}
            valueLeaders={valueLeaders}
            myTeamPlayers={myTeamValuations}
            onTrade={() => setTab("trade")}
          />
          <SortableTable title="My Team Valuations" rows={myTeamValuations} defaultSortKey="risk_adjusted_value" />
          <SortableTable title="League Valuations" rows={valuations} defaultSortKey="risk_adjusted_value" />
        </section>
      );
    }

    if (tab === "lineup") {
      return (
        <section className="stack">
          <LineupBoard
            lineup={lineup}
            valuations={valuations}
            teamName={myTeam}
            teams={teams}
            onTeamChange={setMyTeam}
          />
          {lineup ? (
            <details className="panel details-panel">
              <summary>Raw lineup tables</summary>
              <SortableTable title="Starters" rows={lineup.starters || []} defaultSortKey="proj_week" />
              <SortableTable title="Bench" rows={lineup.bench || []} defaultSortKey="proj_week" />
            </details>
          ) : null}
        </section>
      );
    }

    if (tab === "trade") {
      return (
        <section className="stack">
          <div className="panel stack">
            <h3>Trade Lab</h3>
            <p className="muted">Choose a partner, pick a package, then evaluate whether Radar likes the deal.</p>
            <div className="row">
              <label className="label grow">
                My Team
                <select className="input" value={myTeam} onChange={(e) => setMyTeam(e.target.value)}>
                  <option value="">Select team...</option>
                  {teams.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </label>
              <label className="label grow">
                Trade Partner
                <select className="input" value={partner} onChange={(e) => setPartner(e.target.value)}>
                  <option value="">Select partner...</option>
                  {teams.filter((t) => t !== myTeam).map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </label>
            </div>
            <p className="muted">Candidates are generated automatically from the loaded dashboard. If strict candidates are empty, full team pools are shown for picking.</p>
          </div>

          {!trade ? (
            <div className="panel"><p className="muted">Trade candidates are loading from the selected teams.</p></div>
          ) : (
            <>
              <div className="panel">
                <p><strong>Needs:</strong> {(trade.needs || []).join(", ") || "none"}</p>
                <p><strong>Surplus:</strong> {(trade.surplus || []).join(", ") || "none"}</p>
                {(trade.give_candidates || []).length === 0 || (trade.receive_candidates || []).length === 0 ? (
                  <p className="muted" style={{ marginTop: "0.35rem" }}>
                    Strict candidates were empty, so selector is using full team pools.
                  </p>
                ) : null}
              </div>

              <section className="panel stack">
                <h4>Build Package</h4>
                <div className="row">
                  <div className="pick-col">
                    <p><strong>You Send ({myTeam})</strong></p>
                    {candidateGive.slice(0, 30).map((p) => (
                      <label key={`send-${p.name}`} className="pick-item">
                        <input type="checkbox" checked={selectedSend.includes(p.name)} onChange={() => togglePick(setSelectedSend, selectedSend, p.name)} />
                        <span>{p.name} ({p.pos})</span>
                      </label>
                    ))}
                  </div>
                  <div className="pick-col">
                    <p><strong>You Receive ({partner || "Partner"})</strong></p>
                    {candidateReceive.slice(0, 30).map((p) => (
                      <label key={`recv-${p.name}`} className="pick-item">
                        <input type="checkbox" checked={selectedReceive.includes(p.name)} onChange={() => togglePick(setSelectedReceive, selectedReceive, p.name)} />
                        <span>{p.name} ({p.pos})</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="row">
                  <p className="muted"><strong>Selected Send:</strong> {selectedSend.join(", ") || "none"}</p>
                  <p className="muted"><strong>Selected Receive:</strong> {selectedReceive.join(", ") || "none"}</p>
                </div>
                <div className="row">
                  <button
                    className="button primary-action"
                    disabled={busy || !trade || selectedSend.length === 0 || selectedReceive.length === 0}
                    onClick={evaluateTradePackage}
                    type="button"
                  >
                    Evaluate Package
                  </button>
                </div>
              </section>

              {tradeEval ? (
                <div className="panel stack">
                  <h4>Package Evaluation</h4>
                  <p><strong>Market:</strong> send {tradeEval.send_total_market.toFixed(1)} | receive {tradeEval.receive_total_market.toFixed(1)} | diff {tradeEval.market_diff.toFixed(1)}</p>
                  <p><strong>True Value:</strong> send {tradeEval.send_total_true_value.toFixed(1)} | receive {tradeEval.receive_total_true_value.toFixed(1)} | diff {tradeEval.true_value_diff.toFixed(1)}</p>
                  <p><strong>Risk-Adjusted:</strong> send {Number(tradeEval.send_total_risk_adjusted_value || 0).toFixed(1)} | receive {Number(tradeEval.receive_total_risk_adjusted_value || 0).toFixed(1)} | diff {Number(tradeEval.risk_adjusted_value_diff || 0).toFixed(1)}</p>
                  <p><strong>Package Quality:</strong> send {Number(tradeEval.send_package_quality || 0).toFixed(1)} | receive {Number(tradeEval.receive_package_quality || 0).toFixed(1)} | diff {Number(tradeEval.package_quality_diff || 0).toFixed(1)}</p>
                  <p><strong>Deal Score:</strong> {Number(tradeEval.deal_score || 0).toFixed(1)} | <strong>Verdict:</strong> {String(tradeEval.deal_verdict || "neutral")}</p>
                  <p><strong>Partner Acceptance:</strong> {String(tradeEval.partner_acceptance || "medium")} ({Number(tradeEval.acceptance_likelihood_pct || 0).toFixed(0)}%)</p>
                  {(tradeEval.warnings || []).length > 0 ? (
                    <p className="muted"><strong>Warnings:</strong> {(tradeEval.warnings || []).join(" | ")}</p>
                  ) : null}
                  <p><strong>Fairness:</strong> {tradeEval.fairness_score.toFixed(3)} (closer to 1.0 is more balanced)</p>
                </div>
              ) : null}

              <SortableTable title="Targets" rows={trade.targets || []} defaultSortKey="edge_z_adj" />
              <SortableTable title="Give Candidates" rows={candidateGive} defaultSortKey="risk_adjusted_value" />
              <SortableTable title="Receive Candidates" rows={candidateReceive} defaultSortKey="risk_adjusted_value" />
            </>
          )}
        </section>
      );
    }

    if (tab === "fa") {
      return (
        <section className="stack">
          <FaBoard fa={fa} />
          {fa ? (
            <details className="panel details-panel">
              <summary>Raw FA market table</summary>
              <SortableTable title="FA Pool" rows={fa.fa_pool || []} defaultSortKey="market_value" />
            </details>
          ) : null}
        </section>
      );
    }

    if (tab === "model") {
      return (
        <section className="stack">
          <div className="panel stack">
            <h3>Model QA</h3>
            <p className="muted">Runs walk-forward backtest on nflverse historical weekly player points.</p>
            <div className="row">
              <label className="label">
                Season From
                <input className="input" type="number" value={qaSeasonFrom} onChange={(e) => setQaSeasonFrom(e.target.value)} />
              </label>
              <label className="label">
                Season To
                <input className="input" type="number" value={qaSeasonTo} onChange={(e) => setQaSeasonTo(e.target.value)} />
              </label>
              <label className="label">
                Min History Games
                <input className="input" type="number" min="1" value={qaMinGames} onChange={(e) => setQaMinGames(e.target.value)} />
              </label>
              <label className="label">
                EWMA Alpha
                <input className="input" type="number" step="0.05" min="0.05" max="0.95" value={qaEwmaAlpha} onChange={(e) => setQaEwmaAlpha(e.target.value)} />
              </label>
            </div>
            <div className="row">
              <button className="button" disabled={busy} onClick={runModelQa} type="button">Run Backtest</button>
            </div>
          </div>

          {modelQa ? (
            <div className="stat-grid">
              <StatCard label="Observations" value={modelQa.observations} />
              <StatCard label="Model MAE" value={Number(modelQa.model_mae).toFixed(3)} />
              <StatCard label="Baseline MAE" value={Number(modelQa.baseline_mae).toFixed(3)} />
              <StatCard label="Model RMSE" value={Number(modelQa.model_rmse).toFixed(3)} />
              <StatCard label="Baseline RMSE" value={Number(modelQa.baseline_rmse).toFixed(3)} />
              <StatCard label="MAE Improvement %" value={Number(modelQa.mae_improvement_pct).toFixed(2)} />
              <StatCard label="Model Spearman" value={Number(modelQa.model_spearman).toFixed(3)} />
              <StatCard label="Baseline Spearman" value={Number(modelQa.baseline_spearman).toFixed(3)} />
            </div>
          ) : (
            <div className="panel"><p className="muted">No backtest result yet.</p></div>
          )}
        </section>
      );
    }

    return null;
  }

  return (
    <main className="radar-app dark-shell">
      <ScoreTicker matchups={hub?.matchups || []} />

      <section className="radar-masthead">
        <button className="brand-lockup" type="button" onClick={() => setTab("overview")} aria-label="Go to Dynasty Radar home">
          <span>DR</span>
          <div>
            <h1>Dynasty Radar</h1>
            <p>{hub?.league?.name || "Any Sleeper league, one dynasty command center"}</p>
          </div>
        </button>
        <nav className="masthead-nav" aria-label="Radar navigation">
          <button className={tab === "overview" ? "active" : ""} onClick={() => setTab("overview")} type="button">Home</button>
          <button className={tab === "valuations" ? "active" : ""} onClick={() => setTab("valuations")} type="button">Rankings</button>
          <button className={tab === "trade" ? "active" : ""} onClick={() => setTab("trade")} type="button">Trade Lab</button>
          <button className={tab === "lineup" ? "active" : ""} onClick={() => setTab("lineup")} type="button">Lineup</button>
          <button className={tab === "fa" ? "active" : ""} onClick={() => setTab("fa")} type="button">FA</button>
        </nav>
        <div className="status-chip">
          {busy ? "Working..." : backendReady === false ? "Waking API..." : "Ready"}
        </div>
      </section>

      <section className="shell">
      <div className="topbar panel workspace-header">
        <div>
          <h2>League Dashboard</h2>
          <p className="muted">Powered by Radar 2.0</p>
        </div>
      </div>

      <section className="panel control-panel league-id-panel">
        <form className="league-id-form sleeper-lookup-form" onSubmit={submitSleeperUsername}>
          <label className="label">
            Sleeper Username
            <input
              className="input"
              value={sleeperUsername}
              onChange={(e) => setSleeperUsername(e.target.value)}
              placeholder="DaGoose"
            />
          </label>
          <label className="label season-field">
            Season
            <input
              className="input"
              type="number"
              value={sleeperSeason}
              onChange={(e) => setSleeperSeason(e.target.value)}
            />
          </label>
          <button className="button primary-action" disabled={busy || !sleeperUsername.trim()} type="submit">
            {busy ? "Finding..." : sleeperLeagues.length > 0 ? "Refresh Leagues" : "Find Leagues"}
          </button>
        </form>

        {sleeperLeagues.length > 0 ? (
          <div className="league-picker-grid">
            {sleeperLeagues.map((league) => {
              const selected = String(league.league_id) === String(leagueId);
              return (
                <button
                  className={`league-picker-card ${selected ? "active" : ""}`}
                  key={league.league_id}
                  type="button"
                  onClick={() => selectSleeperLeague(league)}
                  disabled={busy}
                >
                  <span>{league.season || league.season_type || "NFL"}</span>
                  <strong>{league.name || `League ${league.league_id}`}</strong>
                  <p>{league.total_rosters || "-"} teams · {league.status || "league"}</p>
                </button>
              );
            })}
          </div>
        ) : null}

        <div className="league-id-meta">
          <span>
            {busy
              ? status
              : valuations.length > 0
                ? `${valuations.length} players valued`
                : sleeperLeagues.length > 0
                  ? "Pick a league to build your weekly command center."
                  : "Enter a Sleeper username to find your leagues."}
          </span>
          <button className="link-button" type="button" onClick={() => setShowAdvanced((v) => !v)}>
            {showAdvanced ? "Hide settings" : "Settings"}
          </button>
        </div>
        {showAdvanced ? (
          <>
            <form className="league-id-form manual-league-form" onSubmit={submitLeagueId}>
              <label className="label">
                Sleeper League ID
                <input className="input" value={leagueId} onChange={(e) => setLeagueId(e.target.value)} placeholder="1195252934627844096" />
              </label>
              <button className="button primary-action" disabled={busy || !leagueId.trim()} type="submit">
                {busy ? "Building..." : valuations.length > 0 ? "Refresh League" : "Load League"}
              </button>
            </form>
            <div className="advanced-settings">
              <label className="label grow">
                API Base URL
                <input className="input" value={apiBase} onChange={(e) => setApiBase(e.target.value)} />
              </label>
              <label className="label">
                Superflex
                <select className="input" value={String(superflex)} onChange={(e) => setSuperflex(e.target.value === "true")}>
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              </label>
            </div>
          </>
        ) : null}
      </section>

      <nav className="tabbar">
        {TABS.filter((t) => t !== "overview").map((t) => (
          <button
            key={t}
            className={`tab ${tab === t ? "active" : ""}`}
            type="button"
            onClick={() => setTab(t)}
          >
            {tabLabel(t)}
          </button>
        ))}
      </nav>

      {renderTabBody()}
      </section>
    </main>
  );
}
