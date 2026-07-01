import { useThunk } from "@chhsiao1981/use-thunk";
import * as ModGame from "../thunks/game";
import Board from "./Board";

export default () => {
  const [game, doGame] = useThunk<ModGame.State, typeof ModGame>(ModGame);
  const { history, currentMove } = game;
  const xIsNext = currentMove % 2 === 0;

  const jumpTo = (nextMove: number) => {
    doGame.setCurrentMove(nextMove);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        fontFamily: "monospace",
      }}
    >
      <div>
        <Board xIsNext={xIsNext} />
      </div>
      <div style={{ marginLeft: "1rem" }}>
        <ol>
          {history.map((_, historyIndex) => {
            const description =
              historyIndex > 0
                ? `Go to move #${historyIndex}`
                : "Go to game start";

            return (
              <li key={historyIndex}>
                <button type="button" onClick={() => jumpTo(historyIndex)}>
                  {description}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
