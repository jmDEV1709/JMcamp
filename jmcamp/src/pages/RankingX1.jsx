import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { supabase } from "../lib/supabase";

export default function RankingX1() {
    const [ranking, setRanking] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function buscarRankingX1() {
            // Busca os dados da tabela ranking_geral unindo com os dados da tabela jogadores
            const { data, error } = await supabase
                .from("ranking_geral")
                .select(`
          *,
          jogadores (nome, time_base)
        `)
                .order("pontos", { ascending: false });

            if (error) {
                console.error("Erro ao buscar ranking X1:", error.message);
            } else {
                setRanking(data || []);
            }
            setCarregando(false);
        }

        buscarRankingX1();
    }, []);

    if (carregando) {
        return <div className="text-white p-6">Carregando ranking X1 do banco...</div>;
    }

    return (
        <div className="space-y-7">
            <PageHeader
                title="Ranking Geral - X1"
                description="Histórico completo de confrontos diretos da galera."
            />

            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/70">
                <table className="w-full text-left text-sm text-slate-300">
                    <thead className="border-b border-slate-800 bg-slate-950/50 text-xs uppercase text-slate-400">
                        <tr>
                            <th className="p-4">Pos</th>
                            <th className="p-4">Jogador</th>
                            <th className="p-4 text-center">J</th>
                            <th className="p-4 text-center">V</th>
                            <th className="p-4 text-center">E</th>
                            <th className="p-4 text-center">D</th>
                            <th className="p-4 text-center">SG</th>
                            <th className="p-4 text-center">Pts</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {ranking.map((item, index) => {
                            const saldoGols = item.gols_pro - item.gols_contra;
                            return (
                                <tr key={item.id} className="transition hover:bg-slate-800/30">
                                    <td className="p-4 font-bold text-white">{index + 1}º</td>
                                    <td className="p-4">
                                        <div className="font-bold text-white">{item.jogadores?.nome || "Desconhecido"}</div>
                                        <div className="text-xs text-slate-500">{item.jogadores?.time_base || "-"}</div>
                                    </td>
                                    <td className="p-4 text-center">{item.jogos}</td>
                                    <td className="p-4 text-center text-emerald-400">{item.vitorias}</td>
                                    <td className="p-4 text-center text-amber-400">{item.empates}</td>
                                    <td className="p-4 text-center text-rose-400">{item.derrotas}</td>
                                    <td className="p-4 text-center">{saldoGols}</td>
                                    <td className="p-4 text-center font-black text-white">{item.pontos}</td>
                                </tr>
                            );
                        })}
                        {ranking.length === 0 && (
                            <tr>
                                <td colSpan="8" className="p-8 text-center text-slate-500">
                                    Nenhum registro no ranking X1 ainda.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}