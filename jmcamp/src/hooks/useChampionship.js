import { useMemo, useState, useEffect } from "react";
import { supabase } from "../lib/supabase"; // Ajuste o caminho se necessário
import { calculateRanking } from "../utils/ranking";

export function useChampionship() {
  const [selectedRound, setSelectedRound] = useState("all");
  const [search, setSearch] = useState("");

  // Novos estados substituindo a importação do mockData
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [championship, setChampionship] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      // Buscando dados reais das tabelas que você criou
      const { data: dbPlayers } = await supabase.from('jogadores').select('*');
      const { data: dbMatches } = await supabase.from('partidas').select('*');

      if (dbPlayers) {
        // Mapeando as colunas do banco para o formato que seu front-end já aceita
        const jogadoresFormatados = dbPlayers.map(p => ({
          id: p.id,
          name: p.nome,
          nickname: p.nome.substring(0, 3).toUpperCase(),
          color: p.avatar_url || "from-blue-600 to-cyan-400"
        }));
        setPlayers(jogadoresFormatados);
      }

      if (dbMatches) {
        // Traduzindo nomes como 'gols_casa' para 'homeScore'
        const partidasFormatadas = dbMatches.map(m => ({
          id: m.id,
          round: m.rodada,
          homeId: m.time_casa,
          awayId: m.time_fora,
          homeScore: m.gols_casa,
          awayScore: m.gols_fora,
          status: m.status || "finished",
          date: m.data_partida
        }));
        setMatches(partidasFormatadas);
      }

      // Mantendo a base visual do campeonato
      setChampionship({
        id: "camp-1",
        name: "JMcamp League",
        season: "Temporada 1",
        game: "eFootball Mobile",
        status: "Em andamento",
        format: "Pontos corridos + Mata-mata",
      });

      setLoading(false);
    }

    carregarDados();
  }, []);

  const ranking = useMemo(
    () => calculateRanking(players, matches),
    [players, matches] // Dependências atualizadas
  );

  const filteredMatches = useMemo(() => {
    if (selectedRound === "all") return matches;
    return matches.filter((match) => match.round === Number(selectedRound));
  }, [selectedRound, matches]);

  const filteredPlayers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return players.filter((player) =>
      `${player.name} ${player.nickname}`.toLowerCase().includes(normalizedSearch)
    );
  }, [search, players]);

  const finishedMatches = matches.filter((match) => match.status === "finished");

  const totalGoals = finishedMatches.reduce(
    (total, match) => total + match.homeScore + match.awayScore, 0
  );

  const averageGoals = finishedMatches.length
    ? (totalGoals / finishedMatches.length).toFixed(1)
    : "0.0";

  const nextMatches = matches.filter((match) => match.status === "scheduled");

  function getPlayer(id) {
    return players.find((player) => player.id === id);
  }

  return {
    championship,
    players,
    matches,
    ranking,
    filteredMatches,
    filteredPlayers,
    finishedMatches,
    nextMatches,
    selectedRound,
    search,
    totalGoals,
    averageGoals,
    getPlayer,
    setSelectedRound,
    setSearch,
    loading, // Exportado para uso nas páginas caso queira exibir um 'Loading...'
  };
}