import ApiTester from "../../components/ApiTester";

const defaultPayload = {
  roster: [
    {
      name: "Josh Allen",
      pos: "QB",
      age: 29,
      display_name: "My Team",
      team: "BUF",
      player_id: "4046",
      sleeper_id: "4046"
    },
    {
      name: "Bijan Robinson",
      pos: "RB",
      age: 24,
      display_name: "My Team",
      team: "ATL",
      player_id: "9509",
      sleeper_id: "9509"
    },
    {
      name: "CeeDee Lamb",
      pos: "WR",
      age: 26,
      display_name: "My Team",
      team: "DAL",
      player_id: "6794",
      sleeper_id: "6794"
    },
    {
      name: "Travis Kelce",
      pos: "TE",
      age: 36,
      display_name: "My Team",
      team: "KC",
      player_id: "1466",
      sleeper_id: "1466"
    }
  ],
  superflex: true,
  te_premium: false,
  ppr: true
};

export default function ValuationsPage() {
  return (
    <ApiTester
      endpoint="/v1/valuations"
      title="Valuations"
      description="Call backend valuations endpoint and inspect JSON output."
      defaultPayload={defaultPayload}
    />
  );
}
