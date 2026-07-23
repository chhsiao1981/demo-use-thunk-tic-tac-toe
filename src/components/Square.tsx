import { useThunk } from "use-thunk";
import * as ModSquare from "../thunks/square";

type Props = {
  idx: string;
  player: string;
  winner: string;
};
export default (props: Props) => {
  const { idx, player, winner } = props;
  const [square, doSquare] = useThunk<ModSquare.State, typeof ModSquare>(
    ModSquare,
    idx,
  );
  const { value } = square;

  const onClick = () => {
    doSquare.click(idx, player, winner);
  };

  return (
    <button
      type="button"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        color: "#000",
        backgroundColor: "#fff",
        border: "1px solid #999",
        outline: 0,
        borderRadius: 0,
        fontSize: "1rem",
        fontWeight: "bold",
      }}
      onClick={onClick}
    >
      {value}
    </button>
  );
};
