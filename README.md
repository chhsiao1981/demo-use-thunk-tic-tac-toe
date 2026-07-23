# demo-use-thunk-tic-tac-toe

This repository is the tic-tac-toe implementation using [use-thunk](https://github.com/chhsiao1981/use-thunk).

Compared to [reactjs](https://react.dev/learn/tutorial-tic-tac-toe) and [zustand](https://zustand.docs.pmnd.rs/learn/guides/tutorial-tic-tac-toe):

1. Instead of 1 gigantic GameStore, we can break down to [game](https://github.com/chhsiao1981/demo-use-thunk-tic-tac-toe/blob/main/src/thunks/game.ts), [board](https://github.com/chhsiao1981/demo-use-thunk-tic-tac-toe/blob/main/src/thunks/board.ts), and [square](https://github.com/chhsiao1981/demo-use-thunk-tic-tac-toe/blob/main/src/thunks/square.ts).
2. [game](https://github.com/chhsiao1981/demo-use-thunk-tic-tac-toe/blob/main/src/thunks/game.ts) focuses on move history ([play](https://github.com/chhsiao1981/demo-use-thunk-tic-tac-toe/blob/main/src/thunks/game.ts#L24) and [reset current move](https://github.com/chhsiao1981/demo-use-thunk-tic-tac-toe/blob/main/src/thunks/game.ts#L50)).
3. [board](https://github.com/chhsiao1981/demo-use-thunk-tic-tac-toe/blob/main/src/thunks/board.ts) focuses on [game evaluation for every move](https://github.com/chhsiao1981/demo-use-thunk-tic-tac-toe/blob/main/src/components/Board.tsx#L25).
4. [square](https://github.com/chhsiao1981/demo-use-thunk-tic-tac-toe/blob/main/src/thunks/square.ts) focuses on square values and square behavior ([click](https://github.com/chhsiao1981/demo-use-thunk-tic-tac-toe/blob/main/src/thunks/square.ts#L22)).
5. There is no need to pass onClick down to Squares from the very top components. We can focus on the onClick behavior directly within [click](https://github.com/chhsiao1981/demo-use-thunk-tic-tac-toe/blob/main/src/thunks/square.ts#L22). Furthermore, we can obtain [the whole slice of the square info and pass to doGame.play](https://github.com/chhsiao1981/demo-use-thunk-tic-tac-toe/blob/main/src/thunks/square.ts#L38). We can also get the same squares from [game](https://github.com/chhsiao1981/demo-use-thunk-tic-tac-toe/blob/main/src/thunks/game.ts#L35).
6. When resetting current move, [game can update squares through doSquare.setValue](https://github.com/chhsiao1981/demo-use-thunk-tic-tac-toe/blob/main/src/thunks/game.ts#L59).
7. There is no need to have "combine" middleware or other decorators in a thunk module.

