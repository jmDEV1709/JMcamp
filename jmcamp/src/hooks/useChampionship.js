import { useMemo, useState } from "react";
import {
  championship,
  matches,
  players,
} from "../data/mockData";
import { calculateRanking } from "../utils/ranking";

export function useChampionship() {
  const [selectedRound, setSelectedRound] = useState("all");
  const [search, setSearch] = useState("");

  const ranking = useMemo(
    () => calculateRanking(players, matches),
    []
  );

  const filteredMatches = useMemo(() => {
    if (selectedRound === "all") {
      return matches;
    }

    return matches.filter(
      (match) => match.round === Number(selectedRound)
    );
  }, [selectedRound]);

  const filteredPlayers = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase();

    return players.filter((player) =>
      `${player.name} ${player.nickname}`
        .toLowerCase()
        .includes(normalizedSearch)
    );
  }, [search]);

  const finishedMatches = matches.filter(
    (match) => match.status === "finished"
  );

  const totalGoals = finishedMatches.reduce(
    (total, match) =>
      total + match.homeScore + match.awayScore,
    0
  );

  const averageGoals = finishedMatches.length
    ? (totalGoals / finishedMatches.length).toFixed(1)
    : "0.0";

  const nextMatches = matches.filter(
    (match) => match.status === "scheduled"
  );

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
  };
}