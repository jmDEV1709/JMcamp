import { CalendarDays, CheckCircle2 } from "lucide-react";
import PlayerAvatar from "./PlayerAvatar";

export default function MatchCard({
  match,
  getPlayer,
}) {
  const home = getPlayer(match.homeId);
  const away = getPlayer(match.awayId);
  const finished = match.status === "finished";

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 transition duration-300 hover:border-blue-500/40 sm:p-5">
      <div className="mb-5 flex items-center justify-between">
        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-400">
          Rodada {match.round}
        </span>

        <span
          className={`flex items-center gap-1.5 text-xs font-semibold ${
            finished
              ? "text-emerald-400"
              : "text-amber-400"
          }`}
        >
          {finished && <CheckCircle2 size={14} />}

          {finished ? "Finalizada" : "Agendada"}
        </span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-5">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <PlayerAvatar player={home} size="sm" />

          <strong className="truncate text-sm text-white">
            {home.name}
          </strong>
        </div>

        <div className="rounded-xl bg-slate-950 px-3 py-2 text-center font-black text-white sm:px-5 sm:text-lg">
          {finished ? (
            <>
              {match.homeScore}
              <span className="px-2 text-slate-600">×</span>
              {match.awayScore}
            </>
          ) : (
            <span className="text-blue-400">VS</span>
          )}
        </div>

        <div className="flex min-w-0 flex-row-reverse items-center gap-2 text-right sm:gap-3">
          <PlayerAvatar player={away} size="sm" />

          <strong className="truncate text-sm text-white">
            {away.name}
          </strong>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 border-t border-slate-800 pt-4 text-xs text-slate-500">
        <CalendarDays size={14} />
        {match.date} às {match.time}
      </div>
    </article>
  );
}