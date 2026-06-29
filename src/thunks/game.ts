import {
  type State as _State,
  doMod,
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

export const play = (id: string, nextSquares: string[]): Thunk<State> => {
  return (set, get) => {
    const { history, currentMove } = get();

    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    // can be integrated as set(null, {history: nextHistory, currentMove: nextHistory.length - 1})
    set(id, { history: nextHistory });
    set(id, { currentMove: nextHistory.length - 1 });
  };
};

export const setCurrentMove = (
  id: string,
  currentMove: number,
): Thunk<State> => {
  return (set, get) => {
    const { history } = get(id);

    set(id, { currentMove });

    const squares = history[currentMove];
    const doSquare = doMod<squareState, TypeModSquare>(squareName);
    // biome-ignore lint/suspicious/useIterableCallbackReturn: return void.
    ARRAY_9.map((eachIdx) => {
      doSquare.setValue(`${eachIdx}`, squares[eachIdx]);
    });
  };
};
