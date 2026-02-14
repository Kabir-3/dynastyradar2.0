(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LeagueWorkspace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/new dynasty app/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/new dynasty app/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/new dynasty app/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const DEFAULT_API = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000";
const LS_KEY = "dynasty_radar_league_players";
const LS_KEY_ID = "dynasty_radar_league_id";
const TABS = [
    "overview",
    "league",
    "valuations",
    "lineup",
    "trade",
    "fa"
];
async function postJson(url, payload) {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    const text = await res.text();
    let body = null;
    try {
        body = JSON.parse(text);
    } catch  {
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
    } catch  {
        body = text;
    }
    if (!res.ok) {
        throw new Error(typeof body === "string" ? body : JSON.stringify(body));
    }
    return body;
}
function StatCard({ label, value }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "stat-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "stat-label",
                children: label
            }, void 0, false, {
                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "stat-value",
                children: value
            }, void 0, false, {
                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                lineNumber: 48,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_c = StatCard;
function SortableTable({ title, rows, defaultSortKey, limit = 60 }) {
    _s();
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [sortKey, setSortKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultSortKey || "");
    const [sortDir, setSortDir] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("desc");
    const keys = rows && rows.length > 0 ? Object.keys(rows[0]) : [];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SortableTable.useEffect": ()=>{
            if (!sortKey && keys.length > 0) {
                setSortKey(keys[0]);
            }
        }
    }["SortableTable.useEffect"], [
        keys,
        sortKey
    ]);
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SortableTable.useMemo[filtered]": ()=>{
            if (!rows || rows.length === 0) {
                return [];
            }
            if (!query.trim()) {
                return rows;
            }
            const q = query.trim().toLowerCase();
            return rows.filter({
                "SortableTable.useMemo[filtered]": (row)=>Object.values(row).some({
                        "SortableTable.useMemo[filtered]": (v)=>String(v ?? "").toLowerCase().includes(q)
                    }["SortableTable.useMemo[filtered]"])
            }["SortableTable.useMemo[filtered]"]);
        }
    }["SortableTable.useMemo[filtered]"], [
        rows,
        query
    ]);
    const sorted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SortableTable.useMemo[sorted]": ()=>{
            const out = [
                ...filtered
            ];
            if (!sortKey) {
                return out;
            }
            out.sort({
                "SortableTable.useMemo[sorted]": (a, b)=>{
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
                }
            }["SortableTable.useMemo[sorted]"]);
            return out;
        }
    }["SortableTable.useMemo[sorted]"], [
        filtered,
        sortKey,
        sortDir
    ]);
    if (!rows || rows.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "stack panel",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "row between",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 106,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "muted",
                    children: "No data yet."
                }, void 0, false, {
                    fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                    lineNumber: 108,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
            lineNumber: 104,
            columnNumber: 7
        }, this);
    }
    const shown = sorted.slice(0, limit);
    function onHeaderClick(k) {
        if (sortKey === k) {
            setSortDir((d)=>d === "asc" ? "desc" : "asc");
            return;
        }
        setSortKey(k);
        setSortDir("desc");
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "stack panel",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "row between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "input",
                        style: {
                            maxWidth: 260
                        },
                        placeholder: "Filter rows...",
                        value: query,
                        onChange: (e)=>setQuery(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    overflowX: "auto",
                    maxHeight: 520
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "table",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: keys.map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        onClick: ()=>onHeaderClick(k),
                                        style: {
                                            cursor: "pointer"
                                        },
                                        children: [
                                            k,
                                            sortKey === k ? sortDir === "asc" ? " ▲" : " ▼" : ""
                                        ]
                                    }, k, true, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 141,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 139,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: shown.map((r, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: keys.map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: String(r[k] ?? "")
                                        }, `${idx}-${k}`, false, {
                                            fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                            lineNumber: 152,
                                            columnNumber: 19
                                        }, this))
                                }, idx, false, {
                                    fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                    lineNumber: 150,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                            lineNumber: 148,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                    lineNumber: 137,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "muted",
                children: [
                    "Showing ",
                    shown.length,
                    " of ",
                    sorted.length,
                    " rows."
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                lineNumber: 159,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
        lineNumber: 125,
        columnNumber: 5
    }, this);
}
_s(SortableTable, "kaO9TAxlgXT6WsW4rwU/NLvtQ2k=");
_c1 = SortableTable;
function LeagueWorkspace() {
    _s1();
    const [apiBase, setApiBase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_API);
    const [leagueId, setLeagueId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("overview");
    const [leaguePlayers, setLeaguePlayers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [valuations, setValuations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [lineup, setLineup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [trade, setTrade] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tradeEval, setTradeEval] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [fa, setFa] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [market, setMarket] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedSend, setSelectedSend] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedReceive, setSelectedReceive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [myTeam, setMyTeam] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [partner, setPartner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [superflex, setSuperflex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeagueWorkspace.useEffect": ()=>{
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
            } catch  {
            // ignore malformed local storage
            }
        }
    }["LeagueWorkspace.useEffect"], []);
    const teams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LeagueWorkspace.useMemo[teams]": ()=>{
            const uniq = new Set();
            for (const p of leaguePlayers){
                if (p.display_name) {
                    uniq.add(p.display_name);
                }
            }
            return [
                ...uniq
            ].sort({
                "LeagueWorkspace.useMemo[teams]": (a, b)=>a.localeCompare(b)
            }["LeagueWorkspace.useMemo[teams]"]);
        }
    }["LeagueWorkspace.useMemo[teams]"], [
        leaguePlayers
    ]);
    const myTeamRoster = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LeagueWorkspace.useMemo[myTeamRoster]": ()=>leaguePlayers.filter({
                "LeagueWorkspace.useMemo[myTeamRoster]": (p)=>p.display_name === myTeam
            }["LeagueWorkspace.useMemo[myTeamRoster]"])
    }["LeagueWorkspace.useMemo[myTeamRoster]"], [
        leaguePlayers,
        myTeam
    ]);
    const myTeamValuations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LeagueWorkspace.useMemo[myTeamValuations]": ()=>valuations.filter({
                "LeagueWorkspace.useMemo[myTeamValuations]": (p)=>p.display_name === myTeam
            }["LeagueWorkspace.useMemo[myTeamValuations]"])
    }["LeagueWorkspace.useMemo[myTeamValuations]"], [
        valuations,
        myTeam
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeagueWorkspace.useEffect": ()=>{
            if (!myTeam && teams.length > 0) {
                setMyTeam(teams[0]);
            }
            if (!partner && teams.length > 1) {
                const fallback = teams[0] === myTeam ? teams[1] : teams[0];
                setPartner(fallback || "");
            }
        }
    }["LeagueWorkspace.useEffect"], [
        teams,
        myTeam,
        partner
    ]);
    const candidateGive = trade?.give_candidates && trade.give_candidates.length > 0 ? trade.give_candidates : trade?.my_team_pool || [];
    const candidateReceive = trade?.receive_candidates && trade.receive_candidates.length > 0 ? trade.receive_candidates : trade?.partner_pool || [];
    function tabLabel(t) {
        const map = {
            overview: "Overview",
            league: "League",
            valuations: "Valuations",
            lineup: "Lineup",
            trade: "Trade Lab",
            fa: "FA Upgrades"
        };
        return map[t] || t;
    }
    async function loadLeague() {
        if (!leagueId.trim()) {
            setStatus("Enter a Sleeper league ID first.");
            return;
        }
        setBusy(true);
        setStatus("Loading league...");
        try {
            const out = await postJson(`${apiBase}/v1/league/load`, {
                league_id: leagueId.trim()
            });
            const players = out.players || [];
            setLeaguePlayers(players);
            setValuations([]);
            setLineup(null);
            setTrade(null);
            setTradeEval(null);
            setFa(null);
            setSelectedSend([]);
            setSelectedReceive([]);
            localStorage.setItem(LS_KEY, JSON.stringify(players));
            localStorage.setItem(LS_KEY_ID, leagueId.trim());
            setStatus(`Loaded ${players.length} players across ${new Set(players.map((p)=>p.display_name)).size} teams.`);
            setTab("league");
        } catch (err) {
            setStatus(`Load failed: ${err.message}`);
        } finally{
            setBusy(false);
        }
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
                superflex,
                ppr: true
            });
            setValuations(out.players || []);
            setStatus(`Valuations complete (${out.players?.length || 0} players).`);
            setTab("valuations");
        } catch (err) {
            setStatus(`Valuation failed: ${err.message}`);
        } finally{
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
            const out = await postJson(`${apiBase}/v1/lineup/recommend`, {
                roster: myTeamRoster.map((p)=>({
                        name: p.name,
                        pos: p.pos,
                        team: p.team
                    })),
                superflex
            });
            setLineup(out);
            setStatus("Lineup complete.");
            setTab("lineup");
        } catch (err) {
            setStatus(`Lineup failed: ${err.message}`);
        } finally{
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
                players: valuations.map((v)=>({
                        name: v.name,
                        pos: v.pos,
                        display_name: v.display_name,
                        true_value: v.true_value,
                        market_value: v.market_value,
                        edge: v.edge,
                        edge_z_adj: v.edge_z_adj,
                        WinNowScore: v.WinNowScore
                    }))
            });
            setTrade(out);
            setTradeEval(null);
            setSelectedSend([]);
            setSelectedReceive([]);
            setStatus("Trade candidates generated. Step 2: pick package players below.");
            setTab("trade");
        } catch (err) {
            setStatus(`Trade failed: ${err.message}`);
        } finally{
            setBusy(false);
        }
    }
    function togglePick(setter, current, name) {
        if (current.includes(name)) {
            setter(current.filter((n)=>n !== name));
            return;
        }
        setter([
            ...current,
            name
        ]);
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
                players: valuations.map((v)=>({
                        name: v.name,
                        pos: v.pos,
                        display_name: v.display_name,
                        true_value: v.true_value,
                        market_value: v.market_value,
                        edge: v.edge,
                        edge_z_adj: v.edge_z_adj,
                        WinNowScore: v.WinNowScore
                    }))
            });
            setTradeEval(out);
            setStatus("Trade package evaluated.");
        } catch (err) {
            setStatus(`Trade package failed: ${err.message}`);
        } finally{
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
            const out = await postJson(`${apiBase}/v1/fa/upgrades`, {
                roster: myTeamRoster.map((p)=>({
                        name: p.name,
                        pos: p.pos,
                        team: p.team
                    })),
                league_roster: leaguePlayers.map((p)=>({
                        name: p.name,
                        pos: p.pos,
                        display_name: p.display_name,
                        team: p.team
                    })),
                dp_market: mkt,
                superflex
            });
            setFa(out);
            setStatus("FA upgrades complete.");
            setTab("fa");
        } catch (err) {
            setStatus(`FA upgrades failed: ${err.message}`);
        } finally{
            setBusy(false);
        }
    }
    function renderTabBody() {
        if (tab === "overview") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "stack",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "stat-grid",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                label: "League Players",
                                value: leaguePlayers.length
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 462,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                label: "Teams",
                                value: teams.length
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 463,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                label: "Valued Players",
                                value: valuations.length
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 464,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                label: "My Team",
                                value: myTeam || "-"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 465,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 461,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "panel stack",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "Quick Start"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 468,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "muted",
                                children: "1) Load league, 2) Run valuations, 3) Open Trade Lab to build and evaluate a package."
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 469,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "button",
                                        disabled: busy,
                                        onClick: loadLeague,
                                        type: "button",
                                        children: "Load League"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 471,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "button",
                                        disabled: busy || leaguePlayers.length === 0,
                                        onClick: runValuations,
                                        type: "button",
                                        children: "Run Valuations"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 472,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "button",
                                        disabled: busy || valuations.length === 0,
                                        onClick: ()=>setTab("trade"),
                                        type: "button",
                                        children: "Go To Trade Lab"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 473,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 470,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 467,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                lineNumber: 460,
                columnNumber: 9
            }, this);
        }
        if (tab === "league") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "stack",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTable, {
                        title: "League Players",
                        rows: leaguePlayers,
                        defaultSortKey: "display_name"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 483,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTable, {
                        title: "My Team Roster",
                        rows: myTeamRoster,
                        defaultSortKey: "pos"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 484,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                lineNumber: 482,
                columnNumber: 9
            }, this);
        }
        if (tab === "valuations") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "stack",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTable, {
                        title: "My Team Valuations",
                        rows: myTeamValuations,
                        defaultSortKey: "true_value"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 492,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTable, {
                        title: "League Valuations",
                        rows: valuations,
                        defaultSortKey: "true_value"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 493,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                lineNumber: 491,
                columnNumber: 9
            }, this);
        }
        if (tab === "lineup") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "stack",
                children: !lineup ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "panel stack",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "muted",
                            children: "Run lineup to view starters and bench."
                        }, void 0, false, {
                            fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                            lineNumber: 503,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "button",
                            disabled: busy || myTeamRoster.length === 0,
                            onClick: runLineup,
                            type: "button",
                            children: "Run Lineup"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                            lineNumber: 504,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                    lineNumber: 502,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "panel",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Total Projected:"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 508,
                                        columnNumber: 41
                                    }, this),
                                    " ",
                                    lineup.total_projected_points
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 508,
                                columnNumber: 38
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                            lineNumber: 508,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTable, {
                            title: "Starters",
                            rows: lineup.starters || [],
                            defaultSortKey: "proj_week"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                            lineNumber: 509,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTable, {
                            title: "Bench",
                            rows: lineup.bench || [],
                            defaultSortKey: "proj_week"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                            lineNumber: 510,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                lineNumber: 500,
                columnNumber: 9
            }, this);
        }
        if (tab === "trade") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "stack",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "panel stack",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "Trade Lab"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 521,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "muted",
                                children: "Step 1: Generate candidates. Step 2: Select send/receive players. Step 3: Evaluate package."
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 522,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "button",
                                        disabled: busy || valuations.length === 0 || !myTeam || !partner,
                                        onClick: runTradeTargets,
                                        type: "button",
                                        children: "1. Generate Candidates"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 524,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "button",
                                        disabled: busy || !trade,
                                        onClick: evaluateTradePackage,
                                        type: "button",
                                        children: "3. Evaluate Package"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 525,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 523,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 520,
                        columnNumber: 11
                    }, this),
                    !trade ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "panel",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "muted",
                            children: "No trade candidates yet. Click “Generate Candidates”."
                        }, void 0, false, {
                            fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                            lineNumber: 530,
                            columnNumber: 36
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 530,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "panel",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Needs:"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                lineNumber: 534,
                                                columnNumber: 20
                                            }, this),
                                            " ",
                                            (trade.needs || []).join(", ") || "none"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 534,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Surplus:"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                lineNumber: 535,
                                                columnNumber: 20
                                            }, this),
                                            " ",
                                            (trade.surplus || []).join(", ") || "none"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 535,
                                        columnNumber: 17
                                    }, this),
                                    (trade.give_candidates || []).length === 0 || (trade.receive_candidates || []).length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "muted",
                                        style: {
                                            marginTop: "0.35rem"
                                        },
                                        children: "Strict candidates were empty, so selector is using full team pools."
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 537,
                                        columnNumber: 19
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 533,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "panel stack",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        children: "2. Build Package"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 544,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "row",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "pick-col",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: [
                                                                "You Send (",
                                                                myTeam,
                                                                ")"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                            lineNumber: 547,
                                                            columnNumber: 24
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                        lineNumber: 547,
                                                        columnNumber: 21
                                                    }, this),
                                                    candidateGive.slice(0, 30).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "pick-item",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "checkbox",
                                                                    checked: selectedSend.includes(p.name),
                                                                    onChange: ()=>togglePick(setSelectedSend, selectedSend, p.name)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                                    lineNumber: 550,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        p.name,
                                                                        " (",
                                                                        p.pos,
                                                                        ")"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                                    lineNumber: 551,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, `send-${p.name}`, true, {
                                                            fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                            lineNumber: 549,
                                                            columnNumber: 23
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                lineNumber: 546,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "pick-col",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: [
                                                                "You Receive (",
                                                                partner || "Partner",
                                                                ")"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                            lineNumber: 556,
                                                            columnNumber: 24
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                        lineNumber: 556,
                                                        columnNumber: 21
                                                    }, this),
                                                    candidateReceive.slice(0, 30).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "pick-item",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "checkbox",
                                                                    checked: selectedReceive.includes(p.name),
                                                                    onChange: ()=>togglePick(setSelectedReceive, selectedReceive, p.name)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                                    lineNumber: 559,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        p.name,
                                                                        " (",
                                                                        p.pos,
                                                                        ")"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                                    lineNumber: 560,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, `recv-${p.name}`, true, {
                                                            fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                            lineNumber: 558,
                                                            columnNumber: 23
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                lineNumber: 555,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 545,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "row",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "muted",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Selected Send:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                        lineNumber: 566,
                                                        columnNumber: 40
                                                    }, this),
                                                    " ",
                                                    selectedSend.join(", ") || "none"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                lineNumber: 566,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "muted",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Selected Receive:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                        lineNumber: 567,
                                                        columnNumber: 40
                                                    }, this),
                                                    " ",
                                                    selectedReceive.join(", ") || "none"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                lineNumber: 567,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 565,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 543,
                                columnNumber: 15
                            }, this),
                            tradeEval ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "panel stack",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        children: "Package Evaluation"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 573,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Market:"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                lineNumber: 574,
                                                columnNumber: 22
                                            }, this),
                                            " send ",
                                            tradeEval.send_total_market.toFixed(1),
                                            " | receive ",
                                            tradeEval.receive_total_market.toFixed(1),
                                            " | diff ",
                                            tradeEval.market_diff.toFixed(1)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 574,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "True Value:"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                lineNumber: 575,
                                                columnNumber: 22
                                            }, this),
                                            " send ",
                                            tradeEval.send_total_true_value.toFixed(1),
                                            " | receive ",
                                            tradeEval.receive_total_true_value.toFixed(1),
                                            " | diff ",
                                            tradeEval.true_value_diff.toFixed(1)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 575,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Fairness:"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                lineNumber: 576,
                                                columnNumber: 22
                                            }, this),
                                            " ",
                                            tradeEval.fairness_score.toFixed(3),
                                            " (closer to 1.0 is more balanced)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 576,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 572,
                                columnNumber: 17
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTable, {
                                title: "Targets",
                                rows: trade.targets || [],
                                defaultSortKey: "edge_z_adj"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 580,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTable, {
                                title: "Give Candidates",
                                rows: candidateGive,
                                defaultSortKey: "true_value"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 581,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTable, {
                                title: "Receive Candidates",
                                rows: candidateReceive,
                                defaultSortKey: "true_value"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 582,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                lineNumber: 519,
                columnNumber: 9
            }, this);
        }
        if (tab === "fa") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "stack",
                children: !fa ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "panel stack",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "muted",
                            children: "Run FA upgrade scan to view suggestions."
                        }, void 0, false, {
                            fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                            lineNumber: 594,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "button",
                            disabled: busy || myTeamRoster.length === 0,
                            onClick: runFaUpgrades,
                            type: "button",
                            children: "Run FA Upgrades"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                            lineNumber: 595,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                    lineNumber: 593,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "panel",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Total Projected:"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 599,
                                        columnNumber: 41
                                    }, this),
                                    " ",
                                    fa.total_projected_points
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 599,
                                columnNumber: 38
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                            lineNumber: 599,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTable, {
                            title: "Upgrades",
                            rows: fa.upgrades || [],
                            defaultSortKey: "delta_pts"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                            lineNumber: 600,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTable, {
                            title: "FA Pool",
                            rows: fa.fa_pool || [],
                            defaultSortKey: "proj_week"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                            lineNumber: 601,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                lineNumber: 591,
                columnNumber: 9
            }, this);
        }
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "shell dark-shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "topbar panel",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                children: "Dynasty Radar"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 615,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "muted",
                                children: "Dark mode workspace with guided flows for each feature."
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 616,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 614,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "status-chip",
                        children: busy ? "Working..." : "Ready"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 618,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                lineNumber: 613,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "panel stack",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "label grow",
                                children: [
                                    "API Base URL",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "input",
                                        value: apiBase,
                                        onChange: (e)=>setApiBase(e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 625,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 623,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "label grow",
                                children: [
                                    "Sleeper League ID",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "input",
                                        value: leagueId,
                                        onChange: (e)=>setLeagueId(e.target.value),
                                        placeholder: "1195252934627844096"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 629,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 627,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 622,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "label grow",
                                children: [
                                    "My Team",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "input",
                                        value: myTeam,
                                        onChange: (e)=>setMyTeam(e.target.value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Select team..."
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                lineNumber: 637,
                                                columnNumber: 15
                                            }, this),
                                            teams.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: t,
                                                    children: t
                                                }, t, false, {
                                                    fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                    lineNumber: 639,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 636,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 634,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "label grow",
                                children: [
                                    "Trade Partner",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "input",
                                        value: partner,
                                        onChange: (e)=>setPartner(e.target.value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Select partner..."
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                lineNumber: 646,
                                                columnNumber: 15
                                            }, this),
                                            teams.filter((t)=>t !== myTeam).map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: t,
                                                    children: t
                                                }, t, false, {
                                                    fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                    lineNumber: 648,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 645,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 643,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "label",
                                children: [
                                    "Superflex",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "input",
                                        value: String(superflex),
                                        onChange: (e)=>setSuperflex(e.target.value === "true"),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "true",
                                                children: "true"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                lineNumber: 655,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "false",
                                                children: "false"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                lineNumber: 656,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 654,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 652,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 633,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button",
                                disabled: busy,
                                onClick: loadLeague,
                                type: "button",
                                children: "Load League"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 662,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button",
                                disabled: busy || leaguePlayers.length === 0,
                                onClick: runValuations,
                                type: "button",
                                children: "Run Valuations"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 663,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button",
                                disabled: busy || myTeamRoster.length === 0,
                                onClick: runLineup,
                                type: "button",
                                children: "Run Lineup"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 664,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button",
                                disabled: busy || valuations.length === 0 || !partner,
                                onClick: runTradeTargets,
                                type: "button",
                                children: "Run Trade"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 665,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button",
                                disabled: busy || myTeamRoster.length === 0,
                                onClick: runFaUpgrades,
                                type: "button",
                                children: "Run FA"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 666,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 661,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        className: "pre",
                        children: status
                    }, void 0, false, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 669,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                lineNumber: 621,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "tabbar",
                children: TABS.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `tab ${tab === t ? "active" : ""}`,
                        type: "button",
                        onClick: ()=>setTab(t),
                        children: tabLabel(t)
                    }, t, false, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 674,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                lineNumber: 672,
                columnNumber: 7
            }, this),
            renderTabBody()
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
        lineNumber: 612,
        columnNumber: 5
    }, this);
}
_s1(LeagueWorkspace, "VjR6KbF9ZToVS9zf7SUCOa3iRN0=");
_c2 = LeagueWorkspace;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "StatCard");
__turbopack_context__.k.register(_c1, "SortableTable");
__turbopack_context__.k.register(_c2, "LeagueWorkspace");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/new dynasty app/frontend/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/new dynasty app/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/Downloads/new dynasty app/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/Downloads/new dynasty app/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/new dynasty app/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/Downloads/new dynasty app/frontend/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=Downloads_new%20dynasty%20app_frontend_ba528367._.js.map