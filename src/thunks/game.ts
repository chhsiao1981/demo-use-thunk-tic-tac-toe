import {
  type State as _State,
  doMod,
  getMod,
  getStateByModule,
  type Thunk,
} from "@chhsiao1981/use-thunk";
import { ARRAY_9 } from "../const";
import { name as squareName, type State as squareState } from "./square";
import type { TypeModSquare } from "./types";

export const name = "demo-use-thunk-tic-tac-toe/game";

export interface State extends _State {
  history: string[][];
  currentMove: number;
}

export const defaultState: State = {
  history: [Array(9).fill("")],
  currentMove: 0,
};

export const play = (nextSquares: string[]): Thunk<State> => {
  return (set, get) => {
    const { history, currentMove } = get();

    const squareModState = getMod<squareState>(squareName);
    const squaresFromModState = ARRAY_9.map((eachIdx) => {
      const { value } = getStateByModule(squareModState, `${eachIdx}`);
      return value;
    });
    for (const idx of ARRAY_9) {
      if (squaresFromModState[idx] !== nextSquares[idx]) {
        console.error(
          `game.play: (getMod) (${idx}) squares are not the same: sqauresFromModState: ${squaresFromModState[idx]} nextSquares: ${nextSquares[idx]}`,
        );
        break;
      }
    }

    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    // can be integrated as set(null, {history: nextHistory, currentMove: nextHistory.length - 1})
    set(null, { history: nextHistory });
    set(null, { currentMove: nextHistory.length - 1 });
  };
};

export const setCurrentMove = (currentMove: number): Thunk<State> => {
  return (set, get) => {
    const { history } = get();

    set(null, { currentMove });

    const squares = history[currentMove];
    const doSquare = doMod<squareState, TypeModSquare>(squareName);
    // biome-ignore lint/suspicious/useIterableCallbackReturn: return void.
    ARRAY_9.map((eachIdx) => {
      doSquare.setValue(`${eachIdx}`, squares[eachIdx]);
    });
  };
};
