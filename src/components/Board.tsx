import { useThunk } from "@chhsiao1981/use-thunk";
import { useEffect } from "react";
import { ARRAY_9 } from "../const";
import * as ModBoard from "../thunks/board";
import * as ModGame from "../thunks/game";
import Square from "./Square";

type Props = {
  xIsNext: boolean;
};

export default (props: Props) => {
  const { xIsNext } = props;
  const player = xIsNext ? "X" : "O";

  const [game, _doGame, gameID] = useThunk<ModGame.State, typeof ModGame>(
    ModGame,
  );
  const { currentMove, history } = game;

  const [board, doBoard, boardID] = useThunk<ModBoard.State, typeof ModBoard>(
    ModBoard,
  );
  const { winner, status } = board;

  useEffect(() => {
    const squares = history[currentMove];
    doBoard.evaluate(boardID, squares, player);
  }, [currentMove]);

  return (
    <>
      <div style={{ marginBottom: "0.5rem" }}>{status}</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          width: "calc(3 * 2.5rem)",
          height: "calc(3 * 2.5rem)",
          border: "1px solid #999",
        }}
      >
        {ARRAY_9.map((eachIdx) => (
          <Square
            key={eachIdx}
            idx={`${eachIdx}`}
            player={player}
            winner={winner}
            gameID={gameID}
            boardID={boardID}
          />
        ))}
      </div>
    </>
  );
};
