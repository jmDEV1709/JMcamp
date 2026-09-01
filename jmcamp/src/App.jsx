import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Admin from "./pages/Admin";
import Bracket from "./pages/Bracket";
import Championship from "./pages/Championship";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import NotFound from "./pages/NotFound";
import Player from "./pages/Player";
import Players from "./pages/Players";
import Ranking from "./pages/Ranking";

// 1. IMPORTAMOS A NOSSA NOVA PÁGINA AQUI:
import RankingX1 from "./pages/RankingX1";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />

        <Route
          path="campeonato"
          element={<Championship />}
        />

        <Route
          path="jogadores"
          element={<Players />}
        />

        <Route
          path="jogadores/:id"
          element={<Player />}
        />

        <Route
          path="partidas"
          element={<Matches />}
        />

        <Route
          path="classificacao"
          element={<Ranking />}
        />

        <Route
          path="chaveamento"
          element={<Bracket />}
        />

        <Route path="admin" element={<Admin />} />

        {/* 2. ADICIONAMOS A ROTA DO X1 AQUI: */}
        <Route
          path="ranking-x1"
          element={<RankingX1 />}
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}