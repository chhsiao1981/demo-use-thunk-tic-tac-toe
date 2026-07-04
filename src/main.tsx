import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { registerThunk } from "@chhsiao1981/use-thunk";
import Game from "./components/Game.tsx";
import Header from "./Header.tsx";
import * as ModBoard from "./thunks/board";
import * as ModGame from "./thunks/game";
import * as ModSquare from "./thunks/square";

registerThunk(ModGame);
registerThunk(ModBoard);
registerThunk(ModSquare);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Header />
    <Game />
  </StrictMode>,
);
