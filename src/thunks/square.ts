import {
  type State as _State,
  doMod,
  getStateOrNullByModule,
  type Thunk,
} from "@chhsiao1981/use-thunk";
import { ARRAY_9 } from "../const";
import { name as gameName, type State as gameState } from "./game";
import type { TypeModGame } from "./types";

export const name = "demo-use-thunk-tic-tac-toe/square";

export interface State extends _State {
  value: string;
}

export const defaultState: State = {
  value: "",
};

export const click = (
  id: string,
  player: string,
  winner: string,
): Thunk<State> => {
  return (set, get, _getOrNull, _dispatch, getModuleState) => {
    const me = get(id);
    const { value } = me;
    if (value || winner) {
      return;
    }

    // update value and get new Module.
    set(id, { value: player });

    const moduleState = getModuleState();
    const nextSquares = ARRAY_9.map((eachIdx) => {
      const { value } = getStateOrNullByModule(
        moduleState,
        `${eachIdx}`,
      ) as State; // XXX click only after all the squares are init.
      return value;
    });

    const doGame = doMod<gameState, TypeModGame>(gameName);
    doGame.play(nextSquares);
  };
};

export const setValue = (id: string, value: string): Thunk<State> => {
  return (set) => {
    set(id, { value });
  };
};
