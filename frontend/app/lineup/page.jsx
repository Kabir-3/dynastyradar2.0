import ApiTester from "../../components/ApiTester";

const defaultPayload = {
  roster: [
    { name: "Josh Allen", pos: "QB", team: "BUF", ppg: 23.4, ewma: 24.1, trend: 0.9, games_played: 17, market_value: 98 },
    { name: "Bijan Robinson", pos: "RB", team: "ATL", ppg: 17.1, ewma: 18.0, trend: 0.8, games_played: 17, market_value: 95 },
    { name: "Breece Hall", pos: "RB", team: "NYJ", ppg: 15.2, ewma: 14.9, trend: 0.2, games_played: 17, market_value: 90 },
    { name: "CeeDee Lamb", pos: "WR", team: "DAL", ppg: 20.2, ewma: 19.8, trend: 0.5, games_played: 17, market_value: 97 },
    { name: "Amon-Ra St. Brown", pos: "WR", team: "DET", ppg: 19.1, ewma: 18.6, trend: 0.3, games_played: 17, market_value: 94 },
    { name: "Travis Kelce", pos: "TE", team: "KC", ppg: 14.0, ewma: 13.3, trend: -0.1, games_played: 17, market_value: 88 }
  ],
  superflex: true,
  te_premium: false
};

export default function LineupPage() {
  return (
    <ApiTester
      endpoint="/v1/lineup/recommend"
      title="Lineup Recommendation"
      description="Call backend lineup endpoint and inspect starters, bench, and projected total."
      defaultPayload={defaultPayload}
    />
  );
}
