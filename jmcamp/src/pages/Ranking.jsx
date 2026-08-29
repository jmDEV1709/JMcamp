import PageHeader from "../components/PageHeader";
import RankingTable from "../components/RankingTable";
import { useChampionship } from "../hooks/useChampionship";

export default function Ranking() {
    const { ranking } = useChampionship();

    return (
        <div className="space-y-7">
            <PageHeader
                title="Classificação"
                description="Critérios: pontos, vitórias, saldo de gols e gols marcados."
            />

            <RankingTable ranking={ranking} />

            <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                <span>J: jogos</span>
                <span>V: vitórias</span>
                <span>E: empates</span>
                <span>D: derrotas</span>
                <span>GP: gols pró</span>
                <span>SG: saldo</span>
            </div>
        </div>
    );
}