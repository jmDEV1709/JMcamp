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

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}