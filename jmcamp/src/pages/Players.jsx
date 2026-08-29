import { Search, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import PlayerAvatar from "../components/PlayerAvatar.jsx";
import { useChampionship } from "../hooks/useChampionship.js";

export default function Players() {
  const {
    filteredPlayers,
    ranking,
    search,
    setSearch,
  } = useChampionship();

  return (
    <div className="space-y-7">
      <PageHeader
        title="Jogadores"
        description="Participantes inscritos no campeonato atual."
      />

      <label className="flex max-w-md items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3 focus-within:border-blue-500">
        <Search size={18} className="text-slate-500" />

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Pesquisar jogador..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
        />
      </label>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredPlayers.map((player) => {
          const stats = ranking.find(
            (item) => item.id === player.id
          );

          return (
            <Link
              key={player.id}
              to={`/jogadores/${player.id}`}
              className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40"
            >
              <div className="flex items-center gap-4">
                <PlayerAvatar player={player} size="lg" />

                <div className="min-w-0">
                  <h2 className="truncate text-lg font-black text-white transition group-hover:text-blue-400">
                    {player.name}
                  </h2>

                  <p className="text-sm text-slate-500">
                    @{player.nickname.toLowerCase()}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-slate-950 p-3 text-center">
                  <strong className="block text-white">
                    {stats?.points ?? 0}
                  </strong>

                  <span className="text-[10px] uppercase text-slate-500">
                    Pontos
                  </span>
                </div>

                <div className="rounded-xl bg-slate-950 p-3 text-center">
                  <strong className="block text-emerald-400">
                    {stats?.wins ?? 0}
                  </strong>

                  <span className="text-[10px] uppercase text-slate-500">
                    Vitórias
                  </span>
                </div>

                <div className="rounded-xl bg-slate-950 p-3 text-center">
                  <strong className="block text-blue-400">
                    {stats?.goalsFor ?? 0}
                  </strong>

                  <span className="text-[10px] uppercase text-slate-500">
                    Gols
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </section>

      {filteredPlayers.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-700 p-12 text-center">
          <UserRound
            size={36}
            className="mx-auto text-slate-600"
          />

          <p className="mt-4 font-bold text-white">
            Nenhum jogador encontrado
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Tente pesquisar por outro nome ou apelido.
          </p>
        </div>
      )}
    </div>
  );
}