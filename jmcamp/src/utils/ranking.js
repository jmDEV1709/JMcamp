export function calculateRanking(players, matches) {
  const ranking = players.map((player) => ({
    ...player,
    games: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
  }));

  const findPlayer = (id) =>
    ranking.find((player) => player.id === id);

  matches
    .filter((match) => match.status === "finished")
    .forEach((match) => {
      const home = findPlayer(match.homeId);
      const away = findPlayer(match.awayId);

      if (!home || !away) return;

      home.games += 1;
      away.games += 1;

      home.goalsFor += match.homeScore;
      home.goalsAgainst += match.awayScore;

      away.goalsFor += match.awayScore;
      away.goalsAgainst += match.homeScore;

      if (match.homeScore > match.awayScore) {
        home.wins += 1;
        home.points += 3;
        away.losses += 1;
      } else if (match.homeScore < match.awayScore) {
        away.wins += 1;
        away.points += 3;
        home.losses += 1;
      } else {
        home.draws += 1;
        away.draws += 1;
        home.points += 1;
        away.points += 1;
      }
    });

  return ranking
    .map((player) => ({
      ...player,
      goalDifference:
        player.goalsFor - player.goalsAgainst,
    }))
    .sort(
      (a, b) =>
        b.points - a.points ||
        b.wins - a.wins ||
        b.goalDifference - a.goalDifference ||
        b.goalsFor - a.goalsFor
    );
}