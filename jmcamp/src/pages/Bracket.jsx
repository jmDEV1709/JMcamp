import PageHeader from "../components/PageHeader";

const semifinals = [
  {
    player1: "1º colocado",
    player2: "4º colocado",
  },
  {
    player1: "2º colocado",
    player2: "3º colocado",
  },
];

export default function Bracket() {
  return (
    <div className="space-y-7">
      <PageHeader
        title="Mata-mata"
        description="Os quatro melhores avançam para a fase decisiva."
      />

      <section className="overflow-x-auto pb-4">
        <div className="grid min-w-[760px] grid-cols-[1fr_100px_1fr] items-center gap-5">
          <div>
            <p className="mb-4 text-center text-xs font-black uppercase tracking-widest text-blue-400">
              Semifinais
            </p>

            <div className="space-y-28">
              {semifinals.map((match, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
                >
                  <div className="border-b border-slate-800 p-4 font-bold">
                    {match.player1}
                  </div>
                  <div className="p-4 font-bold">
                    {match.player2}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center text-4xl text-blue-500">
            ›
          </div>

          <div>
            <p className="mb-4 text-center text-xs font-black uppercase tracking-widest text-amber-400">
              Final
            </p>

            <div className="overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/40 to-slate-900">
              <div className="border-b border-slate-800 p-5 font-bold">
                Vencedor da semifinal 1
              </div>
              <div className="p-5 font-bold">
                Vencedor da semifinal 2
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
