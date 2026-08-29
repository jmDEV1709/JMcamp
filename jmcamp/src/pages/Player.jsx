import {
  ArrowLeft,
  Crosshair,
  Medal,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import MatchCard from "../components/MatchCard";
import PlayerAvatar from "../components/PlayerAvatar";
import StatCard from "../components/StatCard";
import { useChampionship } from "../hooks/useChampionship";

export default function Player() {
  const { id } = useParams();
  const {
    players,
    matches,
    ranking,
    getPlayer,
  } = useChampionship();

  const player = players.find(
    (currentPlayer) => currentPlayer.id === id
  );

  const stats = ranking.find(
    (currentPlayer) => currentPlayer.id === id
  );

  const playerMatches = matches.filter(
    (match) =>
      match.homeId === id || match.awayId === id
  );

  if (!player) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-black">
          Jogador não encontrado
        </h1>
        <Link
          to="/jogadores"
          className="mt-4 inline-block text-blue-400"
        >
          Voltar aos jogadores
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Link
        to="/jogadores"
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white"
      >
        <ArrowLeft size={17} />
        Voltar
      </Link>

      <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-blue-950 p-6 sm:p-8">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <PlayerAvatar player={player} size="lg" />

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Perfil do jogador
            </p>
            <h1 className="mt-1 text-3xl font-black">
              {player.name}
            </h1>
            <p className="mt-1 text-slate-400">
              @{player.nickname.toLowerCase()}
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          icon={Medal}
          label="Pontos"
          value={stats.points}
        />
        <StatCard
          icon={Trophy}
          label="Vitórias"
          value={stats.wins}
          color="green"
        />
        <StatCard
          icon={Crosshair}
          label="Gols marcados"
          value={stats.goalsFor}
          color="purple"
        />
        <StatCard
          icon={ShieldCheck}
          label="Saldo"
          value={stats.goalDifference}
          color="yellow"
        />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-black">
          Partidas do jogador
        </h2>

        <div className="grid gap-4 xl:grid-cols-2">
          {playerMatches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              getPlayer={getPlayer}
            />
          ))}
        </div>
      </section>
    </div>
  );
}