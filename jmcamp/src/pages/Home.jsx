import {
  ArrowRight,
  Gamepad2,
  Goal,
  Trophy,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import MatchCard from "../components/MatchCard";
import RankingTable from "../components/RankingTable";
import StatCard from "../components/StatCard";
import { useChampionship } from "../hooks/useChampionship";

export default function Home() {
  const {
    championship,
    players,
    finishedMatches,
    nextMatches,
    totalGoals,
    ranking,
    getPlayer,
  } = useChampionship();

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-950 via-slate-900 to-violet-950 p-6 sm:p-8 lg:p-10">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative max-w-2xl">
          <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-400">
            ● {championship.status}
          </span>

          <h1 className="mt-5 text-3xl font-black leading-tight text-white sm:text-5xl">
            A resenha virou
            <span className="block bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              campeonato.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
            Resultados, classificação e confrontos do
            nosso campeonato de eFootball reunidos em
            um único lugar.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/campeonato"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
            >
              Ver campeonato
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/classificacao"
              className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/60 px-5 py-3 text-sm font-bold text-white transition hover:border-blue-500/50"
            >
              Ver classificação
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Jogadores"
          value={players.length}
          color="blue"
        />
        <StatCard
          icon={Gamepad2}
          label="Partidas realizadas"
          value={finishedMatches.length}
          color="purple"
        />
        <StatCard
          icon={Goal}
          label="Gols marcados"
          value={totalGoals}
          color="green"
        />
        <StatCard
          icon={Trophy}
          label="Líder atual"
          value={ranking[0]?.name || "-"}
          color="yellow"
        />
      </section>

      <div className="grid gap-8 xl:grid-cols-[1.25fr_0.75fr]">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Agenda
              </p>
              <h2 className="mt-1 text-xl font-black">
                Próximas partidas
              </h2>
            </div>

            <Link
              to="/partidas"
              className="text-sm font-bold text-blue-400"
            >
              Ver todas
            </Link>
          </div>

          <div className="grid gap-3">
            {nextMatches.slice(0, 2).map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                getPlayer={getPlayer}
              />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Destaques
            </p>
            <h2 className="mt-1 text-xl font-black">
              Top da classificação
            </h2>
          </div>

          <RankingTable ranking={ranking} limit={3} />
        </section>
      </div>
    </div>
  );
}