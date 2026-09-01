import { useState, useEffect } from "react";
import {
  Gamepad2,
  Plus,
  Settings,
  Trophy,
  Users,
  X,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import { supabase } from "../lib/supabase";

export default function Admin() {
  const [modalAtivo, setModalAtivo] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const [nomeJogador, setNomeJogador] = useState("");
  const [timeBase, setTimeBase] = useState("");

  const [partidasPendentes, setPartidasPendentes] = useState([]);
  const [partidaSelecionada, setPartidaSelecionada] = useState("");
  const [golsCasa, setGolsCasa] = useState("");
  const [golsFora, setGolsFora] = useState("");

  useEffect(() => {
    if (modalAtivo === "resultado") {
      async function buscarPartidas() {
        const { data, error } = await supabase
          .from("partidas")
          .select(`
            *,
            casa:time_casa (id, nome),
            fora:time_fora (id, nome)
          `);
        if (!error && data) {
          setPartidasPendentes(data);
        }
      }
      buscarPartidas();
    }
  }, [modalAtivo]);

  async function handleCadastrarJogador(e) {
    e.preventDefault();
    setCarregando(true);

    const { error } = await supabase.from("jogadores").insert([
      { nome: nomeJogador, time_base: timeBase }
    ]);

    if (error) {
      console.error("Erro detalhado:", error);
      alert("Erro ao salvar: " + error.message);
    } else {
      alert("Jogador cadastrado com sucesso!");
      setNomeJogador("");
      setTimeBase("");
      setModalAtivo(null);
    }
    setCarregando(false);
  }

  async function handleRegistrarResultado(e) {
    e.preventDefault();
    if (!partidaSelecionada) return alert("Selecione uma partida!");

    setCarregando(true);

    const partidaAtual = partidasPendentes.find((p) => p.id === partidaSelecionada);
    if (!partidaAtual || !partidaAtual.time_casa || !partidaAtual.time_fora) {
      alert("Erro: Esta partida não possui os dois jogadores definidos.");
      setCarregando(false);
      return;
    }

    const jogadorCasaId = partidaAtual.time_casa;
    const jogadorForaId = partidaAtual.time_fora;
    const gC = Number(golsCasa);
    const gF = Number(golsFora);

    const { error: erroPartida } = await supabase
      .from("partidas")
      .update({
        gols_casa: gC,
        gols_fora: gF,
        status: "finished"
      })
      .eq("id", partidaSelecionada);

    if (erroPartida) {
      alert("Erro ao atualizar placar da partida: " + erroPartida.message);
      setCarregando(false);
      return;
    }

    let vitoriaCasa = 0, derrotaCasa = 0, empatesCasa = 0, pontosCasa = 0;
    let vitoriaFora = 0, derrotaFora = 0, empatesFora = 0, pontosFora = 0;

    if (gC > gF) {
      vitoriaCasa = 1; derrotaFora = 1; pontosCasa = 3;
    } else if (gF > gC) {
      vitoriaFora = 1; derrotaCasa = 1; pontosFora = 3;
    } else {
      empatesCasa = 1; empatesFora = 1; pontosCasa = 1; pontosFora = 1;
    }

    const { data: rankCasa } = await supabase
      .from("ranking_geral")
      .select("*")
      .eq("jogador_id", jogadorCasaId)
      .maybeSingle();

    if (rankCasa) {
      await supabase.from("ranking_geral").update({
        jogos: rankCasa.jogos + 1,
        vitorias: rankCasa.vitorias + vitoriaCasa,
        empates: rankCasa.empates + empatesCasa,
        derrotas: rankCasa.derrotas + derrotaCasa,
        gols_pro: rankCasa.gols_pro + gC,
        gols_contra: rankCasa.gols_contra + gF,
        pontos: rankCasa.pontos + pontosCasa
      }).eq("jogador_id", jogadorCasaId);
    } else {
      await supabase.from("ranking_geral").insert([{
        jogador_id: jogadorCasaId,
        jogos: 1,
        vitorias: vitoriaCasa,
        empates: empatesCasa,
        derrotas: derrotaCasa,
        gols_pro: gC,
        gols_contra: gF,
        pontos: pontosCasa
      }]);
    }

    const { data: rankFora } = await supabase
      .from("ranking_geral")
      .select("*")
      .eq("jogador_id", jogadorForaId)
      .maybeSingle();

    if (rankFora) {
      await supabase.from("ranking_geral").update({
        jogos: rankFora.jogos + 1,
        vitorias: rankFora.vitorias + vitoriaFora,
        empates: rankFora.empates + empatesFora,
        derrotas: rankFora.derrotas + derrotaFora,
        gols_pro: rankFora.gols_pro + gF,
        gols_contra: rankFora.gols_contra + gC,
        pontos: rankFora.pontos + pontosFora
      }).eq("jogador_id", jogadorForaId);
    } else {
      await supabase.from("ranking_geral").insert([{
        jogador_id: jogadorForaId,
        jogos: 1,
        vitorias: vitoriaFora,
        empates: empatesFora,
        derrotas: derrotaFora,
        gols_pro: gF,
        gols_contra: gC,
        pontos: pontosFora
      }]);
    }

    alert("Resultado registrado e Ranking Geral X1 atualizado com sucesso!");
    setGolsCasa("");
    setGolsFora("");
    setPartidaSelecionada("");
    setModalAtivo(null);
    setCarregando(false);
  }

  const options = [
    {
      title: "Cadastrar jogador",
      description: "Adicionar participante ao campeonato.",
      icon: Users,
      modalKey: "jogador",
    },
    {
      title: "Registrar resultado",
      description: "Informar o placar de uma partida.",
      icon: Gamepad2,
      modalKey: "resultado",
    },
    {
      title: "Criar rodada",
      description: "Montar os próximos confrontos.",
      icon: Plus,
      modalKey: "rodada",
    },
    {
      title: "Gerenciar campeonato",
      description: "Alterar nome, formato e situação.",
      icon: Trophy,
      modalKey: "campeonato",
    },
  ];

  return (
    <div className="space-y-7">
      <PageHeader
        title="Administração"
        description="Central de gerenciamento do JMcamp."
      >
        <span className="inline-flex items-center gap-2 rounded-xl bg-blue-500/10 px-4 py-2 text-xs font-bold text-blue-400">
          <Settings size={15} />
          Painel de Controle
        </span>
      </PageHeader>

      <section className="grid gap-4 sm:grid-cols-2">
        {options.map((option) => {
          const Icon = option.icon;

          return (
            <button
              key={option.title}
              onClick={() => setModalAtivo(option.modalKey)}
              className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 cursor-pointer"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-500/10 text-blue-400">
                <Icon size={21} />
              </div>

              <h2 className="mt-5 font-black text-white group-hover:text-blue-400">
                {option.title}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                {option.description}
              </p>
            </button>
          );
        })}
      </section>

      {modalAtivo === "jogador" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-black text-white">Cadastrar Novo Jogador</h3>
              <button onClick={() => setModalAtivo(null)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCadastrarJogador} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Nome</label>
                <input
                  type="text"
                  value={nomeJogador}
                  onChange={(e) => setNomeJogador(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Time Base</label>
                <input
                  type="text"
                  value={timeBase}
                  onChange={(e) => setTimeBase(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={carregando}
                className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-500"
              >
                {carregando ? "Salvando..." : "Salvar Jogador"}
              </button>
            </form>
          </div>
        </div>
      )}

      {modalAtivo === "resultado" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-black text-white">Registrar Resultado (X1)</h3>
              <button onClick={() => setModalAtivo(null)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleRegistrarResultado} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Selecionar Partida</label>
                <select
                  value={partidaSelecionada}
                  onChange={(e) => setPartidaSelecionada(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                >
                  <option value="">Selecione uma partida...</option>
                  {partidasPendentes.map((p) => (
                    <option key={p.id} value={p.id}>
                      Rodada {p.rodada} — {p.casa?.nome || "Casa"} vs {p.fora?.nome || "Fora"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Gols Casa</label>
                  <input
                    type="number"
                    value={golsCasa}
                    onChange={(e) => setGolsCasa(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Gols Fora</label>
                  <input
                    type="number"
                    value={golsFora}
                    onChange={(e) => setGolsFora(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={carregando}
                className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-500"
              >
                {carregando ? "Atualizando..." : "Registrar e Atualizar Ranking"}
              </button>
            </form>
          </div>
        </div>
      )}

      {(modalAtivo === "rodada" || modalAtivo === "campeonato") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 text-center shadow-2xl">
            <h3 className="text-lg font-black text-white mb-2">Em Desenvolvimento</h3>
            <p className="text-sm text-slate-400 mb-5">Esta função de gerenciamento estará ativa em breve.</p>
            <button
              onClick={() => setModalAtivo(null)}
              className="rounded-xl bg-slate-800 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-700"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}