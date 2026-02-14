module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LeagueWorkspace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/new dynasty app/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/new dynasty app/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const DEFAULT_API = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000";
const LS_KEY = "dynasty_radar_league_players";
const LS_KEY_ID = "dynasty_radar_league_id";
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
function SortableTable({ title, rows, defaultSortKey, limit = 40 }) {
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [sortKey, setSortKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultSortKey || "");
    const [sortDir, setSortDir] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("desc");
    const keys = rows && rows.length > 0 ? Object.keys(rows[0]) : [];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!sortKey && keys.length > 0) {
            setSortKey(keys[0]);
        }
    }, [
        keys,
        sortKey
    ]);
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!rows || rows.length === 0) {
            return [];
        }
        if (!query.trim()) {
            return rows;
        }
        const q = query.trim().toLowerCase();
        return rows.filter((row)=>Object.values(row).some((v)=>String(v ?? "").toLowerCase().includes(q)));
    }, [
        rows,
        query
    ]);
    const sorted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const out = [
            ...filtered
        ];
        if (!sortKey) {
            return out;
        }
        out.sort((a, b)=>{
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
    }, [
        filtered,
        sortKey,
        sortDir
    ]);
    if (!rows || rows.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "stack panel",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    children: title
                }, void 0, false, {
                    fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "muted",
                    children: "No data yet."
                }, void 0, false, {
                    fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                    lineNumber: 96,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
            lineNumber: 94,
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "stack panel",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "row between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "input",
                        style: {
                            maxWidth: 260
                        },
                        placeholder: "Filter rows...",
                        value: query,
                        onChange: (e)=>setQuery(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    overflowX: "auto"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "table",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: keys.map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
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
                                        lineNumber: 129,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 127,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                            lineNumber: 126,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: shown.map((r, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: keys.map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: String(r[k] ?? "")
                                        }, `${idx}-${k}`, false, {
                                            fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                            lineNumber: 140,
                                            columnNumber: 19
                                        }, this))
                                }, idx, false, {
                                    fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                    lineNumber: 138,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                            lineNumber: 136,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                    lineNumber: 125,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                lineNumber: 147,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
function LeagueWorkspace() {
    const [apiBase, setApiBase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_API);
    const [leagueId, setLeagueId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [leaguePlayers, setLeaguePlayers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [valuations, setValuations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [lineup, setLineup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [trade, setTrade] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tradeEval, setTradeEval] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [fa, setFa] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [market, setMarket] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedSend, setSelectedSend] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedReceive, setSelectedReceive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [myTeam, setMyTeam] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [partner, setPartner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [superflex, setSuperflex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
    }, []);
    const teams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const uniq = new Set();
        for (const p of leaguePlayers){
            if (p.display_name) {
                uniq.add(p.display_name);
            }
        }
        return [
            ...uniq
        ].sort((a, b)=>a.localeCompare(b));
    }, [
        leaguePlayers
    ]);
    const myTeamRoster = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>leaguePlayers.filter((p)=>p.display_name === myTeam), [
        leaguePlayers,
        myTeam
    ]);
    const myTeamValuations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>valuations.filter((p)=>p.display_name === myTeam), [
        valuations,
        myTeam
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!myTeam && teams.length > 0) {
            setMyTeam(teams[0]);
        }
        if (!partner && teams.length > 1) {
            setPartner(teams[1]);
        }
    }, [
        teams,
        myTeam,
        partner
    ]);
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
            localStorage.setItem(LS_KEY, JSON.stringify(players));
            localStorage.setItem(LS_KEY_ID, leagueId.trim());
            setStatus(`Loaded ${players.length} player rows across ${new Set(players.map((p)=>p.display_name)).size} teams.`);
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
        } catch (err) {
            setStatus(`Valuation failed: ${err.message}`);
        } finally{
            setBusy(false);
        }
    }
    async function runLineup() {
        if (!myTeam) {
            setStatus("Select your team first.");
            return;
        }
        if (myTeamRoster.length === 0) {
            setStatus("No roster rows found for selected team.");
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
        } catch (err) {
            setStatus(`Lineup failed: ${err.message}`);
        } finally{
            setBusy(false);
        }
    }
    async function runTradeTargets() {
        if (!myTeam) {
            setStatus("Select your team first.");
            return;
        }
        if (valuations.length === 0) {
            setStatus("Run valuations first.");
            return;
        }
        setBusy(true);
        setStatus("Running trade analysis...");
        try {
            const out = await postJson(`${apiBase}/v1/trade/targets`, {
                my_team: myTeam,
                partner: partner || null,
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
            setStatus("Trade analysis complete.");
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
        if (!trade) {
            setStatus("Run trade analysis first.");
            return;
        }
        if (!partner) {
            setStatus("Select a trade partner first.");
            return;
        }
        if (selectedSend.length === 0 || selectedReceive.length === 0) {
            setStatus("Select at least one send and one receive player.");
            return;
        }
        setBusy(true);
        setStatus("Evaluating selected trade package...");
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
        if (!myTeam) {
            setStatus("Select your team first.");
            return;
        }
        if (myTeamRoster.length === 0) {
            setStatus("No roster rows found for selected team.");
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
        } catch (err) {
            setStatus(`FA upgrades failed: ${err.message}`);
        } finally{
            setBusy(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "League Workspace"
            }, void 0, false, {
                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                lineNumber: 432,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "muted",
                children: "Load a Sleeper league, select your team, and run all tools without manual JSON."
            }, void 0, false, {
                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                lineNumber: 433,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "stack panel",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "label grow",
                                children: [
                                    "API Base URL",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "input",
                                        value: apiBase,
                                        onChange: (e)=>setApiBase(e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 439,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 437,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "label grow",
                                children: [
                                    "Sleeper League ID",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "input",
                                        value: leagueId,
                                        onChange: (e)=>setLeagueId(e.target.value),
                                        placeholder: "1195252934627844096"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 443,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 441,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 436,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button",
                                disabled: busy,
                                onClick: loadLeague,
                                type: "button",
                                children: "Load League"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 448,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button",
                                disabled: busy || leaguePlayers.length === 0,
                                onClick: runValuations,
                                type: "button",
                                children: "Valuations"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 449,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button",
                                disabled: busy || myTeamRoster.length === 0,
                                onClick: runLineup,
                                type: "button",
                                children: "Lineup"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 450,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button",
                                disabled: busy || valuations.length === 0,
                                onClick: runTradeTargets,
                                type: "button",
                                children: "Trade"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 451,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button",
                                disabled: busy || myTeamRoster.length === 0,
                                onClick: runFaUpgrades,
                                type: "button",
                                children: "FA Upgrades"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 452,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 447,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "label grow",
                                children: [
                                    "My Team",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "input",
                                        value: myTeam,
                                        onChange: (e)=>setMyTeam(e.target.value),
                                        children: teams.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: t,
                                                children: t
                                            }, t, false, {
                                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                lineNumber: 460,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 458,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 456,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "label grow",
                                children: [
                                    "Trade Partner",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "input",
                                        value: partner,
                                        onChange: (e)=>setPartner(e.target.value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "(none)"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                lineNumber: 467,
                                                columnNumber: 15
                                            }, this),
                                            teams.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: t,
                                                    children: t
                                                }, t, false, {
                                                    fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                    lineNumber: 469,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 466,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 464,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "label",
                                children: [
                                    "Superflex",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "input",
                                        value: String(superflex),
                                        onChange: (e)=>setSuperflex(e.target.value === "true"),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "true",
                                                children: "true"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                lineNumber: 476,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "false",
                                                children: "false"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                lineNumber: 477,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 475,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 473,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 455,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        className: "pre",
                        children: status
                    }, void 0, false, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 482,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                lineNumber: 435,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTable, {
                title: "My Team Roster",
                rows: myTeamRoster,
                defaultSortKey: "pos"
            }, void 0, false, {
                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                lineNumber: 485,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTable, {
                title: "League Players",
                rows: leaguePlayers,
                defaultSortKey: "display_name"
            }, void 0, false, {
                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                lineNumber: 486,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTable, {
                title: "My Team Valuations",
                rows: myTeamValuations,
                defaultSortKey: "true_value"
            }, void 0, false, {
                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                lineNumber: 487,
                columnNumber: 7
            }, this),
            lineup ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "stack",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: "Lineup Result"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 491,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Total Projected:"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 492,
                                columnNumber: 14
                            }, this),
                            " ",
                            lineup.total_projected_points
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 492,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTable, {
                        title: "Starters",
                        rows: lineup.starters || [],
                        defaultSortKey: "proj_week"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 493,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTable, {
                        title: "Bench",
                        rows: lineup.bench || [],
                        defaultSortKey: "proj_week"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 494,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                lineNumber: 490,
                columnNumber: 9
            }, this) : null,
            trade ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "stack",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: "Trade Result"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 500,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Needs:"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 501,
                                columnNumber: 14
                            }, this),
                            " ",
                            (trade.needs || []).join(", ") || "none"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 501,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Surplus:"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 502,
                                columnNumber: 14
                            }, this),
                            " ",
                            (trade.surplus || []).join(", ") || "none"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 502,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "panel stack",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                children: "Build Trade Package"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 504,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pick-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: [
                                                        "You Send (",
                                                        myTeam,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                    lineNumber: 507,
                                                    columnNumber: 20
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                lineNumber: 507,
                                                columnNumber: 17
                                            }, this),
                                            (trade.give_candidates || []).slice(0, 25).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "pick-item",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            checked: selectedSend.includes(p.name),
                                                            onChange: ()=>togglePick(setSelectedSend, selectedSend, p.name)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                            lineNumber: 510,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                p.name,
                                                                " (",
                                                                p.pos,
                                                                ")"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                            lineNumber: 515,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, `send-${p.name}`, true, {
                                                    fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                    lineNumber: 509,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 506,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pick-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: [
                                                        "You Receive (",
                                                        partner || "Partner",
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                    lineNumber: 520,
                                                    columnNumber: 20
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                lineNumber: 520,
                                                columnNumber: 17
                                            }, this),
                                            (trade.receive_candidates || []).slice(0, 25).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "pick-item",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            checked: selectedReceive.includes(p.name),
                                                            onChange: ()=>togglePick(setSelectedReceive, selectedReceive, p.name)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                            lineNumber: 523,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                p.name,
                                                                " (",
                                                                p.pos,
                                                                ")"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                            lineNumber: 528,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, `recv-${p.name}`, true, {
                                                    fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                    lineNumber: 522,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 519,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 505,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "row",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "button",
                                    type: "button",
                                    disabled: busy,
                                    onClick: evaluateTradePackage,
                                    children: "Evaluate Selected Package"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                    lineNumber: 534,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 533,
                                columnNumber: 13
                            }, this),
                            tradeEval ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "panel",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Market Totals:"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                lineNumber: 540,
                                                columnNumber: 20
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
                                        lineNumber: 540,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "True Value Totals:"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                lineNumber: 541,
                                                columnNumber: 20
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
                                        lineNumber: 541,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Fairness Score:"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                                lineNumber: 542,
                                                columnNumber: 20
                                            }, this),
                                            " ",
                                            tradeEval.fairness_score.toFixed(3),
                                            " (closer to 1.0 is more balanced)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                        lineNumber: 542,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 539,
                                columnNumber: 15
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 503,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTable, {
                        title: "Targets",
                        rows: trade.targets || [],
                        defaultSortKey: "edge_z_adj"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 546,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTable, {
                        title: "Give Candidates",
                        rows: trade.give_candidates || [],
                        defaultSortKey: "true_value"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 547,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTable, {
                        title: "Receive Candidates",
                        rows: trade.receive_candidates || [],
                        defaultSortKey: "true_value"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 548,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTable, {
                        title: "Team Strength",
                        rows: trade.team_strength || [],
                        defaultSortKey: "TOTAL"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 549,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                lineNumber: 499,
                columnNumber: 9
            }, this) : null,
            fa ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "stack",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: "FA Upgrades Result"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 555,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Total Projected:"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                                lineNumber: 556,
                                columnNumber: 14
                            }, this),
                            " ",
                            fa.total_projected_points
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 556,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTable, {
                        title: "Upgrades",
                        rows: fa.upgrades || [],
                        defaultSortKey: "delta_pts"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 557,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$new__dynasty__app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTable, {
                        title: "FA Pool",
                        rows: fa.fa_pool || [],
                        defaultSortKey: "proj_week"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                        lineNumber: 558,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
                lineNumber: 554,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/new dynasty app/frontend/components/LeagueWorkspace.jsx",
        lineNumber: 431,
        columnNumber: 5
    }, this);
}
}),
"[project]/Downloads/new dynasty app/frontend/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/Downloads/new dynasty app/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Downloads/new dynasty app/frontend/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/Downloads/new dynasty app/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Downloads/new dynasty app/frontend/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0196b669._.js.map