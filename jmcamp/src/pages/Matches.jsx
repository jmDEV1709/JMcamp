import PageHeader from "../components/PageHeader";
import MatchCard from "../components/MatchCard";
import { useChampionship } from "../hooks/useChampionship";

export default function Matches() {
  const {
    filteredMatches,
    selectedRound,
    setSelectedRound,
    getPlayer,
  } = useChampionship();

  return (
    <div className="space-y-7">
      <PageHeader
        title="Partidas"
        description="Confira resultados e próximos confrontos."
      >
        <select
          value={selectedRound}
          onChange={(event) =>
            setSelectedRound(event.target.value)
          }
          className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm font-bold text-white outline-none focus:border-blue-500"
        >
          <option value="all">Todas as rodadas</option>
          <option value="1">Rodada 1</option>
          <option value="2">Rodada 2</option>
        </select>
      </PageHeader>

      <section className="grid gap-4 xl:grid-cols-2">
        {filteredMatches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            getPlayer={getPlayer}
          />
        ))}
      </section>
    </div>
  );
}