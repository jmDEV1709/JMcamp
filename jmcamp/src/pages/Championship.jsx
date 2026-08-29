import {
  Gamepad2,
  Goal,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { useChampionship } from "../hooks/useChampionship";

export default function Championship() {
  const {
    championship,
    players,
    finishedMatches,
    averageGoals,
    ranking,
  } = useChampionship();

  const actions = [
    {
      title: "Classificação",
      description: "Confira posições e pontuação.",
      to: "/classificacao",
      icon: Trophy,
    },
    {
      title: "Partidas",
      description: "Partidas finalizadas e agendadas.",
      to: "/partidas",
      icon: Gamepad2,
    },
    {
      title: "Jogadores",
      description: "Conheça todos os participantes.",
      to: "/jogadores",
      icon: Users,
    },
    {
      title: "Mata-mata",
      description: "Acompanhe os confrontos decisivos.",
      to: "/chaveamento",
      icon: Target,
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={championship.season}
        title={championship.name}
        description={`${championship.game} • ${championship.format}`}
      >
        <span className="w-fit rounded-full bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-400">
          {championship.status}
        </span>
      </PageHeader>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Participantes"
          value={players.length}
        />
        <StatCard
          icon={Gamepad2}
          label="Jogos realizados"
          value={finishedMatches.length}
          color="purple"
        />
        <StatCard
          icon={Goal}
          label="Média de gols"
          value={averageGoals}
          color="green"
        />
        <StatCard
          icon={Trophy}
          label="Líder"
          value={ranking[0]?.name}
          color="yellow"
        />
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.to}
              to={action.to}
              className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-500/10 text-blue-400">
                <Icon size={21} />
              </div>

              <h2 className="mt-5 text-lg font-black text-white group-hover:text-blue-400">
                {action.title}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                {action.description}
              </p>
            </Link>
          );
        })}
      </section>
    </div>
  );
}