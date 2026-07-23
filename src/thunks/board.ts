import type { State as _State, Thunk } from "use-thunk";

export const name = "demo-use-thunk-tic-tac-toe/board";

export interface State extends _State {
  winner: string;
  turns: number;
  status: string;
}

export const defaultState: State = {
  winner: "",
  turns: 9,
  status: "",
};

export const evaluate = (squares: string[], player: string): Thunk<State> => {
  return (set) => {
    const winner = calculateWinner(squares);
    const turns = calculateTurns(squares);
    const status = calculateStatus(winner, turns, player);

    set(null, { winner, turns, status });
  };
};

const calculateWinner = (squares: string[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return "";
};

const calculateTurns = (squares: string[]) => {
  return squares.filter((square) => !square).length;
};

const calculateStatus = (winner: string, turns: number, player: string) => {
  if (!winner && !turns) return "Draw";
  if (winner) return `Winner ${winner}`;
  return `Next player: ${player}`;
};
