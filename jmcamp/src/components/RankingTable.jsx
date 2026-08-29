import { Medal } from "lucide-react";
import { Link } from "react-router-dom";

export default function RankingTable({
  ranking,
  limit,
}) {
  const displayedPlayers = limit
    ? ranking.slice(0, limit)
    : ranking;

  function renderPosition(position) {
    if (position > 3) {
      return position;
    }

    const colors = {
      1: "text-amber-400",
      2: "text-slate-300",
      3: "text-orange-400",
    };

    return (
      <Medal
        size={19}
        className={colors[position]}
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-sm">
          <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-4 text-left">#</th>
              <th className="px-4 py-4 text-left">
                Jogador
              </th>
              <th className="px-3 py-4">J</th>
              <th className="px-3 py-4">V</th>
              <th className="px-3 py-4">E</th>
              <th className="px-3 py-4">D</th>
              <th className="px-3 py-4">GP</th>
              <th className="px-3 py-4">SG</th>
              <th className="px-4 py-4">PTS</th>
            </tr>
          </thead>

          <tbody>
            {displayedPlayers.map((player, index) => (
              <tr
                key={player.id}
                className="border-t border-slate-800 text-center transition hover:bg-blue-500/5"
              >
                <td className="px-4 py-4 text-left font-bold text-slate-400">
                  {renderPosition(index + 1)}
                </td>

                <td className="px-4 py-4 text-left">
                  <Link
                    to={`/jogadores/${player.id}`}
                    className="font-bold text-white transition hover:text-blue-400"
                  >
                    {player.name}
                  </Link>
                </td>

                <td className="px-3 py-4 text-slate-400">
                  {player.games}
                </td>
                <td className="px-3 py-4 text-emerald-400">
                  {player.wins}
                </td>
                <td className="px-3 py-4 text-slate-400">
                  {player.draws}
                </td>
                <td className="px-3 py-4 text-red-400">
                  {player.losses}
                </td>
                <td className="px-3 py-4 text-slate-400">
                  {player.goalsFor}
                </td>
                <td className="px-3 py-4 text-slate-400">
                  {player.goalDifference}
                </td>
                <td className="px-4 py-4">
                  <span className="rounded-lg bg-blue-500/10 px-2.5 py-1 font-black text-blue-400">
                    {player.points}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}